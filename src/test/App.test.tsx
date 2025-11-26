import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react'
import App from '../App';

vi.mock('../components/Gallery/Gallery', () => ({
  default: vi.fn(()=><div>Gallery</div>)
}))

vi.mock('../components/DragAndDropImagesManager/DragAndDropImagesManager', () => ({
  default: vi.fn(({children})=> <div>DragAndDropImagesManager
    { children }
  </div>)
}))


describe('App', () => {
  it('renders app component with DragAndDropImagesManager and Gallery as children', () => {
    render(<App />);

    const dragElement = screen.getByText('DragAndDropImagesManager')

    expect(dragElement).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(dragElement.parentElement?.tagName).toBe('MAIN');
  });

  it('renders a header with image logo and h1 title', () => {
    render(<App />);

    const h1 = screen.getByRole('heading', { level: 1 });
    const img = screen.getByRole('img');

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe('Image Gallery');
    expect(h1.className).toBe('bold');
    expect(h1.getAttribute('tabindex')).toBe('0');

    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('app__logoTitle');
    expect(img).toHaveAttribute('alt', 'Image Gallery icon');
    expect(img).toHaveAttribute('aria-label', 'Image icon for the gallery');
    expect(img).toHaveAttribute('tabindex', '0');
  });

  it ('renders a footer with the ITAcademy reference to sprint 5', () => {
    render(<App />);

    const footer = screen.getByRole('contentinfo');

    expect(footer).toBeInTheDocument();
    expect(footer.textContent).toBe('ITAcademy - Sprint 5');
    expect(footer).toHaveClass('flex', 'justify-center', 'items-center', 'm-10');
  })
});