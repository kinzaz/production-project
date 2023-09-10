import { componentRender } from '@/shared/config/tests/componentRender/componentRender';
import { Counter } from './Counter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const options = {
    initialState: {
        counter: {
            value: 10,
        },
    },
};

describe('Counter', () => {
    test('test render', () => {
        componentRender(<Counter />, options);
        expect(screen.getByTestId('value-title')).toHaveTextContent('10');
    });

    test('increment', async () => {
        componentRender(<Counter />, options);
        await userEvent.click(screen.getByTestId('increment-btn'));

        expect(screen.getByTestId('value-title')).toHaveTextContent('11');
    });

    test('decrement', async () => {
        componentRender(<Counter />, options);
        await userEvent.click(screen.getByTestId('decrement-btn'));
        expect(screen.getByTestId('value-title')).toHaveTextContent('9');
    });
});
