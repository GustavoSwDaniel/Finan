
import UserManualSideBar from "../../components/UserManualSideBar/UserManualSideBar";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/sidebar";

const UserManual = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-screen flex">
          <Sidebar />
          <div className="flex flex-col h-screen w-full">
            <UserManualSideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManual;
