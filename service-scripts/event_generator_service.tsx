import { Events } from "./common/_constant_events.js";

export const generateCheckCurrentLinkEvent = (specialCommand: string, elementLink: string) => {
    if (!specialCommand || !elementLink) return;

    const event = new CustomEvent(Events.CHECK_CURRENT_LINK,
        {
            detail: {
                sokol_command: specialCommand,
                sokol_target: elementLink
            },
        });

    document.dispatchEvent(event);
}
