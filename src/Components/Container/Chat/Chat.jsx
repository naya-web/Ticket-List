

import "./ChatStyle.css";
import phone from "../../../assets/icons/phone1.png";
import email from "../../../assets/icons/email1.png";
import location from "../../../assets/icons/location1.png";
import user from "../../../assets/userimg.png";
import close from "../../../assets/icons/close-chat.png";
import Message from "../../AllComponents/ChatComponents/Message";
import img from "../../../assets/userimg.png";

import smile from "../../../assets/icons/smile.png";
import image from "../../../assets/icons/image.png";
import attachment from "../../../assets/icons/attachment.png";
import send from "../../../assets/icons/send.png";

import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNowStrict, format, isSameDay } from "date-fns";
import {
  clearSelectedTicket,
  replyToTicket,
} from "../../../features/tickets/ticketsSlice";
import { useState } from "react";

function Chat() {
  const dispatch = useDispatch();
  const { selectedTicket, selectedTicketStatus } = useSelector(
    (state) => state.tickets
  );
  const [newMessage, setNewMessage] = useState("");

  if (selectedTicketStatus === "loading") {
    return (
      <div className="chat">
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (selectedTicketStatus === "failed") {
    return (
      <div className="chat">
        <div className="error-message">
          <p>⚠️ Failed to load the conversation. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!selectedTicket) {
    return (
      <div className="chat">
        <h2 className="default-chat">
          Select a ticket to view the conversation.
        </h2>
      </div>
    );
  }

  const messages = selectedTicket.messages || [];

  return (
    <div className={`chat ${selectedTicket ? "chat-expanded" : ""}`}>
      {/* Chat header */}
      <div className="chat-header">
        <div className="user-section">
          <div className="user-info">
            <img src={user} className="user-img" alt="" />
            <div>
              <h2>{selectedTicket.customer_name || "Unknown User"}</h2>
              <div className="icons">
                <div className="icon">
                  <img src={phone} alt="" />
                </div>
                <div className="icon">
                  <img src={email} alt="" />
                </div>
                <div className="icon">
                  <img src={location} alt="" />
                </div>
              </div>
            </div>
          </div>
          <img
            src={close}
            className="close-chat"
            alt="close"
            onClick={() => dispatch(clearSelectedTicket())}
          />
        </div>
        <div className="ticket-info">
          <div className="ticket-details">
            <p className="subject-title">Ticket Subject</p>
            <small>{selectedTicket.subject}</small>
          </div>
          <small>
            {formatDistanceToNowStrict(new Date(selectedTicket.timestamp), {
              addSuffix: true,
            })}
          </small>
        </div>
      </div>

      {/* Chat body */}
      <div className="chat-body">
        {messages.length === 0 ? (
          <div className="empty-conversation">
            <p>No messages found for this ticket.</p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const msgDate = new Date(msg.timestamp);
            const showDate =
              i === 0 ||
              !isSameDay(new Date(messages[i - 1].timestamp), msgDate);

            return (
              <div className="msg-container" key={i}>
                {showDate && (
                  <div className="date-divider">
                    <span>{format(msgDate, "EEEE, MMMM d, hh:mm a")}</span>

                  </div>
                )}
                <Message
                  img={img}
                  name={
                    msg.sender === "agent"
                      ? "Agent"
                      : selectedTicket.customer_name
                  }
                  subject={msg.message}
                  isAgent={msg.sender === "agent"}
                />
              </div>
            );
          })
        )}
      </div>

      {/* Send */}
      <div className="send-box">
        <div className="left">
          <img src={smile} alt="" />
          <input
            type="text"
            placeholder="Enter Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
        <div className="right">
          <img src={image} alt="" />
          <img src={attachment} alt="" />
          <img
            src={send}
            className="send-btn"
            alt=""
            onClick={() => {
              if (newMessage.trim() === "") return;

              dispatch(
                replyToTicket({
                  ticketId: selectedTicket.id,
                  message: newMessage,
                })
              )
                .unwrap()
                .then(() => setNewMessage(""))
                .catch((err) => console.error("Failed to send message:", err));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
