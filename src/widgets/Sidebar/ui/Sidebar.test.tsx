import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { componentRender } from '@/shared/config/tests/componentRender/componentRender';

describe('Sidebar component', () => {
    test('Test render', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('Test toggle', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('sidebar-toggle'));
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
