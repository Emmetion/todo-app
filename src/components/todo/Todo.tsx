import { ChangeEvent, useEffect, useRef, useState } from "react"
import TodoTask from "./todo-task/TodoTask";
import { Task } from "./Task";
import { FaPlus } from "react-icons/fa";

export default function Todo() {
    const ref = useRef(false);
    const [taskValue, setTaskValue] = useState<string>('');
    const [error, setError] = useState<string>('')
    const [todoItems, setTodoItems] = useState<Task[]>(new Array<Task>) ;
    // const [completedItems, setCompletedItems] = useState<Task[]>(new Array<Task>);

    // const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const [id, setId] = useState<number>(0);

    const addTaskFromString = (name: string) => {
        let timestamp = new Date().toLocaleString().replace(',', '');
        setId(id + 1);
        setTodoItems([...todoItems, {id, name, timestamp, complete: false}]);
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
                
                return;
            }
            list.push(task);
        })
        setTodoItems(list)
    }

    const callbackCompleteTask = (id: number) => {
        const list = new Array<Task>();
        todoItems.forEach(task => {
            if (task.id === id) {
                return;
            }
            list.push(task);
        })
        setTodoItems(list);
        // Now remove 
    }

    // App startup.
    useEffect(() => {
        if (!ref.current) {
            const items = localStorage.getItem('todoItems');
            if (items !== null) {
                setTodoItems(JSON.parse(items));
                let nextId = 0;
                todoItems.forEach(item => {
                    if (item.id > nextId) nextId = item.id;
                })
                setId(nextId); // Finds the next Id from the provided list of todoItems.
            }
            ref.current = true;
        }
    }, []);

    // When new item exists
    useEffect(() => {
        localStorage.setItem('todoItems', JSON.stringify(todoItems))
    }, [todoItems]);

    return (
        <div className='h-64 bg-white justify-center flex align-middle group-[tasklist]'>
            <div className='h-9 m-auto'>
                <h1 className='text-6xl'>
                    Your Todo
                </h1>
                <p className="ms-auto text-center">
                    Tasks: {todoItems.length}
                </p>
                <p className="bg-red-500 text-white text-center m-2 rounded-md font-medium">{error}</p>
                <div className="flex-row flex">
                    <input className='h-[30px] bg-gray-500 text-white pl-2 mr-3 border-gray-100 border-solid placeholder-gray-300 rounded-md' 
                    placeholder='task' 
                    onChange={e => updateInput(e)} 
                    value={taskValue}/>
                    <button className='w-[60px] h-[30px] text-white bg-green-500 hover:bg-green-400 hover:border-green-400 flex flex-row justify-center align-middle items-center border-4 rounded-lg border-green-500 duration-200 transition-colors' onClick={addButtonClick}><FaPlus style={{marginRight: "3px"}}/><b>Add</b></button>
                </div>
                <div className="flex-col" style={{marginTop: "10px"}}>
                    {todoItems.map(task => <TodoTask key={task.id} task={task} callbackDelete={callbackDeleteTask} callbackComplete={callbackCompleteTask}/>)}
                </div>
            </div>
        </div> 
    )
}