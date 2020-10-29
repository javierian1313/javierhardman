import React from "react";
import "./bristol_bay.css";

export default class BristolBay extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div id="bristol_bay_container" className="row">
                <div className="col-12">Bristol Bay In Progress...</div>
            </div>
        );
    }
}
