import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Button from "./component/Button/Button";
import Input from "./component/Input/Input";
import Table from "./component/Table/Table";
import HomePage from "./page/HomePage/HomePage";

function App() {

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
