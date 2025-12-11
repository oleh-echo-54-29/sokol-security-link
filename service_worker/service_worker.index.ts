/**
 * Initializes the service worker by setting up message listeners and performing initial setup tasks.
 * 
 * This function configures the service worker to listen for messages from content scripts and
 * perform necessary initialization tasks. It ensures that the worker is ready to handle security
 * checks and reports on link elements.
 */
export const initWorker = () => {
    listenToMessages();
}
/**
 * Listens for messages from content scripts and performs necessary initialization tasks.
 * 
 * This function sets up a listener for messages from content scripts. When a message is received,
 * it logs the message to the console. This is useful for debugging and monitoring the worker's
 * communication with the content scripts.
 * 
 * @example
 * ```typescript
 * // Initialize the message listener in your service worker
 */
export const listenToMessages = () => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log(message);
    });
}

/**
 * Initializes the service worker by setting up message listeners and performing initial setup tasks.
 * 
 * This function configures the service worker to listen for messages from content scripts and
 * perform necessary initialization tasks. It ensures that the worker is ready to handle security
 * checks and reports on link elements.
 */
initWorker();