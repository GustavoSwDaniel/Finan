import { useEffect, useState } from "react";
import axios from "axios";


const CreateModal = (props) => {
  const [categories, setCategories] = useState([]);
  const [change, setChange] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category_uuid: "",
    image_url: "",
    physical_characteristics: {},
  });


  const [createStockNow, setCreateStock] = useState(false);

  const [stock, setStock] = useState({
    price: "",
    quantity: "",
    product_sku: "",
  });

  const handleChangePhysicalCharacteristics = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, physical_characteristics: { ...product.physical_characteristics, [name]: value } });
  };

  const handleChangeStock = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const getCategories = async () => {
    setChange(true);
    const response = await axios.get("http://localhost:8081/category");
    console.log(response.data);
    setCategories(response.data);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const response = await axios.post("http://localhost:8081/uploadfile", formData);
    console.log(response.data);
    setProduct({ ...product, image_url: response.data.url_file });
  };
  
  const openStock = (e) => {
    e.preventDefault();
    setCreateStock(!createStockNow);
  }

  const closeModal = () => {
    setProduct({
      name: "",
      description: "",
      category_uuid: "",
      image_url: "",
    });
    setStock({
      price: "",
      quantity: "",
      product_sku: "",
      physical_characteristics: "",
    });
    props.setShowModal(false);

  }
  
  const createStock = async (sku) => {
    stock.price = stock.price.replace(/[^0-9.]/g, '');

    const response = await axios.post("http://localhost:8081/stock", { ...stock, product_sku: sku });
    console.log(response.data);
  }

  const createProduct = async (e) => {
    e.preventDefault();
    while (product.image_url === "") {
      await new Promise(r => setTimeout(r, 500)); 
    }
    const response = await axios.post("http://localhost:8081/products", product);
    if (createStockNow && response.data.sku) {
      await createStock(response.data.sku);
    }
    console.log(response.data);
    closeModal()
  }

  useEffect(() => {
    getCategories();
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
                  <h3 className="text-3xl font-semibold">Criação de Produto</h3>
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
                <form className="relative p-6 flex-auto" onSubmit={createProduct}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-black">Nome</label>
                      <input
                        type="text" name="name" value={product.name} onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Descrição</label>
                      <input
                        type="text" name="description" value={product.description} onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Categorias</label>
                      <select className="border border-gray-300 p-2 rounded" 
                              name="category_uuid" value={product.category_uuid} onChange={handleChange}
                      >
                        {categories.map((category) => (
                          <option key={category.uuid} value={category.uuid}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Imagem</label>
                      <input
                        type="file" name="image" onChange={uploadFile}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Altura</label>
                      <input
                        type="text" name="Height" value={stock.units} onChange={handleChangePhysicalCharacteristics}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Largura</label>
                      <input
                        type="text" name="Width" value={stock.units} onChange={handleChangePhysicalCharacteristics}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Comprimento</label>
                      <input
                        type="text" name="Length" value={stock.units} onChange={handleChangePhysicalCharacteristics}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Peso</label>
                      <input
                        type="text" name="Weight" value={stock.units} onChange={handleChangePhysicalCharacteristics}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                  </div>
                </form>
                <button  onClick={openStock} className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                  Adicionar Estoque agora?
                </button>
                { createStockNow ? (
                <form className="relative p-6 flex-auto">
                  <h3 className="text-3xl font-semibold">Criar Stock</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-black">Preço</label>
                      <input type="text" name="price" value={stock.price} onChange={handleChangeStock}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Quantidade</label>
                      <input type="text" name="quantity" value={stock.quantity} onChange={handleChangeStock}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                  </div>
                </form>
                ) : <></>}
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
                    type="button" onClick={createProduct}
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

export default CreateModal;
