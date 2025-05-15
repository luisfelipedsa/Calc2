import { ACTIONS } from "../app/page";

const BtnD = ({ digit, dispatch, theme}) => {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      className={`${ theme ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'} rounded-full font-bold text-2xl w-20 h-20 cursor-pointer hover:bg-gray-500 duration-300 ease-in hover:text-xl`}
    >
      {digit}
    </button>
  );
};

export default BtnD;
