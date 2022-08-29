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
import { Device } from "../../dist/lib/firebolt-manage";

test("Device.name()", () => {
  return Device.name(() => {}).then((res: number) => {
    expect(res > 0).toBe(true);
  });
});

test("Device.provision()", () => {
  return Device.provision("Test_Account_Id", "Test_Device_Id").then((res) => {
    expect(res).toEqual({});
  });
});

test("Device.postalCode()", () => {
  return Device.postalCode().then((res: string) => {
    expect(res).toEqual("19103");
  });
});

test("Device.developerMode()", () => {
  return Device.developerMode().then((res: boolean) => {
    expect(res).toBe(true);
  });
});

test("Device.listen()", () => {
  return Device.listen("requestPostalCode", () => {}).then((res: Number) => {
    expect(res > 0).toBe(true);
  });
});

test("Device.once()", () => {
  return Device.once("requestPostalCode", () => {}).then((res: Number) => {
    expect(res > 0).toBe(true);
  });
});

test("Device.clear()", () => {
  const result = Device.clear(1);
  expect(result).toBe(undefined);
});

test("Device.provide() with blank object", () => {
  expect(() => {
    Device.provide("xrn:firebolt:capability:settings:device", {});
  }).toThrow();
});
