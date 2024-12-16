import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { ITaskFilterProps } from './TaskFilter.props';

export const TaskFilter = ({ selectedStatus, statusChangeHandler }: ITaskFilterProps) => {
	return (
		<ToggleButtonGroup
			value={selectedStatus}
			color="success"
			exclusive
			aria-label="status"
			onChange={statusChangeHandler}
		>
			<ToggleButton value="all">All</ToggleButton>
			<ToggleButton value="uncompleted">Uncompleted</ToggleButton>
			<ToggleButton value="completed">Completed</ToggleButton>
		</ToggleButtonGroup>
	);
};
