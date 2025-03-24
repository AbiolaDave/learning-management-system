import { ADD_PEER, REMOVE_PEER } from "./peerActions";

export type PeerState = Record<string, { stream: MediaStream }>;
type peerAction =
  | {
      type: typeof ADD_PEER;
      payload: { peerId: string; stream: MediaStream };
    }
  | {
      type: typeof REMOVE_PEER;
      payload: { peerId: string };
    };

export const peersReducer = (state: PeerState, action: peerAction) => {
  console.log("Reducer Action Received:", action); // Debug log
  switch (action.type) {
    case ADD_PEER:
      console.log("Adding Peer:", action.payload.peerId); // Debug log
      return {
        ...state,
        [action.payload.peerId]: {
          stream: action.payload.stream,
        },
      };
    case REMOVE_PEER:
      console.log("Removing Peer:", action.payload.peerId); // Debug log
      const { [action.payload.peerId]: deleted, ...rest } = state;
      return rest;

    default:
      return { ...state };
  }
};
