import React from "react";
import { Button, Flex } from "antd";
import { useGetAllPostsQuery } from "../services/post";
import PostCard from "../components/Card";
import { Typography } from "antd";
import { useSelector } from "react-redux";
const { Title } = Typography;

const Home = () => {
  const { data, isLoading } = useGetAllPostsQuery();
  const { allPost } = useSelector((state) => state.posts);

  if (isLoading) {
    <h1>Data is loading.....</h1>;
  }

  return (
    <div className="cardContainer">
      <Title level={2}>List of All post</Title>
      <Flex wrap justify={"center"} align={"center"}>
        {allPost?.length > 0 ? (
          allPost?.map((post) => (
            <div key={post.id}>
              <Flex justify={"space-around"}>
                <PostCard post={post} />
              </Flex>
            </div>
          ))
        ) : (
          <h1>No post found</h1>
        )}
      </Flex>
    </div>
  );
};

export default Home;
