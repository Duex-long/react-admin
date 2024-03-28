import React, { Suspense, useEffect, useState } from 'react'
import './layout.less'
import { Flex, Layout as LayoutAntd, Menu, Spin, theme } from 'antd'

import {
  Await,
  Link,
  Outlet,
  useLoaderData,
  useLocation,
} from 'react-router-dom'
import { roleRoutes } from '@/router/routes'
import { GlobalHeader, GlobalUserInfo } from '@/common/global/index'
import { useDispatch } from 'react-redux'
import { setRoleRoutes } from '@/store/global'

const { Header, Sider, Content } = LayoutAntd

const Layout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const dispach = useDispatch()
  const { info } = useLoaderData() as {
    info: Promise<{ route: { [x: string]: string }[] }>
  }

  info.then((res) => {
    const { route } = res
    if (Array.isArray(route)) {
      // RoleRoutePipe
      // dispach(setRoleRoutes(route))
    }
    console.log('res,拿到数据', route)
  })

  const waitNavRender = () => {
    return (
      <div className="index-skeleton">
        <Flex align="center" justify="center" flex="1" className="full-page">
          <Spin />
        </Flex>
      </div>
    )
  }
  const SideRender = () => {
    const location = useLocation()
    const [collapsed] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    const menuClick = (e: { key: string }) => {
      const { key } = e
      console.log(key)
    }
    useEffect(() => {
      const { pathname } = location
      const currentSelectKey = pathname.replace(/^\//i, '')
      setSelectedKeys([currentSelectKey])
    }, [location])

    return (
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Suspense fallback={waitNavRender()}>
          <Await resolve={info}>
            {() => (
              <>
                {/* {console.log(info, 'SideRender-info')} */}
                <div className="demo-logo-vertical">
                  <GlobalUserInfo />
                </div>
                <Menu
                  theme="dark"
                  mode="inline"
                  selectedKeys={selectedKeys}
                  onClick={menuClick}
                  items={roleRoutes.map(({ parent, name, icon, path }) => ({
                    key: parent + '/' + path,
                    label: name.toLocaleUpperCase(),
                    icon: <Link to={path}>{icon}</Link>,
                  }))}
                />
              </>
            )}
          </Await>
        </Suspense>
      </Sider>
    )
  }

  const ContentRender = () => {
    return (
      <Suspense fallback={waitNavRender()}>
        <Await resolve={info}>{() => <Outlet />}</Await>
      </Suspense>
    )
  }

  return (
    <LayoutAntd style={{ minHeight: '100vh' }}>
      <SideRender />

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
          <ContentRender />
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  )
}

export default Layout
