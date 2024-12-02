import react, { useCallback, useRef, useState } from "react";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import download from "downloadjs";
import Loader from "../../../../Loader/Loader";

function FilterImage({ image, filter, changeSettings }) {
  const imgStyle = {
    filter: `
    brightness(${filter.settings.brightness}) 
    saturate(${filter.settings.saturate}%) 
    contrast(${filter.settings.contrast}%)
    sepia(${filter.settings.sepia})
    `,
  };

  function handleClick(e) {
    changeSettings(filter.settings);
  }

  return (
    <>
      <div className="FilterImage" onClick={handleClick}>
        <img onClick={handleClick} className="FilterImage__img" style={imgStyle} src={image} />
        <p className="crop-image-filter-name-text-style">{filter.name}</p>
      </div>
    </>
  );
}
export default function ImageFilter() {
  const [loading, setLoading] = useState(false);
  const valueObject = {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
    currentEdit: {
      width: 400,
      brightness: 1,
      saturate: 100,
      contrast: 100,
      sepia: 0,
    },
    settings: [
      {
        id: 0,
        property: "width",
        default: 400,
        min: 0,
        max: 600,
      },
      {
        id: 1,
        property: "brightness",
        default: 1,
        min: 0,
        max: 10,
        step: 0.01,
      },
      {
        id: 2,
        property: "saturate",
        default: 100,
        min: 0,
        max: 200,
      },
      {
        id: 3,
        property: "contrast",
        default: 100,
        min: 50,
        max: 150,
      },
      {
        id: 4,
        property: "sepia",
        default: 0,
        min: 0,
        max: 100,
      },
    ],

    filters: [
      {
        id: 0,
        name: "Original",
        settings: {
          width: 400,
          brightness: 1,
          saturate: 100,
          contrast: 100,
          sepia: 0,
        },
      },
      {
        id: 1,
        name: 'B&W aka "Rhea"',
        settings: {
          brightness: 1,
          saturate: 0,
          contrast: 100,
          sepia: 0,
        },
      },
      {
        id: 2,
        name: "Deep Fried Ice Cream",
        settings: {
          brightness: 1,
          saturate: 200,
          contrast: 150,
          sepia: 0,
        },
      },
      {
        id: 3,
        name: "Old Timey",
        settings: {
          brightness: 1,
          saturate: 100,
          contrast: 100,
          sepia: 100,
        },
      },
    ],
    nextFilterId: 4,
  };

  const ref = useRef(null);
  const [state, setState] = useState(valueObject);
  const { width, brightness, saturate, contrast, sepia } = state.currentEdit;
  function handleChange(e) {
    setState((preValue) => ({
      ...preValue,
      currentEdit: {
        ...preValue.currentEdit,
        [e.target.name.toLowerCase()]: parseInt(e.target.value),
      },
    }));
  }

  const imgStyle = {
    width: width + "px",
    filter: `brightness(${brightness}) saturate(${saturate}%) contrast(${contrast}%) sepia(${sepia})`,
  };
  function changeSettings(settings) {
    setState((preValue) => ({
      ...preValue,
      currentEdit: {
        ...preValue.currentEdit,
        ...settings,
      },
    }));
  }

  function resetDefaults(e) {
    changeSettings({
      width: 400,
      brightness: 1,
      saturate: 100,
      contrast: 100,
      sepia: 0,
    });
  }
  function saveNewFilter(e) {
    let newFilter = {
      id: state.nextFilterId,
      name: `Custom ${state.nextFilterId}`,
      settings: state.currentEdit,
    };

    setState((preValue) => ({
      ...preValue,
      filters: [...preValue.filters, newFilter],
      nextFilterId: state.nextFilterId + 1,
    }));
  }
  const handleClick = useCallback(async () => {
    setLoading(true);
    if (ref.current) {
      download(await toJpeg(ref.current), "test.jpg");
      // download(await toSvg(ref.current), "test.svg");
      setLoading(false);
    }
  }, [ref?.current]);
  return (
    <>
      {state.image ==
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" && (
        <div className="image-cropper-box-design-upload">
          <div className="icon-center-alignment">
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </div>
          <p>
            Drag your image here, or click to <strong>browse</strong>
          </p>
          <input
            className="Headbar__input__text"
            type="file"
            onChange={(e) =>
              setState((preValue) => ({
                ...preValue,
                image: URL?.createObjectURL(e.target.files[0]),
              }))
            }
          />
        </div>
      )}
      {state.image !=
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" && (
        <div>
          <div className="main-image-filter-style">
            <img src={state?.image} alt="" style={imgStyle} ref={ref} />
          </div>
          <div className="button image-filter-type-download-center-alignment">
            <button onClick={() => handleClick()}>
              <span>Download</span>
              {loading && <Loader />}
            </button>
          </div>

          <div className="range-type-grid-change">
            {state?.settings?.map((setting) => (
              <form key={setting.id}>
                <div className="input-range-type-change">
                  <div className="range-text-style">
                    <span>{setting.property}</span>
                    <input
                      type="range"
                      name={setting.property}
                      value={state.currentEdit[setting.property]}
                      step={setting.step}
                      min={setting.min}
                      max={setting.max}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="counter-input">
                    <input
                      type="number"
                      name={setting.property}
                      value={state.currentEdit[setting.property]}
                      step={setting.step}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </form>
            ))}
          </div>

          <div className="image-croper-title-text-style">
            <p>Filters</p>
          </div>
          <div className="four-image-croper-grid">
            {state?.filters?.map((filter, index) => (
              <FilterImage key={index} image={state.image} filter={filter} changeSettings={changeSettings} />
            ))}
          </div>
          <div className="button reset-defaults-button-center-alignment">
            <button
              onClick={() => {
                setState(valueObject);
              }}
            >
              <i className="fa-sharp fa-solid fa-arrow-left"></i> Back to site
            </button>
            <button onClick={resetDefaults}>
              <span>Reset to Defaults</span>
              {/* {loading && <Loader />} */}
            </button>
            <button onClick={() => saveNewFilter()}>
              <span>Save as a Filter</span>
              {/* {loading && <Loader />} */}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
