import { render, screen } from '@testing-library/react';
import Md5Form from '../components/Md5Form';
import userEvent from '@testing-library/user-event';
import * as md5Provider from '../providers/md5Provider'


describe('Md5Form', () => {
    test('render the Md5Form form', () => {

        const { container } = render(<Md5Form />)

        const textInput = screen.getByRole('textbox');
        expect(textInput).toBeInTheDocument();

        const submitButton = screen.getByRole('button', { name: 'send' });
        expect(submitButton).toBeInTheDocument();

        const dataText = container.querySelector('.data-text');
        expect(dataText).toBeInTheDocument();
    })

    test('show text in span', () => {

        const { container } = render(<Md5Form />)

        const textInput = screen.getByRole('textbox');
        expect(textInput).toBeInTheDocument();

        const submitButton = screen.getByRole('button', { name: 'send' });
        expect(submitButton).toBeInTheDocument();

        const dataText = container.querySelector('.data-text');
        expect(dataText).toBeInTheDocument();

        userEvent.type(textInput, "test");
        expect(dataText).toHaveTextContent('test');
    })

    test('displays the MD5 hash after the form has been submitted', async () => {
        jest.spyOn(md5Provider, 'getMd5')
        md5Provider.getMd5.mockResolvedValue('fake-md5')

        const { container } = render(
            <Md5Form getMd5={md5Provider.getMd5} />
        )
        const textInput = screen.getByRole('textbox');
        expect(textInput).toBeInTheDocument();
        userEvent.type(textInput, "test");

        const submitButton = screen.getByRole('button', { name: 'send' });
        userEvent.click(submitButton);
        expect(await screen.findByText('fake-md5')).toBeInTheDocument();

        expect(container.querySelector('.data-md5')).toHaveTextContent('fake-md5');
    })
    test('clears the MD5 result when input changes', async () => {
        jest.spyOn(md5Provider, 'getMd5')
        md5Provider.getMd5.mockResolvedValue('fake-md5')

        const { container } = render(
            <Md5Form getMd5={md5Provider.getMd5} />
        )
        const textInput = screen.getByRole('textbox');
        expect(textInput).toBeInTheDocument();
        userEvent.type(textInput, "test");
        const submitButton = screen.getByRole('button', { name: 'send' });
        userEvent.click(submitButton);
        expect(await screen.findByText('fake-md5')).toBeInTheDocument();
        userEvent.type(textInput, "test2");
        expect(container.querySelector('.data-md5')).toBeEmptyDOMElement();

    })
})


