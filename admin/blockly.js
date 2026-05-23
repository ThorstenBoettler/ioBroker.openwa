/* eslint-disable no-undef */
/* global Blockly, systemLang, main */
'use strict';

Blockly.Words['openwa']             = {'en': 'WhatsApp (Open-WA)',       'de': 'WhatsApp (Open-WA)'};
Blockly.Words['openwa_private']     = {'en': 'Private Chat',             'de': 'Privater Chat'};
Blockly.Words['openwa_group']       = {'en': 'Group Chat',               'de': 'Gruppen Chat'};
Blockly.Words['openwa_message']     = {'en': 'message',                  'de': 'Meldung'};
Blockly.Words['openwa_phone']       = {'en': 'Recipient (phone number)', 'de': 'Empfänger (Telefonnummer)'};
Blockly.Words['openwa_anyInstance'] = {'en': 'all instances',            'de': 'Alle Instanzen'};
Blockly.Words['openwa_tooltip']     = {'en': 'Send WhatsApp via Open-WA', 'de': 'Sende eine WhatsApp-Nachricht über Open-WA'};
Blockly.Words['openwa_response']    = {'en': 'with result in',           'de': 'Ergebnis in'};

Blockly.Sendto.blocks['openwa'] =
    '<block type="openwa">'
    + '     <value name="INSTANCE">'
    + '     </value>'
    + '     <field name="CHAT_TYPE">private</field>'
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

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Words['openwa_private'][systemLang], 'private'],
                [Blockly.Words['openwa_group'][systemLang], 'group']
            ]), "CHAT_TYPE");

        this.appendValueInput('MESSAGE')
            .appendField(Blockly.Words['openwa_message'][systemLang]);

        this.appendValueInput('PHONE')
            .setCheck('String')
            .appendField(Blockly.Words['openwa_phone'][systemLang]);

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
    var dropdown_type = block.getFieldValue('CHAT_TYPE') || 'private';
    var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC) || "''";
    var value_phone = Blockly.JavaScript.valueToCode(block, 'PHONE', Blockly.JavaScript.ORDER_ATOMIC) || "''";

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
    var messageObj = "{ to: " + value_phone + ", text: " + value_message + ", type: '" + dropdown_type + "' }";

    if (branch) {
        return "sendTo('" + adapterInstance + "', 'send', " + messageObj + ", async function (" + variable_name + ") {\n" + branch + "});\n";
    } else {
        return "sendTo('" + adapterInstance + "', 'send', " + messageObj + ");\n";
    }
};