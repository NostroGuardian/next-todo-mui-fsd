import axios from 'axios';
import { ITodoTask } from '../../model';

// const baseUrl = 'https://jsonplaceholder.typicode.com/todos';
const baseUrl = 'https://retoolapi.dev/jAsG7g/data';

export const getTodoTasks = (): Promise<ITodoTask[]> => {
	return axios.get<ITodoTask[]>(baseUrl).then((res) => res.data);
};

export const updateTodoTask = (task: ITodoTask): Promise<ITodoTask> => {
	return axios.put<ITodoTask>(`${baseUrl}/${task.id}`, task).then((res) => res.data);
};
