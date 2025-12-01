import { Events } from "./_constant_events";
import { generateCheckCurrentLinkEvent } from "./event_generator_service";


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



