import React from 'react'
import Navbar from './Navbar.jsx';
import Hero from './Hero.jsx';
import Features from './Features.jsx';
import Chatpreview from './Chatpreview.jsx';
import Footer from './Footer.jsx';

const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            <Chatpreview />
        </div>
    )
}

export default Home