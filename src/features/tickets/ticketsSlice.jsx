import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTickets, fetchTicketById, sendReply } from "./ticketsAPI";

export const getTickets = createAsyncThunk("tickets/getTickets", async () => {
  const data = await fetchTickets();
  return data;
});

export const getTicketById = createAsyncThunk(
  "tickets/getTicketById",
  async (ticketId) => {
    const data = await fetchTicketById(ticketId);
    return data;
  }
);

export const replyToTicket = createAsyncThunk(
  "tickets/replyToTicket",
  async ({ ticketId, message }) => {
    const response = await sendReply(ticketId, message);

    const cleanMessage = response?.data?.message ? response.data : response;

    return {
      ticketId,
      message: {
        sender: "agent",
        message: cleanMessage.message || message,
        timestamp: new Date().toISOString(),
      },
    };
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    status: "idle",
    error: null,
    selectedStatus: null,
    selectedTicket: null,
    selectedTicketStatus: "idle",
  },
  reducers: {
    setSelectedStatus(state, action) {
      state.selectedStatus = action.payload;
    },
    setSelectedTicketId(state, action) {
      state.selectedTicket = action.payload;
    },
    clearSelectedTicket(state) {
      state.selectedTicket = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getTicketById.pending, (state) => {
        state.selectedTicketStatus = "loading";
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.selectedTicketStatus = "succeeded";
        state.selectedTicket = action.payload;
      })
      .addCase(getTicketById.rejected, (state) => {
        state.selectedTicketStatus = "failed";
        state.selectedTicket = null;
      })
      .addCase(replyToTicket.fulfilled, (state, action) => {
        const { ticketId, message } = action.payload;

        if (state.selectedTicket && state.selectedTicket.id === ticketId) {
          const fixedMessage = {
            sender: "agent",
            message: message.message || "",
            timestamp: new Date().toISOString(),
          };

          state.selectedTicket.messages.push(fixedMessage);
        }
      });
  },
});

export const { setSelectedStatus, setSelectedTicketId, clearSelectedTicket } =
  ticketsSlice.actions;
export default ticketsSlice.reducer;
