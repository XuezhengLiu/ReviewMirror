import { Layout } from 'antd'
import { Carousel } from 'antd'

function Home () {
  const { Sider, Content } = Layout
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }
  return (
    <Layout style={{
      height: '100%',
    }}>
      <Sider style={{
        height: '100%',
        width: 200,
      }} className="site-layout-background">
        <div style={{ position: 'absolute', top: '50px' }}>
          <h4>ReviewMirror is a website tool to help users to gain insightful information from reviews as well as to detect product on e-commerce sites which has fake reviews.</h4>
        </div>
        <div style={{ position: 'absolute', top: '250px' }}>
          <h4>In recent studies, it has been discovered that over 97% of consumers refer to other customer reviews to make their purchasing decisions. This has catered for a big market of fake reviews on such platforms. The presence of fake reviews causes a loss of confidence, with 85% of consumers believing the reviews they read were "sometimes or often fake".</h4>
        </div>
      </Sider>
      <Layout style={{ padding: '0 5px 5px', height: '100%' }}>
        <Content
          className="site-layout-background"
          style={{
            height: '100%',
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Carousel autoplay>
            <div>
              <img src={require('../Components/6.jpeg')} alt='' style={{ width: '1200px', height: '500px' }} />
            </div>
            <div>
              <img src={require('../Components/7.jpeg')} alt='' style={{ width: '1200px', height: '500px' }} />
            </div>
            <div>
              <img src={require('../Components/8.jpeg')} alt='' style={{ width: '1200px', height: '500px' }} />
            </div>
          </Carousel>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Home