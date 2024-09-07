import Sidebar from "../../components/sidebar";
import Navbar from "../../components/Navbar/Navbar";
import NotFoundImage from "../../assets/NotFound.png";


const NotFoundPage = () => {
  return (
    <div className="w-full ">
      <div className="w-full h-full flex flex-col ">
        <div className="w-full h-screen flex">
          <div className="flex h-screen w-full items-center justify-center">
            <img src={NotFoundImage} alt="404" className="w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
