import MediaCard from "../Components/MediaCard"

function Article () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <MediaCard
        img='1.png'
        title='The Market for Fake Reviews'
        introduction='test content'
        type='Article'
        link='https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3664992'
      >
      </MediaCard>
      <MediaCard
        img='2.png'
        title='How Reliable Are Amazon Reviews?'
        introduction='test content'
        type='Article'
        link='https://towardsdatascience.com/how-reliable-are-amazon-reviews-eb8c454c96a4'
      >
      </MediaCard>
      <MediaCard
        img='3.png'
        title='How to Spot a Fake Review on Amazon'
        introduction='test content'
        type='Article'
        link='https://www.pcmag.com/how-to/spot-a-fake-review-on-amazon'
      >
      </MediaCard>
    </div>
  )
}
export default Article