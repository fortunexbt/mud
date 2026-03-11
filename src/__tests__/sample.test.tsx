import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Sample Test', () => {
  it('should pass', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
