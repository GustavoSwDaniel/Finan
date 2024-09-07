import { useEffect, useState } from "react";
import axios from "axios";

const CreateCostModal = (props) => {
  const [change, setChange] = useState(false);
  const [cost, setCost] = useState({
    name: "",
    is_recurrent: false,
    value: "",
    type: "gasto",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "is_recurrent") {
      setCost({ ...cost, [name]: !cost.is_recurrent });
      return;
    }
    setCost({ ...cost, [name]: value });
  };

  const createCost = async () => {
    const response = await axios.post("http://localhost:8081/financer", cost);
    console.log(response.data);
    props.setShowModal(false);
  };

  useEffect(() => {
    setChange(false);
  }, [change]);

  return (
    <>
      {props.showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Criar despesa</h3>
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
                <form
                  className="relative p-6 flex-auto"
                  onSubmit={() => console.log("teste")}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-black">Nome</label>
                      <input
                        type="text"
                        name="name"
                        value={cost.name}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Valor</label>
                      <input
                        type="text"
                        name="value"
                        value={cost.value}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="is_recurrent"
                          value={cost.is_recurrent}
                          className="sr-only peer"
                          onClick={handleChange}
                        />
                        <div className="relative w-11 h-6 bg-gray-200  peer-focus:ring-blue-300 dark:peer-focus:[#00df9a] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00df9a]"></div>
                        <span className="ms-3 text-sm font-medium text-black">
                          É recorrente ou não
                        </span>
                      </label>
                    </div>
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
                    type="button"
                    onClick={createCost}
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

export default CreateCostModal;
