import Sidebar from "../../components/sidebar";
import Navbar from "../../components/Navbar/Navbar";
import TableFinaciers from "../../components/Table/TableFinaciers";

const Finaciers = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-screen flex">
          <Sidebar />
          <div className="flex flex-col h-screen w-full">
            <TableFinaciers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finaciers;
