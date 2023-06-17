import React from "react";

function NotFound() {
  var styleComponent = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
    fontSize: "20px",
  };

  return (
    <div style={styleComponent} className="not-found-ctn">
      404: PAGE DOES NOT EXIST.
    </div>
  );
}

export default NotFound;
