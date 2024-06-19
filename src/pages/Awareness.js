import React, { useState } from "react";
import "../styles/Awareness.css";
import reduceAirPollutionImage from "../assets/reduce.jpg";

function Awareness() {
  const [activeText, setActiveText] = useState("");

  const handleButtonHover = (textId) => {
    setActiveText(textId);
  };

  const handleButtonLeave = () => {
    setActiveText("");
  };

  return (
    <div>
      <section className="awareness-section">
        <div className="quote-container">
          <p className="quote-text">
            "There's so much pollution in the air now that if it weren't for our lungs there'd be no place to put it all."
            <br />
            <span className="quote-author">- Robert Orben -</span>
          </p>
        </div>
      </section>

      <section className="button-section">
        <button
          className="info-button"
          onMouseEnter={() => handleButtonHover("section1-text")}
          onMouseLeave={handleButtonLeave}
        >
          Basics of air quality and its impact on our health
        </button>
        <button
          className="info-button"
          onMouseEnter={() => handleButtonHover("section2-text")}
          onMouseLeave={handleButtonLeave}
        >
          Importance of monitoring air quality to preserve public health
        </button>
        <button
          className="info-button"
          onMouseEnter={() => handleButtonHover("section3-text")}
          onMouseLeave={handleButtonLeave}
        >
          Steps to take when air quality is poor
        </button>
      </section>

      <div id="section1-text" className={`text-section ${activeText === "section1-text" ? "visible" : ""}`}>
        Air quality can have a significant impact on our overall health and well-being, which is why it is important to understand the basics of this topic. Poor air quality can lead to a variety of health concerns, such as respiratory issues, heart disease, and even premature death. To better understand air quality, it is necessary to look at the various pollutants and particles that can affect the air we breathe. This can include things like carbon monoxide, ozone, and particulate matter. By recognizing the sources of these pollutants and taking action to reduce them, we can improve the air quality in our communities and promote better health outcomes for all.
      </div>

      <div id="section2-text" className={`text-section ${activeText === "section2-text" ? "visible" : ""}`}>
        Poor air quality can have detrimental effects on public health. To ensure that individuals are safe, it is important to monitor air quality regularly and take action when necessary. Air pollutants such as ozone and particulate matter can cause respiratory problems and exacerbate existing health conditions such as asthma and COPD. In addition, exposure to air pollution has been linked to heart disease, stroke, and other serious health issues. By monitoring air quality, officials can take steps to reduce pollution and protect public health. This can be achieved through a variety of means, such as implementing regulations on industrial emissions and encouraging environmentally-friendly transportation options. Public awareness through education and outreach campaigns also plays a vital role in promoting a healthy environment and reducing exposure to harmful air pollutants. Overall, monitoring air quality is crucial to preserving public health and promoting a safe and sustainable future for all.
      </div>

      <div id="section3-text" className={`text-section ${activeText === "section3-text" ? "visible" : ""}`}>
        When air quality is poor, it’s important to take the necessary steps to protect yourself and your loved ones. Firstly, limiting outdoor activities is crucial. This includes anything from exercising to running errands, as the prolonged exposure to polluted air can cause serious health complications. Secondly, staying informed about the AQI in your area is essential. Check air quality reports and forecasts regularly to ensure you are aware of any changes and can take necessary precautions. Finally, wearing protective gear such as face masks or respirators can help filter out pollutants and provide an added layer of defense against poor air quality. By following these steps, you can help safeguard your health and wellbeing during times of poor air quality.

        <br></br> <br></br> It is essential for public health to monitor air quality and take steps to reduce indoor air pollution when necessary. Not only should people be aware of general guidelines regarding air quality, but they should also familiarize themselves with the AQI within their community to understand how best to protect themselves and those around them. Everyone has a role in stewarding the environment, from advocating for better air-quality legislation to making personal lifestyle choices that lead to healthier air. By following the tips outlined in this article, we can all work together towards improving the air quality of our world and making sure that future generations have an opportunity to thrive in a healthy environment.
      </div>

      <section className="reduce-section">
        <h2 className="reduce-title">Ways to reduce air pollution</h2>
        <div className="reduce-image-container">
          <img src={reduceAirPollutionImage} alt="Ways to reduce air pollution" className="reduce-image" />
        </div>
      </section>
    </div>
  );
}

export default Awareness;
