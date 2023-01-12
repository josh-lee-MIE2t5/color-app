import { useParams, Link } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import { useState } from "react";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";

function SingleColorPalette(props) {
  const { paletteId, colorId } = useParams();
  const [format, setFormat] = useState("hex");

  const handleChange = (format) => {
    setFormat(format);
  };

  const findPalette = (id) => {
    return props.palettes.find(function (palette) {
      return palette.id === id;
    });
  };
  const palette = generatePalette(findPalette(paletteId));
  const { paletteName, emoji } = palette;
  const gatherShades = (palette, colorId) => {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorId)
      );
    }
    return shades.slice(1);
  };
  const [shades, setShades] = useState(gatherShades(palette, colorId));
  const colorBoxes = shades.map((color) => (
    <ColorBox
      background={color[format]}
      name={color.name}
      paletteId={paletteId}
      colorId={color.id}
      key={color.name}
    />
  ));
  return (
    <div className="SingleColorPalette Palette">
      <Navbar showSlider={false} handleChange={handleChange} />
      <div className="Palette-colors">
        {colorBoxes}
        <div className="go-back ColorBox">
          <Link to={`/palette/${paletteId}`} className="back-button">
            Go Back
          </Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default SingleColorPalette;
