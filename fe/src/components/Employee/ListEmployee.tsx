import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Select, Input, Button } from "antd";

import {Row, Col } from "antd";

const { Option } = Select;

interface Employee {
  id: number;
  code: string;
  name: string;
  age: number;
  gender: boolean;
  address: string;
  position: {
    name: string;
  };
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

      const res = await axios.get<Employee[]>(url);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleSearch(value, gender, position);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
    handleSearch(searchTerm, value, position);
  };

  const handlePositionChange = (value: string) => {
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

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      align: 'center' as const,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as const,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      align: 'center' as const,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center' as const,
      render: (gender: boolean) => (gender ? 'Male' : 'Female'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center' as const,
    },
    {
      title: 'Position',
      dataIndex: ['position', 'name'],
      key: 'position',
      align: 'center' as const,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center' as const,
      render: (record: Employee) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" className="me-2" onClick={() => detailEmployee(record.id)}>Detail</Button>
          <Button type="primary" className="me-2" onClick={() => editEmployee(record.id)}>Update</Button>
          <Button type="primary" onClick={() => deleteEmployee(record.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="mt-3 mb-3">
      <Input
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search"
        allowClear
        style={{ width: '100%' }}
      />
    </div>
    <div className="container mt-3">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8}>
          <div className="fw-bold mb-2">Gender</div>
          <Select
            value={gender}
            onChange={handleGenderChange}
            style={{ width: '100%' }}
            placeholder="Select Gender"
          >
            <Option value="">All</Option>
            <Option value="true">Male</Option>
            <Option value="false">Female</Option>
          </Select>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <div className="fw-bold mb-2">Position</div>
          <Select
            value={position}
            onChange={handlePositionChange}
            style={{ width: '100%' }}
            placeholder="Select Position"
          >
            <Option value="">All</Option>
            <Option value="Admin">Admin</Option>
            <Option value="User">User</Option>
          </Select>
        </Col>
      </Row>
    </div>
      <Table
        className="table table-striped mt-3"
        columns={columns}
        dataSource={employees}
        rowKey="id"
      />
    </div>
  );
};

export default ListEmployee;
