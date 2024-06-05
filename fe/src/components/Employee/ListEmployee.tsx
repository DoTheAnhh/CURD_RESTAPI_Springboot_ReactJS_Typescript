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
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = async (searchName: string) => {
    try {
      let res;
      if (searchName.trim() === "") {
        res = await axios.get<Employee[]>(
          "http://localhost:8080/api/v1/employees"
        );
      } else {
        const encodedSearchName = encodeURIComponent(searchName.trim());
        res = await axios.get<Employee[]>(
          `http://localhost:8080/api/v1/employees/search?name=${encodedSearchName}`
        );
      }
      setEmployees(res.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const navigator = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, []);

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

  const editEmployee = (id: number) => {
    navigator(`/edit-employee/${id}`);
  };

  const deleteEmployee = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/employees/${id}`);
      alert("Deleted employee ID: " + id);
      fetchEmployee();
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}:`, error);
    }
  };

  return (
    <div className="container">
      <div className="mt-3 mb-3">
        <label className="form-label fw-bold" htmlFor="search">
          Search
        </label>
        <input
          className="form-control"
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-2">
              <div className="fw-bold">Gender</div>
              <select className="form-select">
                
                <option value="">All</option>
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
            <div className="col-2">
              <div className="fw-bold">Position</div>
              <select className="form-select">
                <option value="">All</option>
                <option value="">Admin</option>
                <option value="">User</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-striped">
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
              <td>{e.gender ? "Male" : "Female"}</td>
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
