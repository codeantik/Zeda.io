import './styles.css';
import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import UserDetails from '../userDetails';
import CircularLoaders from '../utils/loaders'
import { Icon, Button } from 'semantic-ui-react'
import CustomPagination from '../utils/pagination';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer';

const Home = () => {
    const [searchMovie, setSearchMovie] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [totalMovies, setTotalMovies] = useState(0)
    const [pageLimit, setPageLimit] = useState(0)
    const [screenWidth, setScreenWidth] = useState(1000);
    const [activePage, setActivePage] = useState(1);
    const location = useLocation()

    const handleSubmit = async (page = 1, query) => {
        if(searchMovie === '') {
            // console.log()
            // toast.error('Please enter a valid movie title');
            // return;
        }

        let searchItem;

        if(searchMovie.length > 0) {
            searchItem = searchMovie
        }
        else if(query.length > 0) {
            searchItem = query
        }
        else {
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`https://www.omdbapi.com/?apikey=1d7ff2d6&s=${searchItem}&page=${page}`);
            console.log(response.data);
            if(response.data?.Error) {
                toast.error(response.data.Error)
                setMovies([])
            }
            else {
                setMovies(response.data.Search);
                setTotalMovies(parseInt(response.data.totalResults))
                setPageLimit(response.data.Search.length)
                toast.success('Movie(s) fetched successfully');
            }
            setIsLoading(false);
        }
        catch (error) {
            console.log(error)
            setMovies([])
            toast.error('Movie not found!');
            setIsLoading(false);
        }

        localStorage.clear()
        localStorage.setItem('movie', searchMovie)
    } 

    const handlePageChange = (newPage) => {
        setActivePage(newPage)
        handleSubmit(newPage)
    }


    useEffect(() => {
        console.log('locations', location)
        let movie = localStorage.getItem('movie')
        console.log(movie)
        if(movie?.length > 0) {
            setSearchMovie(movie)
            handleSubmit(1, movie)
        }
    }, [])


    useLayoutEffect(() => {
        const updateSize = () => {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);


    return (
        <div className="home">
            <header>
                <p>Get all your movie info here</p>
            </header>
            <div className="search-bar">
                <input 
                    type="search"   
                    placeholder='Type movie title' 
                    value={searchMovie}
                    onChange={(e) => setSearchMovie(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handlePageChange(1)
                        }
                    }}
                />
                <button
                    className='search-button'
                    onClick={() => {
                        handlePageChange(1);
                    }}
                >
                    Search
                </button>
            </div>
            <div>
                {/* <p style={{ textAlign: 'center', fontSize: '2em'}}>You can contribute to make Zeda even better <Link to='https://www.github.com/codeantik'>@https://www.github.com/codeantik</Link></p> */}
            </div>
            <div className="search-result">
                {isLoading ? (
                    // <CircularLoaders />
                    <div className='movie-list'>
                        {
                            [...new Array(10)].map((_, idx) => (
                                <div className='movie-details' key={idx}>
                                    <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                                        <p className='loader-info'>
                                            <img src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png'  />
                                        </p>
                                </div>
                                
                            ))
                        }
                    </div>
                ) : (
                    movies?.length > 0 ? (
                        <div className='movie-list'>
                            {movies.map(({ Title, Poster, Year, imdbID }, idx) => (
                                <div className='movie-details' key={imdbID}>
                                    <div className="image-wrapper">
                                        <Link
                                            to={{
                                                pathname: `/details/${imdbID}`,
                                                state: 'Sent from poster'
                                            }}
                                        >
                                            <img 
                                                src={
                                                    Poster === "N/A" ?
                                                    'https://react.semantic-ui.com/images/wireframe/image.png'
                                                    : Poster
                                                } 
                                            />
                                        </Link>
                                    </div>
                                    <div className="movie-info">
                                        <Link
                                            to={{
                                                pathname: `/details/${imdbID}`,
                                                state: 'Sent from poster'
                                            }}
                                        >
                                            <h2>{Title}</h2>
                                        </Link>
                                        <span>{Year.slice(0, 4)}{" "}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : ( 
                        <div className='no-data'>
                            <h1>No data!</h1>
                        </div>
                    )   
                )}
                
                {/* display pagination */}

                {movies?.length > 0 && (
                    <div className='pagination'>
                        {screenWidth <= 510 ? (
                            <div>
                                <span className='pagination-page'>
                                    <b>{"   "}{1}{"   "}</b>
                                </span>
                                <span>
                                    <button 
                                        className='pagination-button'
                                        onClick={() => {
                                            if(activePage - 1 <= 0) {
                                                handlePageChange(Math.ceil(totalMovies / 10))
                                            }
                                            else {
                                                handlePageChange(activePage - 1)
                                            }
                                        }}
                                    >
                                        Prev
                                    </button>
                                </span>
                                <span className='pagination-page'>
                                    <u><b>{"   "}{activePage}{"   "}</b></u>
                                </span>
                                <span>
                                    <button 
                                        className='pagination-button'
                                        onClick={() => {
                                            if(activePage + 1 >= Math.ceil(totalMovies / 10)) {
                                                handlePageChange(0)
                                            }
                                            else {
                                                handlePageChange(activePage + 1)
                                            }
                                        }}
                                    >
                                        Next
                                    </button>
                                </span>
                                <span className='pagination-page'>
                                    <b>{"   "}{Math.ceil(totalMovies / 10)}{"   "}</b>
                                </span>
                            </div>
                        ) : (
                            <CustomPagination 
                                activePage={activePage} 
                                totalPages={totalMovies} 
                                handlePageChange={handlePageChange} 
                            />
                        )}
                    </div>
                )}
                               
            </div>  
            <Footer />
        </div>
    );
}

export default Home;