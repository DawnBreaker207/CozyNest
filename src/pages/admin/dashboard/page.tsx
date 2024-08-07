import ChartComponent from "./component/ChartComponent"
import OrderStatus from "./component/OrderStatus"
import RecentOrders from "./component/RecentOrders"

const DashboardPage = () => {
  return <div><OrderStatus/><div className="flex gap-3" ><ChartComponent/><RecentOrders/></div></div>
}

export default DashboardPage
