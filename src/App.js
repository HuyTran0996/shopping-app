import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      Header
      <Routes>
        <Route />
      </Routes>
      Footer
    </BrowserRouter>
  );
}

export default App;
