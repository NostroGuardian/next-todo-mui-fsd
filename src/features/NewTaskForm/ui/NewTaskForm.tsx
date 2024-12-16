'use client';
import { LoadingButton } from '@mui/lab';
import {
	Alert,
	Box,
	Button,
	Collapse,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/app/store';
import { createNewTask } from '../model/newTaskFormSlice';
import { ITodoTask } from '@/src/shared/model';
import { Controller, useForm } from 'react-hook-form';
import { IFormValues } from '../model/formValues';

export const NewTaskForm = () => {
	const { isInProcess, isSuccessfully } = useSelector((s: RootState) => s.newTaskForm);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IFormValues>({
		defaultValues: {
			title: '',
			content: '',
			userId: 1,
		},
	});

	const existedTasks: ITodoTask[] = useSelector(
		(s: RootState) => s.newTaskForm.existedTasks
	);

	const maxTaskId = existedTasks.reduce((max, task) => {
		return task.id > max ? task.id : max;
	}, 0);

	const dispatch = useDispatch<AppDispatch>();

	const createTaskHandler = (data: IFormValues) => {
		const newTaskData: ITodoTask = {
			userId: Number(data.userId),
			id: maxTaskId + 1,
			title: data.title,
			content: data.content,
			completed: false,
		};
		dispatch(createNewTask(newTaskData));
		reset();
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(createTaskHandler)}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				alignItems: 'center',
			}}
		>
			<Controller
				name="title"
				control={control}
				rules={{
					required: 'Title is required',
				}}
				render={({ field }) => (
					<TextField
						{...field}
						autoComplete="off"
						variant="outlined"
						label="Title"
						color="success"
						sx={{ width: 250 }}
						error={!!errors.title}
						helperText={errors.title ? errors.title.message : ''}
					/>
				)}
			/>

			<Controller
				name="content"
				control={control}
				rules={{ required: 'Content is required' }}
				render={({ field }) => (
					<TextField
						{...field}
						autoComplete="off"
						variant="outlined"
						label="Content"
						color="success"
						sx={{ width: 250 }}
						error={!!errors.content}
						helperText={errors.content ? errors.content.message : ''}
					/>
				)}
			/>

			<FormControl sx={{ width: 250 }}>
				<InputLabel id="user-label" color="success">
					User
				</InputLabel>
				<Controller
					name="userId"
					control={control}
					defaultValue={1}
					render={({ field }) => (
						<Select {...field} labelId="user-label" color="success" label="User">
							<MenuItem value={1}>User 1</MenuItem>
							<MenuItem value={2}>User 2</MenuItem>
							<MenuItem value={3}>User 3</MenuItem>
						</Select>
					)}
				/>
			</FormControl>
			<LoadingButton
				type="submit"
				loading={isInProcess}
				variant="outlined"
				color="success"
				size="large"
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
		</Box>
	);
};
