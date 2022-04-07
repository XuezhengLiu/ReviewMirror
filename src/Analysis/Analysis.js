import { useState } from 'react'
import Amplify, { API } from 'aws-amplify'

import { Layout, Menu } from 'antd'
import { Input } from 'antd'
import { Button } from 'antd'


function Analysis () {

  const { Content, Sider } = Layout
  const [review, setReview] = useState('')
  const [result, setResult] = useState('')
  const [analysePogress, setAanalysePogress] = useState('')

  const GetResult = async () => {

    setAanalysePogress('loading')
    const params = { 'review': review }
    console.log(params)
    await API.get('Iteration1API', '/Analysis', { queryStringParameters: params })
      .then(response => {
        setResult(response.result)
        setAanalysePogress('loaded')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const AnalyseResult = () => {
    switch (analysePogress) {
      case 'loading':
        return <h2>Analysing</h2>
      case 'loaded':
        return <h2>{result}</h2>
      case 'noResult':
        return <h2>Result not found</h2>
      default:
        break
    }
  }


  return (
    <Layout>
      <Sider width={200} >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', width: '100%', borderRight: 0, padding: 0 }}
          float={'borderLeft'}
        >
          <Menu.Item key="1">Analyse Reviews</Menu.Item>
          <Menu.Item key="2">Deceptive Reviews</Menu.Item>
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
        <div>
          <Input
            placeholder="Review"
            onBlur={e => setReview(e.target.value)}
          />
          <Button type="primary" onClick={GetResult}>Submit</Button>
          <div>{AnalyseResult()}</div>
        </div>
      </Content>
    </Layout>
  )
}

export default Analysis