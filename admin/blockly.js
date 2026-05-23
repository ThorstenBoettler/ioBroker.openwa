/* eslint-disable no-undef */
/* global Blockly, systemLang, main */
'use strict';

Blockly.Words['openwa']             = {'en': 'WhatsApp (Open-WA)',       'de': 'WhatsApp (Open-WA)'};
Blockly.Words['openwa_private']     = {'en': 'Private Chat',             'de': 'Privater Chat'};
Blockly.Words['openwa_group']       = {'en': 'Group Chat',               'de': 'Gruppen Chat'};
Blockly.Words['openwa_message']     = {'en': 'Message',                  'de': 'Nachricht'};
Blockly.Words['openwa_phone']       = {'en': 'ChatID',                   'de': 'ChatID'};
Blockly.Words['openwa_anyInstance'] = {'en': 'all instances',            'de': 'Alle Instanzen'};
Blockly.Words['openwa_tooltip']     = {'en': 'Send WhatsApp via Open-WA', 'de': 'Sende eine WhatsApp-Nachricht über Open-WA'};
Blockly.Words['openwa_response']    = {'en': 'with result in',           'de': 'Ergebnis in'};
Blockly.Words['openwa_msg_type']       = {'en': 'Message Type',             'de': 'Nachrichtentyp'};
Blockly.Words['openwa_type_text']      = {'en': 'Text Message',             'de': 'Textnachricht'};
Blockly.Words['openwa_type_image']     = {'en': 'Image Message',            'de': 'Bildnachricht'};
Blockly.Words['openwa_type_video']     = {'en': 'Video Message',            'de': 'Videonachricht'};
Blockly.Words['openwa_type_audio']     = {'en': 'Audio/Voice Message',      'de': 'Audio/Sprachnachricht'};
Blockly.Words['openwa_type_document']  = {'en': 'Document',                 'de': 'Dokument'};
Blockly.Words['openwa_url']            = {'en': 'URL (optional)',           'de': 'URL (optional)'};
Blockly.Words['openwa_base64']         = {'en': 'Base64 String (optional)', 'de': 'Base64 String (optional)'};
Blockly.Words['openwa_mimetype']       = {'en': 'MIME-Type',                'de': 'MIME-Type'};
Blockly.Words['openwa_caption']        = {'en': 'Caption (optional)',    'de': 'Bildunterschrift (optional)'};

Blockly.Sendto.blocks['openwa'] =
    '<block type="openwa">'
    + '     <value name="INSTANCE"></value>'
    + '     <field name="CHAT_TYPE">private</field>'
    + '     <field name="MSG_TYPE">text</field>'
    + '     <value name="MESSAGE"><shadow type="text"><field name="TEXT"></field></shadow></value>'
    + '     <value name="PHONE"><shadow type="text"><field name="TEXT"></field></shadow></value>'
    + '     <value name="URL"><shadow type="text"><field name="TEXT"></field></shadow></value>'
    + '     <value name="BASE64"><shadow type="text"><field name="TEXT"></field></shadow></value>'
    + '     <field name="MIME_TYPE">auto</field>'
    + '     <value name="CAPTION"><shadow type="text"><field name="TEXT"></field></shadow></value>'
    + '</block>';

