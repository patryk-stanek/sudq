import React from "react";

import "./Tile.scss";

export class Tile extends React.Component {
    render() {
        const tileValue = this.props.value;
        const arrayInitValue = this.props.init.split("");
        const initValue = arrayInitValue[this.props.id];
        
        return (
            <div className="tile">
                <input 
                    type="number"
                    min="1"
                    max="9"
                    id={this.props.id}
                    value={tileValue === '.' ? '' : tileValue}
                    onChange={this.props.action}
                    className={initValue === "." ? "tile__enabled" : "tile__disabled"}
                    autoComplete="off"
                    onFocus={() => this.props.select(this.props.id)}
                    readOnly
                />
            </div>
        )
    }
}