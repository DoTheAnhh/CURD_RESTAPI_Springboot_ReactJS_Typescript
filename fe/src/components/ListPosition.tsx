import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ListPosition = () => {

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        fetchPosition()
    }, [])

    const fetchPosition = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/positions')
            setPositions(res.data)
        }catch (error) {
            console.error("Error fetching data:", error);
        }
    }

  return (
    <div>ListPosition</div>
  )
}

export default ListPosition