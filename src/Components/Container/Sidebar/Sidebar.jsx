import logo from "../../../assets/Logo.png";
import SidebarIcon from "../../AllComponents/SidebarComponents/SidebarIcon";
import sequares from "../../../assets/icons/squares-2x2.svg";
import ticket from "../../../assets/icons/ticket.svg";
import user from "../../../assets/icons/user-group.svg";
import document from "../../../assets/icons/document-chart-bar.svg";
import settings from "../../../assets/icons/cog-6-tooth.svg";
import "./SidebarStyle.css";
import { useState } from "react";

function Sidebar() {
  const icons = [
    {
      img: sequares,
    },
    {
      img: ticket,
    },
    {
      img: user,
    },
    {
      img: document,
    },
    {
      img: settings,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <>
      <div className="sidebar">
        <img src={logo} alt="" />
        {icons.map((icon, index) => (
          <SidebarIcon
            key={index}
            img={icon.img}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </>
  );
}

export default Sidebar;
