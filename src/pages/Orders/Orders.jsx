import Sidebar from "../../components/sidebar";
import Navbar from "../../components/Navbar/Navbar";
import TableOrders from "../../components/Table/TableOrders";

const Orders = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-screen flex">
          <Sidebar />
          <div className="flex flex-col h-screen w-full">
            <TableOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
