
import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="FooterIcon">
        <GitHubIcon />  <LinkedInIcon /> 
      </div>
      <p> TWT 2231 Assignment &copy; 2024 </p>
    </div>
  );
}

export default Footer;
