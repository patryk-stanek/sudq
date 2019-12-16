import React from "react";
import {ModalBox} from "../Modal/Modal"
import Fade from 'react-reveal/Fade';
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./Controls.scss";

export class Controls extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            description: '',
            option: 0
        }

        this.handleConfirmation = this.handleConfirmation.bind(this)
    }

    componentDidMount() {
        this.setState({
            modal: false,
            description: ''
        })
    }

    handleConfirmation(decision) {
        let message;

        if (decision === 1) {
            message = "Do You want to start again?"
        } else if (decision === 2) {
            message = "Do You want to check Your results?"
        } else if (decision === 3) {
            message = "Do You want to solve the game?"
        } else {
            message = "Do You want to quit game?"
        };

        this.setState({
            modal: true,
            description: message,
            option: decision
        })
    }

    handleClosingModal() {
        this.setState({
            modal: false,
            description: ''
        })
    };

    render() {
        let methodMan;
        if (this.state.option === 1) {
            methodMan = this.props.reset
        } else if (this.state.option === 2) {
            methodMan = this.props.check
        } else if (this.state.option === 3) {
            methodMan = this.props.solve
        } else if (this.state.option === 4) {
            methodMan = this.props.quit
        } else {
            methodMan = '';
        }

        const modalBoxConfirmation = this.state.modal === true ? <ModalBox  description={this.state.description} handleClosingModal={this.handleClosingModal.bind(this)} method={methodMan}/> : "";

        return (
            <Fade delay={300}>
                { modalBoxConfirmation }
                <div className="controls">
                    <button 
                        className="controls__button"
                        onClick={() => this.handleConfirmation(1)}
                    >
                        <i className="fas fa-redo controls__icon"></i>
                    </button>
                    <button 
                        className="controls__button"
                        onClick={() => this.handleConfirmation(2)}
                    >
                        <i className="fas fa-check controls__icon"></i>
                    </button>
                    <button 
                        className="controls__button"
                        onClick={() => this.handleConfirmation(3)}
                    >
                        <i className="fas fa-search controls__icon"></i>
                    </button>
                    <button 
                        className="controls__button"
                        onClick={() => this.handleConfirmation(4)}
                    >
                        <i className="fas fa-times controls__icon"></i>
                    </button>
                </div>
            </Fade>
        )
    }
}