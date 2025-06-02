import "./TicketCardStyle.css";
import { formatDistanceToNowStrict } from "date-fns";

function TicketCard({ img, name, subject, timestamp, state, onClick }) {
  const timeAgo = formatDistanceToNowStrict(new Date(timestamp), {
    addSuffix: true,
  });

  return (
    <div className="ticket-row" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="name-cell">
        <img src={img} alt="user" />
        <p>{name}</p>
      </div>
      <p>{subject}</p>
      <p className="timestamp">{timeAgo}</p>
      <p className="card-state">{state}</p>
    </div>
  );
}

export default TicketCard;