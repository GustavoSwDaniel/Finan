import Navbar from "../../components/Navbar/Navbar";
import TableProducts from "../../components/Table/TableProducts";
import Sidebar from "../../components/sidebar";

const Products = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-screen flex">
          <Sidebar />
          <div className="flex flex-col h-screen w-full">
            <TableProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
