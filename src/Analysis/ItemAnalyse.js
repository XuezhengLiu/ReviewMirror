import './ItemAnalyse.css'
import { Image } from 'antd'
import { Rate } from 'antd'
import { Divider, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

function ItemAnalyse () {
  const location = useLocation()

  const imgStyle = {
    borderRadius: '10px',
    boxShadow: '0 0 5px rgba(0,0,0,.5)'
  }

  return (
    <>
      <div className='Item'>
        <div className='ItemImg'>
          <Image
            width={'75%'}
            src={location.state.mainImage}
            preview={false}
            style={imgStyle}
          />
        </div>
        <div className='ItemInfo'>
          <div className='title'>
            <h2>{location.state.title}</h2>
          </div>
          <div className='information'>
            <h3 style={{ marginTop: '20px' }}>{location.state.reviewsTotal}</h3>
            <h3 style={{ marginTop: '20px', marginLeft: '100px' }}>{location.state.searchAlias}</h3>
          </div>
        </div>
        <div className='CorrectedRating'>
          <h4>Review Reliability</h4>
          <div className='BGCR' style={{ backgroundColor: location.state.reliabilityBGC }}>    {location.state.reviewReliability}
          </div>

          <Rate allowHalf disabled value={location.state.newStarRating} />
          <Tooltip title={location.state.newStarRating}>
            <h5>Adjusted Rating</h5>
          </Tooltip>

          <Tooltip title={location.state.previousRating}>
            <Rate allowHalf disabled value={location.state.previousRating} />
            <h5>Original Rating</h5>
          </Tooltip>
          <div style={{ marginTop: '20px' }}>
            <Tooltip title="Recalculte the rating">
              <span style={{ fontFamily: 'Poppins, sans-serif' }}>How it works   <QuestionCircleOutlined /></span>
            </Tooltip>
          </div>

        </div>
      </div>
      <Divider orientation="left">Word Cloud</Divider>
      <div className='Result'>
        <div className='AResult1'>
          <div className='sencondTitle'>
            <h1>High Frequency Words</h1>
          </div>
          <div className='wordCloud'>
            <Image
              width={'60%'}
              src={location.state.MFO}
              preview={true}
              style={imgStyle}
            />
          </div>
        </div>
        <div className='AResult2'>
          <div className='sencondTitle'>
            <h1>Review Sentiment</h1>
          </div>
          <div className='wordCloud'>
            <Image
              width={'60%'}
              src={location.state.PosNeg}
              preview={true}
              style={imgStyle}
            />
          </div>
        </div>
      </div>

    </>
  )

}

export default ItemAnalyse