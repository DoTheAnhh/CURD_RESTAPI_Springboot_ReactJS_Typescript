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

  const [gender, setGender] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const handleSearch = async (
    searchName: string,
    selectedGender: string,
    selectedPosition: string
  ) => {
    try {
      let url = `http://localhost:8080/api/v1/employees/search?`;

      if (searchName) {
        url += `&name=${encodeURIComponent(searchName)}`;
      }

      if (selectedGender) {
        url += `&gender=${selectedGender}`;
      }
      if (selectedPosition) {
        url += `&position=${encodeURIComponent(selectedPosition)}`;
      }

      if (searchTerm == "") {
        const res = await axios.get<Employee[]>(url);
        setEmployees(res.data);
      } else {
        const res = await axios.get<Employee[]>(url);
        setEmployees(res.data);
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleSearch(value, gender, position);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setGender(value);
    handleSearch(searchTerm, value, position);
  };

  const handlePositionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setPosition(value);
    handleSearch(searchTerm, gender, value);
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
        <input
          className="form-control"
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <div className="fw-bold">Gender</div>
            <select
              className="form-select"
              value={gender}
              onChange={handleGenderChange}
            >
              <option value="">All</option>
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
          </div>
          <div className="col-md-3">
            <div className="fw-bold">Position</div>
            <select
              className="form-select"
              value={position}
              onChange={handlePositionChange}
            >
              <option value="">All</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>
      </div>
      <table className="table table-striped mt-3">
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
              <td className="d-flex justify-content-center">
                <button
                  className="btn btn-success me-2"
                  onClick={() => detailEmployee(e.id)}
                >
                  Detail
                </button>
                <button
                  className="btn btn-warning me-2"
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
