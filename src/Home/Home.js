import './Home.css'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import SearchBar from '../Components/searchBar'

function Home () {

  return (
    <Layout>
      <div className="description flex-col-hstart-vstart" style={{ width: '100%', height: '100' }}>
        <div className="group-128 flex-col-hcenter" style={{ width: '100%', height: '100%' }}>
          <p className="txt-866 flex-hcenter" style={{ color: 'white' }}>REVIEW MIRROR </p>
          <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <SearchBar></SearchBar>
          </div>
          <p className="txt-842 flex-hcenter" style={{ color: 'white', marginTop: '20px' }}>
            ReviewMirror is a website tool to help users to gain insightful information from reviews as well as to detect product on e-commerce sites which has fake reviews.
          </p>
          <div >
            <Link to='/Analysis/ReviewAnalyse'><Button type="primary">Analyse Single Review</Button></Link>
          </div>
          <div style={{ marginTop: "20px" }}>
            <p className="txt-842 flex-hcenter" style={{ color: 'white' }}>Currently we support urls from: <img src={require('../Components/amazon.jpg')} style={{ width: '75px' }} alt=''></img></p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home