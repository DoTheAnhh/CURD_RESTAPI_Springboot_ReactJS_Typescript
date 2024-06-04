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

  const removeVietnameseTones = (str: string): string => {
    // Function to remove Vietnamese tones
    str = str.replace(/[\u0300-\u036f]/g, "");
    str = str.normalize("NFD");
    str = str.replace(/Đ/g, "D").replace(/đ/g, "d");
    str = str.replace(/[^a-zA-Z0-9\s]/g, "");
    return str;
  };

  const handleSearch = async (searchName: string) => {
    try {
      let res;
      const normalizedSearchName = removeVietnameseTones(searchName.trim());
      if (normalizedSearchName === "") {
        res = await axios.get<Employee[]>("http://localhost:8080/api/v1/employees");
      } else {
        const encodedSearchName = encodeURIComponent(normalizedSearchName);
        res = await axios.get<Employee[]>(`http://localhost:8080/api/v1/employees/search?name=${encodedSearchName}`);
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
      const res = await axios.get<Employee[]>("http://localhost:8080/api/v1/employees");
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const detailEmployee = (id: number) => {
    navigator(`/employee/${id}`);
  };

  const addEmployee = () => {
    navigator("/add-employees");
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
      <div className="h2 text-center m-3">ListEmployee</div>
      <div className="mt-3 mb-3">
        <label className="form-label fw-bold" htmlFor="search">Search</label>
        <input
          className="form-control"
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" onClick={addEmployee}>New employee</button>
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
                <button className="btn btn-success" onClick={() => detailEmployee(e.id)}>Detail</button>
                <button className="btn btn-warning" onClick={() => editEmployee(e.id)}>Update</button>
                <button className="btn btn-danger" onClick={() => deleteEmployee(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
