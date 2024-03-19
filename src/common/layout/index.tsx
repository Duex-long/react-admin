import React, { useEffect, useState } from 'react'
import './layout.less'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout as LayoutAntd, Menu, Button, theme } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { roleRoutes } from '@/router/routes'
import GlobalHeader from '../header'

const { Header, Sider, Content } = LayoutAntd

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const location = useLocation()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    const { pathname } = location
    setSelectedKeys([pathname.replace(/^\//i, '')])
  }, [location])

  return (
    <LayoutAntd style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={roleRoutes.map(({ parent, name, icon, path }) => ({
            key: parent + '/' + path,
            label: name.toLocaleUpperCase(),
            icon: <Link to={path}>{icon}</Link>,
          }))}
        />
      </Sider>
      <LayoutAntd>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          /> */}
          <GlobalHeader />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 16,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  )
}

export default Layout
