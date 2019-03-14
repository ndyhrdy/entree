import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import api, { routes } from "@/api";
import { showPrompt, hidePrompt, fillItemSelection } from "@/actions";
import { FileDrop, ImageCropper } from "@/components";

class InventoryItemSettingsImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      uploadProgress: 0,
      error: null
    };
  }

  onAddedImage(image) {
    return this.props.showPrompt(
      <ImageCropper
        image={image}
        onCancel={() => this.props.hidePrompt()}
        onSuccess={pixelCrop => {
          this.onUploadImage(image, pixelCrop);
          this.props.hidePrompt();
        }}
      />
    );
  }

  onUploadImage(image, pixelCrop) {
    this.setState({ uploading: true, error: null }, async () => {
      try {
        const data = new FormData();
        data.append("image", image);
        data.append("crop", JSON.stringify(pixelCrop));
        data.append("_method", "PATCH");
        const response = await api.post(
          routes.items + "/" + this.props.slug,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            onUploadProgress: event =>
              event.lengthComputable &&
              this.setState({ uploadProgress: event.total / event.loaded })
          }
        );

        const { data: item } = response.data;
        this.props.fillItemSelection(item);
        this.setState({ uploading: false, uploadProgress: 0 });
      } catch (error) {
        this.setState({
          uploading: false,
          uploadProgress: 0,
          error: error.response
            ? error.response.data
            : error.toString() || error
        });
      }
    });
  }

  render() {
    const { error, uploading, uploadProgress } = this.state;
    const { images } = this.props;

    return (
      <div>
        <h3 className="mb-4">Images</h3>
        <div className="form">
          {!!error && <div className="alert alert-danger">{error}</div>}
          {images.length === 0 && (
            <div className="alert alert-info">
              <div>This item doesn't have an image yet.</div>
            </div>
          )}
          {uploading ? (
            <div className="progress mb-4">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: uploadProgress * 100 + "%" }}
              />
            </div>
          ) : (
            <FileDrop
              className="mb-4"
              label="Drop an image here, or click to select image"
              inactiveLabel="Drop the image here"
              onAddedFiles={addedImages => this.onAddedImage(addedImages[0])}
            />
          )}

          <div className="row">
            {images.map((image, index) => (
              <div className="col-3 pb-4" key={"images-item-" + index}>
                <img
                  src={image.thumbUrl || image.url}
                  className="w-100 rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  showPrompt,
  hidePrompt,
  fillItemSelection
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryItemSettingsImages);
