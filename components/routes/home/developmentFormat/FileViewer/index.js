// import React, { useState } from "react";
// import { DocumentViewer, handleFileUpload, ViewerType } from "react-documents";

// export default function FileViewer() {
//   const [selectedDoc, setSelectedDoc] = useState();
//   const [url, setUrl] = useState("");
//   const handleChange = (e) => {
//     setUrl(e.target.value);
//   };
//   return (
//     <div>
//       <>
//         <div className="children-box-alignment"></div>
//         <div className="main-salary-calculator-box">
//           <div className="two-col-grid two-col-grid-one">
//             <div className="two-col-grid-items">
//               <div className="salry-input">
//                 <label>Paste the Document URL in Input and Click To View</label>
//                 <input
//                   onChange={handleChange}
//                   className="form-control w-100 m-2"
//                   type="text"
//                   placeholder="your document url"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="download-button-one-alignment">
//           <div className="button">
//             <button
//               className="btn btn-outline-secondary m-2"
//               onClick={() => setSelectedDoc(url)}
//             >
//               View
//             </button>
//           </div>
//         </div>
//       </>
//       <div className="meta-result-box-top-alignment main-salary-calculator-box">
//         <h4>Result</h4>
//         <div>
//           <div>
//             <DocumentViewer
//               style={{ height: "80vh", width: "100%" }}
//               queryParams="hl=Nl"
//               url={selectedDoc}
//               viewerUrl="url"
//               // viewer={selectedViewer.name}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
