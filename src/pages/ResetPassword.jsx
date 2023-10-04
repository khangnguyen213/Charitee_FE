import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Global from '../global';
import { useForm } from 'react-hook-form';
import AlertMessage from '../components/Global/AlertMessage';
import alertify from 'alertifyjs';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [errSer, setErrSer] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //onRequest dùng khi gửi request tới server gửi reset password email
  const onRequest = (data) => {
    axios
      .post(`${Global.BASE_BACKEND_API}/account/request-reset-password`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          alertify.alert(
            'Email Sent',
            'Please check your email, click the button in the email, and enter new password on the page that opens.'
          );
        }
      })
      .catch((err) => setErrSer(err.response.data));
  };

  //onChange dùng khi gửi request thay đổi mất khậu
  const onChange = (data) => {
    if (data.password === data.password2) {
      axios
        .post(
          `${Global.BASE_BACKEND_API}/account/reset-password`,
          { ...data, token: token },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alertify.alert(
              'Successful Reset Password',
              'Login again',
              function () {
                navigate('/login');
              }
            );
          }
        })
        .catch((err) => setErrSer(err.response.data));
    } else {
      setErrSer('The password confirmation does not match.');
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="w-full bg-gray-200 h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(token === 'request' ? onRequest : onChange)}
        className="bg-white w-fit h-fit shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-4"
      >
        <div className="mb-4">
          {token === 'request' && (
            <>
              <h1 className="block text-gray-700 text-lg font-bold mb-2">
                Reset Password
              </h1>
              <p className="max-w-[500px] text-justify text-slate-500 text-base mb-2">
                If you continue, we will send a message to your email address.
                Click the link in the message, and enter a new password on the
                page that opens
              </p>
              <input
                className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <AlertMessage>{errors.email.message}</AlertMessage>
              )}
              {errSer && <AlertMessage>{errSer}</AlertMessage>}
            </>
          )}
          {token !== 'request' && (
            <>
              <h1 className="block text-gray-700 text-lg font-bold mb-2">
                Change Password
              </h1>
              <p className="max-w-[500px] text-justify text-slate-500 text-base mb-2">
                Please choose a new password!
              </p>
              <input
                className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  min: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
              />
              {errors.password && (
                <AlertMessage>{errors.password.message}</AlertMessage>
              )}
              <input
                className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password2"
                type="password"
                placeholder="Confirm Password"
                {...register('password2', {
                  required: 'Confirm your password',
                })}
              />
              {errors.password2 && (
                <AlertMessage>{errors.password2.message}</AlertMessage>
              )}
              {errSer && <AlertMessage>{errSer}</AlertMessage>}
            </>
          )}
        </div>
        {/* <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
         
        </div> */}
        <div className="flex items-center justify-between">
          {token === 'request' && (
            <button
              className="bg-[#F15B43] hover:bg-[#f0482f] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send password reset email
            </button>
          )}
          {token !== 'request' && (
            <button
              className="bg-[#F15B43] hover:bg-[#f0482f] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Change password
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
