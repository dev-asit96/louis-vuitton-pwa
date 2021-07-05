// TODO: store name into local storage and design
//       conditional rendering on singup and login logout button

/* Header Page */
import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { clearCookie, getCookie } from '../../services/cookie.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Louis from '../../assets/LV.png';
import { CartIcon } from '../icons';
import Alert from '@material-ui/lab/Alert';
import { Offline, Online } from 'react-detect-offline';
import styles from './header.module.scss';
import '../../styles.css';

const Header = () => {
  const history = useHistory();
  const [name, setName] = useState('Hi User');
  // Show the total items into the cart.
  const { itemCount } = useContext(CartContext);

  //By clicking logout button session storage get cleared and page redirect to login page.
  const logoutAction = () => {
    toast('Successfully logged out!!');
    sessionStorage.clear();
    clearCookie();
    history.push('/login');
    return true;
  };

  useEffect(() => {
    const loadDataFromCookie = () => {
      var userName = sessionStorage.getItem('user_name');
      // console.log(userName);
      if (userName) {
        setName(userName);
      } else {
        setName('Hi User!');
      }
    };
    loadDataFromCookie();
  }, []);

  return (
    <>
      <div className='navbar-header'>
        <div className='container-header flex-header'>
          <Link to='/' className='image-a'>
            <img src={Louis} alt='brand logo' className='brand-logo-louis' />
          </Link>
          <nav>
            <ul>
              <li>
                <Link to='/cart'>Cart({itemCount})</Link>
              </li>
              <li>
                <Link to='/order'>Order</Link>
              </li>
              {name === 'Hi User!' ? (
                <>
                  <li>
                    <Link to='/signup'>Signup</Link>
                  </li>
                  <li>
                    <Link to='/login'>Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link onClick={logoutAction}>Logout</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
      {/* offline Mode */}
      <div className='offline-mode'>
        <Offline>
          <Alert severity='warning' className='offline-alert'>
            You're in offline mode
          </Alert>
        </Offline>
      </div>
    </>
  );
};

export default Header;
