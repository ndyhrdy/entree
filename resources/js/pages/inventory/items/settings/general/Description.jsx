import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { CancelToken, isCancel } from "axios";

import { fillItemSelection } from "@/actions";
import api, { routes } from "@/api";

const charLimit = 5000;
let cancelRequest;

class InventoryItemsSettingsDescription extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      description: props.item.description || "",
      saving: false,
      saved: false,
      error: null
    };
  }

  handleSave() {
    const { fillItemSelection, item } = this.props;
    const { description, saving } = this.state;
    if (saving) return;
    return this.setState(
      { saving: true, saved: false, error: null },
      async () => {
        try {
          const response = await api.patch(
            routes.items + "/" + item.slug,
            {
              description
            },
            {
              cancelToken: new CancelToken(c => (cancelRequest = c))
            }
          );
          const { data } = response.data;
          fillItemSelection(data);
          return this.setState({ saving: false, saved: true });
        } catch (e) {
          if (isCancel(e)) return;
          return this.setState({
            error: e.response ? e.response.data.message : e.toString(),
            saving: false
          });
        }
      }
    );
  }

  componentWillUnmount() {
    cancelRequest && cancelRequest();
  }

  render() {
    const { description, error, saved, saving } = this.state;

    return (
      <div>
        <div className="form-group">
          <textarea
            className="form-control"
            rows={4}
            disabled={saving}
            onChange={e =>
              this.setState({ description: e.target.value, saved: false })
            }
            value={description}
          />
        </div>
        {!!error && <div className="mb-2 text-danger">{error}</div>}
        <div className="d-flex align-items-center">
          <button
            type="button"
            className={
              "btn px-4" +
              (saved ? " btn-outline-success" : " btn-outline-secondary")
            }
            disabled={saving}
            onClick={() => this.handleSave()}>
            {saved ? "Saved!" : "Save"}
          </button>
          <div
            className={
              "ml-2 small" +
              (description.length > charLimit ? " text-danger" : " text-muted")
            }>
            {description.length} / {charLimit}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  fillItemSelection
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryItemsSettingsDescription);
