import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import api, { routes } from "@/api";
import { showPrompt, hidePrompt, fillItemSelection } from "@/actions";
import { FileDrop, ImageCropper, LoadingIndicator } from "@/components";
import ListItem from "./ListItem";

class InventoryItemSettingsImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      processing: false,
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

  onMakeImagePrimary(image) {
    return this.onProcessImage(image, "makePrimary");
  }

  onDeleteImage(image) {
    return this.onProcessImage(image, "delete");
  }

  onProcessImage(image, context) {
    return this.setState({ processing: true, error: null }, async () => {
      try {
        const response = await api.patch(routes.items + "/" + this.props.slug, {
          [context + "Image"]: image.id
        });
        const { data } = response.data;
        this.props.fillItemSelection(data);
        this.setState({ processing: false });
      } catch (error) {
        this.setState({
          processing: false,
          error: error.response
            ? error.response.data
            : error.toString() || error
        });
      }
    });
  }

  render() {
    const { error, processing, uploading, uploadProgress } = this.state;
    const { images } = this.props;
    const errorMessage =
      !!error && !!error.errors && !!error.errors.image
        ? error.errors.image[0]
        : error;

    return (
      <div>
        <h3 className="mb-4">Images</h3>
        <div className="form">
          {!!error && <div className="alert alert-danger">{errorMessage}</div>}
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
              label="Drop an image here, or click to select image (max 2MB)"
              inactiveLabel="Drop the image here"
              onAddedFiles={addedImages => this.onAddedImage(addedImages[0])}
            />
          )}

          <div className="position-relative">
            <div className="row">
              {images.map((image, index) => (
                <ListItem
                  key={"images-item-" + index}
                  {...image}
                  primary={index === 0}
                  disabled={processing}
                  onMakePrimary={() => this.onMakeImagePrimary(image)}
                  onDelete={() => this.onDeleteImage(image)}
                />
              ))}
            </div>
            {processing && (
              <div
                className="fill d-flex flex-column justify-content-center"
                style={{ background: "rgba(255,255,255,0.8)" }}>
                <LoadingIndicator label="Hang on.." />
              </div>
            )}
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
