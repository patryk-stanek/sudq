import React from "react";
import Fade from 'react-reveal/Fade';
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

import "./Controls.scss";

export class Controls extends React.Component {
    render() {
        return (
            <Fade delay={300}>
                <div className="controls">
                    <button 
                        className="controls__button"
                        onClick={() => this.props.reset()}
                    >
                        <i className="fas fa-redo controls__icon"></i>
                    </button>
                    <button 
                        className="controls__button"
                        onClick={() => this.props.check()}
                    >
                        <i className="fas fa-check controls__icon"></i>
                    </button>
                    <button 
                        className="controls__button"
                        onClick={() => this.props.solve()}
                    >
                        <i className="fas fa-search controls__icon"></i>
                    </button>
                    <button 
                        className="controls__button"
                        onClick={() => this.props.quit()}
                    >
                        <i className="fas fa-times controls__icon"></i>
                    </button>
                </div>
            </Fade>
        )
    }
}