import React from "react";
import "./user_statuses.css";
import axios from "axios";

export default class UserStatuses extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: "",
        };
    }

    componentDidMount() {
        this.get_data();
    }

    async get_data() {
        await axios
            .get("/api/wholesale/userStatuses")
            .then((response) => {
                this.setState({
                    data: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const display = Object.keys(this.state.data).map((key) => {
            return (
                <tr key={key}>
                    <th>{this.state.data[key].Status}</th>
                    <td>{this.state.data[key].UserCount}</td>
                </tr>
            );
        });

        return (
            <div id="user_statuses_container" className="col-12 col-md-4">
                <h3>User Statuses</h3>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col"># Of Users</th>
                        </tr>
                    </thead>
                    <tbody>{display}</tbody>
                </table>
            </div>
        );
    }
}
