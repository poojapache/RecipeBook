import authenticationReducer from './authenticationReducer';
import loginSignUpReducer from './loginSignUpReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authentication:authenticationReducer,
    loginSignUp:loginSignUpReducer,
});

export default rootReducer;