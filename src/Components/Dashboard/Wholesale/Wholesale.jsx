import React from "react";
import "./wholesale.css";
import PreviousBusinessDay from "./PreviousBusinessDay/PreviousBusinessDay";
import UserStatuses from "./UserStatuses/UserStatuses";
import InventoryValues from "./InventoryValues/InventoryValues";
import InventoryValuePie from "./InventoryValuePie/InventoryValuePie";
import SalesDayChart from "./SalesDayChart/SalesDayChart";
import AuctionDayChart from "./AuctionDayChart/AuctionDayChart";

export default class Wholesale extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pie_type: "Value",
            sales_chart_type: "Value",
            auction_chart_type: "Value",
            pie_group_type: "Make",
            sales_chart_time_type: "1 Month",
            auction_chart_time_type: "1 Month",
        };
    }

    pie_switch = (key) => {
        this.setState({ pie_type: key });
    };

    sales_chart_switch = (key) => {
        this.setState({ sales_chart_type: key });
    };

    sales_chart_time_switch = (key) => {
        this.setState({ sales_chart_time_type: key });
    };

    auction_chart_switch = (key) => {
        this.setState({ auction_chart_type: key });
    };

    auction_chart_time_switch = (key) => {
        this.setState({ auction_chart_time_type: key });
    };

    pie_group_switch = (key) => {
        this.setState({ pie_group_type: key });
    };

    render() {
        return (
            <div id="wholesale_container" className="row">
                <InventoryValues />
                <PreviousBusinessDay />
                <UserStatuses />
                <InventoryValuePie type={this.state.pie_type} group={this.state.pie_group_type} action={this.pie_switch} action2={this.pie_group_switch} />
                <SalesDayChart
                    type={this.state.sales_chart_type}
                    time={this.state.sales_chart_time_type}
                    action={this.sales_chart_switch}
                    action2={this.sales_chart_time_switch}
                />
                <AuctionDayChart
                    type={this.state.auction_chart_type}
                    time={this.state.auction_chart_time_type}
                    action={this.auction_chart_switch}
                    action2={this.auction_chart_time_switch}
                />
            </div>
        );
    }
}
