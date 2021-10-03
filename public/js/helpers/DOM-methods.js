"use strict";
const removeClass = (classListInteraction) => {
    classListInteraction.element.classList.remove(classListInteraction.class);
};
const changeClass = (btn, classSelector, add) => {
    add
        ? addClass({ element: btn, class: classSelector })
        : removeClass({ element: btn, class: classSelector });
};
const addClass = (classListInteraction) => {
    classListInteraction.element.classList.add(classListInteraction.class);
};
const setTextContent = (element, textContent) => {
    element.textContent = textContent;
};
const setVisibility = (element, visible) => {
    element.style.visibility = visible ? 'visible' : 'hidden';
};
const setValue = (element, value) => {
    element.value = value;
};
const setInnerHTML = (element, value) => {
    element.innerHTML = value;
};
const setDisplay = (element, displayType) => {
    element.style.display = displayType;
};
