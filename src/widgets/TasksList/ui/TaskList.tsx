'use client';
import { MouseEvent, useEffect, useState } from 'react';
import { Task } from '@/src/entities/Task';
import { TaskFilter, TaskFilterOptions } from '@/src/features/TaskFilter';
import { CircularProgress, Grid2, Stack } from '@mui/material';
import { getTodoTasks } from '@/src/shared/api';
import { ITodoTask } from '@/src/shared/model';

export const TaskList = () => {
	const [selectedStatus, setSelectedStatus] = useState<TaskFilterOptions>('all');
	const [tasks, setTasks] = useState<ITodoTask[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const statusChangeHandler = (e: MouseEvent<HTMLElement>, newValue: TaskFilterOptions) =>
		setSelectedStatus(newValue);

	const filteredTasks = tasks.filter((task) => {
		if (selectedStatus === 'completed') {
			return task.completed;
		} else if (selectedStatus === 'uncompleted') {
			return !task.completed;
		} else {
			return true;
		}
	});

	useEffect(() => {
		const getTasks = async () => {
			setIsLoading(true);
			const res = await getTodoTasks();
			setTasks(res);
			setIsLoading(false);
		};
		getTasks();
	}, []);

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
