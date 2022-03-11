import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import Profile from './Containers/Profile/Profile';
import Movies from './Containers/Movies/Movies';
import Orders from './Containers/Orders/Orders';
import MovieDetail from './Containers/MovieDetail/MovieDetail';
import SearchResults from './Containers/SearchResults/SearchResults';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      
        <Header/>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/moviedetail" element={<MovieDetail/>}/>
          <Route path="/searchresults" element={<SearchResults/>}/>
        </Routes>

        <Footer/>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;