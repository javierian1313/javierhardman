import React from "react";
import "./inventory_value_pie.css";
import { Pie } from "react-chartjs-2";
import axios from "axios";

export default class InventoryValuePie extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: "",
            label: "",
            datasets: "",
            type: "Value",
            group: "Make",
            make_button: "Active",
            stock_button: "Inactive",
            color_code_button: "Inactive",
        };
    }

    componentDidMount() {
        this.get_data();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.type !== this.state.type || prevState.group !== this.state.group) this.get_data();
    }

    async get_data() {
        let url;

        switch (this.state.group) {
            case "Make":
                url = "/api/wholesale/inventoryValuesMake";
                break;
            case "Stock":
                url = "/api/wholesale/inventoryValuesStock";
                break;
            case "Color Code":
                url = "/api/wholesale/inventoryValuesColorCode";
                break;
            default:
                url = "/api/wholesale/inventoryValuesMake";
                break;
        }

        await axios
            .get(url)
            .then((response) => {
                let value_data;
                let colors = [];
                let names = [];
                let values = [];
                let quantities = [];
                let avg_values = [];
                let thirty_day_adds = [];

                Object.keys(response.data).forEach((key) => {
                    let name;
                    let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
                    let value = parseFloat(response.data[key].Value);
                    let quantity = response.data[key].Quantity;
                    let avg_value = response.data[key].AvgValue;
                    let thirty_day_add = response.data[key].Last30Days;

                    if (this.state.group === "Make") name = response.data[key].Make;
                    else if (this.state.group === "Stock") name = response.data[key].Stock;
                    else if (this.state.group === "Color Code") name = response.data[key].ColorCode;

                    colors.push(color);
                    names.push(name);
                    values.push(value);
                    quantities.push(quantity);
                    avg_values.push(avg_value);
                    thirty_day_adds.push(thirty_day_add);
                });

                if (this.state.type === "Value") value_data = values;
                else if (this.state.type === "Quantity") value_data = quantities;

                this.setState({
                    data: response.data,
                    label: names,
                    datasets: [
                        {
                            data: value_data,
                            backgroundColor: colors,
                        },
                    ],
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    value_switch = () => {
        this.props.action("Value");
        this.setState({ type: "Value" });
    };

    quantity_switch = () => {
        this.props.action("Quantity");
        this.setState({ type: "Quantity" });
    };

    make_switch = () => {
        this.props.action2("Make");
        this.setState({ group: "Make", make_button: "Active", stock_button: "Inactive", color_code_button: "Inactive" });
    };

    stock_switch = () => {
        this.props.action2("Stock");
        this.setState({ group: "Stock", make_button: "Inactive", stock_button: "Active", color_code_button: "Inactive" });
    };

    color_code_switch = () => {
        this.props.action2("Color Code");
        this.setState({ group: "Color Code", make_button: "Inactive", stock_button: "Inactive", color_code_button: "Active" });
    };

    render() {
        let make_button = this.state.make_button === "Active" ? "btn btn-secondary" : "btn btn-outline-secondary";
        let stock_button = this.state.stock_button === "Active" ? "btn btn-secondary" : "btn btn-outline-secondary";
        let color_code_button = this.state.color_code_button === "Active" ? "btn btn-secondary" : "btn btn-outline-secondary";

        const options = {
            legend: {
                position: "top",
                labels: {
                    boxWidth: 10,
                },
            },
        };

        return (
            <div id="inventory_value_pie_container" className="col-12 col-md-4">
                <h3>
                    Inventory By {this.props.group} {this.props.type}
                </h3>
                <div className="btn-group" role="group">
                    <button type="button" className={make_button} onClick={this.make_switch}>
                        Make
                    </button>
                    <button type="button" className={stock_button} onClick={this.stock_switch}>
                        Stock
                    </button>
                    <button type="button" className={color_code_button} onClick={this.color_code_switch}>
                        Color Code
                    </button>
                </div>
                <Pie
                    data={{
                        labels: this.state.label,
                        datasets: this.state.datasets,
                    }}
                    height={300}
                    options={options}
                />
                <div className="dropdown">
                    <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        id="inventory_value_pie_select"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {this.state.type}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="inventory_value_pie_select">
                        <button className="dropdown-item" type="button" onClick={this.value_switch}>
                            Value
                        </button>
                        <button className="dropdown-item" type="button" onClick={this.quantity_switch}>
                            Quantity
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
