import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Addpage from "./Component/Addpage";
import Dashboard from "./Component/Dashboard";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div>
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={Dashboard}></Route>
        <Route path="/Addpage" exact component={Addpage}></Route>
      </div>
    </BrowserRouter>
    <ToastContainer />
    </div>
  );
}

export default App;