import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

const TodoItems = ({text,id,isComplete,deleteTask,toggle}) => {
  return (
    <div className='flex items-center my-3 gap-3'>
        <div onClick={()=>{toggle(id)}}className='flex flex-1 itmes-center cursor-pointer'>
            <img src={isComplete ? tick : not_tick} alt="" className='w-7' />
            <p className={`ml-4 text-[16px] decoration:slate-500 ${isComplete ? "line-through":""}`}>{text}</p>
        </div>
        <img onClick={() => {deleteTask(id)}} src={delete_icon} alt="" className='w-3.5 cursor-pointer'/>
      
    </div>
  )
}

export default TodoItems
