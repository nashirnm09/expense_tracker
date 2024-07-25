import { Progress } from "antd"

const Analytics = ({ data }) => {

  const categories = ["College", "fee", "medical"]

  const totalTransaction = data.length
  const totalIncomeTransaction = data.filter(transaction => transaction.type === 'income')
  const totalExpenseTransaction = data.filter(transaction => transaction.type === 'expense')
  const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100
  const totalExpensePercent = (totalExpenseTransaction.length / totalTransaction) * 100

  const totalTurnover = data.reduce((acc, transaction) => acc + transaction.amount, 0)
  const totalIncomeTurnover = data.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0)
  const totalExpenseTurnover = data.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0)

  return (
    <div className="flex-anal row my-3">
      <div className='col-md-4'>
        <div className='card'>
          <div className="card-header">Total Transaction</div>
          <div className='card-body'>
            <h3>Total transaction: {totalTransaction}</h3>
            <div className="success">Income : {totalIncomeTransaction.length}</div>
            <div className="danger">Expense : {totalExpenseTransaction.length}</div>
            <Progress type="circle" className='m-2' strokeColor={'green'} percent={totalIncomePercent.toFixed(0)} />
            <Progress type="circle" className='m-2' strokeColor={'red'} percent={totalExpensePercent.toFixed(0)} />
          </div>
        </div>
        <div className='card'>
          <div className="card-header">Total Transaction</div>
          <div className='card-body'>
            <h3>Total Turnover: {totalTurnover}</h3>
            <div className="success">Income : {totalIncomeTurnover}</div>
            <div className="danger">Expense : {totalExpenseTurnover}</div>
            <Progress type="circle" className='m-2' strokeColor={'green'} percent={((totalIncomeTurnover / totalTurnover) * 100).toFixed(0)} />
            <Progress type="circle" className='m-2' strokeColor={'red'} percent={((totalExpenseTurnover / totalTurnover) * 100).toFixed(0)} />
          </div>
        </div>
        <div className='card'>
          <div className="card-header">Total income category</div>
          <div className='card-body'>
            {categories.map(category => {
              const categoryTransaction = data.filter(transaction => transaction.type === 'income' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0)
              return (
                <Progress percent={((categoryTransaction / totalTurnover) * 100).toFixed(0)} />
              )
            })}
          </div>
        </div>
        <div className='card'>
          <div className="card-header">Total Expenses category</div>
          <div className='card-body'>
            {categories.map(category => {
              const categoryTransaction = data.filter(transaction => transaction.type === 'expense' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0)
              return (
                <Progress percent={((categoryTransaction / totalTurnover) * 100).toFixed(0)} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics;