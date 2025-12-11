import { setHooksToLinkElements } from "../service-scripts/catch_link_service.js";
import { setAgentsToListenToAnchorsAppearance } from "../service-scripts/set_page_link_listener.js";


/**
 * Runs the page scan by setting up link element hooks and anchor appearance listeners.
 * 
 * This function configures the content script to monitor link elements on the page and
 * listen for dynamically added anchors. It ensures that links are analyzed for security
 * threats both when they are initially present and when they are added to the DOM after
 * the initial page load.
 */
const runPageScan = () => {
    setHooksToLinkElements();
    setAgentsToListenToAnchorsAppearance();
}

runPageScan();