import { Progress, Tooltip } from "antd";

const Analytics = ({ data }) => {
  const categories = ["College", "fee", "medical"];

  const totalTransaction = data.length;
  const totalIncomeTransaction = data.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransaction = data.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  const totalTurnover = data.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = data
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = data
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <section className="flex-anal gap-[20px] flex-col my-3">
      <div className="flex flex-col p-[20px] lg:flex-row justify-center items-center lg:justify-evenly">
        <div className="card my-2 rounded-md">
          <div className="card-header center py-3 text-[18px] font-bold">
            Total Transaction
          </div>
          <div className="card-body text-[16px]">
            <h3>Total transaction: {totalTransaction}</h3>
            <p className="text-green-900">
              Income : {totalIncomeTransaction.length}
            </p>
            <p className="text-red-800">
              Expense : {totalExpenseTransaction.length}
            </p>
          </div>
          <div className="my-6">
            <Tooltip color="green" title={"income"}>
              <Progress
                type="circle"
                className="m-2"
                strokeColor={"green"}
                percent={Number(totalIncomePercent.toFixed(0))}
              />
            </Tooltip>
            <Tooltip color="red" title={"expense"}>
              <Progress
                type="circle"
                className="m-2"
                strokeColor={"red"}
                percent={Number(totalExpensePercent.toFixed(0))}
              />
            </Tooltip>
          </div>
        </div>
        <div className="card rounded-md my-2">
          <div className="card-header center py-3 text-[18px] font-bold">
            Total Transaction
          </div>
          <div className="card-body text-[16px]">
            <h3>Total Turnover: {totalTurnover}</h3>
            <p className="text-green-900">Income : {totalIncomeTurnover}</p>
            <p className="text-red-800">Expense : {totalExpenseTurnover}</p>
          </div>
          <div className="my-6">
            <Tooltip color="green" title={"income"}>
              <Progress
                type="circle"
                className="m-2"
                strokeColor={"green"}
                percent={(
                  Number(totalIncomeTurnover / totalTurnover) * 100
                ).toFixed(0)}
              />
            </Tooltip>
            <Tooltip color="red" title={"expense"}>
              <Progress
                type="circle"
                className="m-2"
                strokeColor={"red"}
                percent={(
                  Number(totalExpenseTurnover / totalTurnover) * 100
                ).toFixed(0)}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-[20px] lg:flex-row justify-evenly">
        <div className="card rounded-md my-3">
          <div className="pt-2 card-header">Total income category</div>
          <div className="pb-3 card-body">
            {categories.map((category) => {
              const categoryTransaction = data
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                <Tooltip title={category}>
                  <Progress
                    percent={(
                      (categoryTransaction / totalTurnover) *
                      100
                    ).toFixed(0)}
                  />
                </Tooltip>
              );
            })}
          </div>
        </div>
        <div className="card rounded-md my-3">
          <div className="card-header">Total Expenses category</div>
          <div className="card-body">
            {categories.map((category) => {
              const categoryTransaction = data
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                <Tooltip title={category}>
                  <Progress
                    percent={(
                      (categoryTransaction / totalTurnover) *
                      100
                    ).toFixed(0)}
                  />
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
