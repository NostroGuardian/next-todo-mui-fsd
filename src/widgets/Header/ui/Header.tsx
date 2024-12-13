import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { blueGrey, grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';

export const Header = () => {
	const logoColor = blueGrey[200];
	const navLinksColor = grey[200];
	return (
		<AppBar position="static">
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Stack direction="row" spacing={1} alignItems="center" color={logoColor}>
					<ContentPasteOutlinedIcon />
					<Typography variant="h6">ToDo App</Typography>
				</Stack>
				<Stack direction="row" spacing={2}>
					<Button href="/" sx={{ color: navLinksColor }}>
						My tasks
					</Button>
					<Button
						href="/new-task"
						variant="outlined"
						color="success"
						endIcon={<AddIcon />}
					>
						Create task
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
