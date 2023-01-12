import React from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  copiedText: {
    color: (props) => (props.someProp ? "black" : "red"),
  },
});

function ColorBox(props) {
  const classes = useStyle(props);
  const [copied, setCopied] = useState(false);
  const { name, background, paletteId, colorId, showLink } = props;
  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.7;

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className="ColorBox" style={{ backgroundColor: background }}>
        <div
          className={`copy-overlay ${copied && "show"}`}
          style={{ backgroundColor: background }}
        />
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>Copied!</h1>
          <p className={isLightColor && "dark-text"}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={isDarkColor && "light-text"}>{name}</span>
          </div>
          <button className={`copy-button ${isLightColor && "dark-text"}`}>
            Copy
          </button>
        </div>
        {showLink && (
          <Link
            to={`/palette/${paletteId}/${colorId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`see-more ${isLightColor && "dark-text"}`}>
              MORE
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default ColorBox;
