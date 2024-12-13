import { Stack, Typography } from '@mui/material';

export const NewTask = () => {
	return (
		<Stack spacing={2} alignItems="center" padding={2}>
			<Typography variant="h4" color="textSecondary">
				Create new task
			</Typography>
		</Stack>
	);
};
