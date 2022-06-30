
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import PowerHack from './components/PowerHack/PowerHack';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PowerHack></PowerHack>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
      </Routes>
    </div>
  );
}

export default App;
