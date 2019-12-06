import React from "react";

import "./Tile.scss";

export class Tile extends React.Component {
    render() {
        const tileValue = this.props.value;
        const arrayInitValue = this.props.init.split("");
        const initValue = arrayInitValue[this.props.id];
        let classValue = "";
        if (initValue === ".") {
            if (this.props.selectedTile === this.props.id) {
                classValue = "tile__selected"
            } else {
                classValue = "tile__enabled"
            }
        } else {
            classValue = "tile__disabled"
        }
        
        return (
            <div className="tile">
                <input 
                    type="text"
                    min="1"
                    max="9"
                    id={this.props.id}
                    value={tileValue === '.' ? '' : tileValue}
                    onChange={this.props.action}
                    className={classValue}
                    autoComplete="off"
                    onFocus={() => this.props.select(this.props.id)}
                    readOnly
                />
            </div>
        )
    }
}