import {ACTIONS} from '../app/page'

const BtnP = ({operation,dispatch}) => {
  return (
    <button onClick={() => dispatch({type:ACTIONS.CHOOSE_OPERATION, payload:{operation}})} className="bg-gray-600 text-green-500 rounded-full w-20 h-20 font-bold text-5xl pb-3 cursor-pointer hover:bg-gray-400 duration-300 ease-in hover:text-4xl">
              {operation}
            </button>
  )
}

export default BtnP