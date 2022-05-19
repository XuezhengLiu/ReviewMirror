import '../css/Quiz.css'
import titlePage1 from '../images/tip1.png'
import titlePage2 from '../images/tip2.png'
import titlePage3 from '../images/tip3.png'
import titlePage4 from '../images/tip4.png'
import titlePage5 from '../images/tip5.png'

import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Alert from '@mui/material/Alert'
import { useState } from 'react'
import Share from 'social-share-react'
import { API } from 'aws-amplify'




function Quiz () {
  const [btnState, setBtnState] = useState(true)
  const [answerShow, setAnswerShow] = useState('n')
  const [quizShow, setQuizShow] = useState('n')
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [value4, setValue4] = useState('')
  const [value5, setValue5] = useState('')
  const [qusetion1, setQuestion1] = useState('')
  const [qusetion2, setQuestion2] = useState('')
  const [qusetion3, setQuestion3] = useState('')
  const [qusetion4, setQuestion4] = useState('')
  const [qusetion5, setQuestion5] = useState('')

  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])


  var grade = 0
  var choice = ['', '', '', '', '']

  const onChange1 = e => {
    setValue1(e.target.value)
  }

  const onChange2 = e => {
    setValue2(e.target.value)
  }
  const onChange3 = e => {
    setValue3(e.target.value)
  }
  const onChange4 = e => {
    setValue4(e.target.value)
  }
  const onChange5 = e => {
    setValue5(e.target.value)
    console.log(e.target.value)
  }

  const showQuiz = () => {
    if (btnState === true) {
      getQuestions()
      setQuizShow('y')
      setAnswerShow('n')
      setValue1('')
      setValue2('')
      setValue3('')
      setValue4('')
      setValue5('')
      setBtnState(false)
    }
    else {
      setAnswerShow('n')
      setValue1('')
      setValue2('')
      setValue3('')
      setValue4('')
      setValue5('')
      getQuestions()
    }
  }

  const showTips = () => {
    setQuizShow('n')
    setBtnState(true)
  }

  const showAnswer = () => {
    setAnswerShow('y')
  }

  const resultMessage1 = () => {
    switch (answerShow) {
      case 'n':
        return (<></>)
      case 'y':
        {
          if (answers[0] === 'fact') {
            return (<Alert icon={false} severity="success">This review is written by human!</Alert>)
          }
          else {
            return (<Alert icon={false} severity="error">This review is computer generated!</Alert>)
          }
        }
      default: break
    }
  }

  const resultMessage2 = () => {
    switch (answerShow) {
      case 'n':
        return (<></>)
      case 'y':
        {
          if (answers[1] === 'fact') {
            return (<Alert icon={false} severity="success">This review is written by human!</Alert>)
          }
          else {
            return (<Alert icon={false} severity="error">This review is computer generated!</Alert>)
          }
        }
      default: break
    }
  }
  const resultMessage3 = () => {
    switch (answerShow) {
      case 'n':
        return (<></>)
      case 'y':
        {
          if (answers[2] === 'fact') {
            return (<Alert icon={false} severity="success">This review is written by human!</Alert>)
          }
          else {
            return (<Alert icon={false} severity="error">This review is computer generated!</Alert>)
          }
        }
      default: break
    }
  }
  const resultMessage4 = () => {
    switch (answerShow) {
      case 'n':
        return (<></>)
      case 'y':
        {
          if (answers[3] === 'fact') {
            return (<Alert icon={false} severity="success">This review is written by human!</Alert>)
          }
          else {
            return (<Alert icon={false} severity="error">This review is computer generated!</Alert>)
          }
        }
      default: break
    }
  }
  const resultMessage5 = () => {
    switch (answerShow) {
      case 'n':
        return (<></>)
      case 'y':
        {
          if (answers[4] === 'fact') {
            return (<Alert icon={false} severity="success">This review is written by human!</Alert>)
          }
          else {
            return (<Alert icon={false} severity="error">This review is computer generated!</Alert>)
          }
        }
      default: break
    }
  }
  const getQuestions = () => {
    const params = { 'reviews': '' }
    API.get('Iteration1API', '/Infographic', { queryStringParameters: params })
      .then(response => {
        console.log(response)
        setQuestion1(response[1].text)
        setQuestion2(response[2].text)
        setQuestion3(response[3].text)
        setQuestion4(response[4].text)
        setQuestion5(response[5].text)
        for (let i = 0; i < 5; i++) {
          questions[i] = response[i + 1].text
          if (response[i + 1].label === 'OR') {
            answers[i] = 'fact'
          }
          else {
            answers[i] = 'fake'
          }
          setQuestions(questions)
          setAnswers(answers)
        }
        console.log(questions)
        console.log(answers)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const startQuiz = () => {
    switch (quizShow) {
      case 'n':
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
              <h3>Tips for spotting fake reviews</h3>
            </div>
            <Divider></Divider>
            <div className="row" >
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 cardContainer">
                <Card sx={{ maxWidth: 345, height: 300 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={titlePage1}
                    alt="green iguana"
                  />
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Tips 1
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        - Has more verbs than nouns: The fakes tend to include more verbs as their writers often substitute pleasant (or alarming) sounding stories for actual insight. Genuine reviews are heavier on nouns.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 cardContainer">
                <Card sx={{ maxWidth: 345, height: 300 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={titlePage2}
                    alt="green iguana"
                  />
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Tips 2
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        - Includes more first person pronouns: 'I' and 'me' appear more often in fake reviews because people may talk about themselves more if they’re anxious about coming across as sincere.

                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 cardContainer">
                <Card sx={{ maxWidth: 345, height: 300 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={titlePage3}
                    alt="green iguana"
                  />
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Tips 3
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Take extra care buying unknown brands. If you don't recognize a brand, check online to see if it has a legitimate looking website, with clear contact details so you can get in touch if anything goes wrong.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 cardContainer">
                <Card sx={{ maxWidth: 345, height: 300 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={titlePage4}
                    alt="green iguana"
                  />
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Tips 4
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ignore the five-star ratings. Check the four, three and two-star reviews and it’s likely you’ll be getting more honest opinions.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 cardContainer">
                <Card sx={{ maxWidth: 345, height: 300 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={titlePage5}
                    alt="green iguana"
                  />
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Tips 5
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        - Lacks detail: It's hard to describe what you haven't actually experienced, which is why fake reviews often offer general praise rather than digging into specifics.

                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>

              </div>

            </div>
            <div className='header'>
              <Button variant="contained" onClick={showQuiz}>
                {
                  btnState ? 'Start Quiz' : 'Try Again'
                }
              </Button>
            </div>
          </>
        )
      case 'y':
        return (
          <div className='questions'>
            <div className='questionContainer'>
              <Divider textAlign="left">1</Divider>
              <p>{qusetion1}</p>
              <FormControl >
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={value1}
                  onChange={onChange1}
                >
                  <FormControlLabel value="fact" control={<Radio />} label="fact" />
                  <FormControlLabel value="fake" control={<Radio />} label="fake" />
                </RadioGroup>
              </FormControl>
              <div>{resultMessage1()}</div>
            </div>

            <div className='questionContainer'>
              <Divider textAlign="left">2</Divider>
              <p>{qusetion2}</p>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={value2}
                  onChange={onChange2}
                >
                  <FormControlLabel value="fact" control={<Radio />} label="fact" />
                  <FormControlLabel value="fake" control={<Radio />} label="fake" />
                </RadioGroup>
              </FormControl>
              <div>{resultMessage2()}</div>
            </div>

            <div className='questionContainer'>
              <Divider textAlign="left">3</Divider>
              <p>{qusetion3}</p>
              <FormControl >
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={value3}
                  onChange={onChange3}
                >
                  <FormControlLabel value="fact" control={<Radio />} label="fact" />
                  <FormControlLabel value="fake" control={<Radio />} label="fake" />
                </RadioGroup>
              </FormControl>
              <div>{resultMessage3()}</div>
            </div>

            <div className='questionContainer'>
              <Divider textAlign="left">4</Divider>
              <p>{qusetion4}</p>
              <FormControl >
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={value4}
                  onChange={onChange4}
                >
                  <FormControlLabel value="fact" control={<Radio />} label="fact" />
                  <FormControlLabel value="fake" control={<Radio />} label="fake" />
                </RadioGroup>
              </FormControl>
              <div>{resultMessage4()}</div>
            </div>

            <div className='questionContainer'>
              <Divider textAlign="left">5</Divider>
              <p>{qusetion5}</p>
              <FormControl onChange={onChange5}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={value5}
                  onChange={onChange5}
                >
                  <FormControlLabel value="fact" control={<Radio />} label="fact" />
                  <FormControlLabel value="fake" control={<Radio />} label="fake" />
                </RadioGroup>
              </FormControl>

              <div>{resultMessage5()}</div>
            </div>

            <Divider orientation="left"></Divider>
            <br></br>
            <br></br>
            <div className="fBtnGroup">
              <Button variant="contained" onClick={submit}>Submit</Button>&nbsp;&nbsp;&nbsp;
              <Button outlined onClick={showTips}>Show Tips</Button>&nbsp;&nbsp;&nbsp;
              <Button outlined onClick={showQuiz}>
                {
                  btnState ? 'Start Quiz' : 'Try Again'
                }
              </Button>
            </div>
          </div>
        )
      default:
    }

  }

  const submit = () => {

    choice[0] = value1
    choice[1] = value2
    choice[2] = value3
    choice[3] = value4
    choice[4] = value5
    console.log(choice)
    for (let i = 0; i < 5; i++) {
      if (answers[i] === choice[i]) {
        grade = grade + 20
      }
    }
    alert('Your final grade is: ' + grade + '/100')
    showAnswer()
  }

  return (
    <div className='quiz'>
      <div className='container'>
        <div className="row">
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={{ marginBottom: '40px' }}>
            <h1 className='qzTitle'>Test Your Knowledge</h1>
            <h3 className='qzSubtitle'>Accurately spotting misleading reviews is becoming more and more important as online shopping grows. Go for higher scores and compete with your friends!</h3>

            <Divider textAlign="right">Start Test Now!</Divider>

          </div>
          <div className='col-xs-1 col-sm-1 col-md-2 col-lg-2'></div>
          <div className='col-xs-10 col-sm-10 col-md-8 col-lg-8 qzbody'>
            {startQuiz()}
          </div>
          <div className='col-xs-1 col-sm-1 col-md-2 col-lg-2'></div>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={{ marginBottom: '40px' }}>
            <Divider textAlign="left">Please share if you like our site</Divider>
            <div className='share'>
              <Share
                url='https://www.reviewmirror.ga'
                title=''
                sites={['facebook', 'twitter', 'qzone', 'weibo']}></Share>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
export default Quiz