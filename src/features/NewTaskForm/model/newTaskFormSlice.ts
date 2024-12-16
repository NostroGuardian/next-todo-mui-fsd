import { createTodoTask } from '@/src/shared/api';
import { ITodoTask } from '@/src/shared/model';
import { loadState } from '@/src/shared/utils/persistentStorage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface INewTaskFormState {
	isInProcess: boolean;
	isSuccessfully: boolean;
	existedTasks: [];
}

const initialState: INewTaskFormState = {
	isInProcess: false,
	isSuccessfully: false,
	existedTasks: loadState('taskListState') ?? [],
};

export const createNewTask = createAsyncThunk<ITodoTask | undefined, ITodoTask>(
	'newTaskForm/createNewTask',
	async (task: ITodoTask) => {
		try {
			const data = await createTodoTask(task);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const newTaskFormSlice = createSlice({
	name: 'newTaskForm',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createNewTask.pending, (state) => {
			state.isInProcess = true;
		});
		builder.addCase(createNewTask.fulfilled, (state) => {
			state.isInProcess = false;
			state.isSuccessfully = true;
		});
		builder.addCase(createNewTask.rejected, (state) => {
			state.isInProcess = false;
		});
	},
});

export default newTaskFormSlice.reducer;
export const newTaskFormActions = newTaskFormSlice.actions;
