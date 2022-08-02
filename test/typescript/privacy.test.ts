import { test, expect  } from "@jest/globals"
import { Privacy } from "../../dist/lib/firebolt-manage";

class ContentPrivacyProvider implements Privacy.ContentPolicyProvider {
    contentPolicy(parameters: object, session: Privacy.ProviderSession): Promise<Privacy.ContentPolicy> {
        return Promise.resolve(null)
    }
}

class AdvertisingPrivacyProvider implements Privacy.AdvertisingPolicyProvider {
    advertisingPolicy(parameters: object, session: Privacy.ProviderSession): Promise<object> {
        return Promise.resolve(null)
    }
}

test('Content Policy Provider', () => {
    Privacy.provide('xrn:firebolt:capability:privacy:content', new ContentPrivacyProvider())
    expect(1).toBe(1)
});

test('Advertising Policy Provider', () => {
    Privacy.provide('xrn:firebolt:capability:privacy:advertising', new AdvertisingPrivacyProvider())
    expect(1).toBe(1)
});

let listenerId:number

test('Able to get TypeScript listenerId', () => {
    return Privacy.listen('limitAdTrackingChanged', () => {}).then((id:number) => {
        listenerId = id
        console.log(listenerId)
        expect(listenerId > 0).toBe(true)
    })
})
