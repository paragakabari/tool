import React from "react";
import { ListGroup } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";
import { List, arrayMove } from "@plesk/react-movable";

const PdfList = ({ list, setList, setDownloadable }) => {
  const handlePositionChange = (oldIndex, newIndex) => {
    setList(arrayMove(list, oldIndex, newIndex));
    if (oldIndex !== newIndex) {
      setDownloadable(false);
    }
  };

  const handleRemove = (id) => {
    setList(list.filter((pdf) => pdf.id !== id));
    setDownloadable(false);
  };

 
  return (
    <>
    {list?.length > 0 && (
    <div className="country-information-design-box">
      <List
        values={list}
        onChange={({ oldIndex, newIndex }) =>
          handlePositionChange(oldIndex, newIndex)
        }
        renderList={({ children, props }) => (
          <ListGroup {...props}>{children}</ListGroup>
        )}
        renderItem={({ value, props }) => (
          <ListGroup.Item {...props}>
            <div className="pdfListAlignment">
              <p className="my-auto">
                <b>{value.file.name.slice(0, -4)}</b>
                <br />
                <small> {Math.ceil(value.file.size / 1024)} KB</small>
              </p>
              <button
                className="colseSvgButton"
                style={{ flexDirection: "row" }}
                onClick={() => handleRemove(value.id)}
              >
                <XCircleFill className="delete-btn-icon my-auto" size={15} />
              </button>
            </div>
          </ListGroup.Item>
        )}
      />
    </div>)}
    </>
  );
};

export default PdfList;
