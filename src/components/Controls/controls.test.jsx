import { screen, render } from '@testing-library/react';
import Controls from './Controls';
describe('main body', () => {
  it('should render two arrows', () => {
    render(<Controls />);
    const arrowUp = screen.getByTestId('arrowUp');
    const arrowDown = screen.getByTestId('arrowDown');
    expect(arrowUp).toBeInTheDocument();
    expect(arrowDown).toBeInTheDocument();
  });
});
