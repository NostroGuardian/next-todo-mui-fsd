import { MouseEvent } from 'react';

export type TaskFilterOptions = 'all' | 'completed' | 'uncompleted';

export interface ITaskFilterProps {
	selectedStatus: TaskFilterOptions;
	statusChangeHandler: (e: MouseEvent<HTMLElement>, newValue: TaskFilterOptions) => void;
}
