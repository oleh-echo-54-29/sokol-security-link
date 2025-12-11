import { Events } from "./common/_constant_events.js";
import { generateCheckCurrentLinkEvent } from "./event_generator_service.tx";


export const sethooksToLinkElements = () => {
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
