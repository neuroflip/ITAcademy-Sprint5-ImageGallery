import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import React from 'react'

vi.mock('@/components/ui/button', () => {
  const mockButton = vi.fn((props: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) => <button data-testid="mock-button" {...props} />)
  return { Button: mockButton }
})

import CustomButton from '../CustomButton'
import * as ButtonModule from '@/components/ui/button'

describe('ImageButton', () => {
  it('renders text, className and forwards size. It includes the variant attribute too.', () => {
    render(<CustomButton text="Delete" className="custom-class" size="icon-sm" onClick={() => {}} />)

    const btn = screen.getByTestId('mock-button') as HTMLButtonElement;
    const mockButton = (ButtonModule as unknown as { Button: ReturnType<typeof vi.fn> }).Button;
    const calledWith = mockButton.mock.calls[0][0]

    expect(btn).toBeTruthy();
    expect(btn.className).toContain('custom-class');
    expect(mockButton).toHaveBeenCalled();
    expect(calledWith).toEqual(expect.objectContaining({ variant: 'outline', size: 'icon-sm', className: expect.stringContaining('custom-class'), children: 'Delete' }));
    expect(btn.textContent).toBe('Delete');
  })

  it('calls onClick when clicked', () => {
    const handle = vi.fn()
    render(<CustomButton text="Click" onClick={handle} />)

    const btn = screen.getByTestId('mock-button')
    fireEvent.click(btn)
    expect(handle).toHaveBeenCalledTimes(1)
  })
})
