const win = globalThis || window

if (!win.__firebolt) {
    win.__firebolt = {}
}

// wires up the mock transport w/out waiting
win.__firebolt.mockTransportLayer = true

// sets a flag that mock defaults impls can use to speed things up, e.g. Lifecycle/defaults.js
win.__firebolt.automation = true

let sendListener
let receiver

export const transport = {
    send: function(message) {
        const json = JSON.parse(message)
        sendListener && sendListener(json)
    },
    receive: function(callback) {
        // store the callback
        receiver = callback
    },
    onSend: function(listener) {
        sendListener = listener
    },
    response: function(id, result) {
        let response = {
            jsonrpc: '2.0',
            id: id,
            result: result
        }
        receiver && receiver(JSON.stringify(response))
    }
}

win.__firebolt.setTransportLayer(transport)