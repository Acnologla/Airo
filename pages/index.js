import Content from "../src/components/content.js"
import client from "../models/client"
import { formatDate } from "../src/utils/utils.js"

export default function Home({posts}) {
  return (
    <Content posts={posts} />
  )
}

export async function getStaticProps() {
  const result = await client.query("SELECT * FROM Posts LIMIT 20")
  const posts = result.rows
  posts.forEach(post => {
    post.created = formatDate(post.created)
  })
  return {
    props: {
      posts
     },
     revalidate: 120
  }
}