import React from "react";
import "./Modal.css";

const Backdrop = (props) => {
    return <div className="backdrop" onClick={props.onClose} />
}

export default Backdrop;