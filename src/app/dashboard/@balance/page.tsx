import Metrics from "@/components/Metrics";

const BalancePage = () => {
  return (
    <div className="m-2 bg-red-400 p-4 border text-white rounded-md border-gray-300">
        <Metrics label="Balance" amount={23621.45} />
    </div>
  )
}

export default BalancePage