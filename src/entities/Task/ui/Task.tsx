import { ITodoTask } from '@/src/shared/model';
import {
	Card,
	CardActions,
	CardContent,
	Chip,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/app/store';
import { deleteTask, updateTask } from '@/src/widgets/TasksList';

export const Task = ({ userId, id, title, content, completed }: ITodoTask) => {
	const dispatch = useDispatch<AppDispatch>();

	const statusChangeHandler = () => {
		dispatch(updateTask({ userId, id, title, content, completed: !completed }));
	};

	const deleteTaskHandler = () => {
		dispatch(deleteTask(id));
	};

	return (
		<Card variant="outlined">
			<CardContent>
				<Stack spacing={1} alignItems={'flex-start'}>
					<Typography variant="body2" color="textSecondary">
						#{id}
					</Typography>
					<Typography variant="h5">{title}</Typography>
					<Typography variant="body2" color="textSecondary">
						{content}
					</Typography>
					<Chip
						size="small"
						label={completed ? 'completed' : 'uncompleted'}
						color={completed ? 'success' : 'warning'}
						variant="outlined"
					/>
					<Stack direction="row" spacing={0.2}>
						<PersonIcon color="disabled" fontSize="small" />
						<Typography color="textDisabled" fontSize="small">
							{userId}
						</Typography>
					</Stack>
				</Stack>
			</CardContent>
			<CardActions>
				{completed ? (
					<IconButton
						onClick={statusChangeHandler}
						aria-label="uncomplete"
						color="secondary"
					>
						<RemoveDoneIcon />
					</IconButton>
				) : (
					<IconButton
						onClick={statusChangeHandler}
						aria-label="complete"
						color="primary"
					>
						<DoneAllIcon />
					</IconButton>
				)}
				<IconButton
					onClick={deleteTaskHandler}
					aria-label="delete"
					sx={{
						color: '#983030',
						'&:hover': { backgroundColor: 'rgb(255 99 99 / 8%)' },
					}}
				>
					<DeleteOutlineIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};
