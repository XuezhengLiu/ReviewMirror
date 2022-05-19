import '../css/Home.css'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import AmazonImg from '../images/amazon.jpg'
import Typography from '@mui/material/Typography'
function HomeOld () {

  const Home = styled(motion.div)`
    padding-top: 70px;
    width: 100vw;
    background: #f7f7f7;
  `

  return (
    <Home initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}>
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
              Currently we support urls from: <a href='https://www.amazon.com.au/' target={'_blank'} rel="noreferrer"><img src={AmazonImg} alt="" width='75px' /></a>
            </Typography>
          </div>
        </div>
      </div>
    </Home>
  )
}

export default HomeOld