import React from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload as CloudUploadIcon } from "styled-icons/material";

export default props => {
  const onDrop = acceptedFiles => props.onAddedFiles(acceptedFiles);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop
  });

  return (
    <div
      {...getRootProps()}
      className={[
        "dropzone py-5 px-4 d-flex flex-column align-items-center rounded",
        isDragActive ? "active" : null,
        isDragActive && props.activeClassName ? props.activeClassName : null,
        props.className
      ].join(" ")}>
      <input {...getInputProps()} />
      <CloudUploadIcon size={48} />
      {isDragActive ? (
        <div>{props.activeLabel || "Drop the files here..."}</div>
      ) : (
        <div>
          {props.label ||
            "Drag and drop some files here, or click to select files"}
        </div>
      )}
    </div>
  );
};
