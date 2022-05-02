import { notification, Button, message, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { API } from 'aws-amplify'

function SearchBar () {

  const navigate = useNavigate()
  const { Search } = Input

  const base64Header = 'data:image/jpeg;base64,'
  const key = 'updatable'
  var recommendation = ''
  var array1 = []
  var reviewInfo = []

  var ProductRating = 0
  var title = ''
  var mainImage = ''
  var url = ''
  var reviewsTotal = ''
  var searchAlias = ''
  var newStarRating = 0
  var previousRating = 0
  var reviewReliability = ''
  var reliabilityBGC = ''
  var MFO = ''
  var PosNeg = ''


  const axios = require('axios')
  const queryStart = async (value) => {
    const params = { 'asin': findAsin(value) }
    message.loading({ content: 'Loading...', key, duration: 0 })
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

          navigate('/Analysis/ItemAnalyse', {
            state: {
              title: response.title,
              mainImage: response.mainImage,
              url: response.amazon_url,
              reviewsTotal: 'Total Reviews: ' + response.reviewsTotal,
              searchAlias: 'Categories: ' + response.searchAlias,
              newStarRating: parseFloat(response.newStarRating),
              previousRating: parseFloat(response.previousRating),
              reviewReliability: response.reviewReliability + "%",
              reliabilityBGC: reliabilityBGC,
              MFO: response.S3_MFO_url,
              PosNeg: response.S3_PosNeg_url,
              HowItWorks: "We have filtered out suspected unreliable star ratings and re-calculated the first 100 reviews for this product. The Adjusted Rating is the re-calculated result by our website.",
            }
          }, { replace: true })
          openNotification('topRight')
          message.success({ content: 'Loaded!', key, duration: 2 })
        }
        else {
          onSearch(value)
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
    message.loading({ content: 'Loading...', key, duration: 0 })

    await axios.get('https://api.rainforestapi.com/request', { params })
      .then(response => {
        if (response.data["request_info"]["success"] === true) {
          // print the JSON response from Rainforest API
          title = response.data['product']['title']
          mainImage = response.data['product']['main_image']['link']
          url = response.data['request_parameters']['url']
          reviewsTotal = 'Total Reviews: ' + response.data['product']['reviews_total']
          searchAlias = 'Categories: ' + response.data['product']['search_alias']['title']
          ProductRating = response.data['product']['rating']
          GetResult(value)
        }
        else {
          message.error({ content: 'Failed!', key, duration: 2 })
          openNotificationFL('topRight')
        }
      }).catch(error => {
        message.error({ content: 'Failed!', key, duration: 2 })
        openNotificationFL('topRight')
        console.log(error)

      })
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
          if (response.data['reviews'].length === 10) {
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
      await API.post('Iteration1API', '/Analysis', { body: param })
        .then(response => {
          console.log(response)
          message.success({ content: 'Loaded!', key, duration: 2 })

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
          openNotification('topRight')
        })
        .catch(error => {
          message.error({ content: 'Failed!', key, duration: 2 })
          console.log(error)
          // API.post('Iteration1API', '/Analysis', { body: param })
          //   .then(response => {
          //     console.log(response)
          //     message.success({ content: 'Loaded!', key, duration: 2 })

          //     MFO = base64Header + response.MFO
          //     PosNeg = base64Header + response.PosNeg
          //     newStarRating = response.newStarRating
          //     previousRating = response.previousRating
          //     reviewReliability = response.review_reliability + "%"
          //     console.log(typeof (response.review_reliability))
          //     if (response.review_reliability >= 80) {
          //       reliabilityBGC = '#C3E5AE'
          //       recommendation = 'High reliability!\nYou can rely on reviews to make decisions'
          //     } else if (49 < response.review_reliability && response.review_reliability < 80) {
          //       reliabilityBGC = '#F1E1A6'
          //       recommendation = 'Moderate reliability!\nMost of the reviews are reliable, some may be fake reviews'
          //     } else {
          //       reliabilityBGC = '#F4BBBB'
          //       recommendation = 'Low reliability!\nPlease distinguish reviews carefully'
          //     }
          //     openNotification('topRight')
          // })
        })

      gotoItemAnalyse()
      sendBack(value)
    }
    else {
      message.success({ content: 'Loaded!', key, duration: 2 })
      gotoItemAnalyseNER()
      openNotificationNER('topRight')
    }
  }

  const openNotification = placement => {
    const key = `open${Date.now()}`
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        Ok!
      </Button>
    )
    notification.open({
      message: 'Recommendation',
      description: recommendation,
      btn,
      key,
      placement,
      duration: 0
    })
  }

  const openNotificationNER = placement => {
    const key = `open${Date.now()}`
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        Ok!
      </Button>
    )
    notification.open({
      message: 'Insufficient data',
      description: 'Not enough reviews to analyse',
      btn,
      key,
      placement,
      duration: 0
    })
  }

  const openNotificationFL = placement => {
    const key = `open${Date.now()}`
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        Ok!
      </Button>
    )
    notification.open({
      message: 'Bad Request',
      description: 'Not an Amazon URL',
      btn,
      key,
      placement,
      duration: 0
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
    navigate('/Analysis/ItemAnalyse', {
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
        HowItWorks: "We have filtered out suspected unreliable star ratings and re-calculated the first 100 reviews for this product. The Adjusted Rating is the re-calculated result by our website.",
      }
    }, { replace: true })
  }



  const gotoItemAnalyseNER = () => {
    navigate('/Analysis/ItemAnalyse', {
      state: {
        title: title,
        mainImage: mainImage,
        url: url,
        reviewsTotal: reviewsTotal,
        searchAlias: searchAlias,
        previousRating: ProductRating,
        newStarRating: 0,
        reviewReliability: 'Not Enough Reviews',
        HowItWorks: 'Not enough reviews may lead to inaccuracy result.'
      }
    }, { replace: true })
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
    <Search placeholder="Paste your url here!" onSearch={queryStart} style={{ width: '700px' }} />
  )

}
export default SearchBar