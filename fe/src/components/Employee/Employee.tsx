import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Position {
    id: number;
    name: string;
}

const Employee: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<boolean>();
  const [address, setAddress] = useState<string>("");
  const [position, setPosition] = useState<Position | null>();

  const [positions, setPositions] = useState<Position[]>([]);

  const navigator = useNavigate();

  const { id } = useParams();

  const employee = { code, name, age, gender, address, position };

  useEffect(() => {
    fetchPosition()  
    if(id){
        fetchEmployee(Number(id));
    }
  }, [id]);

  const fetchPosition = async () => {
    try {
        const res = await axios.get('http://localhost:8080/api/v1/positions')
        setPositions(res.data)
    }catch (error) {
        console.error("Error fetching data:", error);
    }
  }

  const fetchEmployee = async (id: number) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/v1/employees/${id}`)
        const employeeData = res.data
        setCode(employeeData.code)
        setName(employeeData.name)
        setAge(employeeData.age)
        setGender(employeeData.gender)
        setAddress(employeeData.address)
        if (employeeData.position) {
            setPosition({
              id: employeeData.position.id,
              name: employeeData.position.name
            });
          } else {
            setPosition(null);
          }
    } catch (error) {
        console.error("Error fetching employee:", error);
    }
  }

  const handleAddOrUpdateEmployee = async () => {
    try {
        if(id){
            await axios.put(`http://localhost:8080/api/v1/employees/${id}`, employee);
        }else{
            await axios.post("http://localhost:8080/api/v1/employees", employee);

        }
        navigator("/positions")
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  function backToList(){
    navigator("/employees")
  }

  return (
    <div className="container">
        <div>
            <label className="form-label fw-bold">Code</label>
            <input className="form-control" type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
        </div>
        <div>
            <label className="form-label fw-bold">Name</label>
            <input  className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
            <label className="form-label fw-bold">Age</label>
            <input  className="form-control" type="text" value={age} onChange={(e) => setAge(Number(e.target.value))}/>
        </div>  
        <div>
            <label className="form-label fw-bold">Gender</label>
            <input type="radio" value="Nam" checked={gender} onChange={() => setGender(true)}/>Nam
            <input type="radio" value="Nữ" checked={!gender} onChange={() => setGender(false)}/>Nữ
        </div>
        <div>
            <label className="form-label fw-bold">Address</label>
            <input  className="form-control" type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <div>
            <label className="form-label fw-bold">Position</label>
            <select className="form-control" value={position?.name || ''} onChange={(e) => {
                const selectedPosition = positions.find(p => p.name === e.target.value)
                setPosition(selectedPosition || null)
            }}>
                <option value="">-- Select Position --</option>
                {positions.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
            </select>
        </div>
        <div>
            <button className="btn btn-primary mt-5" onClick={handleAddOrUpdateEmployee}>Submit</button>
            <button className="btn btn-danger mt-5 ms-4" onClick={backToList}>Back to list</button>
        </div>
    </div>
  )
};

export default Employee;
