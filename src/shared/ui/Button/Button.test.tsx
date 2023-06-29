import { render, screen, fireEvent } from '@testing-library/react';
import { Button, ButtonTheme } from './Button';

describe('Button component', () => {
  test('Button правильно рендерится со значениями по умолчанию', () => {
    // eslint-disable-next-line
    render(<Button>Hello</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Hello');
  });

  test('Button корректно применяет тему', () => {
    // eslint-disable-next-line
    render(<Button theme={ButtonTheme.CLEAR}>Clear Button</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('clear');
    screen.debug();
  });

  test('Button колбэк onClick вызывается при клике', () => {
    const onClickMock = jest.fn();
    // eslint-disable-next-line
    render(<Button onClick={onClickMock}>Click Me</Button>);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
