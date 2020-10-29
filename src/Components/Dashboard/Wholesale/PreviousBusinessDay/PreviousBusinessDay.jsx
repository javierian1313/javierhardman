import React from "react";
import "./previous_business_day.css";
import axios from "axios";

export default class PreviousBusinessDay extends React.PureComponent {
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
            .get("/api/wholesale/previousBusinessDay")
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
                    <th>{this.state.data[key].SalesRep}</th>
                    <td>{this.state.data[key].NumberOfOrders}</td>
                    <td>${this.state.data[key].TotalValue}</td>
                    <td>${this.state.data[key].WholesaleValue}</td>
                    <td>${this.state.data[key].AuctionValue}</td>
                </tr>
            );
        });

        return (
            <div id="previous_business_day_container" className="col-12 col-md-4">
                <h3>Previous Business Day Sales</h3>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sales Rep</th>
                            <th scope="col"># Of Orders</th>
                            <th scope="col">Total Value</th>
                            <th scope="col">Wholesale Value</th>
                            <th scope="col">Auction Value</th>
                        </tr>
                    </thead>
                    <tbody>{display}</tbody>
                </table>
            </div>
        );
    }
}
