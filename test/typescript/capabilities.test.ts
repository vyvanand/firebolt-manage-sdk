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
import { Capabilities } from "../../dist/lib/firebolt-manage";

test("Capabilities.supported()", () => {
  return Capabilities.supported("Test_capability").then((res: boolean) => {
    expect(res).toBe(true);
  });
});

test("Capabilities.available()", () => {
  return Capabilities.available("Test_capability").then((res: boolean) => {
    expect(res).toBe(true);
  });
});

test("Capabilities.permitted()", () => {
  return Capabilities.permitted("Test_capability", "manage").then(
    (res: boolean) => {
      expect(res).toBe(true);
    }
  );
});

test("Capabilities.granted()", () => {
  return Capabilities.granted("Test_capability", "manage").then(
    (res: boolean) => {
      expect(res).toBe(true);
    }
  );
});

test("Capabilities.info()", () => {
  const expected: Capabilities.CapabilityInfo[] = [
    {
      available: true,
      capability: "xrn:firebolt:capability:device:model",
      granted: true,
      permitted: true,
      role: "use",
      supported: true,
    },
    {
      available: true,
      capability: "xrn:firebolt:capability:keyboard",
      granted: true,
      permitted: true,
      role: "use",
      supported: true,
    },
    {
      available: false,
      capability: "xrn:firebolt:capability:protocol:bluetoothle",
      details: ["unsupported"],
      granted: false,
      permitted: false,
      role: "use",
      supported: false,
    },
    {
      available: true,
      capability: "xrn:firebolt:capability:token:device",
      granted: true,
      permitted: true,
      role: "use",
      supported: true,
    },
    {
      available: false,
      capability: "xrn:firebolt:capability:token:platform",
      details: ["unavailable"],
      granted: false,
      permitted: false,
      role: "use",
      supported: true,
    },
    {
      available: false,
      capability: "xrn:firebolt:capability:protocol:moca",
      details: ["disabled", "unavailable"],
      granted: false,
      permitted: false,
      role: "use",
      supported: true,
    },
    {
      available: true,
      capability: "xrn:firebolt:capability:wifi:scan",
      details: ["unpermitted"],
      granted: false,
      permitted: false,
      role: "use",
      supported: true,
    },
    {
      available: true,
      capability: "xrn:firebolt:capability:localization:postalCode",
      details: ["ungranted"],
      granted: false,
      permitted: true,
      role: "use",
      supported: true,
    },
    {
      available: true,
      capability: "xrn:firebolt:capability:localization:postalCode",
      details: ["ungranted"],
      granted: false,
      permitted: true,
      role: "use",
      supported: true,
    },
    {
      available: true,
      capability: "xrn:firebolt:capability:localization:locality",
      details: ["grantDenied", "ungranted"],
      granted: false,
      permitted: true,
      role: "use",
      supported: true,
    },
  ];

  return Capabilities.info("manage", []).then(
    (res: Capabilities.CapabilityInfo[]) => {
      expect(res).toEqual(expect.arrayContaining(expected));
    }
  );
});

test("Capabilities.request()", () => {
  const expected: Capabilities.CapabilityInfo[] = [
    {
      available: true,
      capability: "xrn:firebolt:capability:commerce:purchase",
      granted: true,
      permitted: true,
      role: "use",
      supported: true,
    },
  ];
  return Capabilities.request([
    { role: "manage" },
    { role: "provide" },
    { role: "use" },
  ]).then((res: Capabilities.CapabilityInfo[]) => {
    expect(res).toEqual(expect.arrayContaining(expected));
  });
});
