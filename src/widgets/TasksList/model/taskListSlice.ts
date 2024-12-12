import { getTodoTasks, updateTodoTask } from '@/src/shared/api';
import { ITodoTask } from '@/src/shared/model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface ITaskListState {
	taskList: ITodoTask[];
	isLoading: boolean;
	taskUpdateLoading: boolean;
	taskListError?: string;
}

const initialState: ITaskListState = {
	taskList: [],
	isLoading: false,
	taskUpdateLoading: false,
};

export const getTaskList = createAsyncThunk<ITodoTask[] | undefined>(
	'taskList/getTaskList',
	async () => {
		try {
			const data = await getTodoTasks();
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const updateTask = createAsyncThunk<ITodoTask | undefined, ITodoTask>(
	'taskList/updateTask',
	async (task: ITodoTask) => {
		try {
			const data = await updateTodoTask(task);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const taskListSlice = createSlice({
	name: 'taskList',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTaskList.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getTaskList.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.taskList = action.payload;
			state.isLoading = false;
		});
		builder.addCase(getTaskList.rejected, (state, action) => {
			state.isLoading = false;
			state.taskListError = action.error.message;
		});
		builder.addCase(updateTask.pending, (state) => {
			state.taskUpdateLoading = true;
		});
		builder.addCase(updateTask.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.taskList = state.taskList.map((task) => {
				if (task.id === action.payload?.id) {
					return { ...task, completed: !task.completed };
				} else {
					return task;
				}
			});
			state.taskUpdateLoading = false;
		});
		builder.addCase(updateTask.rejected, (state) => {
			state.taskUpdateLoading = false;
		});
	},
});

export default taskListSlice.reducer;
export const taskListActions = taskListSlice.actions;
