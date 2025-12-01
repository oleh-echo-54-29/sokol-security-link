import { Events } from "../services/_constant";
import { generateCheckCurrentLinkEvent } from "../services/event_generator_service";

/**
insertBefore
replaceChild
Element.prototype.innerHTML setter
Element.prototype.insertAdjacentHTML
 */
export const listenToAnchorsAppearance = () => {
    const originalAppendChild = Element.prototype.appendChild;
    (window as any).Element.prototype.appendChild = (element: Element) => {
        if (element.hasAttribute("href")) {
            generateCheckCurrentLinkEvent(
                Events.CHECK_APPENDED_LINK,
                element.getAttribute("href") || "");

            originalAppendChild.call(this, element);
        }
    }

    const originalInsertBefore = Element.prototype.insertBefore;
    (window as any).Element.prototype.insertBefore = (element: Element, referenceNode: Node) => {
        if (element.hasAttribute("href")) {
            generateCheckCurrentLinkEvent(
                Events.CHECK_APPENDED_LINK,
                element.getAttribute("href") || ""
            );

            originalInsertBefore.call(this, element, referenceNode);
        }
    }

    const originalReplaceChild = Element.prototype.replaceChild;
    (window as any).Element.prototype.replaceChild = (element: Element, referenceNode: Node) => {
        if (element.hasAttribute("href")) {
            generateCheckCurrentLinkEvent(
                Events.CHECK_APPENDED_LINK,
                element.getAttribute("href") || ""
            );

            originalReplaceChild.call(this, element, referenceNode);
        }
    }

    const originalInnerHTMLSetter = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML")?.set;
    (window as any).Element.prototype.innerHTML = function (html: string) {
        if (html.includes("href")) {
            generateCheckCurrentLinkEvent(
                Events.CHECK_APPENDED_LINK,
                this.getAttribute("href") || ""
            );

            originalInnerHTMLSetter?.call(this, html);
        }
    }

    const originalInsertAdjacentHTML = Element.prototype.insertAdjacentHTML;
    (window as any).Element.prototype.insertAdjacentHTML = (element: Element, position: InsertPosition, html: string) => {
        if (element.hasAttribute("href")) {
            generateCheckCurrentLinkEvent(
                Events.CHECK_APPENDED_LINK,
                element.getAttribute("href") || "",
            );

            originalInsertAdjacentHTML.call(this, position, html);
        }
    }
}
