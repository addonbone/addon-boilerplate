export const isScrollable = (element: HTMLElement): boolean => {
    const hasScrollableContent = element.scrollHeight > element.clientHeight;

    const overflowYStyle = window.getComputedStyle(element).overflowY;
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;

    return hasScrollableContent && !isOverflowHidden;
};

export const getScrollableParent = (element: HTMLElement): HTMLElement => {
    return !element || element === document.body
        ? document.body
        : isScrollable(element)
            ? element
            : getScrollableParent(element.parentNode as HTMLElement);
};
