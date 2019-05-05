import React, { Fragment, PureComponent } from "react";
import { AutocompleteInput } from "@/components";
import { trim } from "lodash";

export default class PurchasingPurchasesCreateSupplierSelection extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      supplierName: ""
    };
  }

  render() {
    const { loading, onClear, onSelect, selection, suppliers } = this.props;
    const { supplierName } = this.state;

    return (
      <Fragment>
        <div className="h4 mb-3">
          <span className="badge badge-primary">1</span> Select Supplier
        </div>
        {selection ? (
          <div>
            <div>
              <strong>{selection.name}</strong>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  return onClear();
                }}
                className="ml-2">
                Change
              </a>
            </div>
            {!!selection.address && <div>{selection.address}</div>}
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <div style={{ flex: 1 }}>
              <div className="mb-2">Choose from your registered suppliers</div>
              <AutocompleteInput
                items={suppliers}
                onSelect={onSelect}
                loading={loading}
                placeholderLoading="Getting your suppliers.."
                renderResult={result => (
                  <div>
                    <div>{result.name}</div>
                    <div className="text-muted small text-truncate">
                      {result.address}
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="text-uppercase text-muted px-5">or</div>
            <div style={{ flex: 1 }}>
              <div className="mb-2">Add a new supplier</div>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  value={supplierName}
                  onChange={e =>
                    this.setState({ supplierName: e.target.value })
                  }
                  placeholder="Supplier Name, e.g. Acme Inc."
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  disabled={trim(supplierName).length === 0}
                  className="ml-2 btn btn-primary"
                  onClick={() =>
                    trim(supplierName).length > 0 &&
                    onSelect({ name: trim(supplierName) })
                  }>
                  Add Supplier
                </button>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
