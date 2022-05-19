import '../css/ProductAnalyse.css'
import notEnoughReview from '../images/notEnoughReview.jpg'

import * as React from 'react'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'
import QuestionMarkSharpIcon from '@mui/icons-material/QuestionMarkSharp'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

import SearchBar from '../components/SearchBar'

import { useLocation } from 'react-router-dom'
import { API } from 'aws-amplify'
import { useState } from 'react'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function ProductAnalyse () {
  const location = useLocation()

  const [open, setOpen] = useState(true)

  console.log(location.state.recommendation)

  // if (typeof (location.state.recommendation) !== 'undefined') {
  //   setOpen(true)
  // }

  const handleClose = () => {
    setOpen(false)
  }
  var title = location.state.title

  if (title.length > 25) {
    title = title.substring(0, 25) + '...'
  }


  const img = location.state.mainImage

  var MFO = ''
  if (typeof (location.state.MFO) === 'undefined') {
    MFO = notEnoughReview
  }
  else {
    MFO = location.state.MFO
  }

  var PosNeg = ''
  if (typeof (location.state.PosNeg) === 'undefined') {
    PosNeg = notEnoughReview
  }
  else {
    PosNeg = location.state.PosNeg
  }

  const ServerRun = async () => {

    const params = { 'review': 'Good Product' }
    console.log(params)
    await API.get('Iteration1API', '/Analysis', { queryStringParameters: params })
      .then(response => {
        console.log('Running')
      })
      .catch(error => {
        ServerRun()
      })
  }
  return (
    <div className="productAnalyse" onLoad={ServerRun}>
      <div className="container rowOne">
        <div className="row paRowOne">
          <div className="col-xs-0 col-sm-1 col-md-1 col-lg-1"></div>
          <div className='col-xs-12 col-sm-12 col-md-3 col-md-push-7 col-lg-3 col-lg-push-7 searchBar'>
            <SearchBar></SearchBar>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-7 col-md-pull-3 col-lg-7 col-lg-pull-3 productInfo">
            <div className='imgContainer'>
              <a href={location.state.url} target='_blank' rel="noreferrer">
                <img src={img} className="pImg" alt="..." />
              </a>
            </div>
            <div className="titleGroup">
              <h3 className='h3PTitle'>{title}</h3>
              <h5>{location.state.reviewsTotal}</h5>
              <h5>{location.state.searchAlias}</h5>
              <Tooltip title={location.state.newStarRating} placement="top" arrow>
                <h5 className='paH5'>Adjusted Rating:</h5>
              </Tooltip>
              <Rating name="half-rating-read" size="large" value={location.state.newStarRating} precision={0.5} readOnly />
            </div>
            <div className="col-xs-0 col-sm-1 col-md-1 col-lg-1"></div>
          </div>
        </div >
        <div className="container rowTwo">
          <div className='row paRowTwo'>
            <div className="col-xs-0 col-sm-0 col-md-2 col-lg-2"></div>
            <div className="col-xs-10 col-sm-10 col-md-3 col-md-push-5 col-lg-3 col-lg-push-5 columnRight">
              <div className='aTitle'>
                <h3>Review Reliability</h3>
              </div>
              <div className='aResult'>
                <div className='BGCR' style={{ backgroundColor: location.state.reliabilityBGC }}>
                  {location.state.reviewReliability}
                </div>
                <div className='ratingGroup'>
                  <Tooltip title={location.state.newStarRating} placement="top" arrow>
                    <h5 className='paH5'>Adjusted Rating</h5>
                  </Tooltip>
                  <Rating name="half-rating-read" size="large" value={location.state.newStarRating} precision={0.5} readOnly />
                  <Tooltip title={location.state.previousRating} placement="top" arrow>
                    <h5 className='paH5'>Original Rating</h5>
                  </Tooltip>
                  <Rating name="half-rating-read" size="large" value={location.state.previousRating} precision={0.5} readOnly />
                  <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Tooltip title={location.state.HowItWorks} placement="top" arrow>
                      <span style={{ cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>How it works <QuestionMarkSharpIcon></QuestionMarkSharpIcon></span>
                    </Tooltip>
                  </div>

                  <span style={{ cursor: 'pointer', fontFamily: 'Poppins, sans-serif', marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>Complain to the government about fake reviews</span>
                  <a href='https://www.accc.gov.au/consumers/complaints-problems/make-a-consumer-complaint' target={'_blank'} rel="noreferrer">
                    <Button variant="contained">Make a Report!</Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xs-10 col-sm-10 col-md-5 col-md-pull-3 col-lg-5 col-lg-pull-3 columnLeft">
              <div>
                <div className='aTitle'>
                  <h2>High Frequency Words</h2>
                </div>
                <span className='pSpan'>This chart shows the most frequency words that used for describing the product from its reviews.</span>
                <br></br>
                <br></br>
                <Divider />
                <div className="imgBox">
                  <img src={MFO} className="aImg" alt="..." />
                </div>
              </div>
              <div>
                <div className='aTitle'>
                  <h2>Review Sentiments</h2>
                </div>
                <span className='pSpan'>This chart shows the most frequently used positive and negative words in product reviews. Help you to estimate other customers satisfaction.</span>
                <br></br>
                <br></br>
                <Divider />
                <div className="imgBox">
                  <img src={PosNeg} className="aImg" alt="..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Recommendation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {location.state.recommendation}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Confirm!</Button>
        </DialogActions>
      </Dialog>
    </div>

  )

}

export default ProductAnalyse