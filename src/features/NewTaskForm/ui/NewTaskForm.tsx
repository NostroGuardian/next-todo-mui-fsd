'use client';
import { LoadingButton } from '@mui/lab';
import {
	Alert,
	Button,
	Collapse,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/app/store';
import { createNewTask } from '../model/newTaskFormSlice';
import { ITodoTask } from '@/src/shared/model';

export const NewTaskForm = () => {
	const [titleValue, setTitleValue] = useState<string>('');
	const [useridValue, setUseridValue] = useState<number>(1);
	const [contentValue, setContentValue] = useState<string>('');

	const { isInProcess, isSuccessfully } = useSelector((s: RootState) => s.newTaskForm);

	const existedTasks: ITodoTask[] = useSelector(
		(s: RootState) => s.newTaskForm.existedTasks
	);

	const maxTaskId = existedTasks.reduce((max, task) => {
		return task.id > max ? task.id : max;
	}, 0);

	const newTaskData: ITodoTask = {
		userId: Number(useridValue),
		id: maxTaskId + 1,
		title: titleValue,
		content: contentValue,
		completed: false,
	};

	const dispatch = useDispatch<AppDispatch>();

	const createTaskHandler = () => {
		dispatch(createNewTask(newTaskData));
		setTitleValue('');
		setContentValue('');
		setUseridValue(1);
	};

	return (
		<>
			<TextField
				value={titleValue}
				onChange={(e) => setTitleValue(e.target.value)}
				autoComplete="off"
				variant="outlined"
				id="task-title"
				label="Title"
				color="success"
				sx={{ width: 200 }}
			/>
			<TextField
				value={contentValue}
				onChange={(e) => setContentValue(e.target.value)}
				autoComplete="off"
				variant="outlined"
				id="task-content"
				label="Content"
				color="success"
				sx={{ width: 200 }}
			/>
			<FormControl sx={{ width: 200 }}>
				<InputLabel id="user-label" color="success">
					User
				</InputLabel>
				<Select
					id="user-select"
					labelId="user-label"
					value={useridValue}
					color="success"
					label="User"
					onChange={(e) => {
						setUseridValue(Number(e.target.value));
					}}
				>
					<MenuItem value={1}>User 1</MenuItem>
					<MenuItem value={2}>User 2</MenuItem>
					<MenuItem value={3}>User 3</MenuItem>
				</Select>
			</FormControl>
			<LoadingButton
				onClick={createTaskHandler}
				loading={isInProcess}
				variant="outlined"
				color="success"
			>
				Create task
			</LoadingButton>
			<Collapse in={isSuccessfully}>
				<Alert
					action={
						<Button href="/" color="inherit" size="small">
							Back to tasks
						</Button>
					}
					sx={{ mb: 2 }}
				>
					New task created successfully!
				</Alert>
			</Collapse>
		</>
	);
};
