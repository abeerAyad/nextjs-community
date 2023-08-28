"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/socialHome.module.css'
import Image from 'next/image';
import { IoArrowUndo, IoChatbubblesSharp, IoHappy, IoMenuOutline, IoPlanet, IoSend, IoStar, IoTrash } from "react-icons/io5";
import { useSession } from 'next-auth/react';

const Posts = ({ userId }) => {
    const [showComments, setShowComments] = useState(false)
    const [showDropDown, setShowDropDown] = useState(false)
    const [posts, setPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([])
    const [commentPost, setCommentPost] = useState([]);
    const userOwnPosts = posts.filter((item) => item.userId._id === userId)
    const session = useSession()
    const [newComment, setNewComment] = useState({
        comment: '',
        image: '',
    });

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        setUserPosts([...userPosts, userOwnPosts])
    }, [userId])

    const getPosts = async () => {
        try {
            const { data: { posts } } = await axios.get('/api/post');
            setPosts(posts);
        } catch (error) {
            console.log(error);
        }
    };

    const postComment = async (postId) => {
        try {
            const { data } = await axios.post(`/api/comments/${postId}`, newComment);
            console.log(data);
            getComments(postId);
        } catch (error) {
            console.log(error);
        }
    };

    const savedPost = async (postId) => {
        try {
            const { data } = await axios.post(`/api/savedElement/${postId}`);
        } catch (error) {
            console.log(error);
        }
    };


    const getComments = async (postId) => {
        try {
            const { data: { comments } } = await axios.get(`/api/comments/${postId}`);
            setCommentPost(comments);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteComment = async (commentId, postId) => {
        try {
            await axios.delete(`/api/comments/${commentId}`);
            getComments(postId);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async (postId) => {
        try {
            await axios.delete(`/api/post/${postId}`);
            getPosts();
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className={styles.postContainer}>
            {userOwnPosts.length > 0 ?
                userOwnPosts.map(postItem => (
                    <div key={postItem._id} className={styles.post}>
                        <div className={styles.userPost}>
                            <div className={styles.userData}>
                                <Image className={styles.userImage} src={postItem?.userId?.image} alt='userImage' width={50} height={50} />
                                <div className={styles.userDataStyle}>
                                    <h4>{postItem?.userId?.username}</h4>
                                    <h5>{postItem.createdAt.slice(0, 10)}</h5>
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
                            {
                                postItem?.content && <p>{postItem.content}</p>

                            }
                            <div
                                className={styles.imagesPostContainer}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: postItem?.images?.length > 1 ? `repeat(2,1fr)` : `repeat(1,1fr)`,
                                    gap: 5,
                                    height: '100%'
                                }}>
                                {
                                    postItem?.images?.length > 0 && postItem.images.map((img) =>
                                        <Image
                                            className={styles.postImages}
                                            key={img} src={img}
                                            alt='userImage'
                                            width={postItem?.images?.length > 1 ? 400 : 500} height={400}
                                        />
                                    )
                                }
                            </div>

                        </div>
                        <div className={styles.postButtons}>
                            <div>
                                <IoArrowUndo className={styles.postBtnAction} />
                                <span>Share</span>
                            </div>
                            <div onClick={() => {
                                getComments(postItem._id)
                                setShowComments(!showComments)
                            }}>
                                <IoChatbubblesSharp className={styles.postBtnAction} />
                                <span>Comment</span>
                                <span>{commentPost?.length}</span>
                            </div>
                            <div>
                                <IoHappy className={styles.postBtnAction} />
                                <span>Like</span>
                            </div>
                        </div>

                        <div style={{
                            display: showComments ? 'block' : 'none'
                        }}>

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
                                        value={newComment.comment}
                                        onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                                    />
                                    <IoSend onClick={() => postComment(postItem._id)} className={styles.iconDropDown} />


                                </div>
                                <input
                                    className={styles.commentFileInp}
                                    type="file"
                                    name="image"
                                    value={newComment.image}
                                    onChange={(e) => setNewComment({ ...newComment, image: e.target.value })}
                                />

                            </div>

                        </div>


                    </div>
                ))
                :
                posts.map(postItem => (
                    <div key={postItem._id} className={styles.post}>
                        <div className={styles.userPost}>
                            <div className={styles.userData}>
                                <Image className={styles.userImage} src={postItem?.userId?.image} alt='userImage' width={50} height={50} />
                                <div className={styles.userDataStyle}>
                                    <h4>{postItem?.userId?.username}</h4>
                                    <h5>{postItem.createdAt.slice(0, 10)}</h5>
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

                                {postItem?.userId?.email === session?.data?.user?.email &&
                                    <select name="status" className={styles.selectStatus}>
                                        <option value="">{postItem?.status === 'public' ? 'public' : 'private'}</option>
                                        <option value="">{postItem?.status === 'private' ? 'private' : 'public'}</option>
                                    </select>
                                }


                                <div className={styles.listDropDown} onClick={() => savedPost(postItem._id)}>
                                    <IoStar className={styles.iconDropDown} />
                                    <span className={styles.showText}>save post</span>
                                </div>
                            </div>

                        </div>
                        <div className={styles.postContent}>
                            {
                                postItem?.content && <p>{postItem.content}</p>

                            }
                            <div
                                className={styles.imagesPostContainer}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: postItem?.images?.length > 1 ? `repeat(2,1fr)` : `repeat(1,1fr)`,
                                    gap: 5,
                                    height: '100%'
                                }}>
                                {
                                    postItem?.images?.length > 0 && postItem.images.map((img) =>
                                        <Image
                                            className={styles.postImages}
                                            key={img} src={img}
                                            alt='userImage'
                                            width={postItem?.images?.length > 1 ? 400 : 500} height={400}
                                        />
                                    )
                                }
                            </div>

                        </div>
                        <div className={styles.postButtons}>
                            <div>
                                <IoArrowUndo className={styles.postBtnAction} />
                                <span>Share</span>
                            </div>
                            <div onClick={() => {
                                getComments(postItem._id)
                                setShowComments(!showComments)
                            }}>
                                <IoChatbubblesSharp className={styles.postBtnAction} />
                                <span>Comment</span>
                                <span>{commentPost?.length}</span>
                            </div>
                            <div>
                                <IoHappy className={styles.postBtnAction} />
                                <span>Like</span>
                            </div>
                        </div>

                        <div style={{
                            display: showComments ? 'block' : 'none'
                        }}>

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
                                        value={newComment.comment}
                                        onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                                    />
                                    <IoSend onClick={() => postComment(postItem._id)} className={styles.iconDropDown} />


                                </div>
                                <input
                                    className={styles.commentFileInp}
                                    type="file"
                                    name="image"
                                    value={newComment.image}
                                    onChange={(e) => setNewComment({ ...newComment, image: e.target.value })}
                                />

                            </div>

                        </div>


                    </div>
                ))
            }
        </div >
    );
};

export default Posts;
