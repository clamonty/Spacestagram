import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Photo = ({copyright, date, explanation, url}) => {
    
    // UseState will only trigger on load
    const [isLiked, setIsLiked] = useState(localStorage.getItem(date) === 'true');
    
    const handleLike = () => {
        setIsLiked(!isLiked);
    }

    // Use effect to store the liked status of a picture 
    useEffect(() => {
        if(!isLiked) {
            localStorage.removeItem(`${date}`);

        } else {
            localStorage.setItem(`${date}`, isLiked);

        }
        

    }, [isLiked]);

    return (
        <article className="photo">
            <div className="img-container">
                <img src={url} alt={date} />
            </div>
            <div className="photo-footer">
                <h4>{copyright || "Unknown Name"}</h4>
                <h5>{date}</h5>
                <div className="like-container">
                    {isLiked ? <FaHeart size={28} style={{color: 'red'}} className='like-icon' onClick={handleLike}/> : <FaRegHeart size={28} onClick={handleLike} className='like-icon'/>}
                    <Link to={`/photo/${date}`} className='btn btn-primary btn-detail'>Read More</Link>
                </div>


            </div>
        </article>
    )
}

export default Photo
