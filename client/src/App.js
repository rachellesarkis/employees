import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Employees from "./Components/Employees";
import EmployeePage from "./Components/EmployeePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Employees />
          </Route>
          <Route exact path="/employee/:id">
            <EmployeePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
