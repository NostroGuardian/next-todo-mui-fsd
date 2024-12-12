import { configureStore } from '@reduxjs/toolkit';
import { taskListSlice } from '../widgets/TasksList';

export const store = configureStore({
	reducer: {
		taskList: taskListSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
