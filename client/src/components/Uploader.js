import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";

const Uploader = () => {
  const [files, setFiles] = useState(Array(4).fill(null));
  const [showFiles, setShowFiles] = useState(Array(4).fill(false));
  const [fileContents, setFileContents] = useState(Array(4).fill(null));
  const [numBoxes, setNumBoxes] = useState(4);
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
      localStorage.setItem("files", JSON.stringify(filesCopy));
      setNumBoxesWithFiles(
        (prevNumBoxesWithFiles) => prevNumBoxesWithFiles + 1
      );
    };
    reader.readAsText(selectedFile);
  };

  const handleAddBox = () => {
    const numFiles = files.filter((file) => file !== null).length;
    if (numFiles < numBoxes) {
      alert("Please upload a file in each box before adding a new one.");
      return;
    }
    setNumBoxes((prevNumBoxes) => prevNumBoxes + 1);
    setFiles((prevFiles) => [...prevFiles, null]);
    setShowFiles((prevShowFiles) => [...prevShowFiles, false]);
    setFileContents((prevFileContents) => [...prevFileContents, null]);
    setNumBoxesWithFiles(numFiles + 1);
  };
  const handleBoxClick = (index) => {
    setSelectedBox(index);
  };

  return (
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
                  selectedBox === index ? "4px solid black" : "3px solid blue",
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
  );
};

export default Uploader;
