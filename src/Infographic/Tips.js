import { Card, Col, Row } from 'antd'


function Tips () {
  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Tips 1" bordered={false}>
              Actually read the reviews, don’t just go by the overall score to make an impulse purchase. Read through the reviews and keep an eye out for anything suspicious.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Tips 2" bordered={false}>
              Ignore the five-star ratings. Check the four, three and two-star reviews and it’s likely you’ll be getting more honest opinions.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Tips 3" bordered={false}>
              Check the most recent ratings. Fake reviewers have ways of manipulating reviews, so they appear more helpful, and move to the top of the default list where they're most likely to be seen. You can change the sort order from 'Top reviews’ to 'Most recent’ to get a more reliable idea of the most recent reviewer experiences.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Tips 4" bordered={false}>
              Take extra care buying unknown brands. If you don't recognize a brand, check online to see if it has a legitimate looking website, with clear contact details so you can get in touch if anything goes wrong. You could even try calling or emailing the seller with a question, to see how quickly they respond.
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default Tips