import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
const About = () => {
  const visitGitHub = () => {
    window.location = "https://www.github.com/im-Haris8278";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/haris8278/image/upload/v1664974906/Snapchat-287695591-modified_xoi0la.png"
              alt="Founder"
            />
            <Typography>Haris Baig</Typography>
            <Button onClick={visitGitHub} color="primary">
              Visit GitHub
            </Button>
            <span>This is an MarketPlace Wesbite Made By @HarisBaig.</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.linkedin.com/in/haris-baig-665668231/"
              target="blank"
            >
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>

            <a
              href="https://Wa.me/923217207623?text=Hi+there,+my+name+is"
              target="blank"
            >
              <WhatsAppIcon className="whatsappSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
