/** @format */

import { Buffer } from "buffer";

if (!window.Buffer) {
  window.Buffer = Buffer;
}

// Your existing imports and code
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
