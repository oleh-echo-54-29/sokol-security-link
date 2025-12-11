import { sethooksToLinkElements } from "../services/catch_link_service.js";
import { setAgentsToListenToAnchorsAppearance } from "../services/set_page_llink_listener.js";

export const runPageScan = () => {
    sethooksToLinkElements();
    setAgentsToListenToAnchorsAppearance();
}
