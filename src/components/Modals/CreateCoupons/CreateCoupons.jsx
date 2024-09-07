import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-tailwindcss-select";
import TableProductsData from "./TableProductsData";



const CreateCouponsModal = (props) => {
  const [change, setChange] = useState(false);
  const [products, setProducts] = useState([]);
  const [product_selected, setProductSelected] = useState([]);
  const [coupon, setCoupon] = useState({
    code: "",
    total_available: "",
    total_sold: "",
    expiration_date: "",
    products: []
  });



  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setCoupon({ ...coupon, [name]: value });
    console.log(coupon);
  };

  const handleChangeProduct = async (e) => {
    setCoupon({ ...coupon, products: [...coupon.products, e.target.value] });
    };


  const getProducts = async () => {
    const response = await axios.get("http://localhost:8081/products");
    console.log(response.data);
    setProducts(response.data);
    };


  const createCoupons = async () => {
    await axios.post("http://localhost:8081/coupon", coupon);
    props.setShowModal(false);
  }

  const generateCode = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8081/generate/coupon");
    console.log(response.data);
    setCoupon({ ...coupon, code: response.data.code });
    }

  useEffect(() => {
    getProducts();
    setChange(false);
  }
  , [change]);

  return (
    <>
      {props.showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-3 mx-auto max-w-10xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Criação de cupom</h3>
                  <p>{product_selected}</p>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form className="relative p-6 flex-auto" onSubmit={() => console.log("alo")}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-black">Codigo</label>
                      <div className="flex">
                        <input
                            type="text" name="code" value={coupon.code} onChange={handleChange}
                            className="border border-gray-300 p-2 rounded w-full"
                            />
                        <button className="bg-black text-white p-2 rounded ml-2" onClick={generateCode}>
                            <span className="font-extrabold">
                                <i className="fa-solid fa-sync"></i>
                            </span>
                        </button>
                       </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Quantidade</label>
                      <input
                        type="text" name="total_available" value={coupon.total_available} onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Desconto(%)</label>
                      <input
                        type="text" name="total_sold" value={coupon.units} onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="relative flex flex-col">
                        <label className="text-black">Data de expiração</label>
                        <input type="date" name="expiration_date" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
                    </div>
                </div>
                <div>
                    <TableProductsData setProductSelected={setProductSelected} product_selected={product_selected}/>
                </div>
                </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Fechar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button" onClick={createCoupons}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateCouponsModal;
