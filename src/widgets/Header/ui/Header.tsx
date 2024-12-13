'use client';
import {
	AppBar,
	Box,
	Button,
	Drawer,
	IconButton,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { blueGrey, grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

// -------- НЕОБХОДИМО РАЗБИТЬ НА БОЛЕЕ МЕЛКИЕ СЛОИ -------- //

export const Header = () => {
	const logoColor = blueGrey[200];
	const navLinksColor = grey[200];

	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

	return (
		<AppBar position="static">
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Stack direction="row" spacing={1} alignItems="center" color={logoColor}>
					<ContentPasteOutlinedIcon />
					<Typography variant="h6">ToDo App</Typography>
				</Stack>
				<Drawer
					open={isDrawerOpen}
					onClose={() => setIsDrawerOpen(false)}
					anchor="right"
					sx={{
						width: 240,
						'& .MuiDrawer-paper': { width: 240 },
					}}
				>
					<Stack direction="column" spacing={2}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<IconButton
								aria-label="close"
								onClick={() => setIsDrawerOpen(false)}
								sx={{ mr: 2, mt: 2 }}
							>
								<CloseIcon fontSize="large" />
							</IconButton>
						</Box>
						<Stack direction="column" alignItems="center" spacing={2}>
							<Button href="/" sx={{ color: navLinksColor }} size="large">
								My tasks
							</Button>
							<Button
								href="/new-task"
								variant="outlined"
								color="success"
								endIcon={<AddIcon />}
								size="large"
							>
								Create task
							</Button>
						</Stack>
					</Stack>
				</Drawer>
				<IconButton
					onClick={() => setIsDrawerOpen(true)}
					sx={{ color: logoColor, display: { xs: 'block', sm: 'none' } }}
				>
					<MenuIcon fontSize="large" />
				</IconButton>
				<Stack
					direction="row"
					spacing={2}
					sx={{ display: { xs: 'none', sm: 'block' } }}
				>
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
