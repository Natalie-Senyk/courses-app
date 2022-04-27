import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Header from '../Header';

jest.mock('../../Logo/Logo', () => () => <div data-testid='logo' />);

jest.mock('../../../customHooks/useAuth', () => {
	return {
		useAuth: () => {
			return {
				handleLogout: jest.fn(),
			};
		},
	};
});

const MockedHeaderComponent = () => {
	return (
		<BrowserRouter>
			<Header />
		</BrowserRouter>
	);
};

describe('Header component', () => {
	test('Header has visible logout btn and user`s name if user is logged in', () => {
		localStorage.setItem('token', 'test token');
		localStorage.setItem('name', 'Natalie');
		render(<MockedHeaderComponent />);
		expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
		expect(screen.getByText('Natalie')).toBeInTheDocument();
	});
	test('header has logo component visible', () => {
		render(<MockedHeaderComponent />);
		expect(screen.getByTestId('logo')).toBeVisible();
	});
	test('header doesn`t display name after user clicks Logout btn', async () => {
		render(<MockedHeaderComponent />);
		localStorage.clear();
		const logoutBtn = screen.getByRole('button', { name: 'Logout' });
		userEvent.click(logoutBtn);
		waitFor(() => {
			expect(screen.queryByText('Natalie')).toBeNull();
			expect(screen.queryByText('Logout')).toBeNull();
		});
	});
});
