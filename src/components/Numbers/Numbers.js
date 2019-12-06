import React from "react";

import "./Numbers.scss"

export class Numbers extends React.Component {
    render() {
        return (
            <div className="numbers">
                <div className="numbers__box">
                    <button 
                        onClick={() => this.props.chosenNumber(1)}
                    >
                        1
                    </button>
                    <button 
                        onClick={() => this.props.chosenNumber(2)}
                    >
                        2
                    </button>
                    <button 
                        onClick={() => this.props.chosenNumber(3)}
                    >
                        3
                    </button>
                    <button 
                        onClick={() => this.props.chosenNumber(4)}
                    >
                        4
                    </button>
                    <button 
                        onClick={() => this.props.chosenNumber(5)}
                    >
                        5
                    </button>
                </div>
                <div className="numbers__box">
                    <button 
                        onClick={() => this.props.chosenNumber(6)}
                    >
                        6
                    </button>
                    <button 
                        onClick={() => this.props.chosenNumber(7)}
                    >
                        7
                    </button>
                    <button 
                        onClick={() => this.props.chosenNumber(8)}
                    >
                        8
                    </button>
                    <button 
                        onClick={() => this.props.chosenNumber(9)}
                    >
                        9
                    </button>
                    <button 
                        onClick={() => this.props.chosenNumber(".")}
                    >
                        <span className="numbers__clean">✕</span>
                    </button>
                </div>
            </div>
        )
    }
}