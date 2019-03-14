import React, { Fragment, PureComponent } from "react";
import ImageCrop from "react-image-crop";

export default class ImageCropper extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      source: URL.createObjectURL(props.image),
      crop: {
        aspect: 1
      },
      pixelCrop: null
    };
  }

  render() {
    const { onCancel, onSuccess } = this.props;
    const { crop, pixelCrop, source } = this.state;

    return (
      <Fragment>
        <div className="modal-body">
          <h3>Crop Image</h3>
        </div>

        <ImageCrop
          src={source}
          crop={crop}
          onImageLoaded={(image, pixelCrop) =>
            this.setState({ image, pixelCrop })
          }
          onChange={(crop, pixelCrop) => this.setState({ crop, pixelCrop })}
        />

        <div className="modal-footer">
          <button onClick={() => onCancel()} className="btn btn-link">
            Cancel
          </button>
          <button
            onClick={async () => onSuccess(pixelCrop)}
            className="btn btn-primary"
            disabled={!pixelCrop || !pixelCrop.height || !pixelCrop.width}>
            Done Cropping
          </button>
        </div>
      </Fragment>
    );
  }
}
