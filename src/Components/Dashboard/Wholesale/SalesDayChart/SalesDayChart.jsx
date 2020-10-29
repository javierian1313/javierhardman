import React from "react";
import "./sales_day_chart.css";
import { Line } from "react-chartjs-2";
import axios from "axios";

export default class SalesDayChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: "",
            label: "",
            datasets: "",
            total_datasets: "",
            derek_datasets: "",
            anthony_datasets: "",
            allenby_datasets: "",
            type: "Value",
            time: "1 Month",
            one_month_button: "Active",
            three_months_button: "Inactive",
            six_months_button: "Inactive",
        };
    }

    componentDidMount() {
        this.get_data();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.type !== this.state.type || prevState.time !== this.state.time) this.get_data();
    }

    async get_data() {
        let url;

        switch (this.state.time) {
            case "1 Month":
                url = "/api/wholesale/salesDayChartLast1Month";
                break;
            case "3 Months":
                url = "/api/wholesale/salesDayChartLast3Months";
                break;
            case "6 Months":
                url = "/api/wholesale/salesDayChartLast6Months";
                break;
            default:
                url = "/api/wholesale/salesDayChartLast1Month";
                break;
        }

        await axios
            .get(url)
            .then((response) => {
                let total_value_data;
                let derek_value_data;
                let anthony_value_data;
                let allenby_value_data;
                let dates = [];
                let total_values = [];
                let total_quantities = [];
                let derek_values = [];
                let derek_quantities = [];
                let anthony_values = [];
                let anthony_quantities = [];
                let allenby_values = [];
                let allenby_quantities = [];

                Object.keys(response.data).forEach((key) => {
                    let date = response.data[key].CompleteDate;
                    let value = parseFloat(response.data[key].TotalValue);
                    let quantity = parseFloat(response.data[key].TotalQuantity);

                    switch (response.data[key].SalesRep) {
                        case "Total":
                            total_values.push(value);
                            total_quantities.push(quantity);
                            break;
                        case "1003":
                            derek_values.push(value);
                            derek_quantities.push(quantity);
                            break;
                        case "2752":
                            anthony_values.push(value);
                            anthony_quantities.push(quantity);
                            break;
                        case "2784":
                            allenby_values.push(value);
                            allenby_quantities.push(quantity);
                            break;
                        default:
                            console.log("error");
                            break;
                    }

                    dates.push(date);

                    dates = Array.from(new Set(dates));
                });

                if (this.state.type === "Value") {
                    total_value_data = total_values;
                    derek_value_data = derek_values;
                    anthony_value_data = anthony_values;
                    allenby_value_data = allenby_values;
                } else if (this.state.type === "Quantity") {
                    total_value_data = total_quantities;
                    derek_value_data = derek_quantities;
                    anthony_value_data = anthony_quantities;
                    allenby_value_data = allenby_quantities;
                }

                this.setState({
                    label: dates,
                    total_datasets: [
                        {
                            label: "Total",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "#333",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: total_value_data,
                        },
                    ],
                    derek_datasets: [
                        {
                            label: "Derek",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "#65b5ee",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: derek_value_data,
                        },
                    ],
                    anthony_datasets: [
                        {
                            label: "Anthony",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "#00fde5",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: anthony_value_data,
                        },
                    ],
                    allenby_datasets: [
                        {
                            label: "Allenby",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "#f0a0b4",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: allenby_value_data,
                        },
                    ],
                });
            })
            .catch((error) => {
                console.log(error);
            });

        let combined_datasets = [this.state.total_datasets[0], this.state.derek_datasets[0], this.state.anthony_datasets[0], this.state.allenby_datasets[0]];

        this.setState({ datasets: combined_datasets });
    }

    value_switch = () => {
        this.props.action("Value");
        this.setState({ type: "Value" });
    };

    quantity_switch = () => {
        this.props.action("Quantity");
        this.setState({ type: "Quantity" });
    };

    one_month_switch = () => {
        this.props.action2("1 Month");
        this.setState({ time: "1 Month", one_month_button: "Active", three_months_button: "Inactive", six_months_button: "Inactive" });
    };

    three_months_switch = () => {
        this.props.action2("3 Months");
        this.setState({ time: "3 Months", one_month_button: "Inactive", three_months_button: "Active", six_months_button: "Inactive" });
    };

    six_months_switch = () => {
        this.props.action2("6 Months");
        this.setState({ time: "6 Months", one_month_button: "Inactive", three_months_button: "Inactive", six_months_button: "Active" });
    };

    render() {
        let one_month_button = this.state.one_month_button === "Active" ? "btn btn-secondary" : "btn btn-outline-secondary";
        let three_months_button = this.state.three_months_button === "Active" ? "btn btn-secondary" : "btn btn-outline-secondary";
        let six_months_button = this.state.six_months_button === "Active" ? "btn btn-secondary" : "btn btn-outline-secondary";

        return (
            <div id="sales_day_chart_container" className="col-12 col-md-4">
                <h3>
                    Wholesale Sales - Last {this.props.time} {this.props.type}
                </h3>
                <div className="btn-group" role="group">
                    <button type="button" className={one_month_button} onClick={this.one_month_switch}>
                        1 Month
                    </button>
                    <button type="button" className={three_months_button} onClick={this.three_months_switch}>
                        3 Months
                    </button>
                    <button type="button" className={six_months_button} onClick={this.six_months_switch}>
                        6 Months
                    </button>
                </div>
                <Line
                    data={{
                        labels: this.state.label,
                        datasets: this.state.datasets,
                    }}
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
