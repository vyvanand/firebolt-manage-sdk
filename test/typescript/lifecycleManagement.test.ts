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
import { LifecycleManagement } from "../../dist/lib/firebolt-manage";

test("LifecycleManagement.setState()", () => {
  return LifecycleManagement.setState("Test_APP_ID", "initializing").then(
    (res) => {
      expect(res).toEqual({});
    }
  );
});

test("LifecycleManagement.provide() with blank object", () => {
  expect(() => {
    LifecycleManagement.provide("xrn:firebolt:capability:app:lifecycle", {});
  }).toThrow();
});

test("LifecycleManagement.session()", () => {
  const dummyData: LifecycleManagement.AppSession = {
    app: {
      id: "123",
      url: "test_url",
      title: "test_title",
      catalog: "test_catalog",
    },
    runtime: {
      id: "123",
    },
  };
  return LifecycleManagement.session(dummyData).then((res: void) => {
    expect(res).toEqual({});
  });
});
