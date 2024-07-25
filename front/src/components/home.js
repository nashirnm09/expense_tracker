import { useState, useEffect } from "react";
import { DatePicker, Form, Input, Table, Modal, Select, message } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import moment from "moment";

import Analytics from "./analytics";

const { RangePicker } = DatePicker;

const Home = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const messageSend = (type, text) => {
    messageApi.open({
      type: type,
      content: text,
    });
  };

  const [filter, setFilter] = useState(false);
  const [data, setData] = useState("");
  const [model, setModel] = useState(false);
  const [token, setToken] = useState("");
  const [frequency, setFrequency] = useState("7");
  const [selectDate, setSelectDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [change, setChange] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);

  const expandedRowRender = (record) => {
    return (
      <div className="mt-0 p-3 card">
        <div className="d-flex justify-content-around">
          <div className="left">
            <h6>Date</h6>
            <h6>Amount</h6>
            <h6>Type</h6>
            <h6>Category</h6>
            <h6>Description</h6>
            <h6>Reference</h6>
          </div>
          <div className="middle">
            <h6>:</h6>
            <h6>:</h6>
            <h6>:</h6>
            <h6>:</h6>
            <h6>:</h6>
            <h6>:</h6>
          </div>
          <div className="right">
            <div> {moment(record.date).format("DD-MM-YYYY")} </div>
            <div> {record.amount} </div>
            <div> {record.type} </div>
            <div> {record.category} </div>
            <div> {record.description} </div>
            <div> {record.reference} </div>
          </div>
        </div>
      </div>
    );
  };

  const nevigate = useNavigate();

  const deleteData = async (record) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/${token}/deleteTrans`, {
        id: record._id,
      });
      setChange(change + 1);
    } catch (error) {}
  };

  const column = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            style={{ marginRight: "5px" }}
            onClick={() => {
              record.date = moment(record.date).format("YYYY-MM-DD");
              setEditable(record);
              setModel(true);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              deleteData(record);
            }}
          />
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            style={{ marginRight: "5px" }}
            onClick={() => {
              record.date = moment(record.date).format("YYYY-MM-DD");
              setEditable(record);
              setModel(true);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              deleteData(record);
            }}
          />
        </div>
      ),
    },
  ];

  const onFinish = async (values) => {
    if (
      !values.amount ||
      !values.type ||
      !values.description ||
      !values.category ||
      !values.date
    ) {
      return messageSend("error", "Please fill the all fields");
    }
    try {
      if (editable) {
        await axios.post(`http://localhost:8080/api/v1/${token}/updateTrans`, {
          id: editable._id,
          values,
        });
        setChange(change + 1);

        setEditable(null);
      } else {
        await axios.post(
          `http://localhost:8080/api/v1/${token}/addTrans`,
          values
        );
        setChange(change + 1);
      }
    } catch (error) {}
    setModel(false);
  };

  useEffect(() => {
    const dat = async () => {
      setWidth(window.innerWidth);

      let toko = JSON.parse(localStorage.getItem("user"));
      if (!toko) {
        return nevigate("/login");
      }

      setToken(toko);
      try {
        const res = await axios.post(
          `http://localhost:8080/api/v1/${toko}/getTrans`,
          { frequency, selectDate, type }
        );
        res.data.data.map((data) => (data.key = data._id));
        setData(res.data.data);
      } catch (error) {}
    };
    dat();
  }, [frequency, selectDate, nevigate, type, change]);

  return (
    <>
      <Header />
      {contextHolder}
      <Modal
        title="add transaction"
        open={model}
        onCancel={() => {
          setModel(false);
        }}
        footer={false}
      >
        <Form initialValues={editable} onFinish={onFinish}>
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
          <button className="btn " onClick={() => setModel(false)}>
            Cancel
          </button>
          <button type="submit" className="btn primary-btn">
            Add New
          </button>
        </Form>
      </Modal>
      {width && width > 600 ? (
        <div className="box my-2">
          <div className="filters-modal px-2 my-3">
            <div className="frequency">
              <h6 className="font-[500] text-[13.2px]">Select Frequency</h6>
              <Select
                className="select-opt m-2"
                style={{ minWidth: 130 }}
                value={frequency}
                onChange={(value) => setFrequency(value)}
              >
                <Select.Option value="7">Last 7 days</Select.Option>
                <Select.Option value="30">Last 30 days</Select.Option>
                <Select.Option value="365">Last 365 days</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>
              {frequency === "custom" && (
                <RangePicker
                  className="my-2"
                  value={selectDate}
                  onChange={(value) => setSelectDate(value)}
                />
              )}
            </div>
            <div className="font-sans type">
              <h6 className="font-[500] text-[13.2px]">Select Type</h6>
              <Select
                style={{ width: 110 }}
                value={type}
                onChange={(value) => setType(value)}
              >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expensive</Select.Option>
              </Select>
            </div>
            <div className="flex change-icon">
              <UnorderedListOutlined
                className={`${
                  viewData === "table" ? "bg-blue-200" : "bg-transparent"
                } rounded-tl rounded-bl btn p-3`}
                onClick={() => setViewData("table")}
              />
              <AreaChartOutlined
                className={`${
                  viewData === "analytics" ? "bg-blue-200" : "bg-transparent"
                } rounded-tr rounded-br btn p-3`}
                onClick={() => setViewData("analytics")}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                setModel(!model);
              }}
            >
              Add transaction
            </button>
          </div>
        </div>
      ) : (
        <div className="filter-logo mx-2">
          <button
            type="button"
            className=" btn btn-primary"
            style={{ margin: "20px auto", float: "right", clear: "both" }}
            onClick={() => setModel(true)}
          >
            Add New
          </button>
          <div className="filter">
            <FilterOutlined
              style={{ fontSize: "2rem" }}
              onClick={() => setFilter(true)}
            />
          </div>
          <Modal
            title="Filters"
            open={filter}
            onCancel={() => {
              setFilter(false);
            }}
            footer={false}
          >
            <div style={{ margin: "20px 0" }} className="frequency">
              <h6>Select Frequency</h6>
              <Select
                className="select-opt "
                value={frequency}
                style={{ width: "100%" }}
                onChange={(value) => setFrequency(value)}
              >
                <Select.Option value="7">Last 5 days</Select.Option>
                <Select.Option value="30">Last 30 days</Select.Option>
                <Select.Option value="365">Last 365 days</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>
              {frequency === "custom" && (
                <RangePicker
                  className="my-2"
                  value={selectDate}
                  onChange={(value) => setSelectDate(value)}
                />
              )}
            </div>
            <div style={{ margin: "10px 0" }} className="type">
              <h6>Select Type</h6>
              <Select
                style={{ width: "100%" }}
                value={type}
                onChange={(value) => setType(value)}
              >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expensive</Select.Option>
              </Select>
            </div>
            <div className="my-6">
              <h6>Set View Data</h6>
              <div className="flex w-[200px] center mx-auto change-icon">
                <UnorderedListOutlined
                  className={`${
                    viewData === "table" ? "bg-blue-200" : "bg-transparent"
                  } rounded-tl w-full center rounded-bl btn p-3`}
                  onClick={() => setViewData("table")}
                />
                <AreaChartOutlined
                  className={`${
                    viewData === "analytics" ? "bg-blue-200" : "bg-transparent"
                  } rounded-tr w-full center rounded-br btn p-3`}
                  onClick={() => setViewData("analytics")}
                />
              </div>
            </div>

            <button
              style={{ width: "100%" }}
              className="my-2 btn btn-primary"
              onClick={() => setFilter(false)}
            >
              Ok
            </button>
          </Modal>
        </div>
      )}
      <div className="content">
        {viewData === "table" ? (
          width && width > 600 ? (
            <Table dataSource={data} columns={columns} />
          ) : (
            <Table
              dataSource={data}
              columns={column}
              expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            />
          )
        ) : (
          <Analytics data={data} />
        )}
      </div>
    </>
  );
};

export default Home;
