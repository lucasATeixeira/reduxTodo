export const Types = {
  ADD_REQUEST: 'favorites/ADD_REQUEST',
  ADD_SUCCESS: 'favorites/ADD_SUCCESS',
  ADD_FAILURE: 'favorites/ADD_FAILURE',
};

const INITIAL_STATE = {
  loading: false,
  data: [],
  err: null,
};

export default function favorites(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_FAILURE:
      return { ...state, loading: false, err: action.payload.err };
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        err: null,
        data: [...state.data, action.payload.data],
      };
    default:
      return state;
  }
}

export const Creators = {
  addFavoriteRequest: repository => ({
    type: Types.ADD_REQUEST,
    payload: { repository },
  }),

  addFavoriteSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
  }),

  addFavoriteFailure: err => ({
    type: Types.ADD_FAILURE,
    payload: { err },
  }),
};
