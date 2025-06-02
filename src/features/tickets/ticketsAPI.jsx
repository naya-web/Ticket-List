import axios from "axios";

const BASE_URL = "https://openapi.pythonanywhere.com/api/tickets";

export const fetchTickets = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchTicketById = async (ticketId) => {
  const response = await axios.get(
    `https://openapi.pythonanywhere.com/api/tickets/${ticketId}`
  );
  return response.data;
};

export const sendReply = async (ticketId, message) => {
  const response = await axios.post(
    `https://openapi.pythonanywhere.com/api/tickets/${ticketId}/reply`,
    {
      sender: "agent",
      message,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
