/* eslint-disable no-undef */
/* global Blockly, systemLang, main */
'use strict';

Blockly.Words['openwa']             = {'en': 'WhatsApp (Open-WA)',       'de': 'WhatsApp (Open-WA)'};
Blockly.Words['openwa_message']     = {'en': 'message',                  'de': 'Meldung'};
Blockly.Words['openwa_phone']       = {'en': 'Recipient (phone number)', 'de': 'Empfänger (Telefonnummer)'};
Blockly.Words['openwa_anyInstance'] = {'en': 'all instances',            'de': 'Alle Instanzen'};
Blockly.Words['openwa_tooltip']     = {'en': 'Send WhatsApp via Open-WA', 'de': 'Sende eine WhatsApp-Nachricht über Open-WA'};

Blockly.Sendto.blocks['openwa'] =
    '<block type="openwa">'
    + '     <value name="INSTANCE">'
    + '     </value>'
    + '     <value name="MESSAGE">'
    + '         <shadow type="text">'
    + '             <field name="TEXT">text</field>'
    + '         </shadow>'
    + '     </value>'
    + '     <value name="PHONE">'
    + '         <shadow type="text">'
    + '             <field name="TEXT">49162...</field>'
    + '         </shadow>'
    + '     </value>'
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

        this.appendValueInput('MESSAGE')
            .appendField(Blockly.Words['openwa_message'][systemLang]);

        this.appendValueInput('PHONE')
            .setCheck('String')
            .appendField(Blockly.Words['openwa_phone'][systemLang]);

        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Sendto.HUE);
        this.setTooltip(Blockly.Words['openwa_tooltip'][systemLang]);
    }
};

Blockly.JavaScript['openwa'] = function(block) {
    var dropdown_instance = block.getFieldValue('INSTANCE') || '';
    var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC) || "''";
    var value_phone = Blockly.JavaScript.valueToCode(block, 'PHONE', Blockly.JavaScript.ORDER_ATOMIC) || "''";

    var adapterInstance = 'openwa' + (dropdown_instance ? dropdown_instance : '.0');
    return "sendTo('" + adapterInstance + "', 'send', { to: " + value_phone + ", text: " + value_message + " });\n";
};