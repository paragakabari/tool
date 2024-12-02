import React, { useState } from "react";
import { Dropzone } from "@dropzone-ui/react";
import PdfList from "../components/PdfList";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { PDFDocument } from "pdf-lib";
import { readFile } from "../utils/readFile";
import Loader from "../../../../../Loader/Loader"
export default function MergePdf() {
  const [pdfs, setPdfs] = useState([]);
  const [isDownloadable, setDownloadable] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);
  const [ isLoading,setLoading] = useState(false);
  const updatePdfs = (newPdfs) => {
    const newValidPdfs = newPdfs.filter(
      (pdf) => pdf.valid && !pdfs.find((p) => p.file.name === pdf.file.name)
    );
    if (newValidPdfs.length !== 0) {
      setDownloadable(false);
    }
    setPdfs([...pdfs, ...newValidPdfs]);
  };

  const mergePdfs = async () => {
    try {
      const arrayBufferPromises = pdfs.map((pdf) => readFile(pdf.file));
      const arrayBuffers = await Promise.all(arrayBufferPromises);

      const pdfDocumentPromises = arrayBuffers.map((buffer) =>
        PDFDocument.load(buffer)
      );
      const pdfDocuments = await Promise.all(pdfDocumentPromises);

      const mergedPdf = await PDFDocument.create();

      for (const pdf of pdfDocuments) {
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedPdfFile = await mergedPdf.save({ addDefaultPage: false });

      const mergedPdfBlob = new Blob([mergedPdfFile], {
        type: "application/pdf",
      });
      const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);

      setDownloadLink(mergedPdfUrl);
      setDownloadable(true);
      setProcessing(false);
    } catch (error) {
      alert(
        "Something went wrong. Please try again or check the console for more information."
      );
    }
  };

  return (
    <>
      <Dropzone
        className="dropzonePdf"
        onChange={updatePdfs}
        value={pdfs}
        accept="application/pdf"
        header={false}
        footer={false}
        behaviour="replace"
      >
        <Row md="12" lg="4" className="justify-content-center">
          <div className="icon-center-alignment">
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </div>
          <p>
            Drag your PDFs here, or click to <strong>browse</strong>
          </p>
        </Row>
      </Dropzone>
      <Container className="my-4">
        {pdfs.length > 1 && !isDownloadable && !isProcessing && (
          <Row md="12" lg="4" className="justify-content-center">
            <Col>
              <div className="gst-two-button-center-alignment">
                <div className="download-button-one-alignment">
                  <div className="button">
                    <button
                      className="dowload-btn"
                      onClick={async () => {
                        if (!isDownloadable) {
                          setDownloadable(false);
                          setProcessing(true);
                          await mergePdfs();
                        }
                      }}
                    >
                      Merge
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
        {isDownloadable && (
          <Row md="12" lg="4" className="justify-content-center">
            <Col>
              {/* <Button
                className="w-100 my-2 big-text"
                variant="warning"
               
              > */}
              <div className="download-button-one-alignment">
                <div className="button">
                  <button className="dowload-btn" onClick={()=>{
                                  setLoading(true);
                                  setTimeout(function(){ 
                                    saveAs(downloadLink);
                                    setLoading(false);
                                  }, 2000);
                    
                  }} download="merged.pdf">
                    {/* <a href={downloadLink} download="merged.pdf"> */}
                      {" "}
                      Download
                    {/* </a> */}
                    {isLoading ?<Loader/>: null}
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        )}
        {isProcessing && (
          <Row md="12" lg="4" className="justify-content-center">
            <Col>
              <p className="d-flex justify-content-between">
                processing{" "}
                <Spinner animation="border" variant="primary" size="sm" />
              </p>
            </Col>
          </Row>
        )}

        {pdfs.length > 1 && !isProcessing && (
          <Row sm="12" className="justify-content-center">
            <Col className="px-0">
              <h5 className="mb-0 mt-3">
                Change the order of your PDFs by dragging and dropping them in
                the desired spot below.
              </h5>
            </Col>
          </Row>
        )}
      </Container>
      <Container>
        {!isProcessing && (
          <PdfList
            list={pdfs}
            setList={setPdfs}
            setDownloadable={setDownloadable}
          />
        )}
      </Container>
    </>
  );
}
