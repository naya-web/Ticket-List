import "./SidebarIconStyle.css";

function SidebarIcon({ img, isActive, onClick }) {
  return (
    <div
      className={`sidebar-icon ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <img src={img} alt="" />
    </div>
  );
}

export default SidebarIcon;
