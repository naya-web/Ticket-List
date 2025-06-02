import opened from "../../../assets/icons/opened.png";
import pending from "../../../assets/icons/clock.png";
import closed from "../../../assets/icons/closed.png";
import TicketStatusCard from "../../AllComponents/TicketStatusComponents/TicketStatusCard";
import "./TicketStatusStyle.css";


import { useSelector } from "react-redux";

function TicketStatus({ onStatusClick, selectedStatus }) {


  const { tickets } = useSelector((state) => state.tickets);

const statusCounts = {
  Open: tickets.filter((t) => t.status === "open").length,
  Pending: tickets.filter((t) => t.status === "pending").length,
  Closed: tickets.filter((t) => t.status === "closed").length,
};

const statuses = [
  { icon: opened, title: "Open", number: statusCounts.Open },
  { icon: pending, title: "Pending", number: statusCounts.Pending },
  { icon: closed, title: "Closed", number: statusCounts.Closed },
];

  return (

     <div className="ticket-status">
      <div className="statuses-container">
        {statuses.map((status, i) => (
          <div
            key={i}
            onClick={() => onStatusClick(status.title)}
            
          >
            <TicketStatusCard
              icon={status.icon}
              title={status.title}
              number={status.number}
              isActive={selectedStatus === status.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketStatus;
