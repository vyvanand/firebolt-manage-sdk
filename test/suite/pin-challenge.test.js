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

import { PinChallenge } from '../../dist/lib/firebolt-manage.mjs'
import { transport } from '../Setup.js'

let providerMethodNotificationRegistered = false
let providerMethodRequestDispatched = false
let providerMethodResultSent = false
let pinSession
let pinResult
let responseCorrelationId


beforeAll( () => {
    class PinManager {
        challenge(parameters, session) {
            pinSession = session
            if (parameters.pinSpace === 'purchase') {
                return new Promise( (resolve, reject) => {
                    // request provider app to be given focus
                    session.focus()

                    // "display" a custom pin prompt
                    Promise.resolve(true).then(success => {
                        if (success) {
                            resolve({
                                granted: true
                            })
                        }
                    })    
                })
            }
            else {
                return Promise.reject('Pin type ' + parameters.pinSpace + ' is not supported.')
            }
        }
    }

    transport.onSend(json => {
        if (json.method === 'pinchallenge.onRequestChallenge') {
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
                    correlationId: 123,
                    parameters: {
                        pinSpace: 'purchase'
                    }
                })
            })
        }
        else if (json.method === 'pinchallenge.challengeResponse') {
            providerMethodResultSent = true
            pinResult = json.params.result
            responseCorrelationId = json.params.correlationId
        }
    })    

    PinChallenge.provide("xrn:firebolt:capability:usergrant:pinchallenge", new PinManager())

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
    expect(pinSession.correlationId()).toBe(123)
})

test('Provide method session arg DOES have focus', () => {
    expect(pinSession.hasOwnProperty('focus')).toBe(true)
})
