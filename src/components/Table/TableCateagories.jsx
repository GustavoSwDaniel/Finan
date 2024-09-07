import { useState, useEffect } from "react";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import CreateCategory from "../Modals/CreateCategory/CreateCategory";



const TableCategories = () => {
  const [categories, setCategories] = useState([]);
  const [change, setChange] = useState(false);
  const [showModalCategory, setShowModalCategory] = useState(false);

  const getCategories = async () => {
    setChange(true);
    const response = await axios.get("http://localhost:8081/category");
    console.log(response.data);
    setCategories(response.data);
  };

  const openModalCategory = (e) => {
    e.preventDefault();
    setShowModalCategory(true);
  };

  useEffect(() => {
    getCategories();
    setChange(false);
  }, [change]);

  return (
    <div className="bg-[#adadad] h-full">
      <CreateCategory showModal={showModalCategory} setShowModal={setShowModalCategory} />
      <div className="p-3">
        <button className="p-2 flex items-center gap-3 mr-2 bg-black text-[#00df9a] 
                           font-extrabold rounded-md	 hover:bg-[#31584d] transition duration-75	ease-in-out"
                           onClick={openModalCategory}>
          <span className="font-extrabold">
            <CiCirclePlus size={32} />
          </span>
          Cadastrar nova categoria
          </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-[#313131]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Uuid
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Descrição
              </th>
            </tr>
          </thead>
          <tbody>
          {categories.map((category) => (
              <tr key={category.uuid} className="bg-white border-b dark:bg-[#ffffff] dark:border-gray-700 cursor-pointer" onClick={(e) => openModalProduct(e, product.sku)} >
                <td className="px-6 py-4 text-black">{category.uuid}</td>
                <td className="px-6 py-4 text-black">{category.name}</td>
                <td className="px-6 py-4 text-black">{category.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCategories;
