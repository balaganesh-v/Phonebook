import React from 'react';
import Home from '../components/landing/Home.jsx';
import Navbar from '../components/landing/Navbar.jsx';
import Footer from '../components/landing/Footer.jsx';

const Landing = () => {
    return (
        <div>
            <Navbar />
            <Home />
            <Footer />
        </div>
    )
}

export default Landing