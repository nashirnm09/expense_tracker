import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_ERRORS,
  CREATE_TRANS_RESET,
  UPDATE_TRANS_RESET,
} from "../redux/constants/transConstants";
import {
  createTransaction,
  updateTransaction,
} from "../redux/actions/transActions";
import { Button, Form, Input, Modal, Select } from "antd";

function UpdateTrans({
  setEditable,
  model,
  messageSend,
  send,
  editable,
  setModel,
}) {
  const dispatch = useDispatch();

  const { message, loading, created, updated, error } = useSelector(
    (state) => state.trans
  );

  const onFinish = async (values) => {
    if (
      !values.amount ||
      !values.type ||
      !values.description ||
      !values.category ||
      !values.reference ||
      !values.date
    ) {
      return messageSend("error", "Please fill the all fields");
    }
    if (editable) {
      dispatch(updateTransaction(values, editable._id));
    } else {
      dispatch(createTransaction(values));
    }

    setModel(false);
  };

  useEffect(() => {
    if (created) {
      messageSend("success", message);
      dispatch({ type: CREATE_TRANS_RESET });
      setModel(false);
      send();
      return;
    }

    if (updated) {
      messageSend("success", message);
      dispatch({ type: UPDATE_TRANS_RESET });
      setModel(false);
      setEditable(null);
      send();
      return;
    }

    if (error) {
      messageSend("error", error);
      dispatch({ type: CLEAR_ERRORS });
      return;
    }
  }, [message, created, updated, error]);

  return (
    <>
      {model && (
        <Modal
          title={`${editable ? "Update" : "Create"} Transaction`}
          open={model}
          onCancel={() => {
            setModel(false);
            setEditable(undefined);
          }}
          footer={false}
        >
          <Form
            labelCol={{
              span: 5,
            }}
            className="pt-4"
            initialValues={editable}
            onFinish={onFinish}
          >
            <Form.Item label="Amount" name="amount">
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="College">College</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>

            <Form.Item label="Reference" name="reference">
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
            <div className="flex gap-2 flex-row-reverse">
              <Button
                disabled={loading}
                type="primary"
                htmlType="submit"
                className="btn rounded-md px-4 btn-primary"
              >
                {editable ? "Update" : "Create"}
              </Button>
              <Button
                type="text"
                disabled={loading}
                className="btn rounded-md text-blue-500 hover:bg-stone-200 bg-transparent px-4 btn-primary"
                onClick={() => setModel(false)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default UpdateTrans;
