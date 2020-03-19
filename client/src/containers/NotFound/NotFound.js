import React from "react";
import { Img } from "./NotFound.styled";

function NotFound() {
  return (
    <div className="not-found">
      <Img src={require("../../assets/images/404.png")} />
    </div>
  );
}

export default NotFound;
