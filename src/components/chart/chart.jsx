import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../constants/url";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
const COLORS = ["#0088FE", "#00C49F"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const Chart = () => {
  const isfound = true;
  let barData = [];
  const pieData = [];
  const [allTransaction, setAllTransaction] = useState([]);
  let income = 0;
  let expense = 0;
  let total;
  let monthInWords = [
    "Jan",
    "Feb",
    "April",
    "Mar",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "oct",
    "Nov",
    "Dec",
  ];
  const getAllTransactions = async () => {
    try {
      const response = await axios.get(`${url.transaction}`);
      if (isfound) {
        const data = response.data.data;
        setAllTransaction(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  for (const key in allTransaction) {
    let date = new Date(allTransaction[key].createdAt);
    let amount = allTransaction[key].amount;
    let month = date.getMonth() + 1;
    let monthInWord;
    let uv = amount;
    let pv = amount;
    let amt = amount;
    if (allTransaction[key].type === "income") {
      income = income + allTransaction[key].amount;
    } else {
      expense = expense + allTransaction[key].amount;
    }
    total = income + expense;
    for (let i = 1; i <= 12; i++) {
      if (i === month) {
        monthInWord = monthInWords[i];
        break;
      }
    }
    barData.push({
      name: `${monthInWord}`,
      uv: uv,
      pv: pv,
      amt: amt,
    });
  }
  pieData.push(
    {
      name: "income",
      value: income,
    },
    {
      name: "income",
      value: expense,
    }
  );
  useEffect(() => {
    getAllTransactions();
    return () => {
      isfound = false;
    };
  }, []);
  return (
    <>
      <div className="row m-3">
        <div className="col-xl-7 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">Transaction Analytics</h5>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
                <div className="w-md-100 d-flex align-items-center mb-3 flex-wrap flex-md-nowrap">
                  <div>
                    <span>Total</span>
                    <p className="h5 text-primary me-5">
                      {total} <span className="h6 text-dark">Rwf</span>
                    </p>
                  </div>
                  <div>
                    <span>Expenses</span>
                    <p className="h5 text-danger me-5">
                      {expense} <span className="h6 text-dark">Rwf</span>
                    </p>
                  </div>
                  <div>
                    <span>Income</span>
                    <p className="h5 text-dark me-5">
                      {income} <span className="h6 text-dark">Rwf</span>
                    </p>
                  </div>
                </div>
              </div>
              <div id="sales_chart">
                <BarChart
                  width={600}
                  height={300}
                  data={barData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 5,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="pv"
                    fill="#8884d8"
                    background={{ fill: "#eee" }}
                  />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-5 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">Pie Transaction Analytics</h5>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
                <div className="">
                  {/* <div>
                    <span className="h4">Guid</span>
                  </div>
                  <br /> */}
                  <div>
                    <div
                      className="badge"
                      style={{
                        background: "#00C49F",
                        width: "20px",
                        height: "10px",
                      }}
                    >
                      {" "}
                    </div>
                    <span className="h5">Expense</span>
                  </div>

                  <div>
                    <div
                      className="badge"
                      style={{
                        background: "#0088FE",
                        width: "20px",
                        height: "10px",
                      }}
                    >
                      {" "}
                    </div>
                    <span className="h5">Income</span>
                  </div>
                </div>
              </div>
              <div id="sales_chart">
                <PieChart width={500} height={400}>
                  <Pie
                    data={pieData}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {barData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chart;
