import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import first from "../../images/exterior.png";
import column from "../../images/column.png";
import beam from "../../images/beam.png";
import slab from "../../images/slab.png";

const useStyles = makeStyles((theme) => ({
  confirmationPop: {
    position: "fixed",
    // top: 300,
    // left: 200,
    // width: "220px",
    // height: "280px",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  confirmationPopContent: {
    width: "220px",
    height: "280px",
    backgroundColor: "white",
    borderRadius: "3%",
    border: "1px solid gray",

    outline: "none",
    // padding: "1rem",
    // paddingRight: "1rem",
    // paddingTop: "0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const BuildingExterior = () => {
  const classes = useStyles();
  const [selectedArea, setSelectedArea] = useState(null);
  const [openConfirmationPop, setOpenConfirmationPop] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    const clickedArea = event.target.alt;
    if (clickedArea === "Column") {
      setSelectedArea({
        url: column, // Replace with the actual image URL
        alt: "Click on Column to repair",
      });
      setOpenConfirmationPop(true);
    } else if (clickedArea === "beam") {
      setSelectedArea({
        url: beam, // Replace with the actual image URL
        alt: "Click on Beam to repair",
      });
      setOpenConfirmationPop(true);
    } else if (clickedArea === "slab") {
      setSelectedArea({
        url: slab, // Replace with the actual image URL
        alt: "Click on slab to repair",
      });
      setOpenConfirmationPop(true);
    }
  };

  const handleConfirm = () => {
    // Perform the desired action on confirmation
    console.log("Confirmed!");

    // Close the confirmation pop-up
    setOpenConfirmationPop(false);
  };

  const handleCancel = () => {
    // Close the confirmation pop-up
    setOpenConfirmationPop(false);
  };

  const handleClickImage = () => {
    // Determine the route based on the selectedArea.url
    let route;
    if (selectedArea.url === column) {
      route = "/parking-garage/column"; // Replace with the desired route for the column
    } else if (selectedArea.url === beam) {
      route = "/parking-garage/beam"; // Replace with the desired route for the beam
    } else if (selectedArea.url === slab) {
      route = "/parking-garage/slab"; // Replace with the desired route for the slab
    }

    if (route) {
      navigate(route);
    }
  };
  return (
    <div style={{ backgroundColor: "#f2eeed" }}>
      <div
        style={{
          maxWidth: "100%",
          height: "auto",
          backgroundColor: "#f2eeed",
          overflowX: "auto",
        }}
        // className="d-flex justify-content-center align-items-center"
      >
        <img
          style={{ backgroundColor: "#f2eeed" }}
          // style={{ width: "100%" }}
          className="img"
          src={first}
          // width={1917}
          // height={863}
          // width={1350}
          // height={800}
          useMap="#my-map"
        />
        <map name="my-map">
          <area
            target="_self"
            alt="Column"
            title="Column"
            // coords="431,223,455,223,455,795,433,794"
            // coords="312,253,330,254,329,664,313,670"
            coords="424,261,441,260,441,659,424,666"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="Column"
            title="Column"
            // coords="431,223,455,223,455,795,433,794"
            // coords="312,253,330,254,329,664,313,670"
            coords="295,593,307,607,308,643,295,648"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="Column"
            title="Column"
            // coords="431,223,455,223,455,795,433,794"
            // coords="312,253,330,254,329,664,313,670"
            coords="267,542,279,562,281,590,268,590"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="Column"
            title="Column"
            // coords="431,223,455,223,455,795,433,794"
            // coords="312,253,330,254,329,664,313,670"
            coords="250,508,263,524,261,552,250,551"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="Column"
            title="Column"
            // coords="431,223,455,223,455,795,433,794"
            // coords="312,253,330,254,329,664,313,670"
            coords="250,508,263,524,261,552,250,551"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />

          <area
            target="_self"
            alt="Column"
            title="Column"
            // coords="431,223,455,223,455,795,433,794"
            // coords="312,253,330,254,329,664,313,670"
            coords="233,476,245,495,245,517,233,517"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="beam"
            title="beam"
            // coords="284,294,58,301,58,327,287,316,287,372,272,374,268,300"
            coords="324,297,425,292,425,308,325,314"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="beam"
            title="beam"
            // coords="60,403,280,372,279,360,53,371,58,327,72,327,75,393"
            coords="442,293,578,287,579,303,444,308"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="slab"
            title="Elevated slab"
            // coords="590,701,456,712,458,795,594,777"
            coords="596,322,725,316,725,345,596,351"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="slab"
            title="Elevated slab"
            // coords="617,692,812,662,812,743,619,773"
            coords="737,320,810,316,808,339,738,344"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />

          <area
            target="_self"
            alt="slab"
            title="Elevated slab"
            // coords="617,692,812,662,812,743,619,773"
            coords="826,314,982,306,980,331,827,340"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="slab"
            title="Elevated slab"
            // coords="617,692,812,662,812,743,619,773"
            coords="997,305,1033,327,997,328"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="slab"
            title="Elevated slab"
            // coords="617,692,812,662,812,743,619,773"
            coords="559,328,578,329,578,351,567,355"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="slab"
            title="Slab on Grade"
            // coords="617,692,812,662,812,743,619,773"
            coords="826,558,922,551,973,581,826,599"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />

          <area
            target="_self"
            alt="slab"
            title="Slab on Grade"
            // coords="617,692,812,662,812,743,619,773"
            coords="780,559,808,557,805,596"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="slab"
            title="Slab on Grade"
            // coords="617,692,812,662,812,743,619,773"
            coords="737,575,738,617,780,609"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />

          <area
            target="_self"
            alt="slab"
            title="Slab on Grade"
            // coords="617,692,812,662,812,743,619,773"
            coords="596,594,723,577,721,619,595,637"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          {/* add more area elements here */}
        </map>
        {openConfirmationPop && (
          <div className={classes.confirmationPop}>
            <div className={classes.confirmationPopContent}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "-1rem",
                }}
              >
                <div style={{ float: "left" }}>
                  <CloseIcon
                    style={{ color: "#0052CC", fontSize: "1.2rem" }}
                    onClick={handleCancel}
                  />
                </div>
                {/* <div style={{ float: "right" }}>
                  <ZoomInIcon
                    style={{ color: "#0052CC", marginRight: "0.5rem" }}
                  />
                </div> */}
              </div>
              {selectedArea && (
                <img
                  src={selectedArea.url}
                  alt={selectedArea.alt}
                  width="120px"
                  height="180px"
                  className="mb-3"
                  onClick={handleClickImage}
                />
              )}

              <span>{selectedArea.alt}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingExterior;