Blockly.Blocks['openwa'] = {
    init: function() {
        var options = [[Blockly.Words['openwa_anyInstance'][systemLang], '']];
        if (typeof main !== 'undefined' && main.instances) {
            for (var i = 0; i < main.instances.length; i++) {
                var m = main.instances[i].match(/^system.adapter.openwa.(\d+)$/);
                if (m) {
                    var k = parseInt(m[1], 10);
                    options.push(['openwa.' + k, '.' + k]);
                }
            }
            if (options.length === 1) {
                for (var u = 0; u <= 4; u++) {
                    options.push(['openwa.' + u, '.' + u]);
                }
            }
        } else {
            for (var n = 0; n <= 4; n++) {
                options.push(['openwa.' + n, '.' + n]);
            }
        }

        this.appendDummyInput('INSTANCE')
            .appendField(Blockly.Words['openwa'][systemLang])
            .appendField(new Blockly.FieldDropdown(options), 'INSTANCE');

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Words['openwa_private'][systemLang], 'private'],
                [Blockly.Words['openwa_group'][systemLang], 'group']
            ]), "CHAT_TYPE");

        this.appendDummyInput()
        .appendField(Blockly.Words['openwa_msg_type'][systemLang])
        .appendField(new Blockly.FieldDropdown([
            [Blockly.Words['openwa_type_text'][systemLang], "text"],
            [Blockly.Words['openwa_type_image'][systemLang], "image"],
            [Blockly.Words['openwa_type_video'][systemLang], "video"],
            [Blockly.Words['openwa_type_audio'][systemLang], "audio"],
            [Blockly.Words['openwa_type_document'][systemLang], "document"]
        ]), "MSG_TYPE");

        this.appendValueInput('MESSAGE')
            .appendField(Blockly.Words['openwa_message'][systemLang]);

        this.appendValueInput('PHONE')
            .setCheck('String')
            .appendField(Blockly.Words['openwa_phone'][systemLang]);

        this.appendValueInput('URL')
            .setCheck('String')
            .appendField(Blockly.Words['openwa_url'][systemLang]);

        this.appendValueInput('BASE64')
            .setCheck('String')
            .appendField(Blockly.Words['openwa_base64'][systemLang]);

        this.appendDummyInput()
            .appendField(Blockly.Words['openwa_mimetype'][systemLang])
            .appendField(new Blockly.FieldDropdown([
                ["auto", "auto"],
                ["image/jpeg", "image/jpeg"],
                ["image/png", "image/png"],
                ["image/webp", "image/webp"],
                ["video/mp4", "video/mp4"],
                ["audio/mpeg", "audio/mpeg"],
                ["audio/ogg; codecs=opus", "audio/ogg; codecs=opus"],
                ["application/pdf", "application/pdf"]
            ]), "MIME_TYPE");

        this.appendValueInput('CAPTION')
            .setCheck('String')
            .appendField(Blockly.Words['openwa_caption'][systemLang]);

        this.appendStatementInput('ON_RESPONSE')
            .setCheck(null)
            .appendField(Blockly.Words['openwa_response'][systemLang])
            .appendField(new Blockly.FieldVariable('result'), 'VAR');

        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Sendto.HUE);
        this.setTooltip(Blockly.Words['openwa_tooltip'][systemLang]);
    }
};

Blockly.JavaScript['openwa'] = function(block) {
    var dropdown_instance = block.getFieldValue('INSTANCE') || '';
    var dropdown_chat_type = block.getFieldValue('CHAT_TYPE') || 'private';
    var dropdown_msg_type = block.getFieldValue('MSG_TYPE') || 'text';
    var dropdown_mimetype = block.getFieldValue('MIME_TYPE') || 'auto';
    var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC) || "''";
    var value_phone = Blockly.JavaScript.valueToCode(block, 'PHONE', Blockly.JavaScript.ORDER_ATOMIC) || "''";
    var value_url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC) || "''";
    var value_base64 = Blockly.JavaScript.valueToCode(block, 'BASE64', Blockly.JavaScript.ORDER_ATOMIC) || "''";
    var value_caption = Blockly.JavaScript.valueToCode(block, 'CAPTION', Blockly.JavaScript.ORDER_ATOMIC) || "''";

    var variable_name = 'result';
    try {
        var varId = block.getFieldValue('VAR');
        if (block.workspace && block.workspace.getVariableById) {
            var variable = block.workspace.getVariableById(varId);
            if (variable) {
                variable_name = variable.name;
            }
        } else if (Blockly.JavaScript.variableDB_) {
            variable_name = Blockly.JavaScript.variableDB_.getName(varId, Blockly.Variables.NAME_TYPE);
        }
    } catch (e) {
        variable_name = 'result';
    }

    var branch = Blockly.JavaScript.statementToCode(block, 'ON_RESPONSE');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);

    var adapterInstance = 'openwa' + (dropdown_instance ? dropdown_instance : '.0');
    var messageObj = "{\n" +
        "        to: " + value_phone + ",\n" +
        "        text: " + value_message + ",\n" +
        "        chatType: '" + dropdown_chat_type + "',\n" +
        "        msgType: '" + dropdown_msg_type + "',\n" +
        "        url: " + value_url + ",\n" +
        "        base64: " + value_base64 + ",\n" +
        "        mimeType: '" + dropdown_mimetype + "',\n" +
        "        caption: " + value_caption + "\n" +
        "    }";

    if (branch) {
        return "sendTo('" + adapterInstance + "', 'send', " + messageObj + ", async function (" + variable_name + ") {\n" + branch + "});\n";
    } else {
        return "sendTo('" + adapterInstance + "', 'send', " + messageObj + ");\n";
    }
};