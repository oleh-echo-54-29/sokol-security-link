import { Events } from "./common/_constant_events.js";
import { generateCheckCurrentLinkEvent } from "./event_generator_service.js";

/**
 * Sets up hooks to link elements to listen for mouseover events and generate check current link events.
 * 
 * This function adds event listeners to all link elements with href attributes. When a mouseover event
 * occurs on a link, it generates a CHECK_CURRENT_LINK event via `generateCheckCurrentLinkEvent()` to
 * validate the link's security.
 * 
 * @example
 * ```typescript
 * // Initialize the hook in your content script
 * setHooksToLinkElements();
 * 
 * // Now any link with href will trigger the security check:
 * const link = document.createElement('a');
 * link.href = 'https://example.com';
 * document.body.appendChild(link); // This will trigger the security check
 * ```
 * 
 * @returns {void}      
 */
export const setHooksToLinkElements = () => {
    const anchors = document.querySelectorAll("[href]")

    for (let anchor of anchors) {
        anchor.addEventListener("mouseover", (e) => {
            const eventCommand =
                generateCheckCurrentLinkEvent(
                    Events.HIGHLIGHT_HOVERED_LINK,
                    anchor.getAttribute("href") || "",
                );
        });
    }
}
