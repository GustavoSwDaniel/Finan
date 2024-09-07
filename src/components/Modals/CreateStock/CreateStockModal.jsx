import { useEffect, useState } from "react";
import axios from "axios";


const CreateStockModal = (props) => {
  const [change, setChange] = useState(false);
  const [stock, setStock] = useState({
    price: "",
    quantity: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
  };

  const handleChangePhysicalCharacteristics = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, physical_characteristics: { ...stock.physical_characteristics, [name]: value } });
  };

  const createStock = async () => {
    stock.price = stock.price.replace(/[^0-9.]/g, '');

    const response = await axios.post("http://localhost:8081/stock", stock);
    console.log(response.data);
    props.setShowModal(false);
  }

  useEffect(() => {
    setStock(prevState => ({
      ...prevState,
      product_sku: props.product_id
    }));
  }, [props.product_id])

  useEffect(() => {
    setChange(false);
  }
  , [change]);

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
                  <h3 className="text-3xl font-semibold">Criação de stock</h3>
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
                <form className="relative p-6 flex-auto" onSubmit={createStock}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-black">Preço</label>
                      <input
                        type="text" name="price" value={stock.name} onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Quantidade</label>
                      <input
                        type="text" name="quantity" value={stock.description} onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
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
                    type="button" onClick={createStock}
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

export default CreateStockModal;
