import React from "react";
import Home from "./routes/home";
import NewSpot from "./routes/new-spot";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Context from "./lib/context";
import useLocalState from "./lib/useLocalState";

export default function App() {
    // Variable d'état stocker sur le browser
  const [spots, setSpots] = useLocalState([], "spots");

  const context = {
    spots: spots,
    setSpots: setSpots,
    
  };

  return (
    <Context.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="new-spot" element={<NewSpot />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}
