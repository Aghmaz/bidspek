import React, { useContext, useState, useEffect } from "react";
import { Avatar, Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { multiStepContext } from "../StepContext";
import axios from "axios";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import "./ImageUploader.css";

function ImageUploader({ user }) {
  const [image, setImage] = useState(localStorage.getItem("uploadedImage"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = localStorage.getItem("uploadedImage");

    if (url) {
      setImage(url);
    } else {
      setImage(user && user.picture ? user.picture : "N");
      localStorage.setItem(
        "uploadedImage",
        user && user.picture ? user.picture : "N"
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
    } catch (error) {
      console.error("Upload error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    handleImageUpload(file);
  };

  const handleDelete = () => {
    setImage(user && user.picture ? user.picture : "N");
    localStorage.removeItem("uploadedImage");
  };
  return (
    <div className="d-flex align-items-center">
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        onChange={handleChange}
      />

      <div>
        {image && (
          <StyledEngineProvider injectFirst>
            <Avatar
              className="avatar"
              style={{
                border: "2px solid blue",
                width: "100px",
                height: "100px",
                marginLeft: "2rem",
                marginRight: "3rem",
              }}
              src={image}
              alt="Uploaded Image"
            />
          </StyledEngineProvider>
        )}
      </div>

      <div>
        <label htmlFor="raised-button-file">
          <Button
            style={{ marginTop: "-3rem" }}
            variant="contained"
            color="primary"
            component="span"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Change Photo"}
          </Button>
        </label>

        {image && (
          <Button
            style={{
              marginTop: "3.5rem",
              marginLeft: "-9.4rem",
              paddingRight: "2.3rem",
            }}
            variant="outlined"
            color="primary"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
            disabled={loading}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
