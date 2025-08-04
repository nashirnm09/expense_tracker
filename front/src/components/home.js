import { useState, useEffect } from "react";
import { DatePicker, Table, Modal, Select, message, Tooltip } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import moment from "moment";
import Analytics from "./analytics";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransaction,
  getTransaction,
} from "../redux/actions/transActions";
import UpdateTrans from "./updateTrans";
import {
  CLEAR_ERRORS,
  DELETE_TRANS_RESET,
} from "../redux/constants/transConstants";

const expandedRowRender = (record) => {
  return (
    <div key={record._id} className="mt-0 p-3">
      <div className="flex justify-around">
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

const Home = () => {
  const [filter, setFilter] = useState(false);
  const [model, setModel] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [selectDate, setSelectDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  const { RangePicker } = DatePicker;
  const [messageApi, contextHolder] = message.useMessage();

  const messageSend = (type, text) => {
    messageApi.open({
      type: type,
      content: text,
    });
  };

  const dispatch = useDispatch();
  const {
    trans,
    deleted,
    message: mess,
    error,
  } = useSelector((state) => state.trans);

  const nevigate = useNavigate();

  const deleteData = async (record) => {
    dispatch(deleteTransaction(record._id));
  };

  const col = [
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
  ];

  const action = {
    title: "Actions",
    render: (text, record) => (
      <div className="flex gap-2">
        <Tooltip title={"edit"}>
          <EditOutlined
            className="p-2 hover:bg-stone-200"
            onClick={() => {
              record.date = moment(record.date).format("YYYY-MM-DD");
              setEditable(record);
              setModel(true);
            }}
          />
        </Tooltip>

        <Tooltip title={"delete"}>
          <DeleteOutlined
            className="p-2 hover:bg-stone-200"
            onClick={() => {
              deleteData(record);
            }}
          />
        </Tooltip>
      </div>
    ),
  };

  const columns = [
    ...col,
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
    { ...action },
  ];

  const get = () => {
    if (frequency !== "custom") dispatch(getTransaction({ frequency, type }));
    if (frequency === "custom" && selectDate.length === 2)
      dispatch(getTransaction({ frequency, selectDate, type }));
  };
  useEffect(() => {
    get();
  }, [frequency, selectDate, nevigate, type]);

  useEffect(() => {
    if (error) {
      messageSend("error", error);
      dispatch({ type: CLEAR_ERRORS });
      return;
    }

    if (deleted) {
      messageSend("success", mess);
      dispatch({ type: DELETE_TRANS_RESET });
      get();
      return;
    }
  }, [deleted, error, mess, dispatch]);

  return (
    <>
      <Header />
      {contextHolder}
      <div>
        <UpdateTrans
          setEditable={setEditable}
          setModel={setModel}
          editable={editable}
          messageSend={messageSend}
          send={get}
          model={model}
        />
      </div>
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
                setModel(true);
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
      <div className="content px-2">
        {viewData === "table" ? (
          width && width > 600 ? (
            <Table dataSource={trans} columns={columns} />
          ) : (
            <Table
              dataSource={trans}
              columns={[...col, { ...action }]}
              expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            />
          )
        ) : (
          <Analytics data={trans} />
        )}
      </div>
    </>
  );
};

export default Home;
