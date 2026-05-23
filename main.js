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
            callback();
        } catch (error) {
            this.log.error(`Error during unloading: ${error.message}`);
            callback();
        }
    }

    /**
     * Called when another script (e.g. your Blockly script)
     * executes the command sendTo(“openwa.0”, “send”, { to: “...”, text: “...” }).
     *
     * @param {ioBroker.Message} obj - Message object
     */
    onMessage(obj) {
        if (typeof obj !== 'object' || !obj.message) {
            return;
        }
        if (obj.command === 'send') {
            this.handleSendMessage(obj).catch(error => {
                this.log.error(`Critical error in handleSendMessage: ${error.message}`);
                if (obj && obj.callback) {
                    this.sendTo(obj.from, obj.command, { error: error.message }, obj.callback);
                }
            });
        }
    }

    /**
     * Asynchronous processing of the “send” command
     *
     * @param {ioBroker.Message} obj - Message object
     */
    async handleSendMessage(obj) {
        const serverUrl = this.config.serverIp;
        const token = this.config.apiToken;
        const sessionid = this.config.sessionID;

        try {
            const messageText = obj.message.text;
            let rawNumber = obj.message.to || obj.message.phone;

            //const chatType = obj.message.chatType || obj.message.type || 'private';
            const chatType = obj.message.type || 'private';
            const msgType = obj.message.msgType || 'text';
            const mediaUrl = obj.message.url ? String(obj.message.url).trim() : '';
            let mediaBase64 = obj.message.base64 ? String(obj.message.base64).trim() : '';
            let mimeType = obj.message.mimeType || 'auto';
            const captionText = obj.message.caption ? String(obj.message.caption).trim() : '';

            if (typeof rawNumber === 'string') {
                rawNumber = rawNumber.trim();
            }

            if (!rawNumber) {
                this.log.warn('Message discarded via Blockly: The recipient number is empty!');
                if (obj.callback) {
                    this.sendTo(obj.from, obj.command, { error: 'Empty recipient' }, obj.callback);
                }
                return;
            }

            let targetChatId = String(rawNumber);
            if (!targetChatId.endsWith('@c.us') && !targetChatId.endsWith('@g.us')) {
                if (chatType === 'group') {
                    targetChatId = `${targetChatId}@g.us`;
                    this.log.info(`Recognized target as Group. Appended @g.us`);
                } else {
                    targetChatId = `${targetChatId}@c.us`;
                    this.log.info(`Recognized target as Private Chat. Appended @c.us`);
                }
            }

            let apiUrl = '';
            let fetchBody = {};

            if (msgType === 'image') {
                if (mimeType === 'auto') {
                    mimeType = 'image/png';
                }

                const fileData = mediaUrl;
                const base64string = mediaBase64;
                if (!fileData && !base64string) {
                    this.log.warn(
                        'Message discarded via Blockly: For image messages, either URL or Base64 data must be provided!',
                    );
                    if (obj.callback) {
                        this.sendTo(
                            obj.from,
                            obj.command,
                            { error: 'Missing image data (URL or Base64)' },
                            obj.callback,
                        );
                    }
                    return;
                }

                apiUrl = `${serverUrl}/api/sessions/${sessionid}/messages/send-image`;
                fetchBody = {
                    chatId: targetChatId,
                    url: fileData,
                    base64: base64string,
                    mimetype: mimeType,
                    filename: 'image.png',
                    caption: captionText || messageText || '',
                };

                this.log.info(`Sending WhatsApp image via Blockly to ${targetChatId}`);
                this.log.debug(`Fetch Body: ${JSON.stringify(fetchBody, null, 2)}`);
            } else {
                if (!messageText) {
                    this.log.warn('Message discarded via Blockly: The message text is empty!');
                    if (obj.callback) {
                        this.sendTo(obj.from, obj.command, { error: 'Empty message' }, obj.callback);
                    }
                    return;
                }
                apiUrl = `${serverUrl}/api/sessions/${sessionid}/messages/send-text`;
                fetchBody = {
                    chatId: targetChatId,
                    text: String(messageText),
                };

                this.log.info(
                    `Sending WhatsApp text via Blockly [Type: ${chatType}] to ${targetChatId}: '${messageText}'`,
                );
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'x-api-key': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fetchBody),
            });

            const textResponse = await response.text();
            this.log.debug(`Raw Open-WA response: ${textResponse}`);
            let apiResponseData = {};
            try {
                if (textResponse && textResponse.trim()) {
                    apiResponseData = JSON.parse(textResponse);
                }
            } catch (e) {
                this.log.error(`Could not parse API response as JSON: ${e.message}`);
                apiResponseData = { rawText: textResponse };
            }
            if (response.ok) {
                this.log.info('Message successfully sent to Open-WA.');
                const answerObj = {
                    success: true,
                    status: response.status,
                    id: apiResponseData?.messageId || apiResponseData?.id || null,
                    timestamp: apiResponseData?.timestamp || null,
                };
                this.log.debug(`[DEBUG-CHECK] Generated answerObj: ${JSON.stringify(answerObj)}`);
                this.log.debug(`[DEBUG-CHECK] Is obj.callback present? -> ${!!obj.callback}`);
                if (obj.callback) {
                    this.log.debug(`Sending stringified answer to Blockly: ${JSON.stringify(answerObj)}`);
                    this.sendTo(obj.from, obj.command, JSON.stringify(answerObj), obj.callback);
                } else {
                    this.log.warn('No a callback function! Data cannot be returned to the script.');
                }
            } else {
                this.log.error(`Error sending message: Open-WA responded with status ${response.status}`);
                if (obj.callback) {
                    const errorObj = {
                        success: false,
                        status: response.status,
                        error: apiResponseData,
                    };
                    this.sendTo(obj.from, obj.command, JSON.stringify(errorObj), obj.callback);
                }
            }
        } catch (error) {
            this.log.error(`Send failed via onMessage: ${error.message}`);
            if (obj.callback) {
                this.sendTo(obj.from, obj.command, { error: error.message }, obj.callback);
            }
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
