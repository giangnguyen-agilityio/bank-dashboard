import { useState } from 'react';
import Pagination from './components/common/Pagination';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Thực hiện logic khác nếu cần (ví dụ: gọi API lấy dữ liệu trang mới)
  };
  return (
    <>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default App;
