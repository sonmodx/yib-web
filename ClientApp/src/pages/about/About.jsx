import React from "react";
import "./About.css";
import pepperImg from "./image/pepper.png";
import nonImg from "./image/non.png";
import modxImg from "./image/modx.jpg";
import paoImg from "./image/pao.png";
import topazImg from "./image/topaz.png";
const ProfileCard = ({ srcImg, name, role, nameID }) => {
  return (
    <div className="ProfileCard">
      <img src={srcImg} alt="avatar" width="256" height="256" />
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
            srcImg={topazImg}
            nameID="64010959"
            name="อธิป ซื่อมาก"
            role="UX/UI"
          />
          <ProfileCard
            srcImg={pepperImg}
            nameID="64011148"
            name="ธันวา ศักดารัตน์"
            role="UX/UI"
          />
          <ProfileCard
            srcImg={nonImg}
            nameID="64011160"
            name="นายนนทัช มุกลีมาศ"
            role="Backend"
          />
          <ProfileCard
            srcImg={modxImg}
            nameID="64011281"
            name="นายศัตชล หอมหวล"
            role="Frontend"
          />
          <ProfileCard
            srcImg={paoImg}
            nameID="64011301"
            name="สิทธิ นวะมะวัฒน์"
            role="Frontend"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
