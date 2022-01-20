import React from "react";

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
                <a href="index.html">
                  <i data-feather="home"></i> <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="customers.html">
                  <i data-feather="users"></i> <span>Accounts</span>
                </a>
              </li>
              <li>
                <a href="estimates.html">
                  <i data-feather="file-text"></i> <span>Activity</span>
                </a>
              </li>
              <li>
                <a href="invoices.html">
                  <i data-feather="clipboard"></i> <span>BudgetPlan</span>
                </a>
              </li>
              <li>
                <a href="payments.html">
                  <i data-feather="credit-card"></i> <span>Customers</span>
                </a>
              </li>
              <li>
                <a href="expenses.html">
                  <i data-feather="package"></i> <span>Memership</span>
                </a>
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
