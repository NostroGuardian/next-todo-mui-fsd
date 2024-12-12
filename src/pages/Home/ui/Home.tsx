import { TaskList } from '@/src/widgets/TasksList';
import { Stack, Typography } from '@mui/material';

export const Home = () => {
	return (
		<>
			<Stack spacing={2} alignItems="center" padding={2}>
				<Typography variant="h4" color="textSecondary">
					Home page
				</Typography>
				<TaskList />
			</Stack>
		</>
	);
};
