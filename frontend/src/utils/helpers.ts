import { APPS } from "./constants"

export const getApp = () => {
    const subdomain = getSubdomain();

    const main = APPS.find(app => app.main);
    if (!main) throw new Error("Must have main app");

    if (subdomain === "") return main;

    const app = APPS.find(app => subdomain === app.subdomain);
    if (!app) return main;

    return app;
}
export const getSubdomain = () => {
    const locationParts = window.location.hostname.split(".");

    let sliceTill = -2;

    const isLocalHost = locationParts.slice(-1)[0] === "localhost";
    if (isLocalHost) sliceTill = -1;

    return locationParts.slice(0, sliceTill).join();

    return locationParts[0];
}