import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERRORS } from "../redux/constants/userConstants";
import { loginUserAction } from "../redux/actions/userActions";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user,
    error,
    success,
    message: mess,
    loading,
  } = useSelector((state) => state.user);

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

    dispatch(loginUserAction(values));
  };

  useEffect(() => {
    if (error) {
      messageSend("error", error);
      dispatch({ type: CLEAR_ERRORS });
      nevigate("/");
      return;
    }

    if (success) {
      messageSend("success", mess);
      nevigate("/");
      return;
    }

    if (user) {
      nevigate("/");
      return;
    }
  }, [nevigate, dispatch, mess, user, loading, success, error]);

  return (
    <div className="login ">
      <Form
        name="basic"
        style={{
          maxWidth: 400,
        }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        autoComplete="off"
        className="container rounded-md my-2"
      >
        {contextHolder}
        <h2 className="text-center font-bold py-3 text-lg">LOGIN FORM</h2>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <div className="center text-[0.85rem] flex gap-2">
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
          <Button
            disabled={loading}
            className="my-1 w-[100px]"
            type="primary"
            htmlType="submit"
          >
            LOG IN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
