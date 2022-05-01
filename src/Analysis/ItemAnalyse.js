import './ItemAnalyse.css'
import { useState } from 'react'
import { Image } from 'antd'
import { Rate } from 'antd'
import { Divider, Tooltip } from 'antd'
import { Input } from 'antd'
import { message } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { API } from 'aws-amplify'

function ItemAnalyse () {
  const base64Header = 'data:image/jpeg;base64,'
  const [title, setTitle] = useState('Renpho Powerful Portable Massage Gun, Quiet Deep Tissue Mini Workout Gun Massager for Back Neck Percussion for Foot Massage, Muscle Massagers with 3200rpm Motor Rechargeable Battery Gifts')
  const [mainImage, setmainImage] = useState("https://m.media-amazon.com/images/I/61rZsFQ6HDS.jpg")
  const [reviewsTotal, setReviewsTotal] = useState(5120)
  const [searchAlias, setSearchAlias] = useState('Manual Massage Tools')
  const [newStarRating, setNewStarRating] = useState(0)
  const [previousRating, setPreviousRating] = useState(0)
  const [reviewReliability, setReviewReliability] = useState(73)
  const [reliabilityBGC, setReliabilityBGC] = useState('yellow')
  const [MFO, setMFO] = useState('')
  const [PosNeg, setPosNeg] = useState('')
  const { Search } = Input


  const key = 'updatable'
  var array1 = []
  var reviewInfo = []

  const axios = require('axios')

  const imgStyle = {
    borderRadius: '10px',
    boxShadow: '0 0 5px rgba(0,0,0,.5)'
  }

  const onSearch = async (value) => {
    const params = {
      api_key: "33F04810A8EF4F0A89C22F1110BCAB89",
      type: "product",
      url: value
    }
    message.loading({ content: 'Loading...', key, duration: 0 })

    await axios.get('https://api.rainforestapi.com/request', { params })
      .then(response => {

        // print the JSON response from Rainforest API
        setTitle(response.data['product']['title'])
        setmainImage(response.data['product']['main_image']['link'])
        setReviewsTotal(response.data['product']['reviews_total'])
        setSearchAlias(response.data['product']['search_alias']['title'])
      }).catch(error => {
        // catch and print the error
        console.log(error)

      })

    GetResult(value)
  }

  const GetResult = async (value) => {

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
        .then(response => {
          var asin = response.data["request_parameters"]["asin"]
          var rating = response.data['summary']['rating']
          var reviewsTotal = response.data['summary']['reviews_total']
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
            reviewTitle = reviewTitle.replaceAll('"', ' ')
            reviewBody = reviewBody.replaceAll("'", " ")
            reviewBody = reviewBody.replaceAll('"', ' ')

            var reviewInfoSingle = '{ "reviewId": "' + reviewId
              + '", "reviewTitle": "' + reviewTitle
              + '", "reviewBody": "' + reviewBody
              + '", "reviewRating": ' + reviewRating
              + ', "reviewUTC": "' + reviewUTC
              + '", "reviewPID": "' + reviewPID + '" }'

            array1[j] = ' "' + j + '" :' + reviewInfoSingle
          }
          reviewInfo[i - 1] = '{ "asin": "' + asin + '", "summary": { "rating": ' + rating + ', "reviewsTotal": ' + reviewsTotal + ' }, "reviews": { ' + array1.join(", ") + "}}"
          console.log(reviewInfo[i - 1])
        }).catch(error => {
          console.log(error)
        })
    }

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
    await API.post('Iteration1API', '/Analysis', { body: param })
      .then(response => {
        console.log(response)
        message.success({ content: 'Loaded!', key, duration: 2 })

        setMFO(base64Header + response.MFO)
        setPosNeg(base64Header + response.PosNeg)
        setNewStarRating(response.newStarRating)
        setPreviousRating(response.previousRating)
        setReviewReliability(response.review_reliability + "%")
        console.log(typeof (response.review_reliability))
        if (response.review_reliability >= 80) {
          setReliabilityBGC('green')
        } else if (49 < response.review_reliability < 80) {
          setReliabilityBGC('yellow')
        } else {
          setReliabilityBGC('red')
        }
      })
      .catch(error => {
        message.error({ content: 'Failed!', key, duration: 2 })
        console.log(error)
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

  return (
    <>
      <div className='searchBar'>
        <Search placeholder="Paste your url here!" onSearch={onSearch} style={{ width: '400px' }} enterButton />
      </div>
      <div className='Item'>
        <div className='ItemImg'>
          <Image
            width={'75%'}
            src={mainImage}
            preview={false}
            style={imgStyle}
          />
        </div>
        <div className='ItemInfo'>
          <div className='title'>
            <h2>{title}</h2>
          </div>
          <div className='information'>
            <h3 style={{ marginTop: '20px' }}>Total Reviews: {reviewsTotal}</h3>
            <h3 style={{ marginTop: '20px', marginLeft: '100px' }}>Categories: {searchAlias}</h3>
          </div>
        </div>
        <div className='CorrectedRating'>
          <h4>Review Reliability</h4>
          <div className='BGCR' style={{ backgroundColor: reliabilityBGC }}>    {reviewReliability}
          </div>

          <Rate allowHalf disabled value={newStarRating} />
          <h5>Adjusted Rating</h5>

          <Rate allowHalf disabled value={previousRating} />
          <h5>Orginal Rating</h5>
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
              src={MFO}
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
              src={PosNeg}
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