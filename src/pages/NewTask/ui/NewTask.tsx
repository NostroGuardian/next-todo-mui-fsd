import { Alert, Stack, Typography } from '@mui/material';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';

export const NewTask = () => {
	return (
		<Stack spacing={2} alignItems="center" padding={2}>
			<Typography variant="h4" color="textSecondary">
				Create new task
			</Typography>

			<Alert icon={<HandymanOutlinedIcon fontSize="inherit" />} severity="warning">
				This page under construction. Coming soon, Igorek!
			</Alert>
		</Stack>
	);
};
