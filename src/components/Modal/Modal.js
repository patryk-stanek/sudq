import React from "react";
import Zoom from 'react-reveal/Zoom';

import "./Modal.scss";

//ModalBox component
export class ModalBox extends React.Component {
    constructor(props) {
        super(props);

        this.handleMethod = this.handleMethod.bind(this)
    }
    
    handleMethod() {
        this.props.method();
        this.props.handleClosingModal();
    }

    render() {
        return (
            <div className="modal">
                <Zoom duration={100}>
                    <div className="modal__box">
                        <span>{this.props.description}</span>
                        <button onClick={() => this.handleMethod()}>Yes</button>
                        <button onClick={() => this.props.handleClosingModal()}>No</button>
                    </div>
                </Zoom>
            </div>
        )
    }
};