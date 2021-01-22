import {
  START_GET_CHATS,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAILED,
  START_GET_MESSAGES,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILED,
  SWITCH_RECIPENT,
  ADD_TO_CHATS,
  ADD_TO_MESSAGES,
} from '../actions/actionTypes';

const initialState = {
  chats: [],
  messages: [],
  loading: false,
  error: null,
  roomID: null,
  recipent: null,
};

export default function chats(state = initialState, action) {
  switch (action.type) {
    case START_GET_MESSAGES:
    case START_GET_CHATS:
      return {
        ...state,
        loading: true,
      };
    case GET_MESSAGES_FAILED:
    case GET_CHATS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
        loading: false,
        error: null,
      };
    case GET_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.chats,
        loading: false,
        error: null,
      };
    case SWITCH_RECIPENT:
      return {
        ...state,
        recipent: action.recipent,
        roomID: action.roomID,
      };
    case ADD_TO_CHATS:
      return {
        ...state,
        chats: [...state.chats, action.chat],
      };
    case ADD_TO_MESSAGES:
      if (state.roomID === action.message.room) {
        return {
          ...state,
          messages: [...state.messages, action.message],
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}
