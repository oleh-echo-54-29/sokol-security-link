function initWorker() {
    listenToMessages();

}

const listenToMessages = () => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log(message);
    });
}

const checkLink = (link: string) => {
    //TODO: check link   
}


initWorker();