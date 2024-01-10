import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import './styles/App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
