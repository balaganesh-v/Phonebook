import React from 'react'
import Navbar from './layouts/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import Features from './sections/Features.jsx';
import Chatpreview from './sections/Chatpreview.jsx';
import Contacts from './sections/Contacts.jsx';
import Footer from './layouts/Footer.jsx';

const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            <Chatpreview />
            <Contacts />
        </div>
    )
}

export default Home