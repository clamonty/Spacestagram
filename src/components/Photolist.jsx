import React from 'react'
import Photo from './Photo'
import {useGlobalContext} from '../context'
import Loading from './Loading'
const Photolist = () => {
    const {photos, loading} = useGlobalContext();

    if(loading) {
        return <Loading/>
    }

    // If only a single photo, render that photo
    // If photos is an array, map over it and render all the photos
    return (
        <section className="section">
            <h2 className='section-title'>NASA Photos</h2>
            <div className="photos-center">

                {Array.isArray(photos) ? photos.map(photo => {
                    return <Photo key={photo.date} {...photo}/>
                }) : <Photo {...photos}/>}
            </div>
        </section>
    )
    
}

export default Photolist
