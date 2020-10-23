import React from "react";
import "./login.css";
import axios from "axios";

export default class Login extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { username: "", password: "", session_id: "", login_error: "", width: "", location: "" };
        this.update_screen_size = this.update_screen_size.bind(this);
    }

    componentDidMount() {
        const session_id = localStorage.getItem("session_id");

        this.update_screen_size();

        window.addEventListener("resize", this.update_screen_size);

        if (session_id) this.props.history.push("/dashboard");
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.update_screen_size);
    }

    async update_screen_size() {
        let window_width;

        if (window.innerWidth <= 575) window_width = "Mobile";
        else if (window.innerWidth >= 576 && window.innerWidth <= 767) window_width = "Mobile/Tablet";
        else if (window.innerWidth >= 768 && window.innerWidth <= 991) window_width = "Tablet/Laptop";
        else if (window.innerWidth >= 992 && window.innerWidth <= 1199) window_width = "Laptop/Desktop";
        else if (window.innerWidth >= 1200) window_width = "Desktop";
        else window_width = "Unknown Screen Size";

        this.setState({ width: window_width });
    }

    async handleSubmit(e) {
        let location;

        e.preventDefault();

        fetch("https://extreme-ip-lookup.com/json")
            .then((res) => res.json())
            .then((json) => {
                location = `${json.city}, ${json.region}, ${json.country}`;
                this.setState({ location: location });
            });

        this.user_login();
    }

    async update_user() {
        const { username, session_id, width, location } = this.state;

        await axios
            .post("/api/login/updateUser/", { username, session_id, width, location })
            .then((response) => {})
            .catch((error) => {
                console.log(error);
            });
    }

    async user_login() {
        const { username, password } = this.state;

        await axios
            .post("/api/login/checkUser/", { username, password })
            .then((response) => {
                if (response.data.auth === 1) {
                    let session_id = 1 + Math.random() * (999999 - 1);
                    let date_now = new Date();
                    let date_value = date_now.valueOf().toString();

                    session_id = Math.ceil(session_id).toString();
                    session_id = date_value.concat(session_id);

                    this.setState({ session_id: session_id });

                    localStorage.setItem("session_id", session_id);
                    localStorage.setItem("active", 1);

                    this.update_user();

                    this.props.history.push("/dashboard");
                } else {
                    switch (response.data.error) {
                        case "username":
                            this.setState({ login_error: "You have entered an incorrect username. Please try again." });
                            break;
                        case "password":
                            this.setState({ login_error: "You have entered an incorrect password. Please try again." });
                            break;
                        case "locked":
                            this.setState({ login_error: "You have been locked. Please reach out to IT for support." });
                            break;
                        default:
                            console.log("something went wrong");

                            this.setState({ login_error: "Uh Oh! Something Unexpected Happened! Please reload and try again." });
                            break;
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div id="login_container" className="jumbotron m-0 d-flex rounded-0">
                <div className="container bg-white rounded">
                    <div id="login_box" className="row">
                        <div className="col-12 p-4">
                            <form onSubmit={(e) => this.handleSubmit(e)}>
                                <h2>Log in to your account</h2>
                                {this.state.login_error !== "" ? <div className="alert alert-danger">{this.state.login_error}</div> : <></>}
                                <div className="form-group">
                                    <label htmlFor="login_username_input">Username:</label>
                                    <input
                                        id="login_username_input"
                                        className="form-control"
                                        value={this.state.username}
                                        type="text"
                                        placeholder="Enter your email"
                                        name="username"
                                        onChange={(e) => this.handleChange(e)}
                                        required
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="login_password_input">Password:</label>
                                    <input
                                        id="login_password_input"
                                        className="form-control"
                                        value={this.state.password}
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        onChange={(e) => this.handleChange(e)}
                                        required
                                    ></input>
                                </div>
                                <button className="btn btn-secondary w-100 mt-3" type="submit">
                                    Log in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
