import { sethooksToLinkElements } from "../services/catch_link_service";
import { setAgentsToListenToAnchorsAppearance } from "../services/set_page_llink_listener";

export const runPageScan = () => {
    sethooksToLinkElements();
    setAgentsToListenToAnchorsAppearance();
}
