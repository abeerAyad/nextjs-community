import Post from '@/components/Post'
import React from 'react'

const SinglePost = ({ params: { id } }) => {
  return (
    <div>
      <Post postId={id} />
    </div>
  )
}

export default SinglePost
