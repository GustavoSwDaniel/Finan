import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import CreateModal from "../Modals/CreateModal/CreateModal";
import CreateStockModal from "../Modals/CreateStock/CreateStockModal";
import ProductModel from "../Modals/ProductModal/ProductModal";
import Pagination from "../Pagination/Pagination";


const TableProducts = () => {
  const [products, setProducts] = useState([]);
  const [change, setChange] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalStock, setShowModalStock] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [product_id, setProduct_id] = useState("");
  const [pages, setPages] = useState([]);
  const [selectPage, setSelectPage] = useState(0);

  const openModalCreate = (e) => {
    e.preventDefault();
    setShowModalCreate(true);
  };

  const openModalStock = (e, id) => {
    e.preventDefault();
    setProduct_id(id);
    setShowModalStock(true);
  };

  const getProducts = async () => {
    setChange(true);
    const response = await axios.get("http://localhost:8081/products?all=true&stock=true&limite=12&offset=" + selectPage);
    console.log(response.data);
    setProducts(response.data);
    const pagesTotal = Math.ceil(response.data.total / 12)
    setPages(Array.from({ length: pagesTotal }, (_, index) => index + 1));
  };

  const changeStatus = async (id, currentStatus) => {
    const response = await axios.patch(`http://localhost:8081/products/${id}`, {
      is_active: !currentStatus,
    });
    console.log(response.data);
    setChange(true);
  }

  const openModalProduct = async (e, id) => {
    e.preventDefault();
    setProduct_id(id);
    await setProduct_id(id)
    setShowModalProduct(true);
  };

  const openModalStockInsideComponent = (e, id) => {
    e.preventDefault();
    setProduct_id(id);
    setShowModalStock(true);
  };
    
  useEffect(() => {
    getProducts();
    setChange(false);
  }, [change]);

  useEffect(() => {
    if (!showModalCreate)
      getProducts();
    },
    [showModalCreate]);

  useEffect(() => {
    if (!showModalStock)
      getProducts();
    }, [showModalStock]);

  useEffect(() => {
    if (!showModalProduct)
      getProducts();
    }
    , [showModalProduct]);
    
  return (
    <div className="bg-[#adadad] h-full">
      <CreateModal showModal={showModalCreate} setShowModal={setShowModalCreate}/>
      <CreateStockModal showModal={showModalStock} setShowModal={setShowModalStock} product_id={product_id}/>
      <ProductModel showModal={showModalProduct} setShowModal={setShowModalProduct} product_id={product_id} openModalStockInsideComponent={openModalStockInsideComponent}/>
      <div className="flex items-center justify-between">
        <div className="p-3">
          <button className="p-2 flex items-center gap-3 bg-black text-[#00df9a] 
                            font-extrabold rounded-md	 hover:bg-[#31584d] transition duration-75	ease-in-out"
                            onClick={openModalCreate}>
            <span className="font-extrabold">
              <CiCirclePlus size={32} />
            </span>
            Cadastrar produto
            </button>
        </div>
        <Pagination selectPage={selectPage} setSelectPage={setSelectPage} pages={pages} setChange={setChange}/>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-[#313131]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                sku
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Avisos
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {products.data?.map((product) => (
              <tr key={product.sku} className="bg-white border-b dark:bg-[#ffffff] dark:border-gray-700 cursor-pointer" onClick={(e) => openModalProduct(e, product.sku)} >
                <td className="px-6 py-4">
                  <img src={product.image_url} className="w-10"/>
                </td>
                <td className="px-6 py-4 text-black">{product.sku}</td>
                <td className="px-6 py-4 text-black">{product.name}</td>
                <td className="px-6 py-4 text-black">
                  {product.stocks.length == 0 ? (
                    <button className="p-2  text-[#df2d00] font-extrabold rounded-md hover:bg-[#6cf7cf] transition duration-75 ease-in-out" 
                    onClick={(e) => openModalStock(e, product.sku)}>
                      Sem estoque, clique para adicionar
                    </button>
                  ) : <></>}
                </td>
                <td className="px-6 py-4 text-black">
                  <input type="checkbox" checked={product.is_active} onChange={() => changeStatus(product.sku, product.is_active)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableProducts;
