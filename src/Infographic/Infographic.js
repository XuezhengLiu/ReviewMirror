
import { Layout, Menu } from 'antd'
import { Routes, Route, Link } from 'react-router-dom'
import { Outlet } from "react-router-dom"




function Inforgraphic () {
  const { Content, Sider } = Layout
  return (
    <Layout style={{ height: '100%' }}>
      <Sider style={{ height: '100%', width: 200 }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['']}
          style={{ height: '100%', width: '100%', borderRight: 0, padding: 0 }}
          float={'borderLeft'}
        >
          <Menu.Item key="1"><Link to='/Infographic/Articles'>Articles</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/Infographic/Videos'>Videos</Link></Menu.Item>
          <Menu.Item key="3"><Link to='/Infographic/Tips'>Tips</Link></Menu.Item>
        </Menu>
      </Sider>
      <Content
        className="site-layout-background"
        style={{
          padding: 0,
          margin: 0,
          minHeight: 280,
          height: '100%'
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  )
}

export default Inforgraphic