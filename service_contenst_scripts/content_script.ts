import { Events } from "../services/_constant_events";
import { generateCheckCurrentLinkEvent } from "../services/event_generator_service";


/**
 * Monitors DOM mutations to detect when anchor elements with href attributes are dynamically added to the page.
 * 
 * This function intercepts native DOM manipulation methods to catch anchor elements being inserted into the DOM,
 * enabling security checks on links that are added after the initial page load. This is critical for detecting
 * potentially malicious links that may be injected via JavaScript.
 * 
 * @remarks
 * The function overrides the following native DOM methods:
 * - `Element.prototype.appendChild` - Detects elements added via appendChild()
 * - `Element.prototype.insertBefore` - Detects elements inserted before a reference node
 * - `Element.prototype.replaceChild` - Detects elements used as replacements
 * - `Element.prototype.innerHTML` setter - Detects elements added via innerHTML property
 * - `Element.prototype.insertAdjacentHTML` - Detects elements inserted at specific positions
 * 
 * When an element with an `href` attribute is detected, it triggers a CHECK_APPENDED_LINK event
 * via `generateCheckCurrentLinkEvent()` to validate the link's security.
 * 
 * @example
 * ```typescript
 * // Initialize the listener in your content script
 * listenToAnchorsAppearance();
 * 
 * // Now any dynamically added links will be intercepted:
 * const link = document.createElement('a');
 * link.href = 'https://example.com';
 * document.body.appendChild(link); // This will trigger the security check
 * ```
 * 
 * @returns {void}      
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
