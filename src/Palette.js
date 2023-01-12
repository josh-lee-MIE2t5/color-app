import { useState } from "react";
import { useParams } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

function Palette(props) {
  const findPalette = (id) => {
    return props.palettes.find(function (palette) {
      return palette.id === id;
    });
  };

  const { id } = useParams();
  const palette = generatePalette(findPalette(id));
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox
      background={color[format]}
      name={color.name}
      paletteId={id}
      colorId={color.id}
      key={color.id}
      showLink
      someProp={false}
    />
  ));
  const { paletteName, emoji } = palette;

  const changeLevel = (level) => {
    setLevel(level);
  };

  const handleChange = (format) => {
    setFormat(format);
  };

  return (
    <div className="Palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        handleChange={handleChange}
        showSlider
      />
      <div className="Palette-colors">{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default Palette;
