import { render, screen } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import userEvent from '@testing-library/user-event';
import CatchError from '../components/CatchError'

describe('LoginForm', () => {
    test('render the login form', () => {
        render(<LoginForm />)

        const loginInput = screen.getByLabelText(/login/i);
        expect(loginInput).toBeInTheDocument();

        const passwordInput = screen.getByLabelText(/password/i);
        expect(passwordInput).toBeInTheDocument();

        const submitButton = screen.getByRole('button', { name: 'send' });
        expect(submitButton).toBeInTheDocument();
    })

    test('shows an error when login is too short', () => {
        render(<LoginForm />)

        const loginInput = screen.getByLabelText(/login/i)
        expect(loginInput).toBeInTheDocument()
        userEvent.type(loginInput, 'abc');

        const errorMessage = screen.getByText('The field is too short!');
        expect(errorMessage).toBeInTheDocument();

    });

    test('clears the error when login becomes valid', () => {
        render(<LoginForm />)

        const loginInput = screen.getByLabelText(/login/i)
        userEvent.type(loginInput, 'abc');

        expect(screen.getByText('The field is too short!')).toBeInTheDocument();
        userEvent.type(loginInput, 'd');

        expect(screen.queryByText('The field is too short!')).not.toBeInTheDocument();
    });

    test('clears the error when password becomes valid', () => {
        render(<LoginForm />)

        const passwordInput = screen.getByLabelText(/password/i)
        userEvent.type(passwordInput, 'abc');

        expect(screen.getByText('The field is too short!')).toBeInTheDocument();
        userEvent.type(passwordInput, 'd');

        expect(screen.queryByText('The field is too short!')).not.toBeInTheDocument();
    });

    test('calls tryAuth with the entered credentials', () => {
        const mockFn = jest.fn()
        mockFn.mockReturnValue(true);
        render(<LoginForm tryAuth={mockFn} />)

        const loginInput = screen.getByLabelText(/login/i)
        userEvent.type(loginInput, 'anna');

        const passwordInput = screen.getByLabelText(/password/i)
        userEvent.type(passwordInput, 'secret');

        const submitButton = screen.getByRole('button', { name: 'send' })
        userEvent.click(submitButton)

        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith('anna', 'secret')
    });

    test('shows an error when authentication fails', async () => {
        const mockFn = jest.fn()
        mockFn.mockReturnValue(false);
        render(
            <CatchError>
                <LoginForm tryAuth={mockFn} />
            </CatchError>
        )

        const loginInput = screen.getByLabelText(/login/i)
        userEvent.type(loginInput, 'anna');

        const passwordInput = screen.getByLabelText(/password/i)
        userEvent.type(passwordInput, 'secret');

        const submitButton = screen.getByRole('button', { name: 'send' })
        userEvent.click(submitButton)
        
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith('anna', 'secret')
        expect(await screen.findByRole('heading', { name: 'Incorrect data!' })
        ).toBeInTheDocument();
    });

})

