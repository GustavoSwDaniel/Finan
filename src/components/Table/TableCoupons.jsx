import { useState, useEffect } from "react";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import CreateCouponsModal from "../Modals/CreateCoupons/CreateCoupons";



const TableCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [change, setChange] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);

  const getCoupons = async () => {
    setChange(true);
    const response = await axios.get("http://localhost:8081/coupons");
    console.log(response.data);
    setCoupons(response.data);
  };

  const openModalCreate = (e) => {
    e.preventDefault();
    setShowModalCreate(true);
  };

  useEffect(() => {
    getCoupons();
    setChange(false);
  }, [change]);

  return (
    <div className="bg-[#adadad] h-full">
      <CreateCouponsModal showModal={showModalCreate} setShowModal={setShowModalCreate} />
      <div className="p-3">
        <button className="p-2 flex items-center gap-3 bg-black text-[#00df9a] 
                           font-extrabold rounded-md	 hover:bg-[#31584d] transition duration-75	ease-in-out"
                           onClick={openModalCreate}>
          <span className="font-extrabold">
            <CiCirclePlus size={32} />
          </span>
          Criar novo cupom
          </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-[#313131]">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                Cupons disponíveis
              </th>
              <th scope="col" className="px-6 py-3">
                Desconto
              </th>
              <th scope="col" className="px-6 py-3">
                Data de expiração
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
          {coupons.map((coupon) => (
              <tr key={coupon.id} className="bg-white border-b dark:bg-[#ffffff] dark:border-gray-700 cursor-pointer" onClick={(e) => openModalProduct(e, product.sku)} >
                <td className="px-6 py-4 text-black">{coupon.id}</td>
                <td className="px-6 py-4 text-black">{coupon.total_available}</td>
                <td className="px-6 py-4 text-black">{coupon.total_sold}%</td>
                <td className="px-6 py-4 text-black">
                    {coupon.expiration_date < new Date() ? (
                        <span className="text-red-500">{coupon.expiration_date}Expirado</span>
                    ) : (
                        <span className="text-green-500">{coupon.expiration_date}</span>
                    )}
                </td>
                <td className="px-6 py-4 text-black">
                    {coupon.is_active ? "Ativo" : "Inativo"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCoupons;
