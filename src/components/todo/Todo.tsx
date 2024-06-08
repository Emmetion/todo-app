import { ChangeEvent, useState } from "react"
import TodoTask from "./todo-task/TodoTask";
import { Task } from "./Task";

export default function Todo() {
    const [taskValue, setTaskValue] = useState<string>('');
    const [error, setError] = useState<string>('')
    const [todoItems, setTodoItems] = useState<Task[]>(new Array<Task>) ;
    const [id, setId] = useState<number>(0);

    const addTaskFromString = (name: string) => {
        let timestamp = new Date().toLocaleString().replace(',', '');
        setId(id + 1);
        setTodoItems([...todoItems, {id, name, timestamp}]);
    }

    const updateInput = (e: ChangeEvent) => {
        const element = e.target as HTMLTextAreaElement;
        setTaskValue(element.value);
    }

    const addButtonClick = () => {
        if (taskValue === '') {
            setError('You must provide a name.')
            return;
        }
        
        addTaskFromString(taskValue);
        setError('')
        setTaskValue('')
    }

    const callbackDeleteTask = (id: number) => {
        const list = new Array<Task>();
        todoItems.forEach(task => {
            if (task.id === id) {
                console.log(task.id + " === " + id);
                
                console.log('removed');
                
                return;
            }
            console.log('pushed');
            
            list.push(task);
        })
        setTodoItems(list)
    }

    return (
        <div className='h-64 bg-white justify-center flex align-middle '>
            <div className='h-9 m-auto'>
                <h1 className='text-6xl'>
                    Your Todo
                </h1>
                <p className="ms-auto text-center">
                    Tasks: {todoItems.length}
                </p>
                <p className="bg-red-500 text-white text-center m-2">{error}</p>
                <div className="todo-spacer">
                    <input className='h-[30px] bg-gray-500 text-white pl-2 mr-3 border-gray-100 border-solid placeholder-gray-300' placeholder='task' onChange={e => updateInput(e)} value={taskValue}></input>
                    <button className='bg-green-500 w-[50px] h-[30px] text-white hover:bg-green-400' onClick={addButtonClick}>Add</button>
                </div>
                <div className="flex-col" style={{marginTop: "10px"}}>
                    {todoItems.map(task => <TodoTask task={task} callback={callbackDeleteTask}/>)}
                </div>
            </div>
        </div> 
    )
}