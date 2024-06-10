export interface Task {
    id: number;
    name: string;
    timestamp: string;
    complete: boolean;
}


export interface TaskAction {
    action: 'complete' | 'delete';
}