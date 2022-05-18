import { test, expect  } from "@jest/globals"
import { ClosedCaptions, VoiceGuidance } from "../../dist/lib/firebolt-manage";

class VGProvider implements VoiceGuidance.SettingsProvider {
    settings(parameters: void, session: object):Promise<VoiceGuidance.VoiceGuidanceSettings> {
        return Promise.resolve(null)
    }
}

class CCProvider implements ClosedCaptions.SettingsProvider {
    settings(parameters: object, session: object):Promise<ClosedCaptions.ClosedCaptionsSettings> {
        return Promise.resolve(null)
    }
}

test('VoiceGuidance.provide() declarations ', () => {
    VoiceGuidance.provide('xrn:firebolt:capability:settings:voiceguidance', new VGProvider())
    expect(1).toBe(1)
});

test('ClosedCaptions.provide() declarations ', () => {
    ClosedCaptions.provide('xrn:firebolt:capability:settings:closedcaptions', new CCProvider())
    expect(1).toBe(1)
});
