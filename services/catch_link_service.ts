import { Events } from "./_constant";
import { generateCheckCurrentLinkEvent } from "./event_generator_service";


export const sethooksToLinkElements = () => {
    const anchors = document.querySelectorAll("[href]")

    for (let anchor of anchors) {
        anchor.addEventListener("mouseover", (e) => {
            generateCheckCurrentLinkEvent(
                Events.CHECK_CURRENT_LINK,
                anchor.getAttribute("href") || "",
            );
        });
    }
}



