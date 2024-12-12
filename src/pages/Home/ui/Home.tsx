'use client';
import { store } from '@/src/app/store';
import { TaskList } from '@/src/widgets/TasksList';
import { Stack, Typography } from '@mui/material';
import { Provider } from 'react-redux';

export const Home = () => {
	return (
		<Provider store={store}>
			<Stack spacing={2} alignItems="center" padding={2}>
				<Typography variant="h4" color="textSecondary">
					Home page
				</Typography>
				<TaskList />
			</Stack>
		</Provider>
	);
};
