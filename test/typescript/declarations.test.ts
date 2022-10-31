import { test, expect } from "@jest/globals";
import {
  ClosedCaptions,
  Account,
  Device,
  LifecycleManagement,
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

class LCMProvider implements LifecycleManagement.StateProvider {
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
    "xrn:firebolt:capability:accessibility:closedcaptions",
    new CCProvider()
  );
  expect(1).toBe(1);
});

test("Account.provide() declarations", () => {
  Account.provide("xrn:firebolt:capability:token:session", new AccPovider());
  expect(1).toBe(1);
});

test("LifecycleManagement.provide() declarations", () => {
  LifecycleManagement.provide(
    "xrn:firebolt:capability:lifecycle:state",
    new LCMProvider()
  );
  expect(1).toBe(1);
});
