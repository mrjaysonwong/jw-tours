import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';

describe('FormSubmitButton', () => {
  // Mock the handleSubmit function
  const handleSubmitMock = jest.fn();

  it('renders the button with label when not submitting', () => {
    render(
      <FormSubmitButton
        label="Submit"
        action="auth"
        handleSubmit={handleSubmitMock}
        isSubmitting={false}
        captcha={false}
      />
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Submit');
    expect(button).toBeEnabled();
  });

  // it('renders CircularProgress when submitting', () => {
  //   render(<FormSubmitButton label="Submit" action="auth" handleSubmit={handleSubmitMock} isSubmitting={true} captcha={false} />);

  //   const circularProgress = screen.getByRole('progressbar');
  //   expect(circularProgress).toBeInTheDocument();
  // });

  // it('calls handleSubmit when clicked', () => {
  //   render(<FormSubmitButton label="Submit" action="auth" handleSubmit={handleSubmitMock} isSubmitting={false} captcha={false} />);

  //   const button = screen.getByRole('button');
  //   fireEvent.click(button);

  //   expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  // });

  // it('disables button if submitting or captcha is true', () => {
  //   render(<FormSubmitButton label="Submit" action="auth" handleSubmit={handleSubmitMock} isSubmitting={true} captcha={false} />);

  //   const button = screen.getByRole('button');
  //   expect(button).toBeDisabled();
  // });

  // it('renders button without action prop', () => {
  //   render(<FormSubmitButton label="Submit" handleSubmit={handleSubmitMock} isSubmitting={false} captcha={false} />);

  //   const button = screen.getByRole('button');
  //   expect(button).toHaveTextContent('Submit');
  // });
});
