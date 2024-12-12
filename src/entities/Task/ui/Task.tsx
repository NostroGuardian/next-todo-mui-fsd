import { ITodoTask } from '@/src/shared/model';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export const Task = ({ userId, id, title, completed }: ITodoTask) => {
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
		</Card>
	);
};
