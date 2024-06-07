import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Pagination, Col } from "antd";
import "./css/Position.css";

interface Position {
  id: number;
  name: string;
}

const ListPosition: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // State để theo dõi trang hiện tại
  const [pageSize, setPageSize] = useState<number>(3); // Số mục trên mỗi trang
  const [total, setTotal] = useState<number>(0); // Tổng số phần tử
  const navigator = useNavigate();

  const updatePosition = (id: number) => {
    navigator(`/edit-positions/${id}`);
  };

  useEffect(() => {
    fetchPosition();
  }, [currentPage, pageSize]);

  const fetchPosition = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/positions`, {
        params: {
          page: currentPage - 1,
          size: pageSize,
        },
      });
      setPositions(res.data.content);
      setTotal(res.data.totalElements);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleExcelExport = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/positions/export`, {
        responseType: 'blob' // Đặt kiểu dữ liệu phản hồi là blob
      });

      // Tạo một URL tạm thời từ dữ liệu blob để tải xuống tệp Excel
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Tạo một thẻ a để tạo và kích hoạt sự kiện click để tải xuống tệp Excel
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'positons.xlsx');
      link.click();
    } catch (error) {
      console.error('Error exporting Excel:', error);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      align: "center" as const,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center" as const,
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (record: Position) => (
        <Button type="primary" onClick={() => updatePosition(record.id)}>
          Update
        </Button>
      ),
    },
  ];

  return (
    <div className="container mt-3">
      <Col xs={24} md={12} lg={8}>
            <div className="text-center" style={{ marginRight: "-1410px", marginBottom: "20px" }}>
              <Button
                type="primary"
                className="me-2"
                onClick={handleExcelExport}
              >
                Excel export
              </Button>
            </div>
          </Col>
      <Table
        columns={columns}
        dataSource={positions}
        rowKey="id"
        pagination={false}
        bordered
      />
      <Pagination
        className="pagination-container"
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange}
        onShowSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default ListPosition;
