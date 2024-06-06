import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "antd";

interface Position {
  id: number;
  name: string;
}

const ListPosition: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const navigator = useNavigate();

  const updatePosition = (id: number) => {
    navigator(`/edit-positions/${id}`);
  };

  useEffect(() => {
    fetchPosition();
  }, []);

  const fetchPosition = async () => {
    try {
      const res = await axios.get<Position[]>(
        "http://localhost:8080/api/v1/positions"
      );
      setPositions(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      align: 'center' as const,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as const,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center' as const,
      render: (record: Position) => (
        <Button type="primary" onClick={() => updatePosition(record.id)}>
          Update
        </Button>
      ),
    },
  ];

  return (
    <div className="container mt-3">
      <Table
        columns={columns}
        dataSource={positions}
        rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default ListPosition;
