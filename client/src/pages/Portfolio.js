import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { multiStepContext } from "../StepContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";

const Portfolio = () => {
  const { setStep, userData, setUserData } = useContext(multiStepContext);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState(Array(4).fill(null));
  const [showFiles, setShowFiles] = useState(Array(4).fill(false));
  const [fileContents, setFileContents] = useState(Array(4).fill(null));
  const [numBoxes, setNumBoxes] = useState(
    parseInt(localStorage.getItem("boxCount")) || 4
  );
  const [numBoxesWithFiles, setNumBoxesWithFiles] = useState(0);
  const [selectedBox, setSelectedBox] = useState(null);

  useEffect(() => {
    const tempFileContents = Array(4).fill(null);
    const tempfiles = Array(4).fill(null);
    const tempShowFiles = Array(4).fill(false);
    for (let i = 0; i < numBoxes; i++) {
      const tempFileURL = localStorage.getItem(`image_url${i}`);
      console.log(tempFileURL);
      if (tempFileURL && tempFileURL?.includes("txt")) {
        tempFileContents[i] = tempFileURL;
        tempShowFiles[i] = true;
      } else if (tempFileURL) {
        tempfiles[i] = tempFileURL;
        tempShowFiles[i] = true;
      }
    }
    setFileContents(tempFileContents);
    setFiles(tempfiles);
    setShowFiles(tempShowFiles);
  }, []);

  console.log("fileContents", fileContents);
  console.log("files", files);

  const handleFileChange = async (e, index) => {
    setIsLoading(true);
    const selectedFile = e.target.files[0];
    let imageUrl;
    const reader = new FileReader();
    reader.onload = async () => {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Check if a file already exists at the selected index
      try {
        if (files[index]) {
          const engineerId = localStorage.getItem("engineerId");
          const fileId = JSON.parse(localStorage.getItem(`fileId${index}`));
          console.log(
            `update fileId${index}:`,
            localStorage.getItem(`fileId${index}`)
          );
          const url = `${process.env.REACT_APP_API_URL}/engineer/updatefile/${engineerId}/${fileId}`;
          const response = await fetch(url, {
            method: "PATCH",
            body: formData,
          });
          const data = await response.json();
          // console.log(data);
          // Handle response
        } else {
          // Upload new file

          const engineerId = localStorage.getItem("engineerId");
          const url = `${process.env.REACT_APP_API_URL}/engineer/addfile/${engineerId}`;
          const response = await fetch(url, {
            method: "PATCH",
            body: formData,
          });
          const data = await response.json();
          console.log({ data });
          const fileId = data.data.fileId;
          localStorage.setItem(`fileId${index}`, JSON.stringify(fileId));
          console.log(
            `add file fileId${index}:`,
            localStorage.getItem(`fileId${index}`)
          );
          imageUrl = data.data.secure_url_file;
          localStorage.setItem(`image_url${index}`, imageUrl);
          console.log("imageUrl", imageUrl);
          // Store the file ID in localStorage
          // Handle response
        }
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }

      const filesCopy = [...files];
      console.log("hiiii>>>", selectedFile);
      filesCopy[index] = imageUrl;
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
      setIsImageUploaded(true);
      setNumBoxesWithFiles(
        (prevNumBoxesWithFiles) => prevNumBoxesWithFiles + 1
      );
    };
    reader.readAsText(selectedFile);
  };

  const handleDeleteFile = async (index) => {
    const engineerId = localStorage.getItem("engineerId");

    const fileId = JSON.parse(localStorage.getItem(`fileId${index}`));
    const image_url = localStorage.getItem(`image_url${index}`);
    console.log(
      `delete fileId${index}:`,
      localStorage.getItem(`fileId${index}`)
    );
    console.log(
      `delete image_url${index}:`,
      localStorage.getItem(`image_url${index}`)
    );
    if (!fileId && !image_url) {
      console.log(`No file found for index ${index}`);
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/engineer/deletefile/${engineerId}/${fileId}`
      );

      console.log(response.data);
      localStorage.removeItem(`fileId${index}`);
      localStorage.removeItem(`image_url${index}`);
      // handle successful response
    } catch (error) {
      // handle error
    }
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
                    {files[index]?.includes("png") && (
                      <div>
                        <img
                          style={{
                            width: "70px",
                            height: "70px",
                            position: "absolute",
                            // objectFit: "cover",
                          }}
                          src={files[index]}
                          // src={URL.createObjectURL(files[index])}
                          alt="uploaded file"
                        />
                      </div>
                    )}
                    {files[index]?.includes("jpg") && (
                      <div>
                        <img
                          style={{
                            width: "70px",
                            height: "70px",
                            position: "absolute",
                            // objectFit: "cover",
                          }}
                          src={files[index]}
                          // src={URL.createObjectURL(files[index])}
                          alt="uploaded file"
                        />
                      </div>
                    )}
                    {files[index]?.includes("pdf") && (
                      <div>
                        <object
                          // data={URL.createObjectURL(files[index])}
                          data={files[index]}
                          type="application/pdf"
                          width="70px"
                          height="70px"
                        >
                          <img
                            style={{
                              padding: "5px",
                              width: "74px",
                              height: "70px",
                            }}
                            src="https://res.cloudinary.com/df8fsfjad/image/upload/v1682613030/PDF_file_icon.svg_kdsp9v.png"
                          />
                          {/* <p
                            style={{
                              margin: "8px",
                              color: "#1976d2",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            PDF <br /> File.
                          </p> */}
                        </object>
                      </div>
                    )}
                    {files[index]?.includes("pptx") && (
                      <div
                        style={{
                          position: "absolute",
                        }}
                      >
                        <iframe
                          // src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                          //   URL.createObjectURL(files[index])
                          // )}`}
                          src={files[index]}
                          width="70px"
                          height="70px"
                          frameborder="0"
                        >
                          <p>PPT is uploaded.</p>
                        </iframe>
                      </div>
                    )}
                    {files[index]?.includes("txt") && (
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
                          src={files[index]}
                          <p style={{ color: "red" }}>Text File.</p>
                        </pre>
                      </div>
                    )}
                  </div>
                  //////
                )}
                {/* ========= */}
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
          <div style={{ marginLeft: "-14rem", marginTop: "-2rem" }}>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>

      {/* ====buttons========== */}
      <div className="row mt-2">
        <div className="col-sm-3 col-lg-3">
          <Button
            style={{
              paddingLeft: "1.9rem",
              paddingRight: "1.9rem",
              textTransform: "capitalize",
            }}
            variant="outlined"
            onClick={() => {
              handleRemoveBox(selectedBox);
              handleImageCancel();
              handleDeleteFile(selectedBox);
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
