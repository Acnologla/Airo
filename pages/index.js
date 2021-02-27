import Content from "@/src/components/content.js"
import client from "@/models/client"
import {formatDate} from "@/src/utils/utils"

export default function Home({posts}) {
  return (
    <Content posts={posts} />
  )
}

export async function getStaticProps() {
  const result = await client.query("SELECT * FROM Posts LIMIT 20")
  const posts = result.rows
  for (const post of posts){
    post.created = formatDate(post.created)
    const commentsResult = await client.query("SELECT COUNT(*) FROM Comments where postId = $1", [post.id])
    post.comments = commentsResult.rows[0].count
    const  upvotesResult = await client.query("SELECT COUNT(*) FILTER (where isDislike is true) AS disLikes, COUNT(*) FILTER (where isDislike is false) AS likes FROM Upvote WHERE postId = $1", [post.id])
    const [{likes,dislikes}] = upvotesResult.rows
    post.likes = likes
    post.dislikes = dislikes
  }

  return {
    props: {
      posts
     },
     revalidate: 120
  }
}