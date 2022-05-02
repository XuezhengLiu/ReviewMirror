import './Home.css'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

function Home () {
  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <div className="description flex-col-hstart-vstart" style={{ width: '100%', height: '100%' }}>
          <div className="group-128 flex-col-hcenter" style={{ width: '100%', height: '100%' }}>
            <p className="txt-866 flex-hcenter" style={{ color: 'white' }}>REVIEW MIRROR </p>
            <p className="txt-842 flex-hcenter" style={{ color: 'white' }}>
              ReviewMirror is a website tool to help users to gain insightful information from reviews as well as to detect product on e-commerce sites which has fake reviews.<br></br>You can find more about fake reviews in the information page
            </p>
            <div>
              <Link to='/Analysis/ReviewAnalyse'><Button type="primary">Get Start Now</Button></Link>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', height: '750px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#131313' }}>
          <div >
            <p style={{ marginLeft: '25px', color: 'white', fontSize: '36px', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>How Review Mirror Helps Shopping </p>
            <iframe width="560" height="315" style={{ marginTop: '25px', marginLeft: '50px' }} src="https://www.youtube.com/embed/dxIWBAI494g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p className="txt-842 flex-hcenter" style={{ marginTop: '50px', color: 'white' }}>
              Click Get Start at above to copy and paste product review you have doubts and to check its authenticity. <br></br>Would like to know whether the overall review for a specific product reliable? Copy and paste the online product URL from Amazon at the navigation bar.
            </p>
          </div>
          <div></div>
        </div>


      </div>
    </>
  )
}

export default Home