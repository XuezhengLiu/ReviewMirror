import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function MediaCard (props) {
  const { img, title, introduction, type, link } = props
  return (
    <Card sx={{ maxWidth: 345 }} style={{ width: '280px', height: '350px', margin: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 6px #ccc' }}>
      <img src={require('./' + img)} alt='' style={{ width: '280px', height: '150px' }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={link} target="_blank" rel='noreferrer'><Button size="small">Learn More</Button></a>
      </CardActions>
    </Card>
  )
}