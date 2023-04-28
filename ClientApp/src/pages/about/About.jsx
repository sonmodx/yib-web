import React from "react";
import "./About.css";
import pepperImg from "./image/pepper.png";
import nonImg from "./image/non.png";
import modxImg from "./image/modx.jpg";
const ProfileCard = ({ srcImg, name, role, nameID }) => {
  return (
    <div className="ProfileCard">
      <img src={srcImg} alt="avatar" />
      <p className="nameID">{nameID}</p>
      <p className="name">{name}</p>
      <p className="role">{role}</p>
    </div>
  );
};

const About = () => {
  return (
    <div className="About">
      <header>MEMBERS</header>
      <div className="container">
        <div className="grid">
          <ProfileCard
            srcImg={modxImg}
            nameID="64011281"
            name="นายศัตชล หอมหวล"
            role="Frontend"
          />
          <ProfileCard
            srcImg={pepperImg}
            nameID="64011281"
            name="นายศัตชล หอมหวล"
            role="Frontend"
          />
          <ProfileCard
            srcImg={pepperImg}
            nameID="64011281"
            name="นายศัตชล หอมหวล"
            role="Frontend"
          />
          <ProfileCard
            srcImg={nonImg}
            nameID="64011281"
            name="นายศัตชล หอมหวล"
            role="Frontend"
          />
          <ProfileCard
            srcImg={nonImg}
            nameID="64011281"
            name="นายศัตชล หอมหวล"
            role="Frontend"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
