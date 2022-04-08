import MediaCard from "../Components/MediaCard"

function Video () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <MediaCard
        img='4.png'
        title='The Market for Fake Reviews'
        introduction='test content'
        type='Video'
        link='https://www.cnbc.com/2020/09/06/amazon-reviews-thousands-are-fake-heres-how-to-spot-them.html'
      >
      </MediaCard>
      <MediaCard
        img='5.png'
        title='How Reliable Are Amazon Reviews?'
        introduction='test content'
        type='Video'
        link='https://www.youtube.com/watch?v=wbyfhGHX0Vg'
      >
      </MediaCard>
    </div>
  )
}
export default Video