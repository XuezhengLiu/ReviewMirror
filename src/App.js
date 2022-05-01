import Home from './Home/Home'
import Analysis from './Analysis/Analysis'
import ReviewAnalyse from './Analysis/ReviewAnalyse'
import ItemAnalyse from './Analysis/ItemAnalyse'
import ApiTest from './Analysis/test'
import Inforgraphic from './Infographic/Infographic'
import Article from "./Infographic/Atricle"
import Video from "./Infographic/Video"
import Tips from "./Infographic/Tips"
import SearchBar from './Components/searchBar'
import { API } from 'aws-amplify'
import { Layout, Menu, Dropdown } from 'antd'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'

import "./css/NavBar.css"
import './App.css'
Amplify.configure(awsExports)



function App () {
  const { Content } = Layout

  const ServerRun = async () => {

    const params = { 'review': 'Good Product' }
    console.log(params)
    await API.get('Iteration1API', '/Analysis', { queryStringParameters: params })
      .then(response => {
        console.log('Running')
      })
      .catch(error => {
        ServerRun()
      })
  }



  const menuForAnalysis = (
    <Menu>
      <Menu.Item key="0">
        <Link to='/Analysis/ReviewAnalyse'>Analyse Review</Link>
      </Menu.Item>
      <Menu.Divider />
      {/* <Menu.Item key="1">
        <Link to='/Analysis/ItemAnalyse'>Analyse Item</Link>
      </Menu.Item> */}
      {/* <Menu.Item key="2">
        <Link to='/Analysis/ApiTest'>ApiTest</Link>
      </Menu.Item> */}
    </Menu>
  )

  const menuForInformation = (
    <Menu>
      <Menu.Item key="0">
        <Link to='/Infographic/Articles'>Articles</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Link to='/Infographic/Videos'>Videos</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Link to='/Infographic/Tips'>Tips</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <BrowserRouter>
      <Layout style={{ height: '100%' }} onLoad={ServerRun}>
        <div className="navbar flex-row-vcenter-hsb" style={{ width: '100%', background: '#000', color: '#FFF' }}>
          <div className="logo flex-row-vcenter-hsb">
            <img src={require('./Components/Eric logo 4.6.png')} alt='' style={{ width: '120px', height: '30px' }} />
          </div>
          <div className='flex-row-vcenter-hsb'>
            <SearchBar></SearchBar>
          </div>
          <div className="frame-321 flex-row-vcenter-hsb">
            <Link to='/Home/*'><a style={{ color: 'white' }}>Home</a></Link>
            <Dropdown overlay={menuForAnalysis} placement="bottom" arrow={{ pointAtCenter: true }}>
              <a style={{ color: 'white' }}>Analysis</a>
            </Dropdown>
            <Dropdown overlay={menuForInformation} placement="bottomRight" arrow={{ pointAtCenter: true }}>
              <a style={{ color: 'white' }}>Information</a>
            </Dropdown>
          </div>
        </div>
        <Layout>

          <Layout style={{ height: '100%' }}>
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
                <Route path='/Analysis/*' element={<Analysis />}>
                  <Route path='*' element={<Analysis />}></Route>
                  <Route path='ReviewAnalyse' element={<ReviewAnalyse />}></Route>
                  <Route path='ItemAnalyse' element={<ItemAnalyse />}></Route>
                  <Route path='ApiTest' element={<ApiTest />}></Route>
                </Route>
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
