import { screen, render } from '@testing-library/react';
import Building from './Building';
describe('main body', () => {
  it('should render two arrows', () => {
    render(<Building />);
    const arrowUp = screen.getByTestId('arrowUp');
    const arrowDown = screen.getByTestId('arrowDown');
    expect(arrowUp).toBeInTheDocument();
    expect(arrowDown).toBeInTheDocument();
  });
});
