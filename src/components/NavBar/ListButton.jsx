import React from 'react';
import axios from 'axios';
import Global from '../../global';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/sessionSlice';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ListButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);

  const logoutClickHandler = () => {
    axios
      .get(`${Global.BASE_BACKEND_API}/account/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(logout());
          navigate('/', { replace: true });
        }
      })
      .catch((err) => navigate('/404'));
  };
  return (
    <div className="hidden md-2:inline-block ease-out duration-300">
      <div className="flex space-x-0 xl:space-x-4">
        <NavLink
          to="/account"
          className={({ isActive }) =>
            classNames(
              isActive
                ? 'bg-[#F15B43] text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:scale-110 hover:shadow hover:text-white',
              'rounded-md px-1.5 xl:px-3 py-2 text-sm font-medium'
            )
          }
        >
          {session.fullname
            ? session.fullname[0].toUpperCase() + session.fullname.slice(1)
            : 'Account'}
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            classNames(
              isActive
                ? 'bg-[#F15B43] text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:scale-110 hover:shadow hover:text-white',
              'rounded-md px-1.5 xl:px-3 py-2 text-sm font-medium'
            )
          }
        >
          History
        </NavLink>
        {(session.role === 'admin' || session.role === 'master') && (
          <NavLink
            to="/admin"
            reloadDocument={true}
            className={({ isActive }) =>
              classNames(
                isActive
                  ? 'bg-[#F15B43] text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:scale-110 hover:shadow hover:text-white',
                'rounded-md px-1.5 xl:px-3 py-2 text-sm font-medium'
              )
            }
          >
            Admin Dashboard
          </NavLink>
        )}

        <button
          onClick={logoutClickHandler}
          className="text-gray-300 hover:bg-gray-800 hover:scale-110 hover:shadow hover:text-white rounded-md px-1.5 xl:px-3 py-2 text-sm font-medium"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ListButton;
