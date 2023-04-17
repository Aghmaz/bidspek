import React, { useState } from "react";

const Uploader = () => {
  const [files, setFiles] = useState(Array(4).fill(null));
  const [showFiles, setShowFiles] = useState(Array(4).fill(false));
  const [fileContents, setFileContents] = useState(Array(4).fill(null));

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
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div
      className="mt-5 ms-5"
      style={{ display: "flex", justifyContent: "space-between", gap: 5 }}
    >
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          style={{
            border: "2px solid blue",
            width: "100px",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!showFiles[index] && (
            <label htmlFor={`fileInput-${index}`}>
              <span style={{ fontSize: "30px" }}>+</span>
              <input
                id={`fileInput-${index}`}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, index)}
              />
            </label>
          )}

          {showFiles[index] && (
            <>
              {files[index].type.includes("image") && (
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={URL.createObjectURL(files[index])}
                  alt="uploaded file"
                />
              )}
              {files[index].type.includes("pdf") && (
                <object
                  data={URL.createObjectURL(files[index])}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                >
                  <p>PDF cannot be displayed. Please download the file.</p>
                </object>
              )}
              {files[index].type.includes("powerpoint") && (
                <iframe
                  src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                    URL.createObjectURL(files[index])
                  )}`}
                  width="100%"
                  height="100%"
                  frameborder="0"
                >
                  <p>PPT cannot be displayed. Please download the file.</p>
                </iframe>
              )}
              {files[index].type.includes("text") && (
                <pre
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  {fileContents[index]}
                </pre>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Uploader;
