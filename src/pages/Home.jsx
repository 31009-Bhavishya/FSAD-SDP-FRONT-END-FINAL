import React from 'react';
import './Home.css';
import Services from '../components/ServicesDashboard';  

const Home = () => {
  return (
    <>
      <section className="hero-section">
        <div className="hero-video">
          <video autoPlay muted loop playsInline className="hero-video__element" preload="metadata">
            <source src="/Bg.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title">Welcome to MediCurex</h1>
              <p className="hero-description">
                MediCurex is a digital healthcare platform that connects patients, doctors, pharmacists, and administrators through a secure and unified interface. The application streamlines appointments, online consultations, medical records, e-prescriptions, medication fulfilment, and role-based healthcare operations through a reliable, technology-driven experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-title">About Us</h2>
          <p className="about-description">
            At MediCurex, we are focused on modernizing healthcare delivery with a structured digital platform that improves coordination across the care journey. Patients can book appointments and access prescriptions, doctors can manage consultations and treatment plans, pharmacists can validate prescriptions and monitor orders, and administrators can govern users, medicines, and reporting. The result is a more efficient, transparent, and professional healthcare experience for every stakeholder.
          </p>
        </div>
      </section>
      
      <Services />
    
      <footer className="site-footer">
        <p className="footer-text">&copy; 2026 MediCurex. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
