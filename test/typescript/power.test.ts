/*
 * Copyright 2021 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { test, expect } from "@jest/globals";
import { Power } from "../../dist/lib/firebolt-manage";

test("power.autoStandby()", () => {
  return Power.autoStandby().then((res: boolean) => {
    expect(res).toEqual(true);
  });
});

test("power.networkEnabledWhileSuspended()", () => {
  return Power.networkEnabledWhileSuspended().then((res: boolean) => {
    expect(res).toEqual(true);
  });
});

test("power.motionEnabledWhileSuspended()", () => {
  return Power.motionEnabledWhileSuspended().then((res: boolean) => {
    expect(res).toEqual(true);
  });
});

test("power.sleep()", () => {
  return Power.sleep().then((res: boolean) => {
    expect(res).toEqual(true);
  });
});

test("power.listen() for active event", () => {
  return Power.listen("active", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.once() for active event", () => {
  return Power.once("active", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.listen() for activeStandby event", () => {
  return Power.listen("activeStandby", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.once() for activeStandby event", () => {
  return Power.once("activeStandby", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.listen() for inactivity event", () => {
  return Power.listen("inactivity", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.once() for inactivity event", () => {
  return Power.once("inactivity", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.listen() for inactivityCancelled event", () => {
  return Power.listen("inactivityCancelled", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.once() for inactivityCancelled event", () => {
  return Power.once("inactivityCancelled", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.listen() for powerOn event", () => {
  return Power.listen("powerOn", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.once() for powerOn event", () => {
  return Power.once("powerOn", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.listen() for resumedFromSuspended event", () => {
  return Power.listen("resumedFromSuspended", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.once() for resumedFromSuspended event", () => {
  return Power.once("resumedFromSuspended", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.listen() for suspendPending event", () => {
  return Power.listen("suspendPending", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.once() for suspendPending event", () => {
  return Power.once("suspendPending", () => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("power.clear()", () => {
  const result = Power.clear(2);
  expect(result).toBeFalsy();
});
