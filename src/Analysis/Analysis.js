import { Layout } from 'antd'

import './Analysis.css'
import { Outlet } from 'react-router-dom'


function Analysis () {

  const { Content, Footer } = Layout

  return (
    <Layout>
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
      <Footer style={{ textAlign: 'center' }}>Review Mirror ©2022 Created by SLYNG</Footer>
    </Layout>
  )
}

export default Analysis