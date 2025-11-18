import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react'
import { Gallery } from '../components/Gallery/Gallery';
import App from '../App';

vi.mock('../components/Gallery/Gallery', () => ({
  default: vi.fn(()=>`<div></div>`)
}))

describe('App', () => {
  it('renders app component', () => {
    render(<App />);

    expect(true).toBeTruthy();
  });
});