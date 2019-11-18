import React from "react";

import "./Tile.scss";

export class Tile extends React.Component {
    render() {
        const tileValue = this.props.value;
        return (
            <div className="tile">
                <input 
                    type="number"
                    min="1"
                    max="9"
                    id={this.props.id}
                    value={tileValue === '.' ? '' : tileValue}
                    onChange={this.props.action}
                    className={tileValue === "." ? "tile__enabled" : "tile__disabled"}
                    autoComplete="off"
                />
            </div>
        )
    }
}