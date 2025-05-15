import { ACTIONS } from "../app/page";
const BtnO = ({operation,dispatch, theme}) => {
  return (
     <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload:{operation}})} className={`${ theme ? 'bg-gray-600 text-green-500' : 'bg-green-500 text-gray-100'} rounded-full font-bold text-3xl w-20 h-20 cursor-pointer hover:bg-gray-400 duration-300 ease-in hover:text-2xl`}>{operation}</button>
  )
}

export default BtnO