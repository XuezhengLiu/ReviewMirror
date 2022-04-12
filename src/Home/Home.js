import './Home.css'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

function Home () {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="description flex-col-hstart-vstart" style={{ width: '100%', height: '100%' }}>
        <div className="group-128 flex-col-hcenter" style={{ width: '100%', height: '100%' }}>
          <p className="txt-866 flex-hcenter" style={{ color: 'white' }}>REVIEW MIRROR </p>
          <p className="txt-842 flex-hcenter" style={{ color: 'white' }}>
            ReviewMirror is a website tool to help users to gain insightful information from reviews as well as to detect product on e-commerce sites which has fake reviews.<br></br>You can find more about fake reviews in the information page
          </p>
          <div>
            <Link to='/Analysis/*'><Button type="primary">Get Start Now</Button></Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home