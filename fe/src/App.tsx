import ListEmployee from "./components/ListEmployee";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employee from "./components/Employee";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <ListEmployee /> }></Route>
          <Route path="/employees" element={ <ListEmployee /> }></Route>
          <Route path="/add-employees" element={ <Employee /> }></Route>
          <Route path="/edit-employee/:id" element={ <Employee /> }></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
