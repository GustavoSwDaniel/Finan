import axios from "axios";
import { useState, useEffect } from "react";

const TableProductsData = (props) => {
  const [products, setProducts] = useState([]);
  const [change, setChange] = useState(false);

  const addProductSelected = (e, product) => {
    e.preventDefault();
    props.setProductSelected([...props.product_selected, product]);
  };

  const removerProductSelected = (e, product) => {
    e.preventDefault();
    props.setProductSelected(props.product_selected.filter((item) => item !== product));
  };

  const getProducts = async () => {
    const response = await axios.get("http://localhost:8081/products");
    setProducts(response.data);
    };
  
  useEffect(() => {
    getProducts();
    setChange(false);

  }, [change]);
    
  return (
    <div className="">
      <div className="mt-1">
        <h2 className="text-3xl text-black pb-6">Produtos</h2>
        <div className="flex justify-between">
          <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
            <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
              <div className="flex">
                <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                  <svg
                    width="18"
                    height="18"
                    className="w-4 lg:w-auto"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.9993 16.9993L13.1328 13.1328"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="table-wrp block max-h-96 align-middle min-w-full shadow overflow-x-auto bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300">
                Adiciona ao cupom
              </th>
            </tr>
          </thead>
          <tbody className="bg-white h-96 overflow-y-auto">
            {products.data?.map((product) => (
                <tr key={product.sku}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {product.sku} </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {product.name} </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> 
                    {props.product_selected.includes(product.sku) ? (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={(e) => removerProductSelected(e, product.sku)} 
                      >
                        Remover
                      </button>
                    ) : (
                      <button onClick={(e) => addProductSelected(e, product.sku)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Adicionar</button>
                    )}
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableProductsData;
