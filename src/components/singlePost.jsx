import React, { useEffect, useState } from 'react'
import styles from '@/styles/socialHome.module.css'
import { IoArrowUndo, IoChatbubblesSharp, IoHappy, IoMenuOutline, IoPlanet, IoSend, IoStar, IoTrash } from "react-icons/io5";
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Emoji } from 'emoji-picker-react';

const SinglePost = ({ postItem, getFunction }) => {
  const [reactions, setReactions] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [showReactions, setShowReactions] = useState(false)
  const [showReaction, setShowReaction] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const [commentPost, setCommentPost] = useState([]);
  const session = useSession()
  const [newComment, setNewComment] = useState({
    comment: '',
    image: '',
  });

  const addReaction = async (postId, reactIcon) => {
    const { data } = await axios.post(`/api/reactions/${postId}`, { reactIcon })

  }

  const addSharePost = async (postId) => {
    try {
      const data = await axios.post(`/api/share/${postId}`);
      console.log(data,'ooo')
    } catch (error) {
      console.log(error)
    }
  }

  const getReactions = async () => {
    const { data } = await axios.get(`/api/reactions/${postItem?._id}`)
    setReactions(data.postReactions)
  }




  const postComment = async () => {
    try {
      const { data } = await axios.post(`/api/comments/${postItem?._id}`, newComment);
      console.log(data);
      getComments(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const savedPost = async () => {
    try {
      const { data } = await axios.post(`/api/savedElement/${postItem?._id}`);
    } catch (error) {
      console.log(error);
    }
  };


  const getComments = async () => {
    try {
      const { data: { comments } } = await axios.get(`/api/comments/${postItem?._id}`);
      setCommentPost(comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments()
  }, [postItem])

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`/api/post/${postItem?._id}`);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={postItem._id} className={styles.post}>
      <div className={styles.userPost}>
        {postItem.isShared && <div className="userSharedPost">
          <h4>{postItem?.userSharedPostId?.username}</h4>
          <Image className={styles.userImage} 
            src={postItem?.userSharedPostId?.image}
           width={50} height={50} />
          </div>}
        <div className={styles.userData}>
          <Image className={styles.userImage} src={postItem?.userId?.image} alt='userImage' width={50} height={50} />
          <div className={styles.userDataStyle}>
            <h4>{postItem?.userId?.username}</h4>
            <h5>{postItem?.createdAt?.slice(0, 10)}</h5>
          </div>

        </div>
        <IoMenuOutline className={styles.iconForDropDown} onClick={() => setShowDropDown(!showDropDown)} />
        <div
          style={{
            display: showDropDown ? 'flex' : 'none'
          }}
          className={styles.dropDownPost}
        >
          {postItem?.userId?.email === session?.data?.user?.email &&
            <div className={styles.listDropDown} onClick={() => deletePost(postItem._id)}>
              <IoTrash className={styles.iconDropDown} />
              <span className={styles.showText}>Delete Post</span>
            </div>

          }

          <div className={styles.listDropDown}>
            <IoPlanet className={styles.iconDropDown} />
            <span className={styles.showText}>{postItem?.status}</span>
          </div>


          <select name="status" className={styles.selectStatus}>
            <option value="">{postItem?.status === 'public' ? 'public' : 'private'}</option>
            <option value="">{postItem?.status === 'private' ? 'private' : 'public'}</option>
          </select>

          <div className={styles.listDropDown} onClick={() => savedPost(postItem._id)}>
            <IoStar className={styles.iconDropDown} />
            <span className={styles.showText}>save post</span>
          </div>
        </div>

      </div>
      <div className={styles.postContent}>
        <Link href={`/social/single-post/${postItem?._id}`}>

          {
            postItem?.content && <p>{postItem.content}</p>

          }
        </Link>
        <div
          className={styles.imagesPostContainer}
          style={{
            display: 'grid',
            gridTemplateColumns: postItem?.images?.length > 1 ? `repeat(2,1fr)` : `repeat(1,1fr)`,
            gap: 5,
            height: '100%'
          }}>
          {
            postItem?.images?.length > 0 && postItem?.images?.map((img) =>
              <Image
                className={styles.postImages}
                key={img}
                src={img}
                alt='userImage'
                width={postItem?.images?.length > 1 ? 400 : 500} height={400}
              />
            )
          }
        </div>

      </div>
      <div className={styles.postButtons}>
        <div onClick={() => addSharePost(postItem._id)}>
          <IoArrowUndo className={styles.postBtnAction} />
          <span>Share</span>
        </div>
        <div onClick={() => {
          getComments(postItem._id)
          setShowComments(!showComments)
          setShowReactions(false)

        }}>
          <IoChatbubblesSharp className={styles.postBtnAction} />
          <span>Comment</span>
          <span>{commentPost?.length}</span>
        </div>
        <div onClick={() =>
          getReactions()

        }>
          <div className={styles.postBtnAction} onClick={() => setShowReaction(!showReaction)} >
            <Emoji emojiStyle='facebook' unified="1f44d" size="25" />
          </div>
          <div
            style={{
              display: showReaction ? 'flex' : 'none'
            }}
            className={styles.reactions}>
            <div className={styles.reactIconDiv} onClick={() => {
              addReaction(postItem?._id, '1f970')
            }} >
              <Emoji emojiStyle='facebook' unified="1f970" size="25" />
            </div>
            <div className={styles.reactIconDiv} onClick={() => {
              addReaction(postItem?._id, '1f60d')
            }}>
              <Emoji emojiStyle='facebook' unified="1f60d" size="25" />
            </div>
            <div className={styles.reactIconDiv} onClick={() => {
              addReaction(postItem?._id, '1f602')
            }}>
              <Emoji emojiStyle='facebook' unified="1f602" size="25" />

            </div>
            <div className={styles.reactIconDiv} onClick={() => {
              addReaction(postItem?._id, '1f917')
            }}>
              <Emoji emojiStyle='facebook' unified="1f917" size="25" />

            </div>
            <div className={styles.reactIconDiv} onClick={() => {
              addReaction(postItem?._id, '1f620')
            }}>
              <Emoji emojiStyle='facebook' unified="1f620" size="25" />

            </div>
          </div>
          <span onClick={() => {
            setShowComments(false)
            setShowReactions(!showReactions)
          }}>Like</span>
        </div>
      </div>

      {
        showComments &&
        <div>

          <div className={styles.commentsContainer}>
            {commentPost.filter(comment => comment?.postId?._id === postItem._id).map(comet => (
              <div key={comet._id} className={styles.comment}>

                <div className={styles.userComment}>

                  <Image className={styles.userImage} src={comet?.userId?.image} alt='userImage' width={50} height={50} />

                  <div>
                    <h5>{comet?.userId?.username}</h5>
                    {comet.comment &&
                      <p>{comet.comment}</p>

                    }
                    {comet.image &&
                      <Image src={comet?.userId?.image} alt='userImage' width={200} height={200} />

                    }

                  </div>

                </div>
                <div className={styles.commentBtn}>

                  <p>{comet?.createdAt.slice(0, 10)}</p>
                  <IoTrash className={styles.deleteCommentBtn} onClick={() => deleteComment(comet._id, postItem._id)} />

                </div>

              </div>
            ))}

          </div>

          <div className={styles.inpComments}>
            <div>
              <input
                className={styles.sendCommentInp}
                placeholder='write a comment'
                type="text"
                name="comment"
                onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
              />
              <IoSend onClick={() => postComment(postItem._id)} className={styles.iconDropDown} />


            </div>
            <input
              className={styles.commentFileInp}
              type="file"
              name="image"
              onChange={(e) => setNewComment({ ...newComment, image: e.target.value })}
            />

          </div>

        </div>
      }

      {showReactions &&
        <div className={styles.reactionsContainer}>
          {reactions.map((postReact) =>
            <div key={postReact?._id} className={styles.reaction}>
              <Emoji emojiStyle='facebook' unified={postReact.reactIcon} size="25" />
              <div className={styles.userReactionDetails}>
                <div className={styles.userReactionImage}>
                  <Image src={postReact?.userId?.image} alt='userImageReaction' width={30} height={30} />
                </div>
                <h4>{postReact?.userId?.username}</h4>
              </div>

              <p>{postReact?.createdAt?.slice(0, 10)}</p>

            </div>
          )}
        </div>

      }


    </div>
  )
}

export default SinglePost
