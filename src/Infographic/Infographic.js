import MediaCard from "../Components/MediaCard"
import { Layout, Menu } from 'antd'




function Inforgraphic () {
  const { Content, Sider } = Layout
  return (
    <Layout>
      <Sider width={200} >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', width: '100%', borderRight: 0, padding: 0 }}
          float={'borderLeft'}
        >
          <Menu.Item key="1">Articles</Menu.Item>
          <Menu.Item key="2">Videos</Menu.Item>
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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <MediaCard
            img='./Ranni.jpg '
            title='The Market for Fake Reviews'
            introduction='test content'
            type='Article'
            link='https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3664992'
          >
          </MediaCard>
          <MediaCard
            img='./Ranni.jpg '
            title='How Reliable Are Amazon Reviews?'
            introduction='test content'
            type='Article'
            link='https://towardsdatascience.com/how-reliable-are-amazon-reviews-eb8c454c96a4'
          >
          </MediaCard>
          <MediaCard
            img='./Ranni.jpg '
            title='How to Spot a Fake Review on Amazon'
            introduction='test content'
            type='Article'
            link='https://www.pcmag.com/how-to/spot-a-fake-review-on-amazon'
          >
          </MediaCard>
        </div>
      </Content>
    </Layout>
  )
}

export default Inforgraphic