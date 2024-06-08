import { Task } from "../Task";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";

interface TodoTaskProps {
    task: Task;
    callback: (taskId: number) => void;
}

const TodoTask: React.FC<TodoTaskProps> = ({ task, callback }) => {
    return (
        <div className="flex-row flex items-center pt-2">
            <div className="h-[40px] w-[210px] bg-blue-500 hover:bg-blue-400 content-center">
                <h1 className="text-white pl-2">{task.name}</h1>
            </div>
            <button onClick={() => callback(task.id)}>
                <div className='h-[40px] w-[40px] bg-red-500 flex items-center justify-center'>
                    <IoCloseSharp color="white"/>
                </div>   
            </button>
        </div>
    )
}

export default TodoTask;