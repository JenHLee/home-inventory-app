import { createContext, useEffect, useReducer} from "react";
import Reducer from "./Reducer";

// - `createContext` : context 객체를 생성한다.
// - `Provider` : 생성한 context를 하위 컴포넌트에게 전달하는 역할을 한다.
// - `Consumer` : context의 변화를 감시하는 컴포넌트이다.

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null, //If there is user inside of localStorage, then getItem user/ but no user, then null
    isFetching: false, 
    error: false,
};

export const Context = createContext(INITIAL_STATE);
export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

//useReducer란? useRedcuer Hook은 react가 상태관리를 위한 reducer function에 접근할 수 있게 해준다. 
//useState Hook과 매우 비슷한데, 차이점이라면 useReducer는 좀 더 복잡한 로직과 상태관리에서 사용되는 경우가 많다

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


// login process
// 1.sending username, password 
// 2-1. success: take res, (user information) -> update state
// 2-2. fail: -> login again -> error : true
