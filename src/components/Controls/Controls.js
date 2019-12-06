import React from "react";

export class Controls extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => this.props.numberOption(1)}>1</button>
                <button onClick={() => this.props.numberOption(2)}>2</button>
                <button onClick={() => this.props.numberOption(3)}>3</button>
                <button onClick={() => this.props.numberOption(4)}>4</button>
                <button onClick={() => this.props.numberOption(5)}>5</button>
                <button onClick={() => this.props.numberOption(6)}>6</button>
                <button onClick={() => this.props.numberOption(7)}>7</button>
                <button onClick={() => this.props.numberOption(8)}>8</button>
                <button onClick={() => this.props.numberOption(9)}>9</button>
                <button onClick={() => this.props.numberOption(".")}>X</button>
            </div>
        )
    }
}