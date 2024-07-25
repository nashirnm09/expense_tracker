import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const nevigate = useNavigate();

  const messageSend = (type, text) => {
    messageApi.open({
      type: type,
      content: text,
    });
  };

  const onFinish = async (values) => {
    if (!values.username || !values.password) {
      return messageSend("error", "Please fill all fields");
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        values
      );
      messageSend("success", "Login Successfully");
      localStorage.setItem("user", JSON.stringify(res.data.user.username));
      nevigate("/");
    } catch (error) {
      messageSend("error", "Internal error");
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      nevigate("/");
    }
  }, [nevigate]);

  return (
    <div className="login rounded">
      <Form
        name="basic"
        style={{
          maxWidth: 400,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        autoComplete="off"
        className="container my-2"
      >
        {contextHolder}
        <h2 className="text-center font-bold py-3 text-lg">LOGIN FORM</h2>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <div className="center flex gap-2">
          Not have any account ?{" "}
          <Link className="text-blue-600" to="/sign">
            Create account!
          </Link>
        </div>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="my-1 w-[100px]" type="primary" htmlType="submit">
            LOG IN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
