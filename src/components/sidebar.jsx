import SubmenuFinanceiro from "./SubmenuFinanceiro";
import { useState } from "react";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const position = Cookies.get("position");

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("position");
    window.location.href = "/login";
  };

  const toggleSubmenu = (e) => {
    e.preventDefault();
    setSubmenuVisible(!submenuVisible);
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />

      <div
        className="flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-white h-full text-gray-600 transition-all duration-300 border-none z-10 sidebar"
        style={sidebarStyles}
      >
        <div className="flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            {["Admin"].includes(position) ? (
              <li>
                <a
                  href="/employees"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                >
                  {/* Icono Home de Font Awesome */}
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Funcionarios
                  </span>
                </a>
              </li>
            ) : null}
            {["Admin", "Estoquista"].includes(position) ? (
              <li>
                <a
                  href="/products"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                >
                  {/* Icono Home de Font Awesome */}
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fa-solid fa-bag-shopping"></i>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Produtos
                  </span>
                </a>
              </li>
            ) : null}
            {["Admin", "Estoquista"].includes(position) ? (
              <li>
                <a
                  href="/orders"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                >
                  {/* Icono Sign Out de Font Awesome */}
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fa-solid fa-ticket"></i>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Pedidos
                  </span>
                </a>
              </li>
            ) : null}
            {["Admin", "Estoquista"].includes(position) ? (
              <li>
                <a
                  href="/categories"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                >
                  {/* Icono Check Circle de Font Awesome */}
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fa-solid fa-list"></i>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Categorias
                  </span>
                </a>
              </li>
            ) : null}
            {["Admin", "Estoquista"].includes(position) ? (
              <li>
                <a
                  href="/coupons"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                >
                  {/* Icono Sign Out de Font Awesome */}
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fa-solid fa-ticket"></i>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Cupons
                  </span>
                </a>
              </li>
            ) : null}
            {["Admin", "Estoquista"].includes(position) ? (
              <li>
                <a
                  href="/sends"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                >
                  {/* Icono Sign Out de Font Awesome */}
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fa-solid fa-truck"></i>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Processo de envio
                  </span>
                </a>
              </li>
            ) : null}
            {["Admin", "Estoquista"].includes(position) ? (
              <li>
                <a
                  href="/promotions"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                >
                  {/* Icono Users de Font Awesome */}
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Promoções
                  </span>
                </a>
              </li>
            ) : null}
            {["Admin"].includes(position) ? (
              <li>
                <a
                  href="/reports"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                >
                  {/* Icono Sign Out de Font Awesome */}
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fa-solid fa-chart-line"></i>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Relatorios
                  </span>
                </a>
              </li>
            ) : null}
            {["Admin"].includes(position) ? (
              <li>
                <a
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                  onClick={toggleSubmenu}
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fa-solid fa-money-bill"></i>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Financeiro
                  </span>
                </a>
                {submenuVisible && <SubmenuFinanceiro />}
              </li>
            ) : null}
            <li>
              <a
                href="/manual"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
              >
                {/* Icono Home de Font Awesome */}
                <span className="inline-flex justify-center items-center ml-4">
                  <i className="fa-solid fa-user"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Manual do usuário
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
                onClick={logout}
              >
                {/* Icono Sign Out de Font Awesome */}
                <span className="inline-flex justify-center items-center ml-4">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Sair
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* ./Sidebar */}
    </div>
  );
};

const sidebarStyles = {
  ".sidebar li:hover a::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "4px",
    background: "linear-gradient(to bottom, #00FFFF, #008080)",
  },
  ".sidebar li:hover a i, .sidebar li:hover a span": {
    color: "white",
  },
};

export default Sidebar;
