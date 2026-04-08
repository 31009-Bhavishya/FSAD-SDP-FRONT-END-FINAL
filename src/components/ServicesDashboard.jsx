import React from "react";
import "./ServicesDashboard.css";
import ServiceCard from "./ui/ServiceCard";
import {
  FaUserMd,
  FaCalendarCheck,
  FaPills,
  FaVial,
  FaFileMedical,
  FaAmbulance,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaUserMd />,
      title: "Online Consultation",
      description: "Consult qualified doctors through secure video or chat channels.",
      iconColor: "#0ea5e9"
    },
    {
      icon: <FaCalendarCheck />,
      title: "Appointment Booking",
      description: "Schedule clinic and hospital appointments with a streamlined workflow.",
      iconColor: "#10b981"
    },
    {
      icon: <FaPills />,
      title: "Medicine Delivery",
      description: "Access medicines online with pharmacist-supported fulfilment and tracking.",
      iconColor: "#3b82f6"
    },
    {
      icon: <FaVial />,
      title: "Diagnostic Tests",
      description: "Arrange diagnostic tests and review reports digitally.",
      iconColor: "#8b5cf6"
    },
    {
      icon: <FaFileMedical />,
      title: "Health Records",
      description: "Store prescriptions, treatment history, and health records securely.",
      iconColor: "#06b6d4"
    },
    {
      icon: <FaAmbulance />,
      title: "Emergency SOS",
      description: "Use rapid emergency assistance support when urgent care is required.",
      iconColor: "#ef4444"
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="services-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              iconColor={service.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
