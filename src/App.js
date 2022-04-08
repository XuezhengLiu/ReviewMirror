import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home/Home'
import Analysis from './Analysis/Analysis'
import Inforgraphic from './Infographic/Infographic'
import Article from "./Infographic/Atricle"
import Video from "./Infographic/Video"
import Tips from "./Infographic/Tips"
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
            <Menu.Item key="Home"><Link to='/Home/*'>Home</Link></Menu.Item>
            <Menu.Item key="Analysis"><Link to='/Analysis/*'>Analysis</Link></Menu.Item>
            <Menu.Item key="Inforgraphic"><Link to='/Infographic/*'>Information</Link></Menu.Item>
          </Menu>
        </Header>
        <Layout>

          <Layout style={{ padding: '0 5px', height: '100%' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 0,
                margin: 0,
                minHeight: 280,
                height: '100%'
              }}
            >
              <Routes>
                <Route path='' element={<Home />}></Route>
                <Route path='/Home/*' element={<Home />}></Route>
                <Route path='/Analysis/*' element={<Analysis />}></Route>
                <Route path='/Infographic/*' element={<Inforgraphic />}>
                  <Route path='*' element={<Article />}></Route>
                  <Route path='Articles' element={<Article />}></Route>
                  <Route path='Videos' element={<Video />}></Route>
                  <Route path='Tips' element={<Tips />}></Route>
                </Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}



export default App
