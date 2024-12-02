import { useState } from "react";
import { loremIpsum } from "react-lorem-ipsum";

function App() {
  const [wordcount, setwordcount] = useState(1);
  const [countdata, setcountdata] = useState(false);
  const [copy, setCopy] = useState(false);
  const handleOnClick = (user) => {
    let paragraphsFormate = "               " + user.join("\r\n               ");   /* space is important so not remove it */
    navigator.clipboard.writeText(paragraphsFormate);
    if (navigator.clipboard.writeText(paragraphsFormate)) {
      setCopy(true);
    }
  };
  const handleChange = (e) => {
    setwordcount(e.target.value);
    setCopy(false);
   
  };

  return (
    <div>
      <div className="children-box-alignment">
        <div className="main-salary-calculator-box">
          <div className="two-col-grid two-col-grid-one">
            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>How many paragraphs do you need ?</label>
                <input
                  type="number"
                  placeholder="Enter a number between 0 - 500 "
                  value={wordcount}
                  onChange={(e) => {e.target.value <= 1000 && handleChange(e);
                  }}
                ></input>
             
              </div>
            </div>
          </div>
        </div>
        <div className="main-salary-calculator-box meta-result-box-top-alignment">
          {wordcount?.length > 0 &&
          <div className="copy-textarea-icon-alignment" >
                      <i className="fa-solid fa-copy "  title="Copy"  onClick={() => handleOnClick(loremIpsum({ p: wordcount, random: true }))}></i>

                      {wordcount && copy && loremIpsum({ p: wordcount, random: true }) && (
                        <div>
                          {" "}
                          <a>Copied</a>
                        </div>
                      )}
                    </div>}
          

              {wordcount &&
          <div className="main-globally-counter-box-paragraphs">
            <div className="counter-text-area" style={{overflowY:"scroll",maxHeight:"150px"}}>
              {loremIpsum({ p: wordcount, random: true })?.map((text) => (
                  <div className="TextValue" key={text}>
                     {/* space is important so not remove it  */}
                    <p> {"              " + " " + " " + text}</p>    
                    <br />
                    
                  </div>
                ))}
            </div>
          </div>
                }
        </div>
      </div>
    </div>
  );
}

export default App;
