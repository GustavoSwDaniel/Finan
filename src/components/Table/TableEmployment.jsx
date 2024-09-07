import { useState, useEffect } from "react";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import CreateEmployeerModal from "../Modals/CreateEmployeer/CreateEmployeer";



const TableEmployment = () => {
  const [employes, setEmployes] = useState([]);
  const [change, setChange] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);


  const getCategories = async () => {
    setChange(true);
    const response = await axios.get("http://localhost:8081/manager/employees");
    console.log(response.data);
    setEmployes(response.data);
  };

  const openModalEmployee = (e) => {
    e.preventDefault();
    setShowModalCreate(true);
  };

  useEffect(() => {
    getCategories();
    setChange(false);
  }, [change]);

  return (
    <div className="bg-[#adadad] h-full">
      <CreateEmployeerModal showModal={showModalCreate} setShowModal={setShowModalCreate} />
      <div className="p-3">
        <button className="p-2 flex items-center gap-3 bg-black text-[#00df9a] 
                           font-extrabold rounded-md	 hover:bg-[#31584d] transition duration-75	ease-in-out"
                           onClick={openModalEmployee}>
          <span className="font-extrabold">
            <CiCirclePlus size={32} />
          </span>
          Cadastrar novo funcionário
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
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Posição
              </th>
            </tr>
          </thead>
          <tbody>
          {employes.data?.map((employee) => (
              <tr key={employee.uuid} className="bg-white border-b dark:bg-[#ffffff] dark:border-gray-700 cursor-pointer" onClick={() => console.log()} >
                <td className="px-6 py-4 text-black">{employee.uuid}</td>
                <td className="px-6 py-4 text-black">{employee.name}</td>
                <td className="px-6 py-4 text-black">{employee.email}</td>
                <td className="px-6 py-4 text-black">{employee.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableEmployment;
