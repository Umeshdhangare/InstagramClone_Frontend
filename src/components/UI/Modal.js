import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import "./Modal.css"

const ModalOverlay = (props) => {
    return(
        <div className="modal">
            <div>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
    return(
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClose={props.onClose} />,
                portalElement
            )}
            {
                ReactDOM.createPortal(
                    <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
                    portalElement
                )
            }
        </Fragment>
    )
}

export default Modal;