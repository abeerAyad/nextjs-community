"use client"

import Post from '@/components/Post'
import { useSession } from 'next-auth/react'
import React from 'react'

const OnePost = ({params : {id}}) => {
    const session = useSession();
  return (
    <div>
          <Post postId={id} userId={session?.data?.user?.id} />
    </div>
  )
}

export default OnePost
