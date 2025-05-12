import { ACTIONS } from "../app/page";

const BtnD = ({ digit, dispatch }) => {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      className="bg-gray-900 text-white rounded-full font-bold text-2xl w-20 h-20 cursor-pointer hover:bg-gray-400 duration-300 ease-in hover:text-xl"
    >
      {digit}
    </button>
  );
};

export default BtnD;
