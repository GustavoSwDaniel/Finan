


const TablePromotions = (columns, data) => {

  return (
    <div className="bg-[#0a0b13] h-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#39354e] dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Sprint
              </th>
              <th scope="col" className="px-6 py-3">
                Inicio
              </th>
            </tr>
          </thead>
          <tbody>
          {data.map((sprint) => (
              <ItemTableSprints props={sprint} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePromotions;
