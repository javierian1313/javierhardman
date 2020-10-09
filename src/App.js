import React from "react";
import "./App.css";
import routes from "./routes";
import { withRouter } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return <div className="App">{routes}</div>;
    }
}

export default withRouter(App);
