import React from "react";
import "./nav.css";
import Logo from "../../Assets/Nav/Logo.png";
import axios from "axios";
import IdleTimer from "react-idle-timer";

export default class Nav extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { wholesale_link: "Active", purple_technado_link: "Inactive", bristol_bay_link: "Inactive" };

        this.idleTimer = null;
        this.handleOnAction = this.handleOnAction.bind(this);
        this.handleOnActive = this.handleOnActive.bind(this);
        this.handleOnIdle = this.handleOnIdle.bind(this);
    }

    send_wholesale = () => {
        this.props.action("Wholesale");
        this.setState({ wholesale_link: "Active", purple_technado_link: "Inactive", bristol_bay_link: "Inactive" });
    };

    send_purple_technado = () => {
        this.props.action("PurpleTechnado");
        this.setState({ wholesale_link: "Inactive", purple_technado_link: "Active", bristol_bay_link: "Inactive" });
    };

    send_bristol_bay = () => {
        this.props.action("BristolBay");
        this.setState({ wholesale_link: "Inactive", purple_technado_link: "Inactive", bristol_bay_link: "Active" });
    };

    handleOnAction(event) {}

    handleOnActive(event) {}

    handleOnIdle(event) {
        this.logout();
    }

    async logout() {
        const session_id = localStorage.getItem("session_id");

        localStorage.removeItem("session_id");

        await axios
            .post("/api/login/logout/", { session_id })
            .then((response) => {
                window.location.replace("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        let wholesale_link = this.state.wholesale_link === "Active" ? "nav-item active" : "nav-item";
        let purple_technado_link = this.state.purple_technado_link === "Active" ? "nav-item active" : "nav-item";
        let bristol_bay_link = this.state.bristol_bay_link === "Active" ? "nav-item active" : "nav-item";

        return (
            <div id="nav_container">
                <IdleTimer
                    ref={(ref) => {
                        this.idleTimer = ref;
                    }}
                    timeout={1000 * 60 * 5}
                    onActive={this.handleOnActive}
                    onIdle={this.handleOnIdle}
                    onAction={this.handleOnAction}
                    debounce={0}
                />
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <img className="navbar-brand" src={Logo} alt="" />
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#nav_list"
                        aria-controls="nav_list"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="nav_list" className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className={wholesale_link} onClick={this.send_wholesale}>
                                <p className="nav-link m-0">Wholesale</p>
                            </li>
                            <li className={purple_technado_link} onClick={this.send_purple_technado}>
                                <p className="nav-link m-0">Purple Technado</p>
                            </li>
                            <li className={bristol_bay_link} onClick={this.send_bristol_bay}>
                                <p className="nav-link m-0">Bristol Bay</p>
                            </li>
                            <li className="nav-item d-lg-none" onClick={this.logout}>
                                <p className="nav-link m-0">Logout</p>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active" onClick={this.logout}>
                                <p className="nav-link m-0">Logout</p>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
