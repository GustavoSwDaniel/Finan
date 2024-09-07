import Sidebar from "../../components/sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Datepicker from "react-tailwindcss-datepicker";
import { FaChartBar } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import TableReports from "../../components/Table/TableReports";

const Reports = () => {
  const [value, setValue] = useState("");
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const generateReport = async () => {
    const response = await axios.get(`http://localhost:8081/report?start_date=${value.startDate}&end_date=${value.endDate}`, {
      responseType: 'arraybuffer'
    });
    console.log(response.data);
  
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'file.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
  }
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-screen flex">
          <Sidebar />
          <div className="flex flex-col h-screen w-full">
            <div className="flex items-center justify-start h-16 bg-white shadow">
              <div className="flex items-center justify-start gap-9 ml-5 w-[50%]">
                <span className="text-[#00df9a]">
                  <FaChartBar size={32} />
                </span>
                <h1 className="text-lg font-semibold">Relatórios</h1>
                <div className="w-[25%]">
                  <Datepicker
                    primaryColor={"emerald"}
                    secondaryColor={"white"}
                    onChange={handleValueChange} 
                    value={value}
                  />
                </div>
                <div className="p-3">
                  <button
                    className="p-2 flex items-center gap-3 bg-black text-[#00df9a] 
                  font-extrabold rounded-md	 hover:bg-[#31584d] transition duration-75	ease-in-out"
                    onClick={generateReport}
                  >
                    <span className="font-extrabold">
                      <FaChartBar size={32} />
                    </span>
                    Gerar relatorio
                  </button>
                </div>
              </div>
            </div>
            <TableReports />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
