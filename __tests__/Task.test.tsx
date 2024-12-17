import { store } from '@/src/app/store'; // Импортируем ваш store
import { Task } from '@/src/entities/Task';
import { ITodoTask } from '@/src/shared/model';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

describe('Task component', () => {
	const task: ITodoTask = {
		userId: 1,
		id: 1,
		title: 'Test Task',
		content: 'This is a test task.',
		completed: false,
	};

	it('Should change the chip text to "completed" when clicking complete button', async () => {
		render(
			<Provider store={store}>
				<Task {...task} />
			</Provider>
		);

		expect(screen.getByText(/uncompleted/i)).toBeInTheDocument();

		const completeButton = screen.getByRole('button', { name: /complete/i });
		await fireEvent.click(completeButton);

		expect(screen.getByText(/completed/i)).toBeInTheDocument();
	});
});
