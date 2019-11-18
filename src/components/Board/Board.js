import React from "react";
import {Tile} from "../Tile/Tile";
import "./Board.scss";

export class Board extends React.Component {
    numberHandler(event) {
        const tileValue = event.target.value;
        const tileId = event.target.id;
        const maxValue = 9;
        const maxLength = 1;
        const newVal = tileValue <= maxValue ? tileValue : parseInt(tileValue.toString().substring(0, maxLength));

        this.props.updateBoard(tileId, newVal);
    }

    render() {
        let numberTiles = [];

        if (this.props.data) {
            numberTiles = this.props.data.map((number, index) => {
                return <Tile value={number} action={this.numberHandler.bind(this)} id={index} key={index} />
            })
        }

        return (
            <div className="board">
                {numberTiles}
            </div>
        )
    }
}