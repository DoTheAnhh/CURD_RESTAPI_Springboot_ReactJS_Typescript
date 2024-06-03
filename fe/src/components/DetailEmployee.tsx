import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Position {
  id: number;
  name: string;
}

const DetailEmployee: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<boolean>();
  const [address, setAddress] = useState<string>("");
  const [position, setPosition] = useState<Position | null>();

  const [positions, setPositions] = useState<Position[]>([]);

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    fetchPosition();
    if (id) {
      fetchEmployee(Number(id));
    }
  }, [id]);

  const fetchPosition = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/positions");
      setPositions(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEmployee = async (id: number) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/employees/${id}`
      );
      const employeeData = res.data;
      setCode(employeeData.code);
      setName(employeeData.name);
      setAge(employeeData.age);
      setGender(employeeData.gender);
      setAddress(employeeData.address);
      setPosition(employeeData.position);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  function backToList(){
    navigator("/employees")
  }

  return (
    <div className="container">
      <h2 className="h2 text-center m-3">Employee</h2>
      <div>
        <label className="form-label fw-bold">Code</label>
        <input
          className="form-control"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled
        />
      </div>
      <div>
        <label className="form-label fw-bold">Name</label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled
        />
      </div>
      <div>
        <label className="form-label fw-bold">Age</label>
        <input
          className="form-control"
          type="text"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          disabled
        />
      </div>
      <div>
        <label className="form-label fw-bold">Gender</label>
        <input
          type="radio"
          value="Nam"
          checked={gender}
          onChange={() => setGender(true)}
          disabled
        />
        Nam
        <input
          type="radio"
          value="Nữ"
          checked={!gender}
          onChange={() => setGender(false)}
          disabled
        />
        Nữ
      </div>
      <div>
        <label className="form-label fw-bold">Address</label>
        <input
          className="form-control"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled
        />
      </div>
      <div>
        <label className="form-label fw-bold">Position</label>
        <select
          className="form-control"
          value={position?.name || ""}
          onChange={(e) => {
            const selectedPosition = positions.find(
              (p) => p.name === e.target.value
            );
            setPosition(selectedPosition || null);
          }}
          disabled
        >
          <option value="">-- Select Position --</option>
          {positions.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button className="btn btn-primary mt-3" onClick={backToList}>Back to list</button>
      </div>
    </div>
  );
};

export default DetailEmployee;
