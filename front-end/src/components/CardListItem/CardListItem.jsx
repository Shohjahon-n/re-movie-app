import { useState, useEffect } from 'react';
import './CardListItem.scss';
import movieImg from '../../assets/movie-ct.png';
import tvImg from '../../assets/category-tv.png';
import saveImg from '../../assets/image/save.png';
import savedImg from '../../assets/image/saved.png';
import axios from 'axios';

export default function CardListItem({ movieimg, movieName, movieDate, movieType, movieRating, movieId, isBookmarked, setPatchData }) {
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    useEffect(() => {
        setBookmarked(isBookmarked);
    }, [isBookmarked]);

    const handleBookmarkToggle = () => {
        axios.patch(`http://localhost:1111/data/${movieId}`, { isBookmarked: !bookmarked })
            .then(res => {
                setBookmarked(res.data.isBookmarked);
                setPatchData(movieId, res.data.isBookmarked);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className='card_item'>
            <div className="movie_img">
                <img
                    className='save'
                    src={bookmarked ? savedImg : saveImg}
                    alt={bookmarked ? "Unsave" : "Save"}
                    onClick={handleBookmarkToggle}
                />
                <img src={movieimg.regular.large} alt={movieName} />
            </div>
            <div className='movie_info'>
                <div className="movie_about">
                    <p className="date">{movieDate}</p>
                    <span className="oval"></span>
                    <div className="category_movie">
                        {movieType === 'Movie' ? <img src={movieImg} alt={movieType} /> : <img src={tvImg} alt={movieType} />}
                        <p className="type">{movieType}</p>
                    </div>
                    <span className="oval"></span>
                    <p className="rating">{movieRating}</p>
                </div>
                <div className="movie_name">
                    <h3>{movieName}</h3>
                </div>
            </div>
        </div>
    );
}
