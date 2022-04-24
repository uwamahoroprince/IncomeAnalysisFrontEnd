import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              <li className="active">
                <Link to="/">
                  <i className="fa-solid fa-gauge" data-feather="home"></i>{" "}
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/accounts">
                  <i className="fa-solid fa-suitcase" data-feather="users"></i>{" "}
                  <span>Accounts</span>
                </Link>
              </li>
              <li>
                <Link to="/activities">
                  <i
                    className="fa-solid fa-dumbbell"
                    data-feather="file-text"
                  ></i>{" "}
                  <span>Activity</span>
                </Link>
              </li>
              <li>
                <Link to="/budgetPlan">
                  <i className="fa-solif fa-list" data-feather="clipboard"></i>{" "}
                  <span>BudgetPlan</span>
                </Link>
              </li>
              <li>
                <Link to="/clients" href="index.html">
                  <i
                    className="fa-solid fa-person"
                    data-feather="credit-card"
                  ></i>
                  <span>Customers</span>
                </Link>
              </li>
              <li>
                <Link to="/subscription">
                  <i
                    className="fa-solid fa-basketball"
                    data-feather="package"
                  ></i>{" "}
                  <span>SubScription</span>
                </Link>
              </li>
              <li>
                <Link to="/transactions">
                  <i className="fas fa-dollar-sign" data-feather="package"></i>{" "}
                  <span>Transaction</span>
                </Link>
              </li>
              <li>
                <Link to="/staff">
                  <i class="fa-solid fa-users" data-feather="package"></i>{" "}
                  <span>Staff</span>
                </Link>
              </li>
              <li>
                <Link to="/sales">
                  <i data-feather="package"></i> <span>Sales Repots</span>
                </Link>
              </li>
              <li>
                <Link to="/expense">
                  <i data-feather="package"></i> <span>Expense Reports</span>
                </Link>
              </li>
              <li>
                <Link to="plf">
                  <i data-feather="package"></i>
                  <span>Profit &Loss Report</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBar;
