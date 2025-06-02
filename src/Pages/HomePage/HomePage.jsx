
import React, { useEffect } from "react";
import './HomePageStyle.css'
import { useDispatch, useSelector } from "react-redux";
import {
  getTickets,
  setSelectedStatus,
} from "../../features/tickets/ticketsSlice";
import Sidebar from "../../Components/Container/Sidebar/Sidebar";
import Navbar from "../../Components/Container/Navbar/Navbar";
import TicketStatus from "../../Components/Container/TicketStatus/TicketStatus";
import TicketList from "../../Components/Container/TicketList/TicketList";
import Chat from "../../Components/Container/Chat/Chat";

function HomePage() {
  const dispatch = useDispatch();
  const selectedStatus = useSelector((state) => state.tickets.selectedStatus);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  const handleStatusClick = (status) => {
    dispatch(setSelectedStatus(status));
  };

  return (
    <div className=" home-page">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar />
        <div className="d-flex flex-grow-1" style={{ overflow: "hidden" }}>
         
          <TicketStatus
            selectedStatus={selectedStatus}
            onStatusClick={(status) => dispatch(setSelectedStatus(status))}
          />
          <TicketList />
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
