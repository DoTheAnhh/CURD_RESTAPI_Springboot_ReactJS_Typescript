// src/components/Home/Home.tsx
import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import './Home.css';

const { Content } = Layout;

const Home: React.FC = () => {
  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="hero-section">
        </div>
        <div className="site-layout-content" style={{ padding: 24, minHeight: 280 }}>
          <Row gutter={20} className='mt-5'>
            <Col span={8}>
              <Card
                hoverable
                cover={<img alt="example" src="https://via.placeholder.com/300" />}
                className="feature-card"
              >
                <Card.Meta title="Feature 1" description="Description of Feature 1" />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                cover={<img alt="example" src="https://via.placeholder.com/300" />}
                className="feature-card"
              >
                <Card.Meta title="Feature 2" description="Description of Feature 2" />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                cover={<img alt="example" src="https://via.placeholder.com/300" />}
                className="feature-card"
              >
                <Card.Meta title="Feature 3" description="Description of Feature 3" />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
