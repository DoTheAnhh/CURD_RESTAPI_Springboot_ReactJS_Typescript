import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Position {
  id: number;
  name: string;
}

const ListPosition: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  const navigator = useNavigate();

  const updatePosition = (id: number) => {
    navigator(`/edit-positions/${id}`)
  }

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

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>
                <button className="btn btn-warning" onClick={() => updatePosition(p.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPosition;
