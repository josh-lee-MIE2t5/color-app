import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function Navbar(props) {
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);
  const { level, changeLevel, showSlider } = props;

  const handleFormatChange = (evt) => {
    setFormat(evt.target.value);
    props.handleChange(evt.target.value);
    setOpen(true);
  };

  const closeSnackBar = () => {
    setOpen(false);
  };

  return (
    <nav className="Navbar">
      <div className="logo">
        <Link to="/">reactcolorpicker</Link>
      </div>
      <div className="slider-container">
        {showSlider && (
          <div className="slider">
            <span>Level: {level}</span>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
              railStyle={{ height: "8px" }}
              handleStyle={{
                backgroundColor: "green",
                outline: "none",
                border: "2px solid green",
                boxShadow: "none",
                width: "13px",
                height: "13px",
                marginLeft: "-7px",
                marginTop: "-3px",
              }}
              trackStyle={{ backgroundColor: "transparent" }}
            />
          </div>
        )}
      </div>
      <div className="select-container">
        <Select value={format} onChange={handleFormatChange}>
          <MenuItem value="hex">Hex - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        message={
          <span id="message-id">Format Changed to {format.toUpperCase()}</span>
        }
        ContentProps={{ "aria-describedby": "message-id" }}
        onClose={closeSnackBar}
        action={[
          <IconButton
            onClick={closeSnackBar}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </nav>
  );
}

export default Navbar;
