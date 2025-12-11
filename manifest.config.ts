import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
    manifest_version: 3,
    name: "Security Link",
    version: "1.0.0",
    description: "Security Link chromium browser assistant. This project was created in memory of my teacher who was great man. callname => `SOKOL`",
    permissions: [
        "scripting",
        "activeTab",
        "tabs",
        "storage",
        "webNavigation",
    ],
    background: {
        service_worker: "serviceWorker.js"
    },
    content_scripts: [
        {
            matches: [
                "<all_urls>"
            ],
            js: [
                "service_content_scripts/content_script.js"
            ]
        }
    ],
    action: {
        default_popup: "UI_components/bom_options_popup/bom_options_popup.html",
        default_icon: {
            16: "sprites/icon/icon16.png",
            48: "sprites/icon/icon48.png",
            128: "sprites/icon/icon128.png"
        }
    }

});