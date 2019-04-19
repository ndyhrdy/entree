import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Prompt } from "react-router-dom";
import numeral from "numeral";

import { fetchUnits, fetchSuppliers, pushPurchase } from "@/actions";
import api, { routes } from "@/api";
import { DiscountInput, TaxInput } from "@/components";
import { discountTypes } from "@/components/DiscountInput";
import { taxTypes } from "@/components/TaxInput";
import Items from "./Items";
import SupplierSelection from "./SupplierSelection";

class PurchasingPurchasesCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      notes: "",
      supplier: null,
      discount: 0,
      discountType: { ...discountTypes[0] },
      tax: 0,
      taxType: { ...taxTypes[0] },

      dirty: false,
      saving: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.props.fetchSuppliers();
  }

  handleSave() {
    const {
      items,
      notes,
      saving,
      supplier,
      discount,
      discountType,
      tax,
      taxType
    } = this.state;
    const { pushPurchase, history } = this.props;
    if (saving) {
      return;
    }
    this.setState({ saving: true, errors: {} }, async () => {
      try {
        const response = await api.post(routes.purchases, {
          supplier,
          items,
          notes,
          discount,
          discountType: discountType.key,
          tax,
          taxType: taxType.key
        });
        const { data: purchase } = response.data;
        pushPurchase(purchase);
        return history.replace("/purchasing/purchases?_flow=create-success");
      } catch (error) {
        return this.setState({
          saving: false,
          errors: error.response
            ? error.response.data.errors
            : { server: error.toString() }
        });
      }
    });
  }

  render() {
    const { fetchingSuppliers, suppliers } = this.props;
    const {
      items,
      notes,
      saving,
      supplier,
      discount,
      discountType,
      tax,
      taxType,
      errors,
      dirty
    } = this.state;
    const itemsTotal = items.reduce((agg, item) => agg + item.subtotal, 0);
    const discountTotal =
      discountType.key === "percentage"
        ? itemsTotal * discount * 0.01
        : discount;
    const subtotalAfterDiscount = itemsTotal - discountTotal;
    const taxTotal =
      taxType.key === "percentage" ? subtotalAfterDiscount * tax * 0.01 : tax;
    const grandTotal = subtotalAfterDiscount + taxTotal;

    return (
      <div className="container py-5">
        <ol className="breadcrumb mb-5">
          <li className="breadcrumb-item">
            <Link to="/purchasing/purchases" replace>
              Purchases
            </Link>
          </li>
          <li className="breadcrumb-item active">Record Purchase</li>
        </ol>

        <h3 className="mb-4">Record New Purchase</h3>
        <div className="mb-4 bg-white rounded px-3 py-3 shadowed-extra">
          <SupplierSelection
            selection={supplier}
            suppliers={suppliers}
            loading={fetchingSuppliers}
            onSelect={supplier => this.setState({ supplier, dirty: true })}
            onClear={() => this.setState({ supplier: null })}
          />
        </div>
        {(!!supplier || items.length > 0) && (
          <Fragment>
            <div className="mb-4 bg-white rounded px-3 py-3 shadowed-extra">
              <Items
                items={items}
                onChange={items => this.setState({ items })}
              />
              <div className="mt-3 row justify-content-end">
                <div className="col-lg-4">
                  <ExtraField label="Items Total">
                    <div className="py-2">
                      <strong>
                        {numeral(itemsTotal).format("0,0.[0000]")}
                      </strong>
                    </div>
                  </ExtraField>
                  <ExtraField label="Discount">
                    <DiscountInput
                      value={discount}
                      type={discountType}
                      onChangeType={type =>
                        this.setState({ discountType: type })
                      }
                      onChangeValue={value =>
                        this.setState({ discount: value })
                      }
                    />
                  </ExtraField>
                  <ExtraField label="Tax" className="mb-3">
                    <TaxInput
                      value={tax}
                      type={taxType}
                      onChangeType={type => this.setState({ taxType: type })}
                      onChangeValue={value => this.setState({ tax: value })}
                    />
                  </ExtraField>
                  <ExtraField label="Grand Total">
                    <div className="h3 text-right">
                      {numeral(grandTotal).format("0,0.[0000]")}
                    </div>
                  </ExtraField>
                </div>
              </div>
            </div>
            <div className="mb-4 bg-white rounded px-3 py-3 shadowed-extra">
              <div className="h4 mb-3">
                <span className="badge badge-primary">3</span> Add Notes{" "}
                <small>(optional)</small>
              </div>
              <textarea
                className="form-control"
                rows={4}
                value={notes}
                onChange={e => this.setState({ notes: e.target.value })}
              />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                disabled={saving}>
                {saving ? "Saving.." : "Save"}
              </button>
            </div>
          </Fragment>
        )}

        <Prompt
          when={dirty}
          message="Are you sure? Your changes has not been saved and will be lost."
        />
      </div>
    );
  }
}

const ExtraField = props => (
  <div
    className={
      "d-flex justify-content-end align-items-center mb-2" +
      (props.className ? " " + props.className : "")
    }>
    <div style={{ flex: 1 }}>
      <div className="text-muted">{props.label}</div>
    </div>
    <div style={{ flex: 2 }}>
      <div className="text-right">{props.children}</div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  suppliers: state.suppliers.data,
  fetchingSuppliers: state.suppliers.fetching
});

const mapDispatchToProps = {
  fetchUnits,
  fetchSuppliers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasingPurchasesCreate);
