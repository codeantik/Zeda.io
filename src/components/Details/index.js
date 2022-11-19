import './styles.css';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Details = () => {

    const { imdbId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [movieDetail, setMovieDetail] = useState(null)

    const getMovieDetails = async () => {
        setIsLoading(true)
        try {
            const response = await axios(`https://www.omdbapi.com/?apikey=1d7ff2d6&i=${imdbId}`)
            console.log(response.data)
            toast.success('Fetched details')
            setMovieDetail(response.data)
        } catch (err) {
            console.log(err.response)
            toast.error('Error fetching details')
            setMovieDetail(null)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getMovieDetails();
    }, [])

    return (
        <div className='details-container'>
            {/* <h1>Details page</h1> */}
            {movieDetail && typeof movieDetail === 'object' ? (
                <div className='details-content'>
                    <div className='details-poster'>
                        <img 
                            src={
                                movieDetail.Poster === "N/A" ?
                                'https://react.semantic-ui.com/images/wireframe/image.png'
                                : movieDetail.Poster
                            } 
                        />
                    </div>
                    <div className='details-content-subinfo'>
                        <div >
                            <h1>{movieDetail.Title}</h1>
                            <h4 style={{ color: 'orange' }}><em><b>IMDB : {movieDetail.imdbRating}</b></em></h4>
                            <h4><em><b>BoxOffice : {movieDetail.BoxOffice}</b></em></h4>
                            <p><b>Plot</b>: {movieDetail.Plot}</p>
                            <p><b>Actors</b>: {movieDetail.Actors}</p>
                            <p><b>Writer</b>: {movieDetail.Writer}</p>
                            <p><b>Director</b>: {movieDetail.Director}</p>
                            <p><b>Country</b>: {movieDetail.Country}</p>
                            <p><b>Released</b>: {movieDetail.Released}</p>
                            <p><b>Runtime</b>: {movieDetail.Runtime}</p>
                            <p><b>Rated</b>: {movieDetail.Rated}</p>
                        </div>
                        <div className='details-ratings-container'>
                            <div className='ratings-header'>Ratings</div>
                            {movieDetail.Ratings.length > 0 ? (
                                <div className='details-ratings'>
                                    {movieDetail.Ratings.map(rating => (
                                        <div className='rating-box' key={rating.Source}>
                                            <div className='first-child'>{rating.Source}</div>
                                            <div className='last-child'>{rating.Value}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No ratings available.</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // <div className='details-content'>
                //     <div className='details-poster'>
                //         <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                //     </div>
                // </div>
                <div className="circular-loader ui segment">
                    <div className="ui active loader"></div>
                </div>
            )}
        </div>
    )
}

export default Details;