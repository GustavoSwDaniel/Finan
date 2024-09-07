import Sidebar from "../../components/sidebar";
import Navbar from "../../components/Navbar/Navbar";
import TableFinaciersRevenue from "../../components/Table/TableFinaciersRevenue";

const FinaciersRevenue = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-screen flex">
          <Sidebar />
          <div className="flex flex-col h-screen w-full">
            <TableFinaciersRevenue />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinaciersRevenue;
