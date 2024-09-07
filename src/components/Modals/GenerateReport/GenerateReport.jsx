import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";
import axios from "axios";

const GenerateReport = (props) => {
  const [value, setValue] = useState("");
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const urlObject = {
    report: `http://localhost:8081/report?start_date=${value.startDate}&end_date=${value.endDate}`,
    all: `http://localhost:8081/financers/flow?start_date=${value.startDate}&end_date=${value.endDate}`,
    gastos: `http://localhost:8081/financers/flow?start_date=${value.startDate}&end_date=${value.endDate}&type=gastos`,
    receita: `http://localhost:8081/financers/flow?start_date=${value.startDate}&end_date=${value.endDate}&type=receita`,


  }

  const generateReport = async () => {
    const response = await axios.get(urlObject[props.urlType], {
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

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setTimeout(async () => {
        console.log("Gerando relatorio...");
        await generateReport();
        setLoading(false);
    }, 2000);
  };

  return (
    <>
      {props.showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Gerar relatorio</h3>
                </div>
                <div className="ml-10 mr-10">
                  <p className="text-lg font-semibold p-5">
                    Selecione o periodo para gerar o relatorio
                  </p>
                </div>
                <hr />
                <div className="flex items-end justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <Datepicker
                    primaryColor={"emerald"}
                    secondaryColor={"white"}
                    onChange={handleValueChange}
                    value={value}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                    disabled={loading}
                  >
                    Fechar
                  </button>

                  {loading ? (
                    <button
                      type="button"
                      className="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white"
                      disabled
                    >
                      <svg
                        className="mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="font-medium"> Gerando relatorio </span>
                    </button>
                  ) : (
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleClick}
                    >
                      Gerar
                    </button>
                  )}
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

export default GenerateReport;
