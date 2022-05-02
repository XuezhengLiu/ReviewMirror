import { useState } from 'react'
import { API } from 'aws-amplify'
import { notification, Button, message, Input } from 'antd'
import './Analysis.css'


function ReviewAnalyse () {
  const [review, setReview] = useState('')
  const { TextArea } = Input

  const key = 'updatable'

  var Aresult = ''

  const GetResult = async () => {

    message.loading({ content: 'Analysing...', key, duration: 0 })
    const params = { 'review': review }
    console.log(params)
    await API.get('Iteration1API', '/Analysis', { queryStringParameters: params })
      .then(response => {
        Aresult = response.result
        message.success({ content: 'Success!', key, duration: 2 })
        openNotification('topRight')
      })
      .catch(error => {
        GetResult()
      })
  }

  const openNotification = placement => {
    const key = `open${Date.now()}`
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        Ok!
      </Button>
    )
    notification.open({
      description: Aresult,
      btn,
      key,
      placement,
      duration: 0
    })
  }

  return (
    <>
      <div className="frame-1 flex-col-hstart-vstart clip-contents" style={{ height: '100%', width: '100%' }}>
        <div className="group-3610 flex-col-hcenter" style={{ height: '100%', width: '100%' }}>
          <p className="txt-8107 flex-hcenter">ANALYZE A REVIEW</p>
          <p className="txt-547 flex-hcenter">Find out if this review was human written or computer generated</p>
          <div className="_-04-textarea-01-textarea flex-col-hcenter-vstart">
            <div>
              <TextArea rows={4} maxLength={512} placeholder="Paste Your Review Here!"
                style={{ height: '200px', width: '400px' }}
                onBlur={e => setReview(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button type="primary" onClick={GetResult}>Submit</Button>
          </div>
        </div>
      </div>

    </>
  )

}
export default ReviewAnalyse