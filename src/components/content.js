import React, { useState } from 'react';
import Card from "./card.js"
import CreatePost from "./createPost"
import axios from "axios"

export default function Content({posts}) {
  const [postForm, createPost] = useState(false)
  const [realPosts, setPosts] = useState(posts || [])
  const rising = async() => {
    const {data:newPosts} = await axios.get("/api/posts?sort=1")
    setPosts(newPosts)
  }
  return (
    <div className="content-center w-full sm:mt-2 relative top-7 ">
      {postForm ? <CreatePost /> : <></>}
      <div className="md:w-9/12 m-auto">
        <div className="m:bg-transparent justify-center flex pb-6">
          <center className="rounded-full">
            <button className="block border-b-2 border-red-500  text-red-500  sm:inline-block sm:mr-6">POPULAR</button>
            <button onClick={() => createPost(!postForm)} className="block text-gray-500  sm:inline-block">NEW</button>
            <button onClick={rising} className="block text-gray-500  sm:inline-block  sm:ml-6">RISING</button>
          </center>
        </div>
        <div className="cursor-pointer bg-white border mt-2 m-auto shadow-lg sm:mt-0">
          {realPosts.map((el, i) =>
            <Card
              key={i}
              post={el}
            ></Card>
          )}
        </div>
      </div>
    </div>)
}