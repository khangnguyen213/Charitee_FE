import React from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { TiThMenu } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Global from '../../global';
import { logout } from '../../redux/sessionSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DropdownButton = () => {
  const session = useSelector((state) => state.session);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div>
      <Menu
        as="div"
        className="relative block md-2:hidden ease-in duration-300 text-left"
      >
        <div>
          <Menu.Button
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#F15B43] px-3 py-2 text-sm font-semibold 
          border border-transparent hover:border-white hover:bg-transparent text-white"
          >
            <TiThMenu className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-xl shadow-[#00000054] ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => navigate('/account')}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    {session.fullname
                      ? session.fullname[0].toUpperCase() +
                        session.fullname.slice(1)
                      : 'Account'}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => navigate('/history')}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    History
                  </button>
                )}
              </Menu.Item>
              {(session.role === 'admin' || session.role === 'master') && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate('/admin')}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                    >
                      Admin Dashboard
                    </button>
                  )}
                </Menu.Item>
              )}

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logoutClickHandler}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownButton;
