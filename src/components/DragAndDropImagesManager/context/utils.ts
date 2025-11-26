const dummyDragHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
}

const dummyDragElement = (event: React.DragEvent<HTMLDivElement>) => {
    (event.target as HTMLElement).classList.add('');
}

const dummyIdOperation = (id: number) => {
    const element = document.getElementById(String(id));

    element?.classList.add('');
}

const dummyIdsOperation = (id1: number, id2: number) => {
    const element1 = document.getElementById(String(id1));
    const element2 = document.getElementById(String(id2));

    element1?.classList.add('');
    element2?.classList.add('');
}

export { dummyDragElement, dummyIdOperation, dummyDragHandler, dummyIdsOperation };
