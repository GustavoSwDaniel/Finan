import Sidebar from "../../components/sidebar";
import Navbar from "../../components/Navbar/Navbar";

const Promotions = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-screen flex">
          <Sidebar />
          <div className="flex flex-col h-screen w-full">
            <h1>Promotions</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
