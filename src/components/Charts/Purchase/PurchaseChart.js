import React, { Component } from "react";
import ApexCharts from "apexcharts";
import axios from "axios";
import configUrl from "../../../ConfigURL";

export default class PurchaseChart extends Component {
  static firstMonth;
  static secMonth;
  static thirdMonth;
  static fourthMonth;
  static fifthMonth;
  static sixthMonth;

  static firstMonthName;
  static secMonthName;
  static thirdMonthName;
  static fourthMonthName;
  static fifthMonthName;
  static sixthMonthName;

  state = {
    currentMonth: "",
  };
  componentDidMount() {
    axios
      .get(
        `${configUrl.SERVER_URL}expenses/currentMonth-expenses/${configUrl.SESSION_DB}`
      )
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data[0]) {
          console.log(res.data.data[0].sumInvalue);
          this.setState({ currentMonth: res.data.data[0].sumInvalue });
        } else {
          this.setState({ currentMonth: 0 });
        }
      });

    axios
      .get(
        `${configUrl.SERVER_URL}expenses/five-months-expenses/${configUrl.SESSION_DB}`
      )
      .then((res) => {
        if (res.data.data[0]) {
          this.firstMonth = res.data.data[0]?.sumInvalue;
          this.firstMonthName = res.data.data[0]?.months;
        } else {
          this.firstMonth = 0;
          this.firstMonthName = " month";
        }
        if (res.data.data[1]) {
          this.secMonth = res.data.data[1]?.sumInvalue;
          this.secMonthName = res.data.data[1]?.months;
        } else {
          this.secMonth = 0;
          this.secMonthName = " month";
        }
        if (res.data.data[2]) {
          this.thirdMonth = res.data.data[2]?.sumInvalue;
          this.thirdMonthName = res.data.data[2]?.months;
        } else {
          this.thirdMonth = 0;
          this.thirdMonthName = " month";
        }
        if (res.data.data[3]) {
          this.fourthMonth = res.data.data[3]?.sumInvalue;
          this.fourthMonthName = res.data.data[3]?.months;
        } else {
          this.fourthMonth = 0;
          this.fourthMonthName = " month";
        }
        if (res.data.data[4]) {
          this.fifthMonth = res.data.data[4]?.sumInvalue;
          this.fifthMonthName = res.data.data[4]?.months;
        } else {
          this.fifthMonth = 0;
          this.fifthMonthName = " month";
        }
        if (res.data.data[5]) {
          this.sixthMonth = res.data.data[5]?.sumInvalue;
          this.sixthMonthName = res.data.data[5]?.months;
        } else {
          this.sixthMonth = 0;
          this.sixthMonthName = " month";
        }

        var options = {
          series: [
            {
              name: "Total Expenses",
              data: [
                this.firstMonth,
                this.secMonth,
                this.thirdMonth,
                this.fourthMonth,
                this.fifthMonth,
                this.sixthMonth,
              ],
            },
          ],
          chart: {
            height: 320,
            width: 650,
            type: "line",
            toolbar: "false",
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 8,
              opacity: 0.2,
            },
          },
          dataLabels: {
            enabled: true,
          },
          xaxis: {
            type: "category",
            categories: [
              this.fifthMonthName,
              this.secMonthName,
              this.thirdMonthName,
              this.fourthMonthName,
              this.fifthMonthName,
              this.sixthMonthName,
            ],
          },
          colors: ["#556ee6"],
          stroke: {
            curve: "smooth",
            width: 3,
          },
        };
        var chart = new ApexCharts(
          document.querySelector("#line-chart"),
          options
        );
        chart.render(); //line chart
      }
      
      );
  }

  render() {
    //Data convert to LKR format
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
    });

    return (
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="clearfix">
                <h4 className="card-title mb-4">Expenses</h4>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="text-muted">
                    <div className="mb-4">
                      <p>Total Expenses</p>
                      <h4>{formatter.format(this.state.currentMonth)}</h4>
                      <div>
                        <span className="badge badge-soft-success font-size-12 me-1">
                          {" "}
                          + 0.2%{" "}
                        </span>{" "}
                        From previous period
                      </div>
                    </div>
                    <div>
                      <a
                        href="javascript: void(0);"
                        className="btn btn-primary waves-effect waves-light btn-sm"
                      >
                        View Details{" "}
                        <i className="mdi mdi-chevron-right ms-1" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div id="line-chart" className="apex-charts" dir="ltr" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end row */}
      </div>
    );
  }
}
