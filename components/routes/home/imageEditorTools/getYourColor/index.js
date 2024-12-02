import React, { useEffect, useState } from "react";
import { PhotoshopPicker, SketchPicker } from "react-color";

export default function GetYourColor() {
  const [state, setState] = useState({ background: "#fff" });
  const handleColorChange = (color) => {
   
    setState({ background: color.hex });
  };

  return (
    <div
      style={{
        background: state.background,
      }}
      className="get-yout-color-picker"
    >
      <h3>GetYourColor</h3>
      <div className="color-grid">
        <div className="color-grid-items">
          <SketchPicker
            onChangeComplete={handleColorChange}
            color={state.background}
          />
        </div>
        <div className="color-grid-items">
          <PhotoshopPicker
            onChangeComplete={handleColorChange}
            color={state.background}
          />
        </div>
      </div>
    </div>
  );
}
