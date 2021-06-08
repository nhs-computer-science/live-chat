interface ClassListInteraction {
  element: Element;
  class: string;
}

const removeClass = (classListInteraction: ClassListInteraction): void => {
  classListInteraction.element.classList.remove(classListInteraction.class);
};

const changeClass = (
  btn: Element,
  classSelector: string,
  add: boolean
): void => {
  add
    ? addClass({ element: btn, class: classSelector })
    : removeClass({ element: btn, class: classSelector });
};

const addClass = (classListInteraction: ClassListInteraction): void => {
  classListInteraction.element.classList.add(classListInteraction.class);
};

const setTextContent = (element: Element, textContent: string): void => {
  element.textContent = textContent;
};

const setVisibility = (element: HTMLElement, visible: boolean): void => {
  element.style.visibility = visible ? 'visible' : 'hidden';
};

const setValue = (element: HTMLElement, value: string): void => {
  element.value = value;
};

const setInnerHTML = (element: HTMLElement, value: string): void => {
  element.innerHTML = value;
};

const setDisplay = (element: HTMLElement, displayType: string): void => {
  element.style.display = displayType;
};
