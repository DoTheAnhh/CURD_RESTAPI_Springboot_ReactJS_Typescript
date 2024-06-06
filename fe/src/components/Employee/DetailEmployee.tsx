import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, Form, Radio, Select } from "antd";

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
  const [position, setPosition] = useState<Position | null>(null);

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
      const res = await axios.get(`http://localhost:8080/api/v1/employees/${id}`);
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

  const backToList = () => {
    navigator("/employees");
  };

  return (
    <div className="container mt-5">
      <h2 className="h2 text-center m-3">Employee</h2>
      <Form layout="vertical">
        <Form.Item label="Code">
          <Input value={code} disabled />
        </Form.Item>
        <Form.Item label="Name">
          <Input value={name} disabled />
        </Form.Item>
        <Form.Item label="Age">
          <Input type="number" value={age} disabled />
        </Form.Item>
        <Form.Item label="Gender">
          <Radio.Group value={gender} disabled>
            <Radio value={true}>Male</Radio>
            <Radio value={false}>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Address">
          <Input value={address} disabled />
        </Form.Item>
        <Form.Item label="Position">
          <Select value={position?.name || ""} disabled>
            <Select.Option value="">-- Select Position --</Select.Option>
            {positions.map((p) => (
              <Select.Option key={p.id} value={p.name}>
                {p.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={backToList}>
            Back to list
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DetailEmployee;
