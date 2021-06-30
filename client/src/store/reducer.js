const initialState = {
    userLoggedIn: false
}

const reducer = (state = initialState, actions) => {
    
    switch(actions.type){
        case "SET_LOGGED_IN":
            return {
                ...state,
                userLoggedIn: true
            };
        case "LOGOUT":
            return {
                ...state,
                userLoggedIn: false
            };
        default:
            return state;
    }
}

export default reducer;
