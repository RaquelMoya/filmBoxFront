
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';

function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
     
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>

      <Footer/>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
