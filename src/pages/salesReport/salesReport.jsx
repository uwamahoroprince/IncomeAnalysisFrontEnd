import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal/lib/components/Modal";
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
const SalesReport = () => {
  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const isfound = true;
  const pieData = [];

  const [barData, setBarData] = useState();
  const [amountFromActivity, setAmountFromActivity] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [total, setTotal] = useState(0);
  let valuePairState = [];
  const getAllSubscriptions = async () => {
    let addedAmount = 0;
    try {
      const response = await axios.get(`${url.memberShip}`);
      const data = response.data.data;

      for (const key in data) {
        for (const innerKey in data[key].activity) {
          console.log();
          let id = data[key].activity[innerKey];
          console.log(`${url.activity}/${id}`);
          let response = await axios.get(`${url.activity}/${id}`);
          const amount = response.data.data.amountPermonth;
          addedAmount = addedAmount + amount;
        }
      }
      setAmountFromActivity(addedAmount);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllTransactions = async () => {
    let exp = 0;
    let inc = 0;
    try {
      let expensePerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let incomePerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const response = await axios.get(`${url.transaction}`);
      const data = response.data.data;

      for (const key in data) {
        let month = new Date(data[key].createdAt).getMonth() + 1;
        if (data[key].type === "expense") {
          exp = exp + data[key].amount;
          expensePerMonth[month] = expensePerMonth[month] + data[key].amount;
        } else {
          inc = inc + data[key].amount;
          incomePerMonth[month] = incomePerMonth[month] + data[key].amount;
        }

        let index = valuePairState.findIndex((el) => el.month === month);
        // console.log(index);
        if (index != -1) {
          valuePairState[index] = {
            month: month,
            x: expensePerMonth[month],
            y: incomePerMonth[month],
          };
          //   console.log(valuePairState);
        } else {
          if (data[key].type === "expense") {
            valuePairState.push({
              month: month,
              x: data[key].amount,
              y: 0,
            });
            // console.log(valuePairState);
          } else {
            valuePairState.push({
              month: month,
              x: 0,
              y: data[key].amount,
            });
            // console.log(valuePairState);
          }
        }
      }
      let newData = [];

      for (const key in valuePairState) {
        let monthInWord;
        for (let i = 1; i <= 12; i++) {
          if (i == valuePairState[key].month) {
            monthInWord = allMonths[i];
          }
        }

        newData.push({
          name: `${monthInWord}`,
          Sales: valuePairState[key].y + amountFromActivity,
          // amt: valuePairState[key].x,
        });
      }
      setBarData(newData);
    } catch (error) {
      console.log(error);
    }
    setTotalExpense(exp);
    setTotalIncome(inc + amountFromActivity);
  };
  pieData.push(
    {
      name: "Income",
      value: totalIncome,
    },
    {
      name: "Expense",
      value: totalExpense,
    }
  );
  const customCatStyles = {
    content: {
      top: "10%",
      left: "30%",
      right: "20%",
      background: "#fff",
      opacity: 1,
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "2%",
      outline: "none",
    },
    overlay: {
      backgroundColor: "rgba(238, 228, 248, 0.80)",
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    let subtitle;
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    getAllTransactions();
    getAllSubscriptions();
    // getTotalAmountFromSubscription();

    return () => {
      isfound = false;
    };
  }, []);
  return (
    <>
      <div className="m-5">
        <nav aria-label="breadcrumb ">
          <ol
            className="breadcrumb bg-2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <li
              className="breadcrumb-item active h6 text-black"
              aria-current="page"
            >
              Sales Over Time
            </li>
            <i
              className="fa-solid fa-chart-area"
              style={{ marginLeft: "25px" }}
            ></i>
            <a
              className="btn "
              data-bs-toggle="modal"
              data-bs-target="#add_items"
              onClick={openModal}
            >
              Chart
            </a>
            <i
              style={{ marginLeft: "25px" }}
              className="fa-solid fa-table "
            ></i>
            <span className="btn">Table</span>
          </ol>
        </nav>

        <nav aria-label="breadcrumb ">
          <ol
            className="breadcrumb bg-2"
            className="breadcrumb bg-2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <li
              className="breadcrumb-item active h6 text-black"
              aria-current="page"
            >
              Sales By Item
            </li>
            <i
              style={{ marginLeft: "25px" }}
              className="fa-solid fa-chart-area "
            ></i>
            <a
              className="btn "
              data-bs-toggle="modal"
              data-bs-target="#add_items"
              onClick={openModal}
            >
              Chart
            </a>
            <i
              style={{ marginLeft: "25px" }}
              className="fa-solid fa-table "
            ></i>
            <span className="cursor-pointer btn">Table</span>
          </ol>
        </nav>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customCatStyles}
        contentLabel="Example Modal"
      >
        <form
          className="modal-dialog modal-dialog-centered modal-lg"
          novalidate=""
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="form-header text-start mb-0">
                <h4 className="mb-0">Sales Over Time</h4>
              </div>
            </div>
            <div className="modal-body">
              <div className="bank-inner-details">
                <div className="row">
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
                      dataKey="Sales"
                      fill="#8884d8"
                      background={{ fill: "#eee" }}
                    />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default SalesReport;
