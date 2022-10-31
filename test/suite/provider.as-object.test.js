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

import { ClosedCaptions } from '../../dist/lib/firebolt-manage.mjs'
import { transport } from '../Setup.js'

let providerMethodNotificationRegistered = false
let providerMethodRequestDispatched = false
let providerMethodResultSent = false
let ccSettings
let ccSession
let responseCorrelationId


beforeAll( () => {
    
    transport.onSend(json => {
        if (json.method === 'closedcaptions.onRequestSettings') {
            providerMethodNotificationRegistered = true

            // Confirm the listener is on
            transport.response(json.id, {
                listening: true,
                event: json.method
            })

            // send out a request event
            setTimeout( _ => {
                providerMethodRequestDispatched = true
                transport.response(json.id, {
                    correlationId: 123
                })
            })
        }
        else if (json.method === 'closedcaptions.settingsResponse') {
            providerMethodResultSent = true
            ccSettings = json.params.result
            responseCorrelationId = json.params.correlationId
        }
    })

    ClosedCaptions.provide('xrn:firebolt:capability:accessibility:closedcaptions', {
        settings: (...args) => {
            ccSession = args[1]
            return Promise.resolve({
                fontFamily: 'Comic Sans'
            })
        }
    })
    
    return new Promise( (resolve, reject) => {
        setTimeout(resolve, 1000)
    })
})

test('Provider as Class registered', () => {
    // this one is good as long as there's no errors yet
    expect(1).toBe(1)
});

test('Provider method notification turned on', () => {
    expect(providerMethodNotificationRegistered).toBe(true)
})

test('Provider method request dispatched', () => {
    expect(providerMethodRequestDispatched).toBe(true)
})

test('Provider response used correct correlationId', () => {
    expect(responseCorrelationId).toBe(123)
})

test('Provide method session arg DOES have correlationId', () => {
    expect(ccSession.correlationId()).toBe(123)
})

test('Provide method session arg DOES NOT have focus', () => {
    expect(ccSession.hasOwnProperty('focus')).toBe(false)
})

test('Provider method result is correct', () => {
    expect(ccSettings).not.toEqual(null)
    expect(ccSettings.fontFamily).toBe('Comic Sans')
})
