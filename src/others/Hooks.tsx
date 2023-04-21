import { useReducer } from "react";

const initialState = { count: 0 };

// typy funkcji reducera
type ActionType=
| {type:"increment"}
| {type:"decrement"}
| {type:"change";payload:number;}

function reducer(state: typeof initialState, action:Readonly<ActionType>):typeof initialState {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1};
    case "decrement":
      return { count: state.count - 1 };
    case "change":
        return {count: state.count+action.payload}
    default:
      throw new Error();
  }
}
// Dzięki temu w komponencie otrzymamy później podpowiadanie składni
export function Hooks() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Licznik: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={()=>dispatch({type: "change",payload: 2})}>Change</button>
    </>
  );
}