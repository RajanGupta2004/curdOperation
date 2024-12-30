import { Button, Card, Form, Input, Space } from "antd";
import { Typography } from "antd";
const { Title } = Typography;
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUpdatePostMutation } from "../services/post";
import { useDispatch } from "react-redux";
import { addPostId } from "../redux/postSlice";

const EditPost = () => {
  const loaction = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { post } = loaction.state;
  const [form] = Form.useForm();
  const [updatePost] = useUpdatePostMutation();

  const handleFormSubmit = async () => {
    try {
      const data = await updatePost(post);
      alert("Post updated successfully");
      dispatch(addPostId(params.id));
      navigate("/");
    } catch (error) {
      console.log("Error in edit form submit", error);
    }
  };

  useEffect(() => {
    if (post) {
      form.setFieldsValue({
        title: post.title,
        description: post.body,
      });
    }
  }, [post, form]);

  return (
    <div>
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
              style={{
                textAlign: "center",
                color: "#1890ff",
                marginBottom: 20,
              }}
            >
              Edit Post
            </Title>

            <Form
              form={form}
              name="editPostForm"
              layout="vertical"
              autoComplete="off"
              style={{ maxWidth: 600 }}
              onFinish={handleFormSubmit}
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
                name="description"
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
                  Update Post
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </div>
    </div>
  );
};

export default EditPost;
