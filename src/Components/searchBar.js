import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import CircularProgress from '@mui/material/CircularProgress'

import { API } from 'aws-amplify'
import { useState } from 'react'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function SearchBar () {
  const [purl, setPUrl] = useState('')
  const [open1, setOpen1] = useState(false)
  const [notiOpen, setNotiOpen] = useState(false)
  const [failOpen, setFailOpen] = useState(false)
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [fianlRem, setFinalRem] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setFailOpen(false)
  }

  const handleModalClose = () => {
    setOpen1(false)
  }

  const navigate = useNavigate()

  const base64Header = 'data:image/jpeg;base64,'
  var recommendation = ''
  var array1 = []
  var reviewsFiltered = []
  var reviewInfo = []
  var ProductRating = 0
  var url = ''
  var title = ''
  var mainImage = ''
  var reviewsTotal = ''
  var searchAlias = ''
  var newStarRating = 0
  var previousRating = 0
  var reviewReliability = ''
  var reliabilityBGC = ''
  var MFO = ''
  var PosNeg = ''

  const axios = require('axios')


  const queryStart = async () => {
    const params = { 'asin': findAsin(purl) }
    setNotiOpen(true)
    await API.get('Iteration1API', '/DB', { queryStringParameters: params })
      .then(response => {
        var timestamp = Date.parse(new Date())
        var timestamp2 = new Date(parseFloat(response.time_stamp) * 1000)
        console.log(response)
        if (response.existing === 'yes' &&
          parseInt(Math.abs(timestamp - timestamp2) / 1000 / 60 / 60 / 24) < 7) {

          if (response.reviewReliability >= 80) {
            reliabilityBGC = '#C3E5AE'
            recommendation = 'High reliability!\nYou can rely on reviews to make decisions'
          } else if (49 < response.reviewReliability && response.reviewReliability < 80) {
            reliabilityBGC = '#F1E1A6'
            recommendation = 'Moderate reliability!\nMost of the reviews are reliable, some may be fake reviews'
          } else {
            reliabilityBGC = '#F4BBBB'
            recommendation = 'Low reliability!\nPlease distinguish reviews carefully'
          }
          navigate('/PAnalyseResult', {
            state: {
              title: response.title,
              mainImage: response.mainImage,
              url: response.amazon_url,
              reviewsTotal: 'Total Ratings: ' + response.reviewsTotal,
              searchAlias: 'Categories: ' + response.searchAlias,
              newStarRating: parseFloat(response.newStarRating),
              previousRating: parseFloat(response.previousRating),
              reviewReliability: response.reviewReliability + "%",
              reliabilityBGC: reliabilityBGC,
              MFO: response.S3_MFO_url,
              PosNeg: response.S3_PosNeg_url,
              recommendation: recommendation,
              HowItWorks: "We have filtered out suspected unreliable star ratings and re-calculated the most recent 100 reviews for this product. The Adjusted Rating is the re-calculated result by our website.",
            }
          }, { replace: true })
          setFinalRem(recommendation)
          setOpen1(true)
          setNotiOpen(false)
        }
        else {
          onSearch(purl)
        }
        console.log(parseInt(Math.abs(timestamp - timestamp2) / 1000 / 60 / 60 / 24))
      })
      .catch(error => {


        console.log(error)
      })
  }

  const onSearch = async (value) => {
    const params = {
      api_key: "33F04810A8EF4F0A89C22F1110BCAB89",
      type: "product",
      url: value
    }
    // message.loading({ content: 'Data Collecting...', key, duration: 0 })

    await axios.get('https://api.rainforestapi.com/request', { params })
      .then(response => {
        console.log(response)
        if (response.data["request_info"]["success"] === true) {
          // print the JSON response from Rainforest API
          title = response.data['product']['title']
          if (typeof (response.data['product']['main_image']) !== 'undefined') {
            mainImage = response.data['product']['main_image']['link']
          }

          url = response.data['request_parameters']['url']
          reviewsTotal = 'Total Ratings: ' + response.data['product']['reviews_total']
          searchAlias = 'Categories: ' + response.data['product']['search_alias']['title']
          ProductRating = response.data['product']['rating']
          GetResult(value)
        }
        else {
          // message.error({ content: 'Failed!', key, duration: 2 })
          // openNotificationFL('topRight')
          setNotiOpen(false)
          setFailOpen(true)
        }
      }).catch(error => {
        // message.error({ content: 'Failed!', key, duration: 2 })
        // openNotificationFL('topRight')
        setNotiOpen(false)
        setFailOpen(true)
        console.log(error)

      })
  }

  const GetResult = async (value) => {
    // message.loading({ content: 'Analysing...', key, duration: 0 })

    for (let i = 1; i < 11; i++) {
      var params = {
        api_key: "33F04810A8EF4F0A89C22F1110BCAB89",
        type: "reviews",
        amazon_domain: findDomain(value),
        asin: findAsin(value),
        output: "json",
        sort_by: "most_recent",
        global_reviews: "true",
        language: "en_GB",
        page: i.toString()
      }

      await axios.get('https://api.rainforestapi.com/request', { params })
        //eslint-disable-next-line no-loop-func
        .then(response => {
          if (response.data['reviews'].length === 10) {
            var asin = response.data["request_parameters"]["asin"]
            var rating = response.data['summary']['rating']
            var reviewsTotal = response.data['summary']['reviews_total']
            if (mainImage === '') {
              mainImage = response.data['product']['image']
            }
            for (let j = 0; j < 10; j++) {
              var reviewId = response.data['reviews'][j]['id']
              var reviewTitle = response.data['reviews'][j]['title']
              var reviewBody = response.data['reviews'][j]['body']
              var reviewRating = response.data['reviews'][j]['rating']
              var reviewUTC = response.data['reviews'][j]['date']['utc']
              var reviewPID = response.data['reviews'][j]['profile']['id']

              // console.log(response.data)

              if (typeof (reviewId) == 'undefined') {
                reviewId = ' '
              }
              if (typeof (reviewTitle) == 'undefined') {
                reviewTitle = ' '
              }
              if (typeof (reviewBody) == 'undefined') {
                reviewBody = ' '
              }
              if (typeof (reviewRating) == 'undefined') {
                reviewRating = ' '
              }
              if (typeof (reviewUTC) == 'undefined') {
                reviewUTC = ' '
              }
              if (typeof (reviewPID) == 'undefined') {
                reviewPID = ' '
              }

              reviewTitle = reviewTitle.replaceAll("'", " ")
              reviewTitle = reviewTitle.replaceAll(/[\\]/g, " ")
              reviewTitle = reviewTitle.replaceAll('"', ' ')
              reviewBody = reviewBody.replaceAll("'", " ")
              reviewBody = reviewBody.replaceAll('"', ' ')
              reviewBody = reviewBody.replaceAll(/[\\]/g, ' ')

              var reviewInfoSingle = '{ "reviewId": "' + reviewId
                + '", "reviewTitle": "' + reviewTitle
                + '", "reviewBody": "' + reviewBody
                + '", "reviewRating": ' + reviewRating
                + ', "reviewUTC": "' + reviewUTC
                + '", "reviewPID": "' + reviewPID + '" }'

              array1[j] = ' "' + j + '" :' + reviewInfoSingle
              reviewsFiltered[i - 1] = response.data['summary']['reviews_total']
            }
          }
          else {
            array1.length = 0
          }
          if (array1.length > 0) {
            reviewInfo[i - 1] = '{ "asin": "' + asin + '", "summary": { "rating": ' + rating + ', "reviewsTotal": ' + reviewsTotal + ' }, "reviews": { ' + array1.join(", ") + "}}"
            console.log(reviewInfo[i - 1])
          }
        }).catch(error => {
          console.log(error)
        })
      if (array1.length === 0) {
        console.log(reviewInfo)
        break
      }
    }
    if (reviewInfo.length === 10) {
      const param = {
        "review1": reviewInfo[0],
        "review2": reviewInfo[1],
        "review3": reviewInfo[2],
        "review4": reviewInfo[3],
        "review5": reviewInfo[4],
        "review6": reviewInfo[5],
        "review7": reviewInfo[6],
        "review8": reviewInfo[7],
        "review9": reviewInfo[8],
        "review10": reviewInfo[9]
      }
      console.log(param)
      setNotiOpen(false)
      setLoadingOpen(true)
      await API.post('Iteration1API', '/Analysis', { body: param })
        .then(response => {
          console.log(response)

          setLoadingOpen(false)

          MFO = base64Header + response.MFO
          PosNeg = base64Header + response.PosNeg
          newStarRating = response.newStarRating
          previousRating = response.previousRating
          reviewReliability = response.review_reliability + "%"
          console.log(typeof (response.review_reliability))
          if (response.review_reliability >= 80) {
            reliabilityBGC = '#C3E5AE'
            recommendation = 'High reliability!\nYou can rely on reviews to make decisions'
          } else if (49 < response.review_reliability && response.review_reliability < 80) {
            reliabilityBGC = '#F1E1A6'
            recommendation = 'Moderate reliability!\nMost of the reviews are reliable, some may be fake reviews'
          } else {
            reliabilityBGC = '#F4BBBB'
            recommendation = 'Low reliability!\nPlease distinguish reviews carefully'
          }
          // openNotification('topRight')
          gotoItemAnalyse()
          // message.success({ content: 'Loaded!', key, duration: 2 })
          setNotiOpen(false)
          sendBack(value)
        })
        .catch(error => {

          console.log(error)
          console.log('send again')
          sendAgain(param)
          gotoItemAnalyse()
          sendBack(value)
        })



    }
    else {
      // message.success({ content: 'Loaded!', key, duration: 2 })

      gotoItemAnalyseNER()
      setFinalRem('Sorry, the number of reviews is less than 100, and we cannot provide analysis results. Too few reviews may cause deviations in the analysis results.')
      setOpen1(true)
      // openNotificationNER('topRight')
    }
  }

  const sendAgain = async (param) => {
    await API.post('Iteration1API', '/Analysis', { body: param })
      .then(response => {
        console.log(response)
        // message.success({ content: 'Loaded!', key, duration: 2 })
        MFO = base64Header + response.MFO
        PosNeg = base64Header + response.PosNeg
        newStarRating = response.newStarRating
        previousRating = response.previousRating
        reviewReliability = response.review_reliability + "%"
        console.log(typeof (response.review_reliability))
        if (response.review_reliability >= 80) {
          reliabilityBGC = '#C3E5AE'
          recommendation = 'High reliability!\nYou can rely on reviews to make decisions'
        } else if (49 < response.review_reliability && response.review_reliability < 80) {
          reliabilityBGC = '#F1E1A6'
          recommendation = 'Moderate reliability!\nMost of the reviews are reliable, some may be fake reviews'
        } else {
          reliabilityBGC = '#F4BBBB'
          recommendation = 'Low reliability!\nPlease distinguish reviews carefully'
        }
        // openNotification('topRight')
      })
  }



  const findAsin = value => {
    var urlArr = value.split('/')
    for (let i = 0; i < urlArr.length; i++) {
      if (urlArr[i] === 'dp') {
        return urlArr[i + 1].substring(0, 10)
      }
    }
  }

  const findDomain = value => {
    return value.split('/')[2].slice(4)
  }

  const gotoItemAnalyse = () => {
    navigate('/PAnalyseResult', {
      state: {
        title: title,
        mainImage: mainImage,
        url: url,
        reviewsTotal: reviewsTotal,
        searchAlias: searchAlias,
        newStarRating: newStarRating,
        previousRating: previousRating,
        reviewReliability: reviewReliability,
        reliabilityBGC: reliabilityBGC,
        MFO: MFO,
        PosNeg: PosNeg,
        recommendation: recommendation,
        HowItWorks: "We have filtered out suspected unreliable star ratings and re-calculated the most recent 100 reviews for this product. The Adjusted Rating is the re-calculated result by our website.",
      }
    }, { replace: true })

    setOpen1(true)
    setNotiOpen(false)
    setFinalRem(recommendation)
  }



  const gotoItemAnalyseNER = () => {
    navigate('/PAnalyseResult', {
      state: {
        title: title,
        mainImage: mainImage,
        url: url,
        reviewsTotal: 'Total Reviews: ' + reviewsFiltered[0],
        searchAlias: searchAlias,
        previousRating: ProductRating,
        newStarRating: 0,
        reviewReliability: 'Not Enough Reviews',
        recommendation: 'Sorry, the number of reviews is less than 100, and we cannot provide analysis results. Too few reviews may cause deviations in the analysis results.',
        HowItWorks: "We have filtered out suspected unreliable star ratings and re-calculated the most recent 100 reviews for this product. The Adjusted Rating is the re-calculated result by our website."
      }
    }, { replace: true })

    setOpen1(true)
    setNotiOpen(false)
    setFinalRem('Sorry, the number of reviews is less than 100, and we cannot provide analysis results. Too few reviews may cause deviations in the analysis results.')
  }

  const sendBack = (value) => {
    const params = {
      info: '{ "title": "' + title +
        '", "mainImage": "' + mainImage +
        '", "url": "' + url +
        '", "reviewsTotal": "' + reviewsTotal +
        '", "searchAlias": "' + searchAlias +
        '", "newStarRating": "' + newStarRating +
        '", "previousRating": "' + previousRating +
        '", "reviewReliability": "' + reviewReliability +
        '", "MFO": "' + MFO +
        '", "PosNeg": "' + PosNeg +
        '", "asin": "' + findAsin(value) + '" }'
    }
    console.log(params)
    API.post('Iteration1API', '/DB', { body: params })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={2}
        justifyContent="center"
      >
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Please paste your Amazon url here!"
            onBlur={e => setPUrl(e.target.value)}
            style={{ height: '50px', }}
          />
          <Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
          <Button onClick={queryStart}>Analyse</Button>
        </Paper>
      </Stack>

      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={notiOpen}
          key='noti'
        >
          <Alert severity="info" icon={false} ><CircularProgress size='15px' color='error' /> &nbsp;&nbsp;&nbsp;Hold on, Mr. Server is working hard to fetch data !</Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={failOpen}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Query failed, please make sure to enter a correct amazon url
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={loadingOpen}
          autoHideDuration={6000}
        >
          <Alert severity="warning" icon={false} ><CircularProgress size='15px' color='error' /> &nbsp;&nbsp;&nbsp;Analysis is in progress, the result will arrive in a few seconds.</Alert>
        </Snackbar>
        <Dialog
          fullWidth={true}
          open={open1}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleModalClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Recommendation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {fianlRem}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Confirm!</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )

}
export default SearchBar