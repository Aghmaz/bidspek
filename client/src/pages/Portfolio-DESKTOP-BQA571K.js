import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { multiStepContext } from "../StepContext";
import { ToastContainer, toast } from "react-toastify";

const Portfolio = () => {
  const { setStep, userData, setUserData } = useContext(multiStepContext);

  // for counting a boxes
  const [boxCount, setBoxCount] = useState(
    parseInt(localStorage.getItem("boxCount")) || 4
  );

  const [images, setImages] = useState(
    JSON.parse(localStorage.getItem("images")) || Array(boxCount).fill(null)
  );
  const [selectedBox, setSelectedBox] = useState(null);

  const handleImageChange = (index, e) => {
    if (e && e.target && e.target.files && e.target.files.length > 0) {
      const newImages = [...images];
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target.result;
        const fileType = file.type.split("/")[0];

        switch (fileType) {
          case "image":
            newImages[index] = base64String;
            break;
          case "application":
            if (file.type === "application/pdf") {
              newImages[index] = { type: "pdf", data: base64String };
            } else {
              newImages[index] = { type: "document", data: base64String };
            }
            break;
          default:
            break;
        }

        setImages(newImages);
        setSelectedBox(null);
        setIsImageUploaded(true);
        localStorage.setItem("images", JSON.stringify(newImages));
      };

      reader.readAsDataURL(file);
    }
  };

  // const handleAddBox = () => {
  //   setBoxCount((prevBoxCount) => prevBoxCount + 1);
  //   setImages((prevImages) => [...prevImages, null]);
  // };
  // useEffect(() => {
  //   localStorage.setItem("boxCount", boxCount);
  // }, [boxCount]);

  const handleAddBox = () => {
    if (images.filter((image) => image !== null).length < 4) {
      UploadImageFirst();
      return;
    }

    setBoxCount((prevBoxCount) => prevBoxCount + 1);
    setImages((prevImages) => [...prevImages, null]);
  };
  useEffect(() => {
    localStorage.setItem("boxCount", boxCount);
  }, [boxCount]);

  // remove boxes
  const handleRemoveBox = (index) => {
    if (boxCount > 4) {
      setBoxCount((prevBoxCount) => prevBoxCount - 1);
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
      setSelectedBox(null);
      localStorage.setItem("images", JSON.stringify(newImages));
    }
  };
  // const handleRemoveBox = (index) => {
  //   setBoxCount((prevBoxCount) => prevBoxCount - 1);
  //   const newImages = [...images];
  //   newImages.splice(index, 1);
  //   setImages(newImages);
  //   setSelectedBox(null);
  //   localStorage.setItem("images", JSON.stringify(newImages));
  //   if (newImages.filter((image) => image !== null).length < 4) {
  //     setIsImageUploaded(false);
  //   }
  // };

  const handleReplacePhoto = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept =
      "image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    fileInput.addEventListener("change", (e) => {
      handleImageChange(index, e);
    });
    fileInput.click();
  };

  const handleImageCancel = () => {
    const newImages = [...images];
    const selectedImage = newImages[selectedBox];
    if (selectedImage && typeof selectedImage !== "string") {
      newImages[selectedBox] = null;
    } else {
      newImages[selectedBox] = null;
    }
    setImages(newImages);
    setSelectedBox(null);
    localStorage.setItem("images", JSON.stringify(newImages));
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
    toast("Please upload four images in the box.", { type: "error" });
  return (
    <div
      style={{
        margin: "auto",
        width: "80%",
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          {[...Array(boxCount)].map((_, index) => (
            <div
              key={index}
              style={{
                margin: "10px",
                // flexBasis: "calc(20% - 20px)"
                flexBasis: "calc(5% - 10px)",
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
                {/* ========================  */}
                {images[index] && (
                  <>
                    <img
                      src={images[index]}
                      alt="uploaded"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </>
                )}
                {/* ====================== */}
                {!images[index] && (
                  <div style={{ position: "absolute", top: "1%", left: "30%" }}>
                    <label htmlFor={`image${index}`}>
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
                        style={{ display: "none" }}
                        type="file"
                        id={`image${index}`}
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, e)}
                      />
                    </label>
                  </div>
                )}
                {/* ======================== */}
              </div>
            </div>
          ))}
          {/* ==================== */}

          {boxCount < 10 && (
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
        <div className="col-sm-2 col-lg-2">
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
        <div className="col-sm-2 col-lg-2">
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
