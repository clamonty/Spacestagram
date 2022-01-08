import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import {useParams, Link} from 'react-router-dom'

const SinglePhoto = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [hideText, setHideText] = useState(true);
    let url=`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&date=${id}`;

    const fetchPhoto = async() => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data) {
                setPhoto(data);
            } else {
                setPhoto(null);
            }
            
            setPhoto(data);
            if(data.explanation.length > 100)
                setHideText(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    // re-render on reload and id change
    useEffect(() => {
        fetchPhoto();
    }, [id])
    console.log();

    if (loading) {
        return <Loading/>
    }
    if (!photo) {
        return (
        <h2 className='section-title'>No photo to display</h2>
        )
    }

    return (
        <section className='section photo-section'>
            <Link to='/' className='btn btn-primary'>
                Take me back home
            </Link>
            <h2 className="section-title">NASA A.P.O.D {photo.date}</h2>
            <div className="image">
                <img src={photo.url} alt={photo.date} />
                <div className="image-info">
                    <p>
                        <span className="image-data">Source:</span>{photo.copyright || "Unknown"}
                    </p>
                    <p>
                        <span className="image-data">Date:</span>{photo.date}
                    </p>
                    <p>
                        <span className="image-data">Explanation:</span>{!hideText ? photo.explanation : <>{photo.explanation.substring(0, 100)}<span onClick={setHideText(!hideText)}>...</span></>}
                    </p>
                </div>
            </div>
        </section>
    )

}

export default SinglePhoto
