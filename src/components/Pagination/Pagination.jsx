// import { Container } from './styles';


const Pagination = (props) => {
    const changePage = (page) => {
        props.setSelectPage(page);
        props.setChange(true)
    }

    const nextPage = () => {
        if (props.selectPage + 12 >= props.pages.length * 12) return;
        props.setSelectPage(props.selectPage + 12);
        props.setChange(true)
    }

    const previousPage = () => {
        if (props.selectPage === 0) return;
        props.setSelectPage(props.selectPage - 12);
        props.setChange(true)
    }
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={previousPage}
          >
            Previous
          </a>
        </li>
        {props.pages?.map((page) => (
            <li key={page}>
              {(props.selectPage / 12) + 1 === page ? (
                <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight underline text-blue-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-black dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => changePage((page - 1) * 12)}
                >
                {page}
                </a>
              ) : (
                <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => changePage((page - 1) * 12)}
                >
                {page}
                </a>
              )} 
            </li>
        ))}
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={nextPage}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
