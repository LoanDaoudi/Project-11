const initialState = {
  token: null,
  isAuthenticated: false,
  username: localStorage.getItem('username') || 'Tony Jarvis',
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...state,
          token: action.payload,
          isAuthenticated: true,
        };
      case 'SIGN_OUT':
        return {
          ...state,
          token: null,
          isAuthenticated: false,
        };
        case 'UPDATE_USERNAME':
          localStorage.setItem('username', action.payload);
          return {
            ...state,
            username: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default authReducer;