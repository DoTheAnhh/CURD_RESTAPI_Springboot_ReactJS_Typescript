import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Position: React.FC = () => {
  const [name, setName] = useState<string>("");

  const { id } = useParams();

  const position = { name };

  const navigator = useNavigate();

  function backToList() {
    navigator("/positions");
  }

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
    try {
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
    <div className="container">
      <div>
        <label className="form-label fw-bold">Name</label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <button
          className="btn btn-primary mt-5"
          onClick={handleAddOrUpdatePosition}
        >
          Submit
        </button>
        <button className="btn btn-danger mt-5 ms-4" onClick={backToList}>
          Back to list
        </button>
      </div>
    </div>
  );
};

export default Position;
