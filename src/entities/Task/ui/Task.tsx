import { ITodoTask } from '@/src/shared/model';
import { Card, CardActions, CardContent, IconButton, Stack, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { useState } from 'react';

export const Task = ({ userId, id, title, completed }: ITodoTask) => {
	const [completeStatus, setCompleteStatus] = useState(completed);

	const updateCompleteStatusHandler = () => {
		setCompleteStatus((state) => !state);
	};

	return (
		<Card variant="outlined">
			<CardContent>
				<Typography variant="body2" color="textSecondary">
					#{id}
				</Typography>
				<Typography variant="h5">{title}</Typography>
				<Typography color={completed ? 'success' : 'warning'}>
					{completed ? 'completed' : 'uncompleted'}
				</Typography>
				<Stack direction="row" spacing={0.2}>
					<PersonIcon color="disabled" fontSize="small" />
					<Typography color="textDisabled" fontSize="small">
						{userId}
					</Typography>
				</Stack>
			</CardContent>
			<CardActions>
				{completeStatus ? (
					<IconButton
						onClick={updateCompleteStatusHandler}
						size="small"
						aria-label="uncomplete"
						color="secondary"
					>
						<RemoveDoneIcon />
					</IconButton>
				) : (
					<IconButton
						onClick={updateCompleteStatusHandler}
						size="small"
						aria-label="complete"
						color="primary"
					>
						<DoneAllIcon />
					</IconButton>
				)}
			</CardActions>
		</Card>
	);
};
