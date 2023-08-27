"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [commentPost, setCommentPost] = useState([]);
    const [newComment, setNewComment] = useState({
        comment: '',
        image: '',
    });

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const {data: {posts}} = await axios.get('/api/post');
            setPosts(posts);
        } catch (error) {
            console.log(error);
        }
    };

    const postComment = async (postId) => {
        try {
            const {data} = await axios.post(`/api/comments/${postId}`, newComment);
            console.log(data);
            getComments(postId);
        } catch (error) {
            console.log(error);
        }
    };

    const savedPost = async (postId) => {
        try {
            const {data} = await axios.post(`/api/savedElement/${postId}`);
        } catch (error) {
            console.log(error);
        }
    };


    const getComments = async (postId) => {
        try {
            const {data: { comments}} = await axios.get(`/api/comments/${postId}`);
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
        <div>
            {posts.map(postItem => (
                <div key={postItem._id}>
                    <h1>{postItem.content}</h1>
                    <button onClick={() => deletePost(postItem._id)}>Delete Post</button>
                    <input
                        type="text"
                        name="comment"
                        value={newComment.comment}
                        onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                    />
                    <input
                        type="text"
                        name="image"
                        value={newComment.image}
                        onChange={(e) => setNewComment({ ...newComment, image: e.target.value })}
                    />
                    <button onClick={() => postComment(postItem._id)}>Post Comment</button>
                    <button onClick={() => savedPost(postItem._id)}>Saved Post</button>

                    <button onClick={() => getComments(postItem._id)}>View Comments</button>
                    {commentPost.filter(comment => comment?.postId?._id === postItem._id).map(comet => (
                        <div key={comet._id}>
                            <p>{comet.comment}</p>
                            <button onClick={() => deleteComment(comet._id, postItem._id)}>Delete Comment</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Home;
