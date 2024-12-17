import { Home } from '@/src/pages/Home';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Home page', () => {
	it('rendering a heading', () => {
		render(<Home />);
		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toBeInTheDocument();
	});
});
