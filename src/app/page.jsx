"use client";
import BtnD from "@/componetns/BtnD";
import BtnO from "@/componetns/BtnO";
import BtnP from "@/componetns/BtnP";
import { SunMoon, History } from "lucide-react";
import { useReducer, useState } from "react";
import { Delete } from "lucide-react";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand?.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    // PAREI AQUI

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.previousOperand === ''){
        return {
          ...state,
          previousOperand: null,
        };
      }
      if (state.currentOperand === null && state.operation !== null) {
        return {
          ...state,
          operation: null,
        };
      }
      if (state.currentOperand === null && state.operation === null && state.previousOperand !== null) {
        return {
          ...state,
          previousOperand: state.previousOperand.slice(0, -1),
        };
      }
      if (state.currentOperand === null && state.previousOperand === null) {
        return state;
      }
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      if(state.currentOperand.length > 1){
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        };
      }
      if (state.previousOperand == null) return state;
      if (state.currentOperand == null) return state;

      if (state.currentOperand.length > 1) {
        return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: payload.result,
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return "";
  let computation = "";
  const fr = ''
  const frn =[]
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "X":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;
    default:
      return "";
  }
  
  return  computation.toString()
  
  
  }


export default function Home() {
  const [theme, setTheme] = useState(true);
  const [hist, setHist] = useState([]);
  const [sideBar, setSideBar] = useState(false);
  const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  const handleEvaluate = () => {
    if (operation == null || currentOperand == null || previousOperand == null)
      return;

    const result = evaluate({ currentOperand, previousOperand, operation });
    console.log(result)
    console.log(result.length)

    setHist((prev) => [
      ...prev,
      `${previousOperand} ${operation} ${currentOperand} = ${result}`,
    ]);

    dispatch({ type: ACTIONS.EVALUATE, payload: { result } });
  };
  // console.log(hist);

  return (
    <div
      className={`flex h-screen bg-linear-to-r transition-colors duration-500 ease-in-out ${
        theme ? "from-gray-950 to-gray-900" : "from-zinc-400 to-zinc-300"
      } text-white overflow-hidden`}
    >
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col items-start gap-10 pt-10 pl-10 transition-all duration-500 ease-in-out overflow-y-auto max-h-screen
    ${
      sideBar
        ? "translate-x-0 opacity-100 w-105 max-sm:w-50"
        : "-translate-x-full opacity-0 w-64"
    }
  `}
      >
        {" "}
        {hist.map((item, index) => (
          <div
            key={index}
            className="bg-gray-700 p-4 rounded-lg mb-2 w-64 text-sm max-sm:w-32"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="h-[750px] w-[500px] bg-black rounded-2xl">
          <div className="bg-gray-950 h-48 flex flex-col justify-center items-end pr-20 text-4xl font-bold rounded overflow-hidden">
            <span>
              {previousOperand}
              {operation}{currentOperand}
            </span>
            
          </div>
          <div className="grid grid-cols-4 mt-10 ml-6 gap-4 max-sm:ml-2">
            <button
              onClick={() => dispatch({ type: ACTIONS.CLEAR })}
              className="bg-gray-600 text-red-500 rounded-full text-3xl w-20 h-20 cursor-pointer hover:bg-gray-400 duration-300 ease-in hover:text-2xl"
            >
              C
            </button>
            <button
              onClick={() => setTheme(!theme)}
              className="bg-gray-900 text-white rounded-full font-bold text-2xl w-20 h-20 cursor-pointer hover:bg-gray-400 duration-300 ease-in hover:text-xl pl-5"
            >
              <SunMoon size={40} />
            </button>
            <button
              onClick={() => setSideBar(!sideBar)}
              className="bg-gray-900 text-white rounded-full font-bold text-2xl w-20 h-20 cursor-pointer hover:bg-gray-400 duration-300 ease-in hover:text-xl pl-5"
            >
              <History size={40} />
            </button>
            <BtnO operation="/" dispatch={dispatch} theme={theme} />
            <BtnD digit="7" dispatch={dispatch} theme={theme} />
            <BtnD digit="8" dispatch={dispatch} theme={theme} />
            <BtnD digit="9" dispatch={dispatch} theme={theme} />
            <BtnO operation="X" dispatch={dispatch} theme={theme} />
            <BtnD digit="4" dispatch={dispatch} theme={theme} />
            <BtnD digit="5" dispatch={dispatch} theme={theme} />
            <BtnD digit="6" dispatch={dispatch} theme={theme} />
            <BtnO operation="-" dispatch={dispatch} theme={theme} />
            <BtnD digit="1" dispatch={dispatch} theme={theme} />
            <BtnD digit="2" dispatch={dispatch} theme={theme} />
            <BtnD digit="3" dispatch={dispatch} theme={theme} />
            <BtnP operation="+" dispatch={dispatch} />
            <button
              onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
              className="bg-gray-900 text-white rounded-full font-bold text-2xl w-20 h-20 cursor-pointer hover:bg-gray-400 duration-300 ease-in hover:text-xl pl-4.5"
            >
              <Delete size={40} />
            </button>
            <BtnD digit="0" dispatch={dispatch} theme={theme} />
            <BtnD digit="." dispatch={dispatch} theme={theme} />
            <button
              onClick={handleEvaluate}
              className="bg-green-600 text-white rounded-full font-bold text-5xl w-20 h-20 pb-3 cursor-pointer hover:bg-gray-400 duration-300 ease-in hover:text-4xl"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
