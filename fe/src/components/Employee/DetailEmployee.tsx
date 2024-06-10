import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Typography } from "antd";
const { Text } = Typography;

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
  const [email, setEmail] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  const formRef = useRef(null);

  useEffect(() => {
    if (id) {
      fetchEmployee(Number(id));
    }
  }, [id]);

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
      setEmail(employeeData.email);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const backToList = () => {
    navigate("/employees");
  };

  return (
    <div className="container mt-5">
      <h2 className="h2 text-center m-3">Employee</h2>
      <Form layout="vertical" ref={formRef}>
        <Form.Item label="Code">
          <Text type="success">{code}</Text>
        </Form.Item>
        <Form.Item label="Name">
          <Text type="success">{name}</Text>
        </Form.Item>
        <Form.Item label="Age">
          <Text type="success">{age}</Text>
        </Form.Item>
        <Form.Item label="Gender">
          <Text type="success">{gender ? "Male" : "Female"}</Text>
        </Form.Item>
        <Form.Item label="Address">
          <Text type="success">{address}</Text>
        </Form.Item>
        <Form.Item label="Position">
          <Text type="success">{position?.name}</Text>
        </Form.Item>
        <Form.Item label="Email">
          <Text type="success">{email}</Text>
        </Form.Item>
        <Form.Item label="Password">
          <Text type="success">{"••••••••"}</Text>
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
