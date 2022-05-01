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
        title = response.data['product']['title']
        mainImage = response.data['product']['main_image']['link']
        reviewsTotal = 'Total Reviews: ' + response.data['product']['reviews_total']
        searchAlias = 'Categories: ' + response.data['product']['search_alias']['title']
      }).catch(error => {
        // catch and print the error
        console.log(error)

      })

    GetResult(value)
  }

  const GetResult = async (value) => {

    for (let i = 1; i < 3; i++) {
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
      // "review3": reviewInfo[2],
      // "review4": reviewInfo[3],
      // "review5": reviewInfo[4],
      // "review6": reviewInfo[5],
      // "review7": reviewInfo[6],
      // "review8": reviewInfo[7],
      // "review9": reviewInfo[8],
      // "review10": reviewInfo[9]
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
        openNotification('top')
      })
      .catch(error => {
        message.error({ content: 'Failed!', key, duration: 2 })
        console.log(error)
      })
    gotoItemAnalyse()
    sendBack(value)
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
        reviewsTotal: reviewsTotal,
        searchAlias: searchAlias,
        newStarRating: newStarRating,
        previousRating: previousRating,
        reviewReliability: reviewReliability,
        reliabilityBGC: reliabilityBGC,
        MFO: MFO,
        PosNeg: PosNeg
      }
    }, { replace: true })
  }

  const test1 = 'qqq'
  const test2 = 'www'

  const sendBack = (value) => {
    const params = {
      info: '{ "title": "' + title +
        '", "mainImage": "' + mainImage +
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

    <Search placeholder="Paste your url here!" onSearch={onSearch} style={{ width: '700px' }} enterButton />
  )

}
export default SearchBar