import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TicketCard from "../../AllComponents/TicketListComponents/TicketCard";
import userimg from "../../../assets/userimg.png";
import "./TicketListStyle.css";

import { getTicketById } from "../../../features/tickets/ticketsSlice";

function TicketList() {
  const { tickets, selectedStatus, status, error } = useSelector(
    (state) => state.tickets
  );

  const filteredTickets = selectedStatus
    ? tickets.filter((ticket) => ticket.status === selectedStatus.toLowerCase()) // تأكد lowercase
    : tickets;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const indexOfLastTicket = currentPage * rowsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - rowsPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  const totalPages = Math.ceil(filteredTickets.length / rowsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // ضمن المعالج عند الضغط على التذكرة:

  const dispatch = useDispatch();
  const handleClickTicket = (ticketId) => {
    dispatch(getTicketById(ticketId));
  };

  return (
    <div className="ticket-list-container">
      <div className="ticket-table">
        <div className="ticket-header">
          <h2>Name</h2>
          <h2>Subject</h2>
          <h2>Timestamp</h2>
          <h2>State</h2>
        </div>

        {status === "loading" ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Loading tickets...</p>
          </div>
        ) : status === "failed" ? (
          <div className="error-message">
            <p>⚠️ Failed to load tickets. Please try again later!</p>
          </div>
        ) : currentTickets.length === 0 ? (
          <div className="empty-message">
            <p>🎉 No tickets found for this status.</p>
            <p>Try selecting a different status or check again later.</p>
          </div>
        ) : (
          currentTickets.map((ticket, i) => (
            <TicketCard
              key={i}
              img={userimg}
              name={ticket.customer_name}
              subject={ticket.subject}
              timestamp={ticket.timestamp || "Unknown"}
              state={ticket.status}
              onClick={() => handleClickTicket(ticket.id)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <div className="rows-select">
          <label>Rows per page:</label>

          <div className="custom-select-wrapper">
            <select
              className="custom-select"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
            {/* <img src={dropdownArrow} alt="" /> */}
          </div>
        </div>
        <div className="page-controls">
          <button
            onClick={() => goToPage(1)}
            className="arrow"
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="arrow"
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={
                  pageNum === currentPage ? "active-page page" : "page"
                }
              >
                {pageNum}
              </button>
            )
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            className="arrow"
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            className="arrow"
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketList;
