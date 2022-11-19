import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Header from './components/Header';
import Details from './components/Details';
import Footer from './components/Footer';
import './App.css';


const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/details/:imdbId" element={<Details />} />
                <Route exact path="/about" element={<About />} />
                <Route path="*" element={<h1 className='not-found'>Not Found</h1>} />
            </Routes>
            {/* <Footer /> */}
        </div>
    );
}

export default App;