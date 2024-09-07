import { useState, useEffect } from "react";
import axios from "axios";
import { RiDownload2Fill } from "react-icons/ri";
import CreateCostModal from "../Modals/CreateCost/CreateCost";
import Pagination from "../Pagination/Pagination";
import Datepicker from "react-tailwindcss-datepicker";

const TableSend = () => {
  const [orders, setOrders] = useState([]);
  const [change, setChange] = useState(false);
  const [showModalCosts, setShowModalCosts] = useState(false);
  const [pages, setPages] = useState([]);
  const [selectPage, setSelectPage] = useState(0);
  const [value, setValue] = useState({
    startDate: "",
    endDate: "",
  });
  const [orderType, setOrderType] = useState(null);
  const [loading, setLoading] = useState(false);

  const [orderBy, setOrderBy] = useState("created_at");

  const getCategories = async () => {
    let url =
      "http://localhost:8081/menager/orders?send_status=pending&limite=12&offset=" +
      selectPage;
    url +=
      value.startDate && value.endDate
        ? `&start_date=${value.startDate}&end_date=${value.endDate}`
        : "";
    url += orderBy ? `&order_by=${orderBy}` : "";
    url += orderType ? `&order_type=${orderType}` : "";

    const response = await axios.get(url);
    console.log(response.data);
    setOrders(response.data);
    const pagesTotal = Math.ceil(response.data.total / 12);
    setPages(Array.from({ length: pagesTotal }, (_, index) => index + 1));
  };

  const updateStatusSend = async (e, id) => {
    const statusSend = e.target.value;
    const response = await axios.patch(
      `http://localhost:8081/menager/orders/${id}/status-send`,
      { status_send: statusSend }
    );
    console.log(response.data);
    getCategories();
  };

  const generateLabel = async (e, id) => {
    e.preventDefault();
    const button = document.getElementById(id);
    button.textContent = 'Gerando etiqueta...';
    button.disabled = true;
    const response = await axios.get(
      `http://localhost:8081/orders/labels/${id}`
    );
    console.log(response.data);
    setLoading(false);
    getCategories();
  };

  const openModalCost = (e) => {
    e.preventDefault();
    setShowModalCosts(true);
  };

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
    setChange(true);
  };

  const handleValueOrderBy = (orderByO) => {
    if (orderType === "asc") setOrderType("desc");
    else if (orderType === "desc") setOrderType("asc");
    else setOrderType("asc");
    console.log(orderByO);
    setOrderBy(orderByO);
    getCategories();
  };

  useEffect(() => {
    getCategories();
    setChange(false);
  }, [change]);

  return (
    <div className="bg-[#adadad] h-full">
      <CreateCostModal
        showModal={showModalCosts}
        setShowModal={setShowModalCosts}
      />
      <div className="flex items-center justify-between">
        <div className="flex p-3">
          <div className="ml-5">
            <Datepicker
              primaryColor={"emerald"}
              secondaryColor={"white"}
              onChange={handleValueChange}
              value={value}
            />
          </div>
        </div>
        <Pagination
          selectPage={selectPage}
          setSelectPage={setSelectPage}
          pages={pages}
          setChange={setChange}
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-[#313131]">
            <tr>
              <th scope="col" className="px-6 py-3 cursor-pointer" value="name">
                Nome
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                value="total_amount"
              >
                Valor
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                value="status_send"
              >
                status de envio
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer">
                Etiqueta de envio
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                value="created_at"
              >
                data da compra
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.data?.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b dark:bg-[#ffffff] dark:border-gray-700 cursor-pointer"
                onClick={(e) => openModalProduct(e, order.sku)}
              >
                <td className="px-6 py-4 text-black">{order.uuid}</td>
                <td className="px-6 py-4 text-black">{order.total_amount}</td>
                <td className="px-6 py-4 text-black">
                  <select
                    className="bg-white dark:bg-[#313131] dark:text-white dark:border-gray-700 border-2 border-gray-300 rounded-lg p-2"
                    onChange={(e) => updateStatusSend(e, order.uuid)}
                  >
                    <option
                      value="pending"
                      selected={order.status_send === "pending"}
                    >
                      Aguardando envio
                    </option>
                    <option
                      value="sent"
                      selected={order.status_send === "sent"}
                    >
                      Enviado
                    </option>
                  </select>
                </td>
                <td className="px-6 py-4 text-black">
                  {order.link_label_print ? (
                    <button
                      type="button"
                      className="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white"
                      key={order.id}
                    >
                      <RiDownload2Fill className="mr-2" />
                      <a
                        href={order.link_label_print}
                        target="_blank"
                        rel="noreferrer"
                        key={order.id}
                      >
                        Baixar etiqueta
                      </a>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white"
                      onClick={(e) => generateLabel(e, order.uuid)}
                      id={order.uuid}
                    >
                        Gerar etiqueta
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 text-black">{order.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSend;
