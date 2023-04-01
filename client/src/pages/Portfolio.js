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
      // var file = e.target.files[0];
      // var reader = new FileReader();
      // reader.readAsDataURL(file);

      newImages[index] = URL.createObjectURL(e.target.files[0]);
      // newImages[index] = reader;
      // newImages[index] = e.target.files[0];

      setImages(newImages);
      setSelectedBox(null);

      setIsImageUploaded(true);

      // console.log("images", JSON.stringify(newImages));
      localStorage.setItem("images", JSON.stringify(newImages));
    }
  };

  const handleAddBox = () => {
    setBoxCount((prevBoxCount) => prevBoxCount + 1);
    setImages((prevImages) => [...prevImages, null]);
  };
  useEffect(() => {
    localStorage.setItem("boxCount", boxCount);
  }, [boxCount]);

  // remove boxes
  const handleRemoveBox = (index) => {
    setBoxCount((prevBoxCount) => prevBoxCount - 1);
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    setSelectedBox(null);
    localStorage.setItem("images", JSON.stringify(newImages));
  };

  const handleImageCancel = () => {
    const newImages = [...images];
    newImages[selectedBox] = null;
    setImages(newImages);
    setSelectedBox(null);
    localStorage.setItem("images", JSON.stringify(newImages));
  };
  const handleReplacePhoto = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", (e) => {
      handleImageChange(index, e);
    });
    fileInput.click();
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

  const notify = () => toast("Please upload an image first.");

  return (
    <div
      style={{ margin: "auto", width: "60%", marginBottom: "5rem" }}
      className="mb-3 mt-5"
    >
      <h3> Project Case Study</h3>
      <span>
        {" "}
        Share images of your previous work helps your potential clients see the
        quality of your work
      </span>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex" }}>
          {[...Array(boxCount)].map((_, index) => (
            <div key={index} style={{ margin: "10px" }}>
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
                      <span style={{ fontSize: "50px", color: "blue" }}>+</span>
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
            <div style={{ margin: "10px" }}>
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
        <div className="col-sm-6 col-lg-4">
          <Button
            style={{
              paddingLeft: "3.4rem",
              paddingRight: "3.4rem",
              textTransform: "capitalize",
            }}
            variant="outlined"
            onClick={handleImageCancel}
          >
            delete
          </Button>
        </div>
        <div className="col-sm-6 col-lg-2">
          <Button
            style={{ textTransform: "capitalize" }}
            variant="contained"
            onClick={() => handleRemoveBox(selectedBox)}
          >
            Remove Box
          </Button>
        </div>
        <div className="col-sm-6 col-lg-4">
          <Button
            style={{ textTransform: "capitalize" }}
            variant="contained"
            onClick={() => handleReplacePhoto(selectedBox)}
          >
            Change photo
          </Button>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <Button
        style={{
          paddingLeft: "4rem",
          paddingRight: "4rem",
          marginBottom: "1rem",
          border: "2px solid rgb(25, 118, 210)",
          color: "rgb(25, 118, 210)",
        }}
        className=" mb-3 mt-3"
        variant="outline-primary"
        type="submit"
        onClick={() => setStep(3)}
      >
        back
      </Button>
      <Button
        style={{
          float: "right",
          paddingLeft: "4rem",
          paddingRight: "4rem",
          marginBottom: "1rem",
          backgroundColor: "rgb(25, 118, 210)",
          color: "white",
        }}
        className=" mb-3 mt-3"
        type="submit"
        onClick={handleSend}
      >
        next
      </Button>
      <ToastContainer />
    </div>
  );
};

export default Portfolio;
