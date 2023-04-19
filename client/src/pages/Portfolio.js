import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { multiStepContext } from "../StepContext";
import { ToastContainer, toast } from "react-toastify";

const Portfolio = () => {
  const { setStep, userData, setUserData } = useContext(multiStepContext);

  const [files, setFiles] = useState(Array(4).fill(null));
  const [showFiles, setShowFiles] = useState(Array(4).fill(false));
  const [fileContents, setFileContents] = useState(Array(4).fill(null));
  const [numBoxes, setNumBoxes] = useState(
    parseInt(localStorage.getItem("boxCount")) || 4
  );
  const [numBoxesWithFiles, setNumBoxesWithFiles] = useState(0);
  const [selectedBox, setSelectedBox] = useState(null);

  const handleFileChange = (e, index) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const filesCopy = [...files];
      filesCopy[index] = selectedFile;
      setFiles(filesCopy);
      setShowFiles((prevShowFiles) => {
        const updatedShowFiles = [...prevShowFiles];
        updatedShowFiles[index] = true;
        return updatedShowFiles;
      });
      setFileContents((prevFileContents) => {
        const updatedFileContents = [...prevFileContents];
        updatedFileContents[index] = reader.result;
        return updatedFileContents;
      });
      // localStorage.setItem("files", JSON.stringify(filesCopy));
      setNumBoxesWithFiles(
        (prevNumBoxesWithFiles) => prevNumBoxesWithFiles + 1
      );
    };
    reader.readAsText(selectedFile);
  };

  const handleAddBox = () => {
    const numFiles = files.filter((file) => file !== null).length;
    if (numFiles < numBoxes) {
      UploadImageFirst();
      return;
    }
    setNumBoxes((prevNumBoxes) => prevNumBoxes + 1);
    setFiles((prevFiles) => [...prevFiles, null]);
    setShowFiles((prevShowFiles) => [...prevShowFiles, false]);
    setFileContents((prevFileContents) => [...prevFileContents, null]);
    setNumBoxesWithFiles(numFiles + 1);
  };
  useEffect(() => {
    localStorage.setItem("boxCount", numBoxes);
  }, [numBoxes]);
  // remove boxes
  const handleRemoveBox = (index) => {
    if (index >= 4 && index < numBoxes) {
      setNumBoxes((prevNumBoxes) => prevNumBoxes - 1);
      setFiles((prevFiles) => [
        ...prevFiles.slice(0, index),
        ...prevFiles.slice(index + 1),
      ]);
      setShowFiles((prevShowFiles) => [
        ...prevShowFiles.slice(0, index),
        ...prevShowFiles.slice(index + 1),
      ]);
      setFileContents((prevFileContents) => [
        ...prevFileContents.slice(0, index),
        ...prevFileContents.slice(index + 1),
      ]);
      setSelectedBox(null);
      setNumBoxesWithFiles((prevNumBoxesWithFiles) => {
        if (prevNumBoxesWithFiles > 0) {
          return prevNumBoxesWithFiles - 1;
        }
        return 0;
      });
    }
  };
  const handleImageCancel = () => {
    const newFiles = [...files];
    newFiles[selectedBox] = null;
    setFiles(newFiles);

    const newShowFiles = [...showFiles];
    newShowFiles[selectedBox] = false;
    setShowFiles(newShowFiles);

    const newFileContents = [...fileContents];
    newFileContents[selectedBox] = null;
    setFileContents(newFileContents);

    setSelectedBox(null);
  };

  const handleReplacePhoto = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".jpg, .pdf, .image ,.ppt, .txt, .png, .html ";
    input.addEventListener("change", (e) => handleFileChange(e, index));
    input.click();
  };

  const handleBoxClick = (index) => {
    setSelectedBox(index);
  };

  // ===============
  const [isImageUploaded, setIsImageUploaded] = useState(
    localStorage.getItem("isImageUploaded") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isImageUploaded", isImageUploaded);
  }, [isImageUploaded]);
  // const [isImageUploaded, setIsImageUploaded] = useState(false);
  const handleSend = () => {
    if (isImageUploaded) {
      setStep(5);
    } else {
      notify();
    }
  };

  const notify = () =>
    toast("Please upload an image first.", { type: "error" });
  const UploadImageFirst = () =>
    toast("Please upload a file in each box before adding a new one.", {
      type: "error",
    });
  return (
    <div
      style={{
        margin: "auto",
        width: "60%",
        maxWidth: "1270px",
        marginBottom: "5rem",
      }}
      className="mb-3 mt-5 "
    >
      <h3> Project Case Study</h3>
      <span>
        {" "}
        Share images of your previous work helps your potential clients see the
        quality of your work
      </span>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {[...Array(numBoxes)].map((_, index) => (
            <div
              key={index}
              style={{
                margin: "10px",
                // flexBasis: "calc(20% - 20px)"
                flexBasis: "calc(5% - 10px)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  border: "1px solid blue",
                  width: "80px",
                  height: "80px",
                  position: "relative",
                  borderRadius: "0.5rem",
                  opacity: selectedBox === index ? 0.5 : 1,
                  border:
                    selectedBox === index
                      ? "4px solid black"
                      : "3px solid blue",
                }}
                onClick={() => handleBoxClick(index)}
              >
                {!showFiles[index] && (
                  <div style={{ position: "absolute", top: "1%", left: "30%" }}>
                    <label htmlFor={`fileInput-${index}`}>
                      <span
                        style={{
                          fontSize: "50px",
                          color: "blue",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </span>
                      <input
                        id={`fileInput-${index}`}
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(e, index)}
                      />
                    </label>
                  </div>
                )}
                {showFiles[index] && (
                  <div>
                    {files[index].type.includes("image") && (
                      <div>
                        <img
                          style={{
                            width: "70px",
                            height: "70px",
                            position: "absolute",
                            // objectFit: "cover",
                          }}
                          src={URL.createObjectURL(files[index])}
                          alt="uploaded file"
                        />
                      </div>
                    )}
                    {files[index].type.includes("pdf") && (
                      <div>
                        <object
                          data={URL.createObjectURL(files[index])}
                          type="application/pdf"
                          width="70px"
                          height="70px"
                        >
                          <p>
                            PDF cannot be displayed. Please download the file.
                          </p>
                        </object>
                      </div>
                    )}
                    {files[index].type.includes("powerpoint") && (
                      <div
                        style={{
                          position: "absolute",
                        }}
                      >
                        <iframe
                          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                            URL.createObjectURL(files[index])
                          )}`}
                          width="70px"
                          height="70px"
                          frameborder="0"
                        >
                          <p>
                            PPT cannot be displayed. Please download the file.
                          </p>
                        </iframe>
                      </div>
                    )}
                    {files[index].type.includes("text") && (
                      <div>
                        <pre
                          style={{
                            width: "70px",
                            height: "70px",
                            // paddingBottom: "-5rem",
                            // justifyContent: "center",
                            // alignItems: "center",
                            // alignContent: "center",
                            marginTop: "0.2px",
                          }}
                        >
                          {fileContents[index]}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {numBoxes < 10 && (
            <div style={{ margin: "10px", flexBasis: "calc(20% - 20px)" }}>
              <div
                style={{
                  border: "1px dashed grey",
                  width: "80px",
                  height: "80px",
                  position: "relative",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={handleAddBox}
              >
                <span style={{ marginTop: "-0.5rem" }}>+</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ====buttons========== */}
      <div className="row mt-2">
        <div className="col-sm-3 col-lg-3">
          <Button
            style={{
              paddingLeft: "1.4rem",
              paddingRight: "1.4rem",
              textTransform: "capitalize",
            }}
            variant="outlined"
            onClick={() => {
              handleRemoveBox(selectedBox);
              handleImageCancel();
            }}
          >
            delete Photo
          </Button>
        </div>
        {/* <div className="col-sm-12 col-lg-2">
          <Button
            style={{
              paddingLeft: "2.2rem",
              paddingRight: "2.2rem",
              textTransform: "capitalize",
            }}
            variant="contained"
            onClick={() => handleRemoveBox(selectedBox)}
          >
            Remove Box
          </Button>
        </div> */}
        <div className="col-sm-3 col-lg-3">
          <Button
            style={{
              paddingLeft: "1.9rem",
              paddingRight: "1.9rem",
              textTransform: "capitalize",
            }}
            variant="contained"
            onClick={() => handleReplacePhoto(selectedBox)}
          >
            Change photo
          </Button>
        </div>
      </div>
      <style>
        {`
@media (max-width: 576px) {
  .row button {
    margin-bottom: 10px;
    
  }
}
`}
      </style>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          // width: "100%",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Button
          style={{
            flexGrow: 1,
            margin: "0 5px",
            maxWidth: "180px",
            border: "2px solid rgb(25, 118, 210)",
          }}
          variant="outline-primary"
          type="submit"
          onClick={() => setStep(3)}
        >
          back
        </Button>
        <Button
          style={{
            flexGrow: 1,
            margin: "0 5px",
            maxWidth: "180px",
            backgroundColor: "rgb(25, 118, 210)",
            color: "white",
            marginLeft: "auto",
          }}
          type="submit"
          onClick={handleSend}
        >
          next
        </Button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Portfolio;
