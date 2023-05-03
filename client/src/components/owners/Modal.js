import React from "react";
// import "./Modal.css";
const Modal = ({ selectedArea, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <img src={selectedArea.url} alt={selectedArea.alt} />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
