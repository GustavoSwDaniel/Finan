import { useEffect, useState } from "react";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import { Switch } from "@material-tailwind/react";

const ProductModel = (props) => {
  const [categories, setCategories] = useState([]);
  const [change, setChange] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category_uuid: "",
    image_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const activeAndDesactiveProduct = async () => {
    const response = await axios.patch(
        `http://localhost:8081/products/${props.product_id}`,
        { is_active: !product.is_active }
    );
    if (response.status === 204) getProduct();
    };

  const getCategories = async () => {
    setChange(true);
    const response = await axios.get("http://localhost:8081/category");
    console.log(response.data);
    setCategories(response.data);
  };

  const getProduct = async () => {
    console.log(props.product_id);
    const response = await axios.get(
      `http://localhost:8081/products/${props.product_id}?stock=true`
    );
    console.log(response.data);
    setProduct(response.data);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const response = await axios.post(
      "http://localhost:8081/uploadfile",
      formData
    );
    console.log(response.data);
    setProduct({ ...product, image_url: response.data.url_file });
  };

  const updateProduct = async () => {
    const update_product = {
      name: product.name,
      description: product.description,
      category: product.category_uuid
    }
    const response = await axios.patch(
      `http://localhost:8081/products/${props.product_id}`,
      update_product
    );
    if (response.status === 204) getProduct();
  };

  const closeModal = () => {
    setProduct({
      name: "",
      description: "",
      category_uuid: "",
      image_url: "",
    });
    props.setShowModal(false);
  };

  const stockModata = (e) => {
    e.preventDefault();
    props.openModalStockInsideComponent(e, props.product_id);
    closeModal();
  };

  useEffect(() => {
    getCategories();
    getProduct();
  }, [props.product_id]);

  useEffect(() => {
    setChange(false);
  }, [change]);

  return (
    <>
      {props.showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Produto</h3>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" onClick={activeAndDesactiveProduct} checked={product.is_active}/>
                    <div className="relative w-11 h-6 bg-gray-200  peer-focus:ring-blue-300 dark:peer-focus:[#00df9a] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00df9a]"></div>
                    <span className="ms-3 text-sm font-medium text-black">
                      Ativar ou desativar produto
                    </span>
                  </label>
                </div>

                <div className="flex items-end justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <form
                    className="relative p-6 flex-auto"
                    onSubmit={() => console.log()}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-black">Sku</label>
                        <input
                          type="text"
                          name="name"
                          value={product.sku}
                          onChange={handleChange}
                          className="border border-gray-300 p-2 rounded"
                          disabled
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-black">Nome</label>
                        <input
                          type="text"
                          name="name"
                          value={product.name}
                          onChange={(e) => handleChange(e)}
                          onBlur={(e) => updateProduct(e)}
                          className="border border-gray-300 p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-black">Descrição</label>
                        <input
                          type="text"
                          name="description"
                          value={product.description}
                          onChange={(e) => handleChange(e)}
                          onBlur={(e) => updateProduct(e)}
                          className="border border-gray-300 p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-black">Categorias</label>
                        <select
                          className="border border-gray-300 p-2 rounded"
                          name="category_uuid"
                          value={product.category_uuid}
                          onChange={handleChange}
                        >
                          {product.category?.length > 0 ? (
                            <option
                              key={product.category[0].uuid}
                              value={product.category[0].uuid}
                            >
                              {product.category[0].name}
                            </option>
                          ) : (
                            <option value="">Selecione uma categoria</option>
                          )}
                          {categories.map((category) => (
                            <option key={category.uuid} value={category.uuid}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                  <img src={product.image_url} className="  w-56" />
                </div>
                <hr />
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Estoque</h3>
                  <button
                    className="p-2 flex items-center gap-3 bg-black text-[#00df9a] 
                           font-extrabold rounded-md hover:bg-[#31584d] transition duration-75	ease-in-out"
                    onClick={(e) => stockModata(e)}
                  >
                    <span className="font-extrabold">
                      <CiCirclePlus size={32} />
                    </span>
                    Adiciona estoque
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-[#313131] dark:text-white">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Preço
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Quantidade
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.stocks?.map((stock) => (
                        <tr
                          key={stock.sku}
                          className="bg-white border-b dark:bg-[#ffffff] dark:border-gray-700 cursor-pointer"
                        >
                          <td className="px-6 py-4 text-black">
                            R${stock.price}
                          </td>
                          <td className="px-6 py-4 text-black">
                            {stock.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

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
                    onClick={() => console.log("teste")}
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

export default ProductModel;
