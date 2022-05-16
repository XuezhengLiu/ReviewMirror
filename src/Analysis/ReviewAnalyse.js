import * as React from 'react'
import { useState } from 'react'
import { API } from 'aws-amplify'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'

import * as echarts from 'echarts'

import './Analysis.css'
import '../css/ReviewAnalyse.css'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})





function ReviewAnalyse () {
  const [review, setReview] = useState('')
  const [open, setOpen] = useState(false)
  const [notiOpen, setNotiOpen] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [result, setResult] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setIsEmpty(false)
    clearImg()
  }

  const buildImg = (real, fake) => {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    var option

    option = {
      title: {
        text: 'Probability(%) of Fake Review',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        y: 'bottom'
      },
      series: [
        {
          name: 'Probability of',
          type: 'pie',
          radius: '50%',
          data: [
            { value: real, name: 'Human Written' },
            { value: fake, name: 'Computer Generated' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    option && myChart.setOption(option)


  }

  const clearImg = () => {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)

    myChart.clear()
  }

  const GetResult = async () => {
    const params = { 'review': review }
    console.log(params)
    setNotiOpen(true)
    await API.get('Iteration1API', '/Analysis', { queryStringParameters: params })
      .then(response => {
        console.log(response)
        setResult(response.result)
        console.log(result)
        if (response.result !== 'Empty input') {
          const fake = response.fake.toFixed(2)
          const real = response.real.toFixed(2)
          setNotiOpen(false)
          handleClickOpen()
          clearImg()
          buildImg(real, fake)
        }
        else {
          setNotiOpen(false)
          setIsEmpty(true)
          handleClickOpen()
        }
      })
      .catch(error => {
        GetResult()
      })
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
    <>
      <div className='reviewAnalyse' onLoad={ServerRun}>
        <div className="container">
          <div className="row raRow">
            <div className='col-xs-12 col-sm-12 col-md-8 col-lg-8 raContent'>
              <h1 className='h1Title'>ANALYZE A REVIEW</h1>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-8 col-lg-8 raContent'>
              <p className='pIntroduction'>Find out if this review was human written or computer generated</p>
            </div>
            <div className='col-xs-9 col-sm-8 col-md-6 col-lg-5 raTextField'>
              <TextField
                id="filled-multiline-static"
                label="Paste Your Review Here!"
                multiline
                rows={10}
                fullWidth={true}
                variant="filled"
                onBlur={e => setReview(e.target.value)}
              />
            </div>
            <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4 raButton'>
              <Button variant="outlined" onClick={GetResult}>Submit</Button>
            </div>
            <Dialog
              fullWidth={true}
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{result}</DialogTitle>
              <Divider />
              <DialogContent fullwidth={true}>

                {isEmpty ?
                  <h2>Please enter a review!</h2>
                  :
                  <div id='main' style={{ width: '100%', height: '200px' }}></div>}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Ok!</Button>
              </DialogActions>
            </Dialog>
            <div>
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={notiOpen}
                onClose={handleClose}
                key='noti'
              >
                <Alert severity="info" >Hold on, Mr. Server is working hard to analyze !</Alert>
              </Snackbar>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}
export default ReviewAnalyse