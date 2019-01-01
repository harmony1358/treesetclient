import * as Chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as TreeSet from "../src";
import * as yargs from "yargs";
import * as TreeSetMocks from "./TreeSetMocks";

Chai.use(chaiAsPromised);

const integrationUrl = yargs.argv.api;
const apiEndpoint: string = integrationUrl || "https://treeset-endpoint/api";

const should = Chai.should();
const expect = Chai.expect;
const assert = Chai.assert;

describe ("TreeSetAPI", () => {

    const treeSetAPI = new TreeSet.TreeSetAPI(apiEndpoint);

    before( () => {

        if (!integrationUrl) { TreeSetMocks.mockServer(); }

    });

    it ("SHould return ITreeNode[] Promise when calling getNodes", () => {

        return treeSetAPI.getNodes(null);

    });

    // it ("Should return valid VAPID Promise", () => {

    //     return pusherAPI.getVAPID("localhost").then( (result: Pusher.IVAPID) => {
                
    //         expect(result.scope).to.be.equal("localhost");

    //     }).catch ( (error) => {
    //         assert.isNotOk (error, "Promise rejected");
    //     });

    // });

    // it ("Should reject VAPID Promise when failed", () => {

    //     return expect(pusherAPI.getVAPID("unknown")).to.be.rejected;

    // });

    // it ("Should resove subscription with valid subscription object", () => {

    //     return pusherAPI.subscribe({
    //         endpoint: "test-endpoint", 
    //         platform: Pusher.Platform.WEB, 
    //         scope: "localhost", 
    //         lastSeenUser: {test: "test"}, 
    //         keys: {auth: "test-auth", p256dh: "test-p256dh"},
    //     }).then( (result: Pusher.ISubscription) => {

    //         expect(result.scope).to.be.equal("localhost");
    //         expect(result.date).to.exist;

    //     }).catch ( (error) => {
    //         assert.isNotOk (error, "Promise rejected");
    //     });
        
    // });

    // it ("Should resove update with valid subscription object", () => {

    //     return pusherAPI.update({
    //         endpoint: "test-endpoint", 
    //         platform: Pusher.Platform.WEB, 
    //         scope: "localhost", 
    //         lastSeenUser: {test: "test-update"}, 
    //         keys: {auth: "test-auth", p256dh: "test-p256dh"},
    //     }).then( (result: Pusher.ISubscription) => {
           
    //         expect(result.scope).to.be.equal("localhost");
    //         expect(result.date).to.exist;
    //         expect(result.lastSeenUser.test).to.be.equal("test-update");

    //     }).catch ( (error) => {
    //         assert.isNotOk (error, "Promise rejected");
    //     });
        
    // });

    // it ("Should resolve Touch with valid ITouch object", () => {

    //     return pusherAPI.touch({endpoint: "test-endpoint", users: {testTouch: "test-touch"}})
    //         .then((result: Pusher.ITouch) => {

    //             expect(result.endpoint).to.be.equal("test-endpoint");
    //             expect(result.users.testTouch).to.be.equal("test-touch");

    //         }).catch ( (error) => {
    //             assert.isNotOk (error, "Promise rejected");
    //         });

    // });

    // it ("Should unscribe with the same endpoint", () => {

    //     return pusherAPI.unscribe("test-endpoint").then ( (result: string) => {

    //         expect(result).to.be.equal("Unscribed: test-endpoint");

    //     }).catch ( (error) => {
    //         assert.isNotOk (error, "Promise rejected");
    //     });

    // });

    after ( () => {

        TreeSetMocks.restore();

    });
});
