import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Loader from "../../../../Loader/Loader";

export default function TextToPdf() {
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [checked, setChecked] = useState(false);

  const doc = new jsPDF();

  const handleOnErase = () => {
    setInput("");
  };

  const handleOnSubmit = () => {
    if (!input || input.trim() === "") return setErrors("* Please enter text.");
    setLoading(true);
    try {
      var splitTitle = doc.splitTextToSize(input, 210);
      var totalLine = splitTitle?.length;
      var totalPage = Math.round(totalLine / 46);

      if (totalLine / 46 > totalPage) {
        totalPage = totalPage + 1;
      } else {
        totalPage = totalPage;
      }

      for (let i = 0; i < totalPage; i++) {
        const element = splitTitle.slice(i * 46, (i + 1) * 46);

        doc.setFontSize(14);
        doc.text(15, 20, element);
        if (checked) {
          doc.setTextColor("red");
          doc.text(100, 290, `${i + 1} of ${totalPage}`);
          doc.setTextColor("");
        }

        if (i < totalPage - 1) {
          doc.addPage();
        } else {
          break;
        }
      }
      if (pdfName) {
        doc.save(`${pdfName}.pdf`);
      } else {
        doc.save("Text.pdf");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main-globally-counter-box">
        {input?.length > 0 && (
          <div className="color-picker-icon">
            <i className="fa-solid fa-eraser" title="Clear" onClick={handleOnErase}></i>
          </div>
        )}
        <div className="counter-text-area">
          <textarea
            className={errors && "error-input"}
            placeholder="Type A Text To Convert Into PDF.."
            value={input}
            onChange={(e) => (setInput(e.target.value), setErrors(""))}
          />
          <span>{errors}</span>
        </div>
        {input && (
          <>
            <div className="input-new"></div>
            <div className="input-new"></div>
            <div className="input-new"></div>
            <div className="input-new"></div>

            <div className="input-new">
              <label>Enter name you want to save as a pdf name..</label>
              <input type="text" placeholder="" onChange={(e) => setPdfName(e.target.value)}></input>{" "}
            </div>
            <div className="calculate-gross-checkbox-alignment">
              <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />

              <label>
                <span> Checked if you want page number in your pdf pages.</span>
              </label>
            </div>

            <div className="speech-text-alignment">
              <div className="button">
                <button onClick={handleOnSubmit}>
                  <span>Download</span>
                  {loading && <Loader />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
