import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, Form, message } from "antd";

const Position: React.FC = () => {
  const [name, setName] = useState<string>("");
  const { id } = useParams();
  const navigator = useNavigate();

  const validateForm = (): boolean => {
    if (!name.trim()) {
      message.error("Name is required.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (id) {
      fetchPosition(Number(id));
    }
  }, [id]);

  const fetchPosition = async (id: number) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/positions/${id}`
      );
      const positionData = res.data;
      setName(positionData.name);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrUpdatePosition = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const position = { name };
      if (id) {
        await axios.put(
          `http://localhost:8080/api/v1/positions/${id}`,
          position
        );
      } else {
        await axios.post("http://localhost:8080/api/v1/positions", position);
      }
      navigator("/positions");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Form layout="vertical">
        <Form.Item label="Name" required>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAddOrUpdatePosition}>
            Submit
          </Button>
          <Button
            type="default"
            className="ms-2"
            onClick={() => navigator("/positions")}
          >
            Back to list
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Position;
