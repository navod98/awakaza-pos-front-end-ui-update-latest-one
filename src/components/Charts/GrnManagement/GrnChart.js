import React, { Component } from "react";
import ApexCharts from "apexcharts";

export default class GrnChart extends Component {
  componentDidMount() {
    {
      var options = {
        chart: { height: 370, type: "radialBar" },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: { fontSize: "22px" },
              value: { fontSize: "16px" },
              total: {
                show: !0,
                label: "Product 3",
                formatter: function (e) {
                  return "500";
                },
              },
            },
          },
        },
        series: [80, 70, 10],
        labels: ["Product 1", "Product 2", "Product 3"],
        colors: ["#556ee6", "#34c38f", "#f46a6a"],
      };

      var chart = new ApexCharts(
        document.querySelector("#radial_chart"),
        options
      );
      chart.render();

      var options = {
        series: [
          {
            name: "series1",
            data: [31, 40, 36, 51, 49, 72, 69, 56, 68, 82, 68, 76],
          },
        ],
        chart: {
          height: 320,
          width: 450,
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
          enabled: false,
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
  }

  render() {
    return (
      <div className="row">
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body">
              <div className="clearfix">
                <div className="float-end">
                  <div className="input-group input-group-sm">
                    <select className="form-select form-select-sm">
                      <option value="JA" selected>
                        Jan
                      </option>
                      <option value="DE">Dec</option>
                      <option value="NO">Nov</option>
                      <option value="OC">Oct</option>
                    </select>
                    <label className="input-group-text">Month</label>
                  </div>
                </div>
                <h4 className="card-title mb-4">Earning</h4>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="text-muted">
                    <div className="mb-4">
                      <p>This month</p>
                      <h4>$2453.35</h4>
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
                    <div className="mt-4">
                      <p className="mb-2">Last month</p>
                      <h5>$2281.04</h5>
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
        <div className="col-xl-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Sales Analytics</h4>
              <div>
                <div id="radial_chart" className="apex-charts" />
              </div>
              <div className="text-center text-muted">
                <div className="row">
                  <div className="col-4">
                    <div className="mt-4">
                      <p className="mb-2 text-truncate">
                        <i className="mdi mdi-circle text-primary me-1" />{" "}
                        Product A
                      </p>
                      <h5>$ 2,132</h5>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mt-4">
                      <p className="mb-2 text-truncate">
                        <i className="mdi mdi-circle text-success me-1" />{" "}
                        Product B
                      </p>
                      <h5>$ 1,763</h5>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mt-4">
                      <p className="mb-2 text-truncate">
                        <i className="mdi mdi-circle text-danger me-1" />{" "}
                        Product C
                      </p>
                      <h5>$ 973</h5>
                    </div>
                  </div>
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
