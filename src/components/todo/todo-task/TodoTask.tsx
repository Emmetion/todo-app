import { Task } from "../Task";
import React, { useState } from "react";
import { IoMdTrash } from "react-icons/io";

interface TodoTaskProps {
    task: Task;
    callbackDelete: (taskId: number) => void;
    callbackComplete: (taskId: number) => void;
}

const TodoTask: React.FC<TodoTaskProps> = ({ task, callbackDelete, callbackComplete }) => {
    const [completing, setCompleting] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number>(-1);
    
    const onRadioClick = () => {
        if (completing) {
            setCompleting(false);
            if (timeoutId > 0) {
                clearTimeout(timeoutId);
                setTimeoutId(-1);
            };
            return;
        }
        setCompleting(true);
        const tId = setTimeout(() => {
            callbackComplete(task.id); 
        }, 1000)
        setTimeoutId(tId);
    }

    return (
        <div className="flex-row flex items-center pt-2">
            <div className="min-h-[50px] max-h-[100px] w-[260px] bg-blue-500 hover:bg-blue-400 rounded-md flex flex-row group relative ">
                <input name="Todo Radio" type='radio' className="ml-2" onClick={onRadioClick} checked={completing} defaultChecked={false}/>
                <div className="flex flex-col text-left pl-2">
                    <h1 className={`text-white content-center relative mt-auto ${completing ? 'line-through' : ''} mw`}>{task.name}</h1>
                    <p className="text-gray-200 text-xs mt-auto pb-1">{task.timestamp}</p>
                </div>
                <button onClick={() => callbackDelete(task.id)} className="ml-auto invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className='h-[50px] w-[40px] hover:bg-red-500 flex items-center justify-center rounded-md '>
                        <IoMdTrash color="white"/>
                    </div>   
                </button>
            </div>
        </div>
    )
}

export default TodoTask;