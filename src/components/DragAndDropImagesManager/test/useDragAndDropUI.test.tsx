
import * as React from 'react';
import { DRAGGING_CLASS, DRAGOVER_CLASS } from '../DragAndDropImagesManager.d';
import { describe, it, expect } from 'vitest';
import { renderHook, render, screen } from '@testing-library/react';
import useDragAndDropUI from '../hooks/useDragAndDropUI';

describe('useDragAndDropUI', () => {
  it('sets DRAGGING_CLASS to the origin element id when DRAG START operation starts', () => {
    const { result } = renderHook(() => useDragAndDropUI());
    const onDragStart = result.current[0];

    render(<div data-testid="draggableElement" data-image="10"></div>);
    const element = screen.getByTestId("draggableElement") as HTMLDivElement;
    const dragEvent = { target: element } as unknown as React.DragEvent<HTMLDivElement>;

    onDragStart(dragEvent);

    expect(element.classList.contains(DRAGGING_CLASS)).toBeTruthy();
  });

  it('sets DRAGOVER_CLASS to the over element id when DRAG OVER operation', () => {
    const { result } = renderHook(() => useDragAndDropUI());
    const onDragOver = result.current[2];

    render(<div data-testid="draggableElement" data-image="10"></div>);
    const element = screen.getByTestId("draggableElement") as HTMLDivElement;
    const dragEvent = { target: element } as unknown as React.DragEvent<HTMLDivElement>;

    onDragOver(dragEvent);

    expect(element.classList.contains(DRAGOVER_CLASS)).toBeTruthy();
  });

  it('remove DRAGOVER_CLASS and DRAGGING_CLASS to the over element id when DRAG END operation', () => {
    const { result } = renderHook(() => useDragAndDropUI());
    const onDragEnd = result.current[1];

    render(<div className={`${DRAGGING_CLASS} ${DRAGOVER_CLASS}`} data-testid="draggableElement" data-image="10"></div>);
    const element = screen.getByTestId("draggableElement") as HTMLDivElement;
    const dragEvent = { target: element } as unknown as React.DragEvent<HTMLDivElement>;

    onDragEnd(dragEvent);

    expect(element.classList.contains(DRAGOVER_CLASS)).toBeFalsy();
    expect(element.classList.contains(DRAGGING_CLASS)).toBeFalsy();
  });

  it('remove DRAGOVER_CLASS to the over element id when DRAG LEAVE operation', () => {
    const { result } = renderHook(() => useDragAndDropUI());
    const onDragLeave = result.current[3];

    render(<div className={`${DRAGOVER_CLASS}`} data-testid="draggableElement" data-image="10"></div>);
    const element = screen.getByTestId("draggableElement") as HTMLDivElement;
    const dragEvent = { target: element } as unknown as React.DragEvent<HTMLDivElement>;

    onDragLeave(dragEvent);

    expect(element.classList.contains(DRAGOVER_CLASS)).toBeFalsy();
  });

  it('remove DRAGOVER_CLASS to the over element id when DRAG END operation', () => {
    const { result } = renderHook(() => useDragAndDropUI());
    const onDrop = result.current[4];

    render(<div className={`${DRAGOVER_CLASS}`} data-testid="draggableElement" data-image="10"></div>);
    const element = screen.getByTestId("draggableElement") as HTMLDivElement;
    const dragEvent = { target: element } as unknown as React.DragEvent<HTMLDivElement>;

    onDrop(dragEvent);

    expect(element.classList.contains(DRAGOVER_CLASS)).toBeFalsy();
  });
});