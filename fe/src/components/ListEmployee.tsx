import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Employee {
  id: number;
  code: string;
  name: string;
  age: number;
  gender: boolean;
  address: string;
  position(name: string): string;
}

const ListEmployee: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const navigator = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, [employees]);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get<Employee[]>(
        "http://localhost:8080/api/v1/employees"
      );
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const detailEmployee = (id: number) => {
    navigator(`/employee/${id}`);
  };

  function addEmployee() {
    navigator("/add-employees");
  }

  function editEmployee(id: number) {
    navigator(`/edit-employee/${id}`);
  }

  async function deleteEmployee(id: number) {
    try {
      await axios.delete(`http://localhost:8080/api/v1/employees/${id}`);
      alert("Deleted employee ID: " + id);
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}:`, error);
    }
  }

  return (
    <div className="container">
      <div className="h2 text-center m-3">ListEmployee</div>
      <button className="btn btn-primary" onClick={addEmployee}>
        New employee
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>{e.code}</td>
              <td>{e.name}</td>
              <td>{e.age}</td>
              <td>{e.gender ? "Nam" : "Nữ"}</td>
              <td>{e.address}</td>
              <td>{e.position.name}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => detailEmployee(e.id)}
                >
                  Detail
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => editEmployee(e.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEmployee(e.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
