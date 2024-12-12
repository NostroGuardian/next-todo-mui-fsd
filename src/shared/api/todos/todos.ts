import axios from 'axios';
import { ITodoTask } from '../../model';

const baseUrl = 'https://jsonplaceholder.typicode.com/todos/';

export const getTodoTasks = (): Promise<ITodoTask[]> => {
	return axios.get<ITodoTask[]>(baseUrl).then((res) => res.data);
};
