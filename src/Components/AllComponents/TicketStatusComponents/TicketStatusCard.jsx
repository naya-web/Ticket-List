import "./TicketStatusCardStyle.css"

function TicketStatusCard({ icon, title, number ,isActive }) {
  return (
    <>
      <div className={`status-card ${isActive ? "active-status" : ""}`}>
        <img src={icon} alt="" />
        <div className="status-info">
          <p>{title}</p>
          <p>({number})</p>
        </div>
      </div>
    </>
  );
}

export default TicketStatusCard;
