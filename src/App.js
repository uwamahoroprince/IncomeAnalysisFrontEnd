import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chart from "./components/chart/chart";
import SideBar from "./components/ui/sidebar/Sidebar";
import TopBar from "./components/ui/topbar/topbar";
import Accounts from "./pages/acoounts/account";
import Activity from "./pages/acoounts/activity";
import BudgetPlan from "./pages/budgetPlan/budgetPlan";
import Clients from "./pages/clients/clients";
import Dashboard from "./pages/dashboard/dashboard";
import MemberShip from "./pages/transaction/memberShip";
import Transaction from "./pages/transaction/transaction";
import IncomeAnalysis from "./pages/analytics/IncomeAnalytics";
import SalesReport from "./pages/salesReport/salesReport";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="main-wrapper">
          <TopBar />
          <SideBar />

          <div className="page-wrapper">
            <Switch>
              <Route exact path="/">
                <Dashboard />
                <Chart />
              </Route>
            </Switch>
            <Switch>
              <Route path="/accounts">
                <Accounts />
              </Route>
            </Switch>
            <Switch>
              <Route path="/activities">
                <Activity />
              </Route>
            </Switch>
            <Switch>
              <Route path="/clients">
                <Clients />
              </Route>
            </Switch>
            <Switch>
              <Route path="/subscription">
                <MemberShip />
              </Route>
            </Switch>
            <Switch>
              <Route path="/budgetPlan">
                <BudgetPlan />
              </Route>
            </Switch>
            <Switch>
              <Route path="/transactions">
                <Transaction />
              </Route>
            </Switch>
            <Switch>
              <Route path="/analytics">
                <IncomeAnalysis />
              </Route>
            </Switch>
            <Switch>
              <Route path="/salesReport">
                <SalesReport />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
