import React from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import "./dashboard.css";

export default class Dashboard extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            page: "Wholesale",
            session_id: "",
        };
    }

    componentDidMount() {
        this.check_session();

        this.interval = setInterval(() => this.check_session(), 1000 * 60);
    }

    handleChange = (key) => {
        this.setState({ page: key });
    };

    async check_session() {
        const session_id = localStorage.getItem("session_id");

        await axios
            .post("/api/dashboard/checkSession/", { session_id })
            .then((response) => {
                if (response.data[0]) {
                    this.setState({ session_id: response.data[0].session_id });
                } else {
                    localStorage.removeItem("session_id");
                    this.props.history.push("/");
                }
            })
            .catch((error) => {
                console.log(error);

                localStorage.removeItem("session_id");
                this.props.history.push("/");
            });
    }

    render() {
        return (
            <div id="dashboard_container">
                {this.state.session_id ? (
                    <div>
                        <Nav action={this.handleChange} />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        );
    }
}
