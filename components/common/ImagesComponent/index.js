import React from "react";

import FileUploadBoxImage from "../fileUploadBoxImage";

export default function DropZoneFileImage({ Data }) {
  return (
    <div className="children-box-alignment">
      <FileUploadBoxImage Data={Data} />

      {/* <PdfToCsvDemo /> */}
    </div>
  );
}
