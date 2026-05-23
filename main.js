'use strict';

/*
 * Created with @iobroker/create-adapter v3.1.5
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require('@iobroker/adapter-core');

// Load your modules here, e.g.:
// const fs = require('fs');

class Openwa extends utils.Adapter {
	/**
	 * @param {Partial<utils.AdapterOptions>} [options] - Adapter options
	 */
	constructor(options) {
		super({
			...options,
			name: 'openwa',
		});
		this.on('ready', this.onReady.bind(this));
		// this.on('stateChange', this.onStateChange.bind(this));
		// this.on('objectChange', this.onObjectChange.bind(this));
		this.on('message', this.onMessage.bind(this));
		this.on('unload', this.onUnload.bind(this));
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		this.setState('info.connection', false, true);
		this.subscribeStates('sendTrigger');

		this.connectToOpenWa();
	}

	async connectToOpenWa() {
		const serverUrl = this.config.serverIp;
		const token = this.config.apiToken;

		if (!serverUrl) {
			this.log.warn('No server URL has been entered. Please configure the adapter!');
			return;
		}

		this.log.info(`Connect to Open-WA Server: ${serverUrl}`);

		try {
			const response = await fetch(`${serverUrl}/api/auth/validate`, {
				method: 'POST',
				headers: {
					'x-api-key': `${token}`,
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				this.log.info('Successfully connected to Open-WA!');
				this.setState('info.connection', true, true);
			} else {
				this.log.error(`Connection error: Open-WA responded with status ${response.status} -> Check API Key!`);
				this.setState('info.connection', false, true);
			}
		} catch (error) {
			this.log.error(`Connection failed: ${error.message}`);
			this.setState('info.connection', false, true);
		}
	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 *
	 * @param {() => void} callback - Callback function
	 */
	onUnload(callback) {
		try {
			// Here you must clear all timeouts or intervals that may still be active
			// clearTimeout(timeout1);
			// clearTimeout(timeout2);
			// ...
			// clearInterval(interval1);

			callback();
		} catch (error) {
			this.log.error(`Error during unloading: ${error.message}`);
			callback();
		}
	}

	// If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
	// You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
	// /**
	//  * Is called if a subscribed object changes
	//  * @param {string} id
	//  * @param {ioBroker.Object | null | undefined} obj
	//  */
	// onObjectChange(id, obj) {
	// 	if (obj) {
	// 		// The object was changed
	// 		this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
	// 	} else {
	// 		// The object was deleted
	// 		this.log.info(`object ${id} deleted`);
	// 	}
	// }

	/**
	 * Is called if a subscribed state changes
	 *
	 * @param {string} id - State ID
	 * @param {ioBroker.State | null | undefined} state - State object
	 */
	// async onStateChange(id, state) {
	// return;
	// }
	/**
	.* Called when another script (e.g. your Blockly script)
	.* executes the command sendTo(“openwa.0”, “send”, { to: “...”, text: “...” }).
	.* @param {ioBroker.Message} obj - Message object
	.*/
	onMessage(obj) {
		if (typeof obj !== "object" || !obj.message) {
			return;
		}
		if (obj.command === "send") {
			this.handleSendMessage(obj).catch((error) => {
				this.log.error(`Critical error in handleSendMessage: ${error.message}`);
				if (obj && obj.callback) {
					this.sendTo(obj.from, obj.command, { error: error.message }, obj.callback);
				}
			});
		}
	}

	/**
	 * Asynchronous processing of the “send” command
	 * @param {ioBroker.Message} obj - Message object
	 */
	async handleSendMessage(obj) {
		const serverUrl = this.config.serverIp;
		const token = this.config.apiToken;
		const sessionid = this.config.sessionID;

		try {
			const messageText = obj.message.text;
			let rawNumber = obj.message.to || obj.message.phone;

			if (!messageText) {
				this.log.warn("Message discarded via Blockly: The message text is empty!");
				if (obj.callback) this.sendTo(obj.from, obj.command, { error: "Empty message" }, obj.callback);
				return;
			}

			if (typeof rawNumber === "string") {
				rawNumber = rawNumber.trim();
			}

			if (!rawNumber) {
				this.log.warn("Message discarded via Blockly: The recipient number is empty!");
				if (obj.callback) this.sendTo(obj.from, obj.command, { error: "Empty recipient" }, obj.callback);
				return;
			}

			let targetChatId = String(rawNumber);
			if (!targetChatId.endsWith("@c.us") && !targetChatId.endsWith("@g.us")) {
				targetChatId = `${targetChatId}@c.us`;
			}

			this.log.info(`Send a WhatsApp message via Blockly to ${targetChatId}: "${messageText}"`);

			const response = await fetch(`${serverUrl}/api/sessions/${sessionid}/messages/send-text`, {
				method: 'POST',
				headers: {
					'x-api-key': token,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chatId: targetChatId,
					text: String(messageText)
				})
			});

			if (response.ok) {
				this.log.info("Message successfully sent to Open-WA.");
				// Falls das Blockly-Skript auf eine Antwort wartet, senden wir Erfolg zurück
				if (obj.callback) this.sendTo(obj.from, obj.command, { status: "ok" }, obj.callback);
			} else {
				this.log.error(`Error sending message: Open-WA responded with status ${response.status}`);
				if (obj.callback) this.sendTo(obj.from, obj.command, { error: `HTTP ${response.status}` }, obj.callback);
			}

		} catch (error) {
			this.log.error(`Send failed via onMessage: ${error.message}`);
			if (obj.callback) this.sendTo(obj.from, obj.command, { error: error.message }, obj.callback);
		}
	}
}

if (require.main !== module) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<utils.AdapterOptions>} [options] - Adapter options
	 */
	module.exports = options => new Openwa(options);
} else {
	// otherwise start the instance directly
	new Openwa();
}
