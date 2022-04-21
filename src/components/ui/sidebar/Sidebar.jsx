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
                  <i data-feather="home"></i> <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/accounts">
                  <i data-feather="users"></i> <span>Accounts</span>
                </Link>
              </li>
              <li>
                <Link to="/activities">
                  <i data-feather="file-text"></i> <span>Activity</span>
                </Link>
              </li>
              <li>
                <Link to="/budgetPlan">
                  <i data-feather="clipboard"></i> <span>BudgetPlan</span>
                </Link>
              </li>
              <li>
                <Link to="/clients" href="index.html">
                  <i data-feather="credit-card"></i> <span>Customers</span>
                </Link>
              </li>
              <li>
                <Link to="/subscription">
                  <i data-feather="package"></i> <span>SubScription</span>
                </Link>
              </li>
              <li>
                <a href="expenses.html">
                  <i data-feather="package"></i> <span>Transaction</span>
                </a>
              </li>
              <li>
                <a href="expenses.html">
                  <i data-feather="package"></i> <span>Staff</span>
                </a>
              </li>
              <li>
                <a href="expenses.html">
                  <i data-feather="package"></i> <span>Sales Repots</span>
                </a>
              </li>
              <li>
                <a href="expenses.html">
                  <i data-feather="package"></i> <span>Expense Reports</span>
                </a>
              </li>
              <li>
                <a href="expenses.html">
                  <i data-feather="package"></i>
                  <span>Profit &Loss Report</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBar;
