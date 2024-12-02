import React, { useEffect, useState } from "react";
import { ColorExtractor } from "react-color-extractor";

export default function ImageColorExtractor() {
  const [state, setState] = useState({ colors: [] });
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
  );

  const getColors = (colors) => setState({ colors: [...colors] });

  useEffect(() => {
    setState({ colors: [] });
  }, [image]);

  return (
    <div>
      <div className="image-cropper-box-design-upload">
        <div className="icon-center-alignment">
          <i className="fa-solid fa-cloud-arrow-up"></i>
        </div>
        <p>
          Drag your image here, or click to <strong>browse</strong>
        </p>
        <input
          type="file"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
        />
      </div>

      <div className="image-color-extractor-center-alignment">
        <ColorExtractor getColors={getColors}>
          <img src={image} />
        </ColorExtractor>
      </div>
      <div className="color-extractor-alignment"
      >
        {state.colors.map((color, id) => {
          return (
            <>
              <div>
                <div
                  key={id}
                  style={{
                    backgroundColor: color,
                    width: 100,
                    height: 100,
                  }}
                />
                <div>{color}</div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
