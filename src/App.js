import SideBar from "./components/ui/sidebar/Sidebar";
import TopBar from "./components/ui/topbar/topbar";
import Dashboard from "./pages/dashboard/dashboard";
function App() {
  return (
    <div className="App">
      <div className="main-wrapper">
        <TopBar />
        <SideBar />
        <div className="page-wrapper">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;
