import { useState, useEffect } from "react";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";


const TableReports = () => {
  const [reports, setReports] = useState([]);
  const [change, setChange] = useState(false);

  const getReports = async () => {
    setChange(true);
    const response = await axios.get("http://localhost:8081/reports");
    console.log(response.data);
    setReports(response.data);
  };

  useEffect(() => {
    getReports();
    setChange(false);
  }, [change]);

  return (
    <div className="bg-[#adadad] h-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-[#313131]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Autor
              </th>
              <th scope="col" className="px-6 py-3">
                Download
              </th>
            </tr>
          </thead>
          <tbody>
          {reports.map((report) => (
              <tr key={report.id} className="bg-white border-b dark:bg-[#ffffff] dark:border-gray-700 cursor-pointer" onClick={(e) => openModalProduct(e, product.sku)} >
                <td className="px-6 py-4 text-black">{report.id}</td>
                <td className="px-6 py-4 text-black">{report.user_id}</td>
                <td className="px-6 py-4 text-black">
                    <a href={report.url} download>
                        <i className="fa-solid fa-download"></i>
                    </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableReports;
