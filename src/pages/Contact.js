import React, { useState } from "react";
import Haze from "../assets/haze.jpg";
import "../styles/Contact.css";

function Contact() {
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setShowMessage(true);

    event.target.reset(); 
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <div className="contact">
      <div className="leftSide" style={{ backgroundImage: `url(${Haze})` }}></div>
      <div className="rightSide">
        <h1> Contact Us</h1>

        <form id="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>
          <button type="submit"> Send Message</button>
        </form>
      </div>

      {/* Overlay message */}
      {showMessage && (
        <div className="overlay">
          <div className="overlay-message">
            <p style={{ fontSize: "30px" }}>Message sent!</p>
            <button className="close-button" onClick={handleCloseMessage}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
