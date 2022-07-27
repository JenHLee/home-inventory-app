import { createContext, useEffect, useReducer} from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null, //If there is user inside of localStorage, then getItem user/ but no user, then null
    isFetching: false, 
    error: false,
};

export const Context = createContext(INITIAL_STATE);
export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);
    return (
        <Context.Provider 
        value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}
        >
            {children}
        </Context.Provider >
    );

};
export default Context;
/*
login process
1.sending username, password 
2-1. success: take res, (user information) -> update state
2-2. fail: -> login again -> error : true
*/