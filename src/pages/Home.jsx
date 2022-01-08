import React from 'react'
import Photolist from '../components/Photolist'
import SearchForm from '../components/SearchForm'

const Home = () => {
    return (
        <main>
            <SearchForm/>
            <Photolist/>
        </main>
    )
}

export default Home
