![Logo](admin/openwa.png)

# ioBroker.openwa

[![NPM version](https://img.shields.io/npm/v/iobroker.openwa.svg)](https://www.npmjs.com/package/iobroker.openwa)
[![Downloads](https://img.shields.io/npm/dm/iobroker.openwa.svg)](https://www.npmjs.com/package/iobroker.openwa)
![Number of Installations](https://iobroker.live/badges/openwa-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/openwa-stable.svg)
[![NPM](https://nodei.co/npm/iobroker.openwa.png?downloads=true)](https://nodei.co/npm/iobroker.openwa/)

**Tests:** ![Test and Release](https://github.com/ThorstenBoettler/ioBroker.openwa/workflows/Test%20and%20Release/badge.svg)

---

## ioBroker Adapter for Open-WA (WhatsApp)

This adapter connects **ioBroker** to a running [Open-WA](https://github.com/open-wa/wa-automate-nodejs) instance, enabling you to send WhatsApp messages directly from Blockly scripts, JavaScript scripts, and automations.

> **Disclaimer:** This adapter is not an official product of WhatsApp or Meta. Use it at your own risk and in compliance with the [WhatsApp Terms of Service](https://www.whatsapp.com/legal/terms-of-service). "WhatsApp" is a registered trademark of Meta Platforms, Inc.

---

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Blockly](#blockly)
  - [JavaScript / Script Adapter](#javascript--script-adapter)
- [Message Types](#message-types)
- [Data Points](#data-points)
- [Changelog](#changelog)
- [License](#license)

---

## Requirements

- **ioBroker** with `js-controller >= 6.0.11` and `admin >= 7.0.23`
- **Node.js >= 22**
- A running **Open-WA** instance with REST API enabled and an API token configured
  - Open-WA must be reachable via HTTP (e.g. `http://192.168.1.x:2785`)
  - At least one WhatsApp session must be active and logged in

---

## Installation

Install the adapter via the **ioBroker Admin UI**:

1. Admin → Adapters → Search for `openwa`
2. Click "Install"
3. Create a new instance

Alternatively via npm:

```bash
npm install iobroker.openwa
```

---

## Configuration

Open the adapter instance after installation. Three fields need to be filled in:

| Field | Description | Example |
|---|---|---|
| **Open-WA Server URL** | Full URL including port to the Open-WA REST API | `http://192.168.1.100:2785` |
| **API Token** | The API key of the Open-WA instance (stored encrypted) | `my-secret-token` |
| **Session ID** | The session ID of the active WhatsApp session in Open-WA | `mySession` |

After saving, the adapter will automatically attempt to connect to the Open-WA API. The connection status is visible at the data point `openwa.0.info.connection` and as a green/red indicator in the Admin overview.

---

## Usage

### Blockly

The adapter provides a dedicated **Blockly block**, available in the Blockly editor under **"Sendeto"** → **"WhatsApp (Open-WA)"**.

The block offers the following options:

| Field | Description |
|---|---|
| **Instance** | Adapter instance (e.g. `openwa.0`) |
| **Chat Type** | `Private Chat` or `Group Chat` |
| **Message Type** | Text, Image, Video, Audio/Voice, Document |
| **Message** | The message text (for text messages) |
| **ChatID** | Phone number or group ID of the recipient |
| **URL** | Public URL of a media file (optional, for media messages) |
| **Base64 String** | Base64-encoded media file (optional, alternative to URL) |
| **MIME-Type** | Media type of the file (or `auto` for automatic detection) |
| **Caption** | Caption for image/video messages (optional) |
| **Result in** | Variable in which the send result will be stored |

**Note on ChatID:**
- For private chats: phone number in international format without `+` and without spaces, e.g. `4915112345678`
- For groups: the internal WhatsApp group ID, e.g. `123456789-1620000000`
- `@c.us` and `@g.us` are appended automatically if not already present.

---

### JavaScript / Script Adapter

Messages can also be sent directly via `sendTo` from JavaScript scripts:

**Text message:**

```javascript
sendTo('openwa.0', 'send', {
    to: '4915112345678',
    text: 'Hello from ioBroker!',
    type: 'private'   // 'private' or 'group'
}, result => {
    const res = JSON.parse(result);
    if (res.success) {
        console.log('Message sent, ID: ' + res.id);
    } else {
        console.error('Error: ' + JSON.stringify(res.error));
    }
});
```

**Image message via URL:**

```javascript
sendTo('openwa.0', 'send', {
    to: '4915112345678',
    type: 'private',
    msgType: 'image',
    url: 'https://example.com/image.jpg',
    caption: 'This is an image'
}, result => {
    console.log(result);
});
```

**Image message via Base64:**

```javascript
sendTo('openwa.0', 'send', {
    to: '4915112345678',
    type: 'private',
    msgType: 'image',
    base64: '<BASE64_STRING>',
    mimeType: 'image/jpeg',
    caption: 'Camera snapshot'
}, result => {
    console.log(result);
});
```

---

## Message Types

| `msgType` | Description | Required fields |
|---|---|---|
| `text` | Plain text message | `text` |
| `image` | Image (JPEG, PNG, WebP) | `url` or `base64`, optional `caption` |
| `video` | Video file (MP4) | `url` or `base64`, optional `caption` |
| `audio` | Audio file / voice message (MP3, OGG) | `url` or `base64` |
| `document` | Any file as a document (e.g. PDF) | `url` or `base64` |

**Return value (`result`):**

```json
{
  "success": true,
  "status": 200,
  "id": "ABCDEF1234567890",
  "timestamp": 1716000000
}
```

On error:

```json
{
  "success": false,
  "status": 401,
  "error": { ... }
}
```

---

## Data Points

| Data point | Type | Description |
|---|---|---|
| `openwa.0.info.connection` | `boolean` | `true` when the connection to the Open-WA API is active |

---

## Changelog

### 0.0.1 (2026-05-22)
* (Thorsten Böttler) Initial release
* Send text, image, video, audio and document messages
* Blockly integration with full featured block
* Encrypted storage of the API token
* Connection status indicator via `info.connection`

---

## License

MIT License

Copyright (c) 2026 Thorsten Böttler <thorsten.boettler@freenet.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
