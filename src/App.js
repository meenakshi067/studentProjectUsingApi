import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Addpage from "./Component/Addpage";
import Dashboard from "./Component/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={Dashboard}></Route>
        <Route path="/Addpage" exact component={Addpage}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;