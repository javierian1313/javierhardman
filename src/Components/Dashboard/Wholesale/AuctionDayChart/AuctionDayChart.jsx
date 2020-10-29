import React from "react";
import "./auction_day_chart.css";
import { Line } from "react-chartjs-2";
import axios from "axios";

export default class AuctionDayChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: "",
            labels: "",
            datasets: "",
            total_datasets: "",
            nws_datasets: "",
            cit_datasets: "",
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
                url = "/api/wholesale/auctionDayChartLast1Month";
                break;
            case "3 Months":
                url = "/api/wholesale/auctionDayChartLast3Months";
                break;
            case "6 Months":
                url = "/api/wholesale/auctionDayChartLast6Months";
                break;
            default:
                url = "/api/wholesale/auctionDayChartLast1Month";
                break;
        }

        await axios
            .get(url)
            .then((response) => {
                let total_value_data;
                let nws_value_data;
                let cit_value_data;
                let dates = [];
                let total_values = [];
                let nws_values = [];
                let cit_values = [];
                let quantities = [];

                Object.keys(response.data).forEach((key) => {
                    let date = response.data[key].CompleteDate;
                    let total_value = parseFloat(response.data[key].TotalValue);
                    let nws_value = parseFloat(response.data[key].NWSShare);
                    let cit_value = parseFloat(response.data[key].CITShare);
                    let quantity = parseFloat(response.data[key].TotalQuantity);

                    dates.push(date);
                    total_values.push(total_value);
                    nws_values.push(nws_value);
                    cit_values.push(cit_value);
                    quantities.push(quantity);
                });

                if (this.state.type === "Value") {
                    total_value_data = total_values;
                    nws_value_data = nws_values;
                    cit_value_data = cit_values;
                } else if (this.state.type === "Quantity") {
                    total_value_data = quantities;
                    nws_value_data = quantities;
                    cit_value_data = quantities;
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
                    nws_datasets: [
                        {
                            label: "NWS Share",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "#ff6600",
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
                            data: nws_value_data,
                        },
                    ],
                    cit_datasets: [
                        {
                            label: "CIT Share",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "#70a643",
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
                            data: cit_value_data,
                        },
                    ],
                });
            })
            .catch((error) => {
                console.log(error);
            });

        let combined_datasets;

        if (this.state.type === "Value") combined_datasets = [this.state.total_datasets[0], this.state.nws_datasets[0], this.state.cit_datasets[0]];
        else combined_datasets = [this.state.total_datasets[0]];

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
            <div id="auction_day_chart_container" className="col-12 col-md-4">
                <h3>
                    Auction Sales - Last {this.props.time} {this.props.type}
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
