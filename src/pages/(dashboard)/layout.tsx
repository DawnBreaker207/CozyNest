import React, { useState } from 'react';
import {
  AppstoreOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <AppstoreOutlined />,
              label: <NavLink to={`/admin`}>Dashboard</NavLink>
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: <NavLink to={`/admin/products`}>Product Manager</NavLink>
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: <NavLink to={`/admin/`}>Order Manager</NavLink>
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: <NavLink to={`/admin/`}>Customer Manager</NavLink>
            },
            {
              key: '5',
              icon: <UploadOutlined />,
              label: <NavLink to={`/admin/`}>Reports</NavLink>
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Controller</Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          CozyNest Controller {new Date().getFullYear()} Created by CozyNest Group
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;