import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Spin, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {

    const userToken = localStorage.getItem('token');

    const checkCurrentUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://acu-eng.onrender.com/api/v1/user-data', {
          headers: {
            Authorization: userToken
          }
        });
        const res = response.data.user;
        if (res) {
          setUser(res.fullName);
          setToken(res.token);
          setRole(res.role);
          setIsLogged(true);
          localStorage.setItem('token', res.token);
        } else {
          console.error('Auto login failed:', res.message);
        }
      } catch (error) {
        console.error('Error during auto login:', error.message);
        setIsLogged(false);
      } finally {
        setLoading(false);
      }
    };
    const checkAuthentication = async () => {
      if (userToken) {
        await checkCurrentUser();
      } else {
        setIsLogged(false);
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);


  const loginAction = async (data) => {
    console.log('Login Action Data:', data);
    try {
      const response = await axios.post('https://acu-eng.onrender.com/api/v1/signin', {
        email: data.email,
        password: data.password,
      });
      const res = response.data;
      if (res.user) {
        setUser(res.user.name);
        setToken(res.token);
        setIsLogged(true);
        setRole(res.user.role)
        localStorage.setItem('token', res.token);
        console.log('success - User:', res.user);
        return true;
      }

      throw new Error(res.message);
    } catch (err) {
      setUser(null);
      setToken('');
      console.log('error');
      console.error('Error during login:', err);
      return false;
    }
  };

  const logOut = async () => {
    try {
      await axios.post('https://acu-eng.onrender.com/api/v1/signout', {}, {
        headers: { Authorization: token }
      });
      console.log('Logging Out');
      setUser(null);
      setToken('');
      setRole('a');
      setIsLogged(false);
      localStorage.removeItem('token');
      console.log('Logout successful');
      window.location.href='/login'
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    // Render loading indicator or anything you want while loading
    return <div style={{ minHeight: '100vh' }} size='large' className='d-flex justify-content-center align-items-center'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#D50B1B'
          }
        }}>
        <Spin />
      </ConfigProvider>
    </div>;
  }

  return <AuthContext.Provider value={{ token, user, role, isLogged, loading, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
