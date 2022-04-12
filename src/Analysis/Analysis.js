import { useState } from 'react'
import Amplify, { API } from 'aws-amplify'

import { Layout, Menu } from 'antd'
import { Input } from 'antd'
import { Button } from 'antd'

import './Analysis.css'


function Analysis () {

  const { Content } = Layout
  const [review, setReview] = useState('')
  const [result, setResult] = useState('')
  const [analysePogress, setAanalysePogress] = useState('')
  const { TextArea } = Input

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
      <Content
        className="site-layout-background"
        style={{
          padding: 0,
          margin: 0,
          minHeight: 280,
          height: '100%'
        }}
      >
        <div className="frame-1 flex-col-hstart-vstart clip-contents" style={{ height: '100%', width: '100%' }}>
          <div className="group-3610 flex-col-hcenter" style={{ height: '100%', width: '100%' }}>
            <p className="txt-8107 flex-hcenter">ANALYZE A REVIEW</p>
            <p className="txt-547 flex-hcenter">Find out if this review was handwritten or computer generated</p>
            <div className="_-04-textarea-01-textarea flex-col-hcenter-vstart">
              <div>
                <TextArea rows={4} placeholder="Paste Your Review Here!"
                  maxLength={16}
                  style={{ height: '200px', width: '400px' }}
                  onBlur={e => setReview(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button type="primary" onClick={GetResult}>Submit</Button>
            </div>
            <div>{AnalyseResult()}</div>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default Analysis