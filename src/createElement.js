export default function createElement(tagName, extraAttributes = {}) {
    const elem = document.createElement(tagName);

    Object.entries(extraAttributes).forEach(([name, value]) => {
        elem.setAttribute(name, value);
    });

    return elem;
}
