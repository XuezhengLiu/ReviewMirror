import '../css/Home.css'
import SearchBar from './SearchBar'
import AmazonImg from '../images/amazon.jpg'
import Typography from '@mui/material/Typography'
function HomeOld () {

  return (
    <div className='home'>
      <div className='container homeContainer'>
        <div className='row homeRow'>
          <div className='col-xs-12 col-sm-12 col-md-8 col-lg-8 content'>
            <Typography
              component="h1"
              variant="h3"
              fontSize='400%'
              fontWeight='bold'
              align="center"
              color="text.primary"
              gutterBottom
            >
              Analyze a URL
            </Typography>
            <Typography variant="h5"
              align="center"
              color="text.secondary"
              fontSize='200%'
              fontWeight='200'
              paragraph>
              You are about to analyze a product or business for its reviews. Insert a URL of one of our supported websites in the search bar below to start the analysis.
            </Typography>
            <SearchBar></SearchBar>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Typography variant="h5"
              align="center"
              color="text.secondary"
              fontSize='100%'
              fontWeight='100'
              paragraph>
              Currently we support urls from: <img src={AmazonImg} alt="" width='75px' />
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeOld