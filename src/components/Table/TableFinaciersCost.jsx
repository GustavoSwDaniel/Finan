import { useState, useEffect } from "react";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import { RiDownload2Fill } from "react-icons/ri";
import CreateCostModal from "../Modals/CreateCost/CreateCost";
import Pagination from "../Pagination/Pagination";
import GenerateReport from "../Modals/GenerateReport/GenerateReport";


const TableFinaciersCost = () => {
  const [costs, setCost] = useState([]);
  const [change, setChange] = useState(false);
  const [showModalCosts, setShowModalCosts] = useState(false);
  const [pages, setPages] = useState([]);
  const [selectPage, setSelectPage] = useState(0);
  const [showModalReport, setShowModalReport] = useState(false);


  const getCategories = async () => {
    const response = await axios.get("http://localhost:8081/financers?type=despesa&limite=12&offset=" + selectPage);
    console.log(response.data);
    setCost(response.data);
    const pagesTotal = Math.ceil(response.data.total / 12)
    setPages(Array.from({ length: pagesTotal }, (_, index) => index + 1));
  };

  const openModalCost = (e) => {
    e.preventDefault();
    setShowModalCosts(true);
  };

  const openModalReport = (e) => {
    e.preventDefault();
    setShowModalReport(true);
  }

  useEffect(() => {
    getCategories();
    setChange(false);
  }, [change]);
  
  return (
    <div className="bg-[#adadad] h-full">
    <CreateCostModal showModal={showModalCosts} setShowModal={setShowModalCosts} />
    <GenerateReport showModal={showModalReport} setShowModal={setShowModalReport} urlType={"gastos"}/>
    <div className="flex items-center justify-between">
      <div className="flex p-3">
        <button className="p-2 flex items-center gap-3 mr-2 bg-black text-[#00df9a] 
                           font-extrabold rounded-md	 hover:bg-[#31584d] transition duration-75	ease-in-out"
                           onClick={openModalCost}>
          <span className="font-extrabold">
            <CiCirclePlus size={32} />
          </span>
            Adicionar Custos
          </button>
          <button className="p-2 flex items-center gap-3 bg-black text-[#00df9a] 
                           font-extrabold rounded-md	 hover:bg-[#31584d] transition duration-75	ease-in-out"
                           onClick={openModalReport}>
          <span className="font-extrabold">
            <RiDownload2Fill size={32} />
          </span>
            Gerar relatorio de Despesas 
          </button>
      </div>
      <Pagination selectPage={selectPage} setSelectPage={setSelectPage} pages={pages} setChange={setChange}/>
    </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-[#313131]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Valor
              </th>
              <th scope="col" className="px-6 py-3">
                Recorrente
              </th>
            </tr>
          </thead>
          <tbody>
          {costs.data?.map((cost) => (
              <tr key={cost.id} className="bg-white border-b dark:bg-[#ffffff] dark:border-gray-700 cursor-pointer" onClick={(e) => openModalProduct(e, product.sku)} >
                <td className="px-6 py-4 text-black">{cost.name}</td>
                <td className="px-6 py-4 text-black">R$ {cost.value}</td>
                <td className="px-6 py-4 text-black">
                    {cost.is_recurrent ? "Recorrente" : "Não Recorrente"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableFinaciersCost;
