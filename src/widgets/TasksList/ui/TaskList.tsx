'use client';
import { MouseEvent, useEffect, useState } from 'react';
import { Task } from '@/src/entities/Task';
import { TaskFilter, TaskFilterOptions } from '@/src/features/TaskFilter';
import { CircularProgress, Grid2, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/app/store';
import { getTaskList } from '../model/taskListSlice';

export const TaskList = () => {
	const [selectedStatus, setSelectedStatus] = useState<TaskFilterOptions>('all');

	const { isLoading, taskList } = useSelector((s: RootState) => s.taskList);

	const dispatch = useDispatch<AppDispatch>();

	const statusChangeHandler = (e: MouseEvent<HTMLElement>, newValue: TaskFilterOptions) =>
		setSelectedStatus(newValue);

	const filteredTasks = taskList.filter((task) => {
		if (selectedStatus === 'completed') {
			return task.completed;
		} else if (selectedStatus === 'uncompleted') {
			return !task.completed;
		} else {
			return true;
		}
	});

	useEffect(() => {
		dispatch(getTaskList());
	}, [dispatch]);

	return (
		<Stack spacing={2} alignItems="center">
			<TaskFilter
				selectedStatus={selectedStatus}
				statusChangeHandler={statusChangeHandler}
			/>
			{isLoading ? <CircularProgress color="success" /> : null}
			<Grid2 container spacing={2}>
				{filteredTasks.map((task) => (
					<Grid2 size={{ lg: 3, md: 3, xs: 6 }} key={task.id}>
						<Task
							userId={task.userId}
							id={task.id}
							title={task.title}
							completed={task.completed}
						/>
					</Grid2>
				))}
			</Grid2>
		</Stack>
	);
};
