import { getTodoTasks } from '@/src/shared/api';
import { ITodoTask } from '@/src/shared/model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface ITaskListState {
	taskList: ITodoTask[];
	isLoading: boolean;
	taskListError?: string;
}

const initialState: ITaskListState = {
	taskList: [],
	isLoading: false,
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
	},
});

export default taskListSlice.reducer;
export const taskListActions = taskListSlice.actions;
