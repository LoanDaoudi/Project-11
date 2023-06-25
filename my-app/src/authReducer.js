const initialState = {
    token: null,
    isAuthenticated: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...state,
          token: action.payload,
          isAuthenticated: true
        };
      case 'SIGN_OUT':
        return {
          ...state,
          token: null,
          isAuthenticated: false
        };
      default:
        return state;
    }
  };
  
  export default authReducer;