import Metrics from "@/components/Metrics";

const ExpensesPage = () => {
  return (
    <div className="m-2 bg-blue-900  border text-white rounded-md border-gray-300">
        <Metrics label="Expense " amount={45678.89} />
    </div>
  )
}

export default ExpensesPage