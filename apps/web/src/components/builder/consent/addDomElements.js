export const ELEMENT_DATA_ATTRIBUTE = 'data-el-id';
const BODY_ELEMENTS_BY_ELEMENT_ID = ['noscript-gtm'];

function createDomElement({
	type,
	tagName,
	properties = {},
	children = [],
}) {
	if (type !== 'element') {
		return null;
	}

	const element = document.createElement(tagName);

	Object.entries(properties).forEach(([property, value]) => {
		element.setAttribute(property, value);
	});

	if (children.length) {
		const textChild = children.find((child) => child.type === 'text');

		if (textChild?.value) {
			element.innerHTML = textChild.value;
		}
	}

	return element;
}

function getElementByDataAttribute(attributeValue) {
	return document.querySelector(`[${ELEMENT_DATA_ATTRIBUTE}="${attributeValue}"]`);
}

export function addElementToHead(node, replace = true) {
	const newElement = createDomElement(node);

	if (!newElement) {
		return null;
	}

	const currentElement = getElementByDataAttribute(newElement.getAttribute(ELEMENT_DATA_ATTRIBUTE));

	if (newElement.outerHTML === currentElement?.outerHTML) {
		return currentElement;
	}

	if (replace) {
		currentElement?.remove();
	}

	document.head.append(newElement);

	return newElement;
}

export function addElementToBody(node) {
	const newElement = createDomElement(node);

	if (!newElement) {
		return null;
	}

	const currentElement = getElementByDataAttribute(newElement.getAttribute(ELEMENT_DATA_ATTRIBUTE));

	if (newElement.outerHTML === currentElement?.outerHTML) {
		return currentElement;
	}

	currentElement?.remove();
	document.body.append(newElement);

	return newElement;
}

export function addElementsToDom(elements) {
	elements.forEach((element) => {
		if (BODY_ELEMENTS_BY_ELEMENT_ID.includes(element.properties[ELEMENT_DATA_ATTRIBUTE])) {
			addElementToBody(element);
			return;
		}

		addElementToHead(element);
	});
}
