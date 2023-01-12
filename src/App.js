import { Route, Routes } from "react-router-dom";
import "./App.css";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<PaletteList palettes={seedColors} />} />
      <Route exact path="/palette/new" element={<NewPaletteForm />} />
      <Route
        exact
        path="/palette/:id"
        element={<Palette palettes={seedColors} />}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        element={<SingleColorPalette palettes={seedColors} />}
      />
    </Routes>
  );
}

export default App;
