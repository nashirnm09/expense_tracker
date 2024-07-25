import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Sign = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const nevigate = useNavigate();

  const messageSend = (type, text) => {
    messageApi.open({
      type: type,
      content: text,
    });
  };

  const onFinish = async (values) => {
    if (!values.username || !values.password || !values.email || !values.name) {
      return messageSend("error", "Please fill all fields");
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/sign",
        values
      );
      messageSend("success", "Sign- in successfully");
      localStorage.setItem("user", JSON.stringify(res.data.user.username));
      nevigate(`/`);
    } catch (error) {
      console.log(error);
      messageSend("error", error.message);
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      nevigate("/");
    }
  }, [nevigate]);

  return (
    <div className="login">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        className="container my-2"
      >
        {contextHolder}
        <h2 className="text-center font-bold text-lg py-2">SIGN IN FORM</h2>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <div className="center flex gap-2">
          Not a User?
          <Link className="text-blue-500" to="/login">
            click Here to login!
          </Link>
        </div>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="my-1 w-[120px]" type="primary" htmlType="submit">
            SIGN IN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Sign;
