import React from "react";
import "./inventory_values.css";
import axios from "axios";

export default class InventoryValues extends React.PureComponent {
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
            .get("/api/wholesale/inventoryValues")
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
                    <th>{this.state.data[key].Source}</th>
                    <td>${this.state.data[key].EstimatedValue}</td>
                </tr>
            );
        });

        return (
            <div id="inventory_values_container" className="col-12 col-md-4">
                <h3>Inventory Values</h3>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Source</th>
                            <th scope="col">Estimated Value</th>
                        </tr>
                    </thead>
                    <tbody>{display}</tbody>
                </table>
            </div>
        );
    }
}
