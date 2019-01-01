import * as fetchMock from "fetch-mock";
import * as TreeSet from "../src";

export const mockServer = () => {

    fetchMock.get("https://treeset-endpoint/api/get", 
    
        [
            { 
                id: 1, 
                parentId: null,
                number: 1,
            },
            { 
                id: 2, 
                parentId: null,
                number: 2,
            },
            { 
                id: 3, 
                parentId: null,
                number: 3,
            },
        ],
    );

    // fetchMock.get("https://pusher-endpoint/api/vapid/unknown", 404);
    // fetchMock.post("https://pusher-endpoint/api/subscribe", {
    //     date: "1514908418192",
    //     endpoint: "test-endpoint", 
    //     platform: Pusher.Platform.WEB, 
    //     scope: "localhost", 
    //     lastSeenUser: {test: "test"}, 
    //     keys: {auth: "test-auth", p256dh: "test-p256dh"},
    // });
    // fetchMock.post("https://pusher-endpoint/api/update", {
    //     date: "1514908418192",
    //     endpoint: "test-endpoint", 
    //     platform: Pusher.Platform.WEB, 
    //     scope: "localhost", 
    //     lastSeenUser: {test: "test-update"}, 
    //     keys: {auth: "test-auth", p256dh: "test-p256dh"},
    // });
    // fetchMock.post("https://pusher-endpoint/api/unscribe", "Unscribed: test-endpoint");
    // fetchMock.post("https://pusher-endpoint/api/touch", 
    // {endpoint: "test-endpoint", users: {testTouch: "test-touch"}});
    // fetchMock.post("https://pusher-endpoint/dapi/push", 200);
};

export const restore = () => {

    fetchMock.restore();

};
