import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home/Home'
import Analysis from './Analysis/Analysis'
import Inforgraphic from './Infographic/Infographic'

import { Layout, Menu } from 'antd'


import './App.css'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'
Amplify.configure(awsExports)



function App () {
  const { Header, Content } = Layout
  return (
    <BrowserRouter>
      <Layout style={{ height: '100%' }}>
        <Header className="header">
          <div className="logo" ></div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys=''>
            <Menu.Item key="Home"><Link to='/Home'>Home</Link></Menu.Item>
            <Menu.Item key="Analysis"><Link to='/Analysis'>Analysis</Link></Menu.Item>
            <Menu.Item key="Inforgraphic"><Link to='/Inforgraphic'>Inforgraphic</Link></Menu.Item>
          </Menu>
        </Header>
        <Layout>

          <Layout style={{ padding: '0 5px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 0,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Routes>
                <Route path='/Home' element={<Home />}></Route>
                <Route path='/Analysis' element={<Analysis />}></Route>
                <Route path='/Inforgraphic' element={<Inforgraphic />}></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}



export default App
