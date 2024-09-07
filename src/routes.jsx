import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Categories from './pages/Categories/Categories';
import Finaciers from './pages/Finaciers/Finaciers';
import Promotions from './pages/Promotions/Promotions';
import Reports from './pages/reports/Reports';
import Coupons from './pages/Coupons/Coupons';
import FinaciersCost from './pages/FinaciersCost/FinaciersCost';
import FinaciersRevenue from './pages/FinaciersRevenue/FinaciersRevenue';
import Employees from './pages/Employees/Employees';
import Cookies from 'js-cookie';
import NotFoundPage from './pages/NotFound/NotFound';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import Orders from './pages/Orders/Orders';
import Send from './pages/Send/Send';
import UserManual from './pages/UserManual/UserManual';

const Private = ({ Page, positions }) => {
    const token = Cookies.get('token');
    const position = Cookies.get('position');
    if (positions.length > 0) {
        if (!positions.includes(position)) {
            return <Unauthorized />;
        }
    }

    if (!token) {
        return <LoginPage />;
    }
    return <Page />;
};

const Routers = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<Private Page={Home} positions={['Admin', 'Estoquista']} />} />
            <Route path='/products' element={<Private Page={Products} positions={['Admin', 'Estoquista']} />} />
            <Route path='/categories' element={<Private Page={Categories} positions={['Admin', 'Estoquista']} />} />
            <Route path='/promotions' element={<Private Page={Promotions} positions={['Admin', 'Estoquista']} />} />
            <Route path='/reports' element={<Private Page={Reports} positions={['Admin', 'Estoquista']} />} />
            <Route path='/coupons' element={<Private Page={Coupons} positions={['Admin', 'Estoquista']} />} />
            <Route path='/orders' element={<Private Page={Orders} positions={['Admin', 'Estoquista']} />} />
            <Route path='/sends' element={<Private Page={Send} positions={['Admin', 'Estoquista']} />} />
            <Route path='/financiers' element={<Private Page={Finaciers} positions={['Admin']} />} />
            <Route path='/finaciers/costs' element={<Private Page={FinaciersCost} positions={['Admin']} />} />
            <Route path='/finaciers/revenue' element={<Private Page={FinaciersRevenue} positions={['Admin']} />} />
            <Route path='/employees' element={<Private Page={Employees} positions={['Admin']} />} />
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='/manual' element={<UserManual />} />

        </Routes>
    );
};

export default Routers;
