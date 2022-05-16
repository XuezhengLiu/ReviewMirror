import '../css/About.css'
import Divider from '@mui/material/Divider'

function About () {
  return (
    <div className='about'>
      <div className='container'>
        <div className="row">
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={{ marginBottom: '40px' }}>
            <h1 className='abTitle'>How to use Review Mirror</h1>
            <h3 className='abSubtitle'>Review Mirror is easy to get started. You just need to copy and paste the review or product link to the corresponding function and wait a few seconds for the result.</h3>
            <Divider textAlign="right">Let's begin</Divider>
          </div>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 intro'>
            <div className="row abRow">
              <div className='col-xs-12 col-sm-12 col-md-5 col-lg-4' >
                <h3 className='introTitle'>Analyse Single Revew:</h3>
                <div style={{ width: '100%', padding: '10px' }}>
                  <p> Want to analyze an individual review? Paste it into Analyze Review. We'll show if that's a computer-generated review.</p>
                </div>
              </div>
              <div className='col-xs-12 col-sm-12 col-md-7 col-lg-8' >
                <div style={{ padding: '20px', width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                  <img alt='' src={require('../images/Review.gif')} style={{ width: '100%', border: '2px solid grey', borderRadius: '10px' }}></img>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 intro'>
            <div className="row abRow">
              <div className='col-xs-12 col-sm-12 col-md-5 col-lg-4' >
                <h3 className='introTitle'>Analyse a Product Url:</h3>
                <div style={{ width: '100%', padding: '10px' }}>
                  <p> Copy and paste an Amazon product URL into our analyser bar and hit the analyse button. That's it; we'll take care of the rest.</p>
                </div>
              </div>
              <div className='col-xs-12 col-sm-12 col-md-7 col-lg-8' >
                <div style={{ padding: '20px', width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                  <img alt='' src={require('../images/url.gif')} style={{ width: '100%', border: '2px solid grey', borderRadius: '10px' }}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About