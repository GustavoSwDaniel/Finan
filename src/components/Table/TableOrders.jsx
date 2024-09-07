import { useState, useEffect } from "react";
import axios from "axios";
import { FaPix } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { FaBarcode } from "react-icons/fa";
import CreateCostModal from "../Modals/CreateCost/CreateCost";
import Pagination from "../Pagination/Pagination";
import Datepicker from "react-tailwindcss-datepicker";

const TableOrders = () => {
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

  const [orderBy, setOrderBy] = useState("created_at");

  const getCategories = async () => {
    let url =
      "http://localhost:8081/menager/orders?&limite=12&offset=" + selectPage;
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
                value="status"
              >
                status
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                value="status_send"
              >
                status de envio
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                value="payment_method"
              >
                tipo de pagamento
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
                onClick={(e) => openModalProduct(e, product.sku)}
              >
                <td className="px-6 py-4 text-black">{order.uuid}</td>
                <td className="px-6 py-4 text-black">{order.total_amount}</td>
                <td className="px-6 py-4 text-black">{order.status}</td>
                <td className="px-6 py-4 text-black">
                  {order.status_send === "pending"
                    ? "Aguardando envio"
                    : order.status_send === "sent"
                    ? "Enviado"
                    : order.status_send === "canceled"
                    ? "Cancelado"
                    : order.status_send === "delivered"
                    ? "Entregue"
                    : null}
                </td>

                <td className="px-6 py-4 text-black">
                  {order.payment_method === "credit_card" ? (
                    <div className="flex items-center gap-2">
                      <FaCreditCard /> Cartão de crédito
                    </div>
                  ) : order.payment_method === "pix" ? (
                    <div className="flex items-center gap-2">
                      <FaPix /> Pix
                    </div>
                  ) : order.payment_method === "billet" ? (
                    <div className="flex items-center gap-2">
                      <FaBarcode /> Boleto
                    </div>
                  ) : null}
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

export default TableOrders;
