import React from "react";
import ReactDOM from "react-dom";
import SlippiVisualizer from "../../src/SlippiVisualizer";
import replay from "./replays/zain-sfat-bf.json";
import "./index.css";

ReactDOM.render(
  <SlippiVisualizer replay={replay} />,
  document.getElementById("root")
);
