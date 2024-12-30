import React from "react";
import { Alert, Form, Input, Button, Typography, Space, Card } from "antd";
import { useAddPostMutation } from "../services/post";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const AddPost = () => {
  const navigate = useNavigate();
  const [createPost, ...Data] = useAddPostMutation();
  const handelFormSubmit = async (newPost) => {
    try {
      // console.log(newPost);
      await createPost(newPost);
      alert("New Post created");
      navigate("/");
    } catch (error) {
      console.log("Error on form submit", error);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        padding: "50px 0",
      }}
    >
      <Space direction="vertical" align="center" style={{ width: "100%" }}>
        <Card
          style={{ width: 500, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          bordered={false}
        >
          <Title
            level={3}
            style={{ textAlign: "center", color: "#1890ff", marginBottom: 20 }}
          >
            Create New Post
          </Title>

          <Form
            name="createPostForm"
            layout="vertical"
            autoComplete="off"
            style={{ maxWidth: 600 }}
            onFinish={handelFormSubmit}
          >
            <Form.Item
              label="Post Title"
              name="title"
              rules={[
                { required: true, message: "Please enter the post title" },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter post title" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="body"
              rules={[
                { required: true, message: "Please enter a description" },
              ]}
              hasFeedback
            >
              <Input.TextArea placeholder="Enter post description" rows={4} />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", height: 45 }}
              >
                Submit Post
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
};

export default AddPost;
