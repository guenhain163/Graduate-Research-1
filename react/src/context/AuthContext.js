import {createContext, useContext, useEffect, useState} from 'react';
import {Login} from '../pages/Login';
import {isAuthenticated} from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let cuser = isAuthenticated();
      if (cuser === null) {
        localStorage.setItem('user', '');
        cuser = '';
      }

      setCurrentUser(cuser);
    };

    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={[currentUser, setCurrentUser]}>
      {currentUser?.id ? children : <Login />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
