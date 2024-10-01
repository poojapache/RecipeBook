const initialState = { content: 'I' };

const loginSignUpReducer = (state = initialState, action) => {
    console.log('In reducer',action.type);
    switch (action.type) {
        case 'SIGNUP':
            return { ...state, content: 'S' }; // Ensure this updates the state properly
        case 'LOGIN':
            return { ...state, content: 'L' };
        default:
            return state;
    }
};

export default loginSignUpReducer;