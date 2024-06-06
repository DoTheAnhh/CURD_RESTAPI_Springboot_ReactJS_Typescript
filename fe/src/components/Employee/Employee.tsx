import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, Form, Radio, Select, message } from "antd";

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
  const [position, setPosition] = useState<Position | null>(null);

  const [positions, setPositions] = useState<Position[]>([]);

  const navigator = useNavigate();
  const { id } = useParams();

  const employee = { code, name, age, gender, address, position };

  useEffect(() => {
    fetchPosition();
    if (id) {
      fetchEmployee(Number(id));
    }
  }, [id]);

  const fetchPosition = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/positions/all");
      setPositions(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEmployee = async (id: number) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/employees/${id}`);
      const employeeData = res.data;
      setCode(employeeData.code);
      setName(employeeData.name);
      setAge(employeeData.age);
      setGender(employeeData.gender);
      setAddress(employeeData.address);
      if (employeeData.position) {
        setPosition({
          id: employeeData.position.id,
          name: employeeData.position.name,
        });
      } else {
        setPosition(null);
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const validateForm = (): boolean => {
    if (!code.trim()) {
      message.error("Code is required.");
      return false;
    }
    if (!name.trim()) {
      message.error("Name is required.");
      return false;
    }
    if (age === undefined || isNaN(age)) {
      message.error("Age is required.");
      return false;
    }
    if (gender === undefined) {
      message.error("Gender is required.");
      return false;
    }
    if (!address.trim()) {
      message.error("Address is required.");
      return false;
    }
    if (!position) {
      message.error("Position is required.");
      return false;
    }
    return true;
  };

  const handleAddOrUpdateEmployee = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/v1/employees/${id}`, employee);
      } else {
        await axios.post("http://localhost:8080/api/v1/employees", employee);
      }
      navigator("/employees");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const backToList = () => {
    navigator("/employees");
  };

  return (
    <div className="container mt-5">
      <Form layout="vertical">
        <Form.Item label="Code" required>
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
        </Form.Item>
        <Form.Item label="Name" required>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Age" required>
          <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </Form.Item>
        <Form.Item label="Gender" required>
          <Radio.Group value={gender} onChange={(e) => setGender(e.target.value)}>
            <Radio value={true}>Male</Radio>
            <Radio value={false}>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Address" required>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Item>
        <Form.Item label="Position" required>
          <Select
            value={position ? position.name : ""}
            onChange={(value) => {
              const selectedPosition = positions.find((p) => p.name === value);
              setPosition(selectedPosition || null);
            }}
          >
            <Select.Option value="">-- Select Position --</Select.Option>
            {positions.map((p) => (
              <Select.Option key={p.id} value={p.name}>
                {p.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAddOrUpdateEmployee}>
            Submit
          </Button>
          <Button type="default" className="ms-2" onClick={backToList}>
            Back to list
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Employee;
