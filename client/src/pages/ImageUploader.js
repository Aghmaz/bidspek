import React, { useContext, useState, useEffect } from "react";
import { Avatar, Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { multiStepContext } from "../StepContext";
import axios from "axios";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import "./ImageUploader.css";
import { avatarImage } from "../images/avatarImage.png";
import { ToastContainer, toast } from "react-toastify";

function ImageUploader({ user }) {
  const [image, setImage] = useState(localStorage.getItem("uploadedImmage"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = localStorage.getItem("uploadedImage");

    if (url) {
      setImage(url);
    } else {
      setImage(
        user && user.picture
          ? user.picture
          : "https://res.cloudinary.com/df8fsfjad/image/upload/v1680808803/stock_profile710_kqbbgk.png"
        // "https://picsum.photos/200"
      );
      localStorage.setItem(
        "uploadedImage",
        user && user.picture
          ? user.picture
          : "https://res.cloudinary.com/df8fsfjad/image/upload/v1680808803/stock_profile710_kqbbgk.png"
        //  "https://picsum.photos/200"
      );
    }
  }, [user && user.picture]);

  const handleImageUpload = async (file) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("upload_preset", "your_cloudinary_upload_preset");
      const engineerId = localStorage.getItem("engineerId");

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/engineer/profileupload/${engineerId}`,
        formData
      );
      console.log("Upload response", response);

      localStorage.setItem(
        "uploadedImage",
        response.data.data.updatedUser.profileImage
      );
      setImage(response.data.data.updatedUser.profileImage);
      notify();
    } catch (error) {
      console.error("Upload error", error);
    } finally {
      setLoading(false);
    }
  };

  const notify = () => toast("SuccessFull !.Your Photo has been Uploaded");
  const errorNotify = () => toast("SuccessFull !.Your Photo has been Deleted");

  const handleChange = async (event) => {
    const file = event.target.files[0];
    handleImageUpload(file);
  };

  // const handleDelete = async () => {
  //   try {
  //     const engineerId = localStorage.getItem("engineerId");

  //     const response = await axios.delete(
  //       `${process.env.REACT_APP_API_URL}/deleteimage/${engineerId}`
  //     );

  //     // Check the response status to see if the delete was successful.
  //     if (response.status === 200) {
  //       // Handle success.
  //       console.log("Image deleted successfully.");
  //     } else {
  //       // Handle error.
  //       console.error("Error deleting image.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   setImage(
  //     user && user.picture
  //       ? user.picture
  //       : "https://res.cloudinary.com/df8fsfjad/image/upload/v1680808803/stock_profile710_kqbbgk.png"
  //     // "https://picsum.photos/200"
  //   );
  //   localStorage.removeItem("uploadedImage");
  // };

  const handleDelete = async () => {
    try {
      const engineerId = localStorage.getItem("engineerId");

      if (!engineerId) {
        console.error(
          "Error deleting image: engineerId not found in localStorage."
        );
        return;
      }

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/engineer/deleteimage/${engineerId}`
      );

      // Check the response status to see if the delete was successful.
      if (response.status === 200) {
        // Handle success.
        console.log("Image deleted successfully.");
        errorNotify();
        setImage(
          user && user.picture
            ? user.picture
            : "https://res.cloudinary.com/df8fsfjad/image/upload/v1680808803/stock_profile710_kqbbgk.png"
          // "https://picsum.photos/200"
        );
        localStorage.removeItem("uploadedImage");
      } else {
        // Handle error.
        console.error("Error deleting image.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex align-items-center" style={{ flexWrap: "wrap" }}>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        onChange={handleChange}
      />

      <div style={{ marginRight: "1rem" }}>
        {image && (
          <StyledEngineProvider injectFirst>
            <Avatar
              className="avatar"
              // style={{
              //   border: "2px solid blue",
              //   width: "100px",
              //   height: "100px",
              //   marginLeft: "2rem",
              //   marginRight: "3rem",
              // }}
              src={image}
              alt="Uploaded Image"
              style={{
                border: "2px solid blue",
                width: "100px",
                height: "100px",
              }}
            />
          </StyledEngineProvider>
        )}
      </div>

      <div style={{ flex: 1, minWidth: "180px", marginTop: "1rem" }}>
        <label htmlFor="raised-button-file">
          <Button
            // style={{ marginTop: "-3rem" }}
            variant="contained"
            color="primary"
            component="span"
            disabled={loading}
            style={{ width: "80%" }}
          >
            {loading ? "Uploading..." : "Change Photo"}
          </Button>
          <ToastContainer />

          {image && (
            <Button
              // style={{
              //   marginTop: "3.5rem",
              //   marginLeft: "-9.4rem",
              //   paddingRight: "2.3rem",
              // }}
              variant="outlined"
              color="primary"
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
              disabled={loading}
              style={{ width: "80%", marginTop: "0.5rem" }}
            >
              Delete
            </Button>
          )}
        </label>
      </div>
    </div>
  );
}

export default ImageUploader;
