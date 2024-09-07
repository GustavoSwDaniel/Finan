
const SubmenuFinanceiro = () => {
  return (
    <ul className="pl-4 mt-2">
      <li>
        <a
          href="/financiers"
          className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
        >
          <span className="inline-flex justify-center items-center ml-4">
            <i className="fa-solid fa-hand-holding-usd"></i>
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">Receitas/Despesas</span>
        </a>
      </li>
      <li>
        <a
          href="/finaciers/revenue"
          className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
        >
          <span className="inline-flex justify-center items-center ml-4">
            <i className="fa-solid fa-hand-holding-usd"></i>
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">Receitas</span>
        </a>
      </li>
      <li>
        <a
          href="/finaciers/costs"
          className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
        >
          <span className="inline-flex justify-center items-center ml-4">
            <i className="fa-solid fa-shopping-bag"></i>
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">Despesas</span>
        </a>
      </li>
    </ul>
  );
};

export default SubmenuFinanceiro;