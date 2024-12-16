import { configureStore } from '@reduxjs/toolkit';

import { newTaskFormSlice } from '../features/NewTaskForm';
import { saveState } from '../shared/utils/persistentStorage';
import { taskListSlice } from '../widgets/TasksList';

export const store = configureStore({
	reducer: {
		taskList: taskListSlice.reducer,
		newTaskForm: newTaskFormSlice.reducer,
	},
});

store.subscribe(() => {
	saveState(store.getState().taskList.taskList, 'taskListState');
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
