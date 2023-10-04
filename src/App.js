import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import {
  Input,
  Ripple,
  Datepicker,
  Dropdown,
  Sidenav,
  initTE,
} from 'tw-elements';
import { useEffect } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Explore from './pages/Explore';
import Donate from './pages/Donate';
import CausesManager from './pages/CausesManager';
import CauseCreate from './pages/CauseCreate';
import NotFoundPage from './pages/NotFoundPage';
import ConfirmAccount from './pages/ConfirmAccount';
import ResetPassword from './pages/ResetPassword';
import AccountsManager from './pages/AccountsManager';
import Account from './pages/Account';
import DonateSuccess from './pages/DonateSuccess';
import DonateCancel from './pages/DonateCancel';
import DonationsManager from './pages/DonationsManager';
import History from './pages/History';
import AdminDashboard from './pages/AdminDashboard';

import NavBar from './components/NavBar/NavBar';
import SideNavBar from './components/NavBar/SideNavBar';
import ScrollToTop from './components/Global/ScrollToTop';

function App() {
  useEffect(() => {
    initTE({ Datepicker, Input, Ripple, Dropdown, Sidenav });
  }, []);
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
        <Route path="/history" element={<History />} />
        <Route path="/confirm/:accountID" element={<ConfirmAccount />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/donate/:causeID" element={<Donate />} />
        <Route path="/success" element={<DonateSuccess />} />
        <Route path="/cancel" element={<DonateCancel />} />
        {/* <Route path="/admin/causes" element={<CausesManager />} />
        <Route path="/admin/causes/:causeID" element={<CauseCreate />} />
        <Route path="/admin/accounts" element={<AccountsManager />} />
        <Route path="/admin/donations" element={<DonationsManager />} />
        <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route
          path="admin"
          element={
            <div>
              <div className="w-fit h-fit">
                <SideNavBar />
              </div>
              <Outlet />
            </div>
          }
        >
          <Route path="" element={<AdminDashboard />} />
          <Route path="causes" element={<CausesManager />} />
          <Route path="causes/:causeID" element={<CauseCreate />} />
          <Route path="accounts" element={<AccountsManager />} />
          <Route path="donations" element={<DonationsManager />} />
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Routes>
    </>
  );
}

export default App;
