import { Button } from 'antd'
import { API } from 'aws-amplify'
// import { Input } from 'antd'
// import { useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
function Test () {
  // const navigate = useNavigate()
  // let location = useLocation()
  // const { Search } = Input
  // var array1 = []
  // const [title] = useState(location.state.title)
  // const [number] = useState(location.state.newStarRating)
  // var url = 'https://www.amazon.com.au/Ergonomic-Computer-Retractable-Armrests-Headrest/dp/B09PNK5ZR8?pf_rd_r=9J6248NQN8E1MFAH3ZQF&pf_rd_p=f9717906-b9f6-44b6-ad1d-00d0debd178a&pd_rd_r=dac23aa5-d55b-4491-b757-a76a2976dd65&pd_rd_w=zFJ7N&pd_rd_wg=gfV3C&ref_=pd_gw_unk'
  // var reviewInfo = []

  // const axios = require('axios')
  // const goToAna = () => {
  //   navigate('/Analysis/ItemAnalyse')
  // }

  // const GetResult = async () => {
  //   array1 = url.split('/')
  //   console.log(array1)

  //   for (let i = 1; i < 3; i++) {
  //     var params = {
  //       api_key: "33F04810A8EF4F0A89C22F1110BCAB89",
  //       type: "reviews",
  //       amazon_domain: "amazon.com.au",
  //       asin: "B073JYC4XM",
  //       output: "json",
  //       sort_by: "most_recent",
  //       global_reviews: "true",
  //       page: i.toString()
  //     }
  //     await axios.get('https://api.rainforestapi.com/request', { params })
  //       .then(response => {
  //         var asin = response.data["request_parameters"]["asin"]
  //         var rating = response.data['summary']['rating']
  //         var reviewsTotal = response.data['summary']['reviews_total']
  //         for (let j = 0; j < 10; j++) {
  //           var reviewId = response.data['reviews'][j]['id']
  //           var arr = response.data['reviews'][j]['title'].split("'")
  //           var reviewTitle = arr.join()
  //           var reviewBody = response.data['reviews'][j]['body']
  //           var reviewRating = response.data['reviews'][j]['rating']
  //           var reviewUTC = response.data['reviews'][j]['date']['utc']
  //           var reviewPID = response.data['reviews'][j]['profile']['id']

  //           var reviewInfoSingle = '{ "reviewId": "' + reviewId
  //             + '", "reviewTitle": "' + reviewTitle
  //             + '", "reviewBody": "' + reviewBody
  //             + '", "reviewRating": ' + reviewRating
  //             + ', "reviewUTC": "' + reviewUTC
  //             + '", "reviewPID": "' + reviewPID + '" }'

  //           array1[j] = ' "' + j + '" :' + reviewInfoSingle
  //         }
  //         reviewInfo[i - 1] = '{ "asin": "' + asin + '", "summary": { "rating": ' + rating + ', "reviewsTotal": ' + reviewsTotal + ' }, "reviews": { ' + array1.join(", ") + "}}"
  //         console.log(reviewInfo[i - 1])
  //       }).catch(error => {
  //         console.log(error)
  //       })
  //   }

  //   const param = {
  //     "review1": reviewInfo[0],
  //     "review2": reviewInfo[1],
  //     // "review3": reviewInfo[2],
  //     // "review4": reviewInfo[3],
  //     // "review5": reviewInfo[4],
  //     // "review6": reviewInfo[5],
  //     // "review7": reviewInfo[6],
  //     // "review8": reviewInfo[7],
  //     // "review9": reviewInfo[8],
  //     // "review10": reviewInfo[9]
  //   }
  //   console.log(param)
  //   await API.post('Iteration1API', '/Analysis', { body: param })
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  // const onSearch = value => {
  //   array1 = value.split('/')
  //   for (let i = 0; i < array1.length; i++) {
  //     if (array1[i] === 'dp') {
  //       console.log(array1[2].slice(4), array1[i + 1].substring(0, 10))
  //     }
  //   }
  // }

  const testDB = async () => {
    const params = { 'asin': 'B075QNC39Q' }
    await API.get('Iteration1API', '/DB', { queryStringParameters: params })
      .then(response => {
        console.log(response)
        // console.log(parseFloat(response.time_stamp))
        var timestamp = Date.parse(new Date())
        var timestamp2 = new Date(parseFloat(response.time_stamp) * 1000)
        console.log(parseInt(Math.abs(timestamp - timestamp2) / 1000 / 60 / 60 / 24))
        // parseInt(Math.abs(timestamp - timestamp2 ) / 1000 / 60 / 60 /24)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // const testEmptyReview = async () => {
  //   const axios = require('axios')
  //   for (let i = 1; i < 11; i++) {
  //     var params = {
  //       api_key: "33F04810A8EF4F0A89C22F1110BCAB89",
  //       type: "reviews",
  //       amazon_domain: "amazon.com.au",
  //       asin: 'B0937YLG34',
  //       output: "json",
  //       sort_by: "most_recent",
  //       global_reviews: "true",
  //       language: "en_GB",
  //       page: i.toString()
  //     }
  //     await axios.get('https://api.rainforestapi.com/request', { params })
  //       .then(response => {
  //         if (response.data['reviews'].length === 10) {
  //           var asin = response.data["request_parameters"]["asin"]
  //           var rating = response.data['summary']['rating']
  //           var reviewsTotal = response.data['summary']['reviews_total']
  //           for (let j = 0; j < 10; j++) {
  //             var reviewId = response.data['reviews'][j]['id']
  //             var reviewTitle = response.data['reviews'][j]['title']
  //             var reviewBody = response.data['reviews'][j]['body']
  //             var reviewRating = response.data['reviews'][j]['rating']
  //             var reviewUTC = response.data['reviews'][j]['date']['utc']
  //             var reviewPID = response.data['reviews'][j]['profile']['id']

  //             // console.log(response.data)

  //             if (typeof (reviewTitle) == 'undefined') {
  //               reviewTitle = ' '
  //             }
  //             if (typeof (reviewBody) == 'undefined') {
  //               reviewBody = ' '
  //             }
  //             if (typeof (reviewRating) == 'undefined') {
  //               reviewRating = ' '
  //             }
  //             if (typeof (reviewUTC) == 'undefined') {
  //               reviewUTC = ' '
  //             }
  //             if (typeof (reviewPID) == 'undefined') {
  //               reviewPID = ' '
  //             }

  //             reviewTitle = reviewTitle.replaceAll("'", " ")
  //             reviewTitle = reviewTitle.replaceAll('"', ' ')
  //             reviewBody = reviewBody.replaceAll("'", " ")
  //             reviewBody = reviewBody.replaceAll('"', ' ')

  //             var reviewInfoSingle = '{ "reviewId": "' + reviewId
  //               + '", "reviewTitle": "' + reviewTitle
  //               + '", "reviewBody": "' + reviewBody
  //               + '", "reviewRating": ' + reviewRating
  //               + ', "reviewUTC": "' + reviewUTC
  //               + '", "reviewPID": "' + reviewPID + '" }'

  //             array1[j] = ' "' + j + '" :' + reviewInfoSingle
  //           }
  //         }
  //         else {
  //           array1.length = 0
  //         }

  //         if (array1.length > 0) {
  //           reviewInfo[i - 1] = '{ "asin": "' + asin + '", "summary": { "rating": ' + rating + ', "reviewsTotal": ' + reviewsTotal + ' }, "reviews": { ' + array1.join(", ") + "}}"
  //           console.log(reviewInfo[i - 1])
  //         }
  //       }).catch(error => {
  //         console.log(error)
  //       })
  //     if (array1.length === 0) {
  //       console.log(reviewInfo)
  //       break
  //     }
  //   }
  // }

  return (
    <>
      <div>
        <Button type="primary" onClick={testDB}>Submit</Button>
      </div>
      {/* <div className='searchBar'>
        <Search placeholder="Paste your url here!" onSearch={onSearch} style={{ width: '400px' }} enterButton />
      </div> */}
      {/* <div>{title}</div>
      <div>{number}</div> */}

    </>
  )
}

export default Test