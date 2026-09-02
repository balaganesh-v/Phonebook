import React from 'react';
import Home from '../../components/landing/Home.jsx';
import Navbar from '../../components/landing/layouts/Navbar.jsx';
import Footer from '../../components/landing/layouts/Footer.jsx';

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