import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, InfoCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MoreOutlined, PlusCircleOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import ListEmployee from "./components/Employee/ListEmployee";
import Employee from "./components/Employee/Employee";
import DetailEmployee from "./components/Employee/DetailEmployee";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import logo from './assets/logo.png';
import Home from "./components/Home/Home";
import ListPosition from "./components/Position/ListPosition";
import Position from "./components/Position/Position";

const { Header, Sider, Content } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-container" onClick={() => navigate("/home")}>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => navigate("/home")}>
            Home
          </Menu.Item>
          <Menu.SubMenu key="2" icon={<UserOutlined />} title="Employee">
            <Menu.Item key="2-1" icon={<UnorderedListOutlined />} onClick={() => navigate("/employees")}>Employees</Menu.Item>
            <Menu.Item key="2-2" icon={<PlusCircleOutlined />}onClick={() => navigate("/add-employee")}>Add Employee</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="3" icon={<InfoCircleOutlined />} title="Position">
            <Menu.Item key="3-1" icon={<UnorderedListOutlined />} onClick={() => navigate("/positions")}>Positions</Menu.Item>
            <Menu.Item key="3-2" icon={<PlusCircleOutlined />}onClick={() => navigate("/add-position")}>Add Position</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="4" icon={<MoreOutlined />} onClick={() => navigate("/")}>
            Other
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: '#fff',
            overflow: 'auto',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/employees" element={<ListEmployee />} />
            <Route path="/add-employee" element={<Employee />} />
            <Route path="/edit-employee/:id" element={<Employee />} />
            <Route path="/employee/:id" element={<DetailEmployee />} />
            <Route path="/positions" element={<ListPosition />} />
            <Route path="/add-position" element={<Position />} />
            <Route path="/edit-positions/:id" element={<Position />} />
          </Routes>
        </Content>
      </Layout>
    </>
  );
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
