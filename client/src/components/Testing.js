import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export const Testing = () => {
  const [files, setFiles] = useState(Array(4).fill(null));

  useEffect(() => {
    // get files from local storage and set state
    const storedFiles = JSON.parse(localStorage.getItem("files"));
    if (storedFiles) {
      setFiles(storedFiles);
    }
  }, []);

  const handleFileUpload = async (e, boxIndex) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_cloudinary_upload_preset");
      const engineerId = localStorage.getItem("engineerId");

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/engineer/addfile/${engineerId}`,
        formData
      );

      console.log("Upload response", response);

      const fileUrl = response.data.data.updatedUser.profileImage;
      localStorage.setItem(`file${boxIndex}`, fileUrl);
      const newFiles = [...files];
      newFiles[boxIndex] = fileUrl;
      localStorage.setItem("files", JSON.stringify(newFiles));
      setFiles(newFiles);
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  const handleRefresh = () => {
    const storedFiles = JSON.parse(localStorage.getItem("files"));
    if (storedFiles) {
      setFiles(storedFiles);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <div
            className="mt-5 ms-5"
            key={index}
            style={{
              width: "100px",
              height: "100px",
              border: "2px solid blue",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {files[index] ? (
              <a href={files[index]} target="_blank" rel="noopener noreferrer">
                View file
              </a>
            ) : (
              <label
                htmlFor={`file-input-${index}`}
                style={{ cursor: "pointer" }}
              >
                +
              </label>
            )}
            <input
              id={`file-input-${index}`}
              type="file"
              style={{ display: "none" }}
              onChange={(e) => handleFileUpload(e, index)}
            />
          </div>
        ))}
      <Button onClick={handleRefresh}>Refresh</Button>
    </div>
  );
};
