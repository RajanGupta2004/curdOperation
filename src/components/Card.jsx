import React from "react";
import { Button, Card, Flex } from "antd";
import { useDeletePostByIdMutation } from "../services/post";
import { useNavigate } from "react-router-dom";
import { addPostId } from "../redux/postSlice";
import { useDispatch } from "react-redux";

const PostCard = (post) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletePost, ...data] = useDeletePostByIdMutation();
  const { title, body, id } = post.post;

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      alert("Post deleted successfully");
    } catch (error) {
      console.log("Error in delete post", error);
    }
  };

  const handleEditPost = (post) => {
    navigate(`/edit-post/${post.id}`, { state: { post } });
    dispatch(addPostId(post.id));
  };

  return (
    <div>
      <Card
        title={title}
        style={{
          width: 400,
          backgroundColor: "lightcyan",
          margin: "2px",
        }}
      >
        <p>{body}</p>
        <Flex justify={"space-around"}>
          <Button onClick={() => handleDeletePost(id)}>Delete</Button>
          <Button onClick={() => handleEditPost(post.post)}>Edit</Button>
        </Flex>
      </Card>
    </div>
  );
};

export default PostCard;
