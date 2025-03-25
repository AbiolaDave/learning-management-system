import { IMessage } from "../types/chat";
import { ADD_HISTORY, ADD_MESSAGE } from "./chatActions";

export type ChatState = {
  messages: IMessage[];
};
type ChatAction =
  | {
      type: typeof ADD_MESSAGE;
      payload: { message: IMessage };
    }
  | {
      type: typeof ADD_HISTORY;
      payload: { history: IMessage[] };
    };

export const chatsReducer = (state: ChatState, action: ChatAction) => {
  console.log("Reducer Action Received:", action); // Debug log
  switch (action.type) {
    case ADD_MESSAGE:
      //   console.log("Adding Peer:", action.payload.peerId); // Debug log
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    case ADD_HISTORY:
      //   console.log("Removing Peer:", action.payload.peerId); // Debug log
      return {
        ...state,
        messages: action.payload.history,
      };

    default:
      return { ...state };
  }
};
