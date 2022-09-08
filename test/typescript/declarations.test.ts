import { test, expect } from "@jest/globals";
import {
  ClosedCaptions,
  Account,
  Device,
  LifecycleManagement,
  PinChallenge
} from "../../dist/lib/firebolt-manage";

class AccPovider implements Account.SessionProvider {
  session(
    parameters: void,
    session: Account.FocusableProviderSession
  ): Promise<object> {
    return Promise.resolve(null);
  }
}

class CCProvider implements ClosedCaptions.SettingsProvider {
  settings(
    parameters: object,
    session: ClosedCaptions.ProviderSession
  ): Promise<ClosedCaptions.ClosedCaptionsSettings> {
    session.correlationId;
    return Promise.resolve(null);
  }
}

class DeviceProvider implements Device.DeviceSettingsProvider {
  name(parameters: object, session: Device.ProviderSession): Promise<string> {
    return Promise.resolve(null);
  }
  postalCode(
    parameters: object,
    session: Device.ProviderSession
  ): Promise<string> {
    return Promise.resolve(null);
  }
}

class LCMProvider implements LifecycleManagement.LifecycleAppProvider {
  ready(
    parameters: LifecycleManagement.LifecycleReadyParameters,
    session: LifecycleManagement.ProviderSession
  ): Promise<void> {
    return Promise.resolve(null);
  }
  close(
    parameters: LifecycleManagement.LifecycleCloseParameters,
    session: LifecycleManagement.ProviderSession
  ): Promise<void> {
    return Promise.resolve(null);
  }
  finished(
    parameters: LifecycleManagement.LifecycleFinishedParameters,
    session: LifecycleManagement.ProviderSession
  ): Promise<void> {
    return Promise.resolve(null);
  }
}

test("ClosedCaptions.provide() declarations ", () => {
  ClosedCaptions.provide(
    "xrn:firebolt:capability:settings:closedcaptions",
    new CCProvider()
  );
  expect(1).toBe(1);
});

test("Account.provide() declarations", () => {
  Account.provide("xrn:firebolt:capability:account:session", new AccPovider());
  expect(1).toBe(1);
});

test("Device.provide() declarations", () => {
  Device.provide(
    "xrn:firebolt:capability:settings:device",
    new DeviceProvider()
  );
  expect(1).toBe(1);
});

test("LifecycleManagement.provide() declarations", () => {
  LifecycleManagement.provide(
    "xrn:firebolt:capability:app:lifecycle",
    new LCMProvider()
  );
  expect(1).toBe(1);
});

class PinManager implements PinChallenge.ChallengeProvider {
    challenge(parameters: PinChallenge.PinChallenge, session: PinChallenge.FocusableProviderSession):Promise<PinChallenge.PinChallengeResult> {
        return Promise.resolve({
            granted: true,
            reason: PinChallenge.ResultReason.CORRECT_PIN
        })
        console.log(parameters, session)
    }
}

PinChallenge.provide('xrn:firebolt:capability:usergrant:pinchallenge', new PinManager())