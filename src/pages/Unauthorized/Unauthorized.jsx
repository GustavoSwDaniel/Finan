import UnauthorizedImage from "../../assets/Unauthorized.png";

const Unauthorized = () => {
  return (
    <div className="w-full ">
      <div className="w-full h-full flex flex-col ">
        <div className="w-full h-screen flex">
          <div className="flex h-screen w-full items-center justify-center">
            <img src={UnauthorizedImage} alt="404" className="w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
