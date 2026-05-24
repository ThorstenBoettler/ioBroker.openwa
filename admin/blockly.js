/* eslint-disable no-undef */
/* global Blockly, systemLang, main */
'use strict';

Blockly.Words['openwa'] = {
    'en': 'WhatsApp (Open-WA)',
    'de': 'WhatsApp (Open-WA)',
    'es': 'WhatsApp (Open-WA)',
    'fr': 'WhatsApp (Open-WA)',
    'it': 'WhatsApp (Open-WA)',
    'nl': 'WhatsApp (Open-WA)',
    'pl': 'WhatsApp (Open-WA)',
    'pt': 'WhatsApp (Open-WA)',
    'ru': 'WhatsApp (Open-WA)',
    'uk': 'WhatsApp (Open-WA)',
    'zh-cn': 'WhatsApp (Open-WA)'
};

Blockly.Words['openwa_private'] = {
    'en': 'Private Chat',
    'de': 'Privater Chat',
    'es': 'Chat privado',
    'fr': 'Chat privé',
    'it': 'Chat privato',
    'nl': 'Privéchat',
    'pl': 'Czat prywatny',
    'pt': 'Chat privado',
    'ru': 'Приватный чат',
    'uk': 'Приватний чат',
    'zh-cn': '私聊'
};

Blockly.Words['openwa_group'] = {
    'en': 'Group Chat',
    'de': 'Gruppen Chat',
    'es': 'Chat de grupo',
    'fr': 'Chat de groupe',
    'it': 'Chat di gruppo',
    'nl': 'Groepschat',
    'pl': 'Czat grupowy',
    'pt': 'Chat de grupo',
    'ru': 'Групповой чат',
    'uk': 'Груповий чат',
    'zh-cn': '群聊'
};

Blockly.Words['openwa_message'] = {
    'en': 'Message',
    'de': 'Nachricht',
    'es': 'Mensaje',
    'fr': 'Message',
    'it': 'Messaggio',
    'nl': 'Bericht',
    'pl': 'Wiadomość',
    'pt': 'Mensagem',
    'ru': 'Сообщение',
    'uk': 'Повідомлення',
    'zh-cn': '消息'
};

Blockly.Words['openwa_phone'] = {
    'en': 'ChatID',
    'de': 'ChatID',
    'es': 'ChatID',
    'fr': 'ChatID',
    'it': 'ChatID',
    'nl': 'ChatID',
    'pl': 'ChatID',
    'pt': 'ChatID',
    'ru': 'ChatID',
    'uk': 'ChatID',
    'zh-cn': 'ChatID'
};

Blockly.Words['openwa_anyInstance'] = {
    'en': 'all instances',
    'de': 'Alle Instanzen',
    'es': 'todas las instancias',
    'fr': 'toutes les instances',
    'it': 'tutte le istanze',
    'nl': 'alle instanties',
    'pl': 'wszystkie instancje',
    'pt': 'todas as instâncias',
    'ru': 'все экземпляры',
    'uk': 'всі екземпляри',
    'zh-cn': '所有实例'
};

Blockly.Words['openwa_tooltip'] = {
    'en': 'Send WhatsApp via Open-WA',
    'de': 'Sende eine WhatsApp-Nachricht über Open-WA',
    'es': 'Enviar WhatsApp a través de Open-WA',
    'fr': 'Envoyer un message WhatsApp via Open-WA',
    'it': 'Invia WhatsApp tramite Open-WA',
    'nl': 'Verzend WhatsApp via Open-WA',
    'pl': 'Wyślij WhatsApp przez Open-WA',
    'pt': 'Enviar WhatsApp via Open-WA',
    'ru': 'Отправить сообщение WhatsApp через Open-WA',
    'uk': 'Надіслати повідомлення WhatsApp через Open-WA',
    'zh-cn': '通过 Open-WA 发送 WhatsApp 消息'
};

Blockly.Words['openwa_response'] = {
    'en': 'with result in',
    'de': 'Ergebnis in',
    'es': 'con resultado en',
    'fr': 'avec le résultat dans',
    'it': 'con risultato in',
    'nl': 'met resultaat in',
    'pl': 'z wynikiem w',
    'pt': 'com resultado em',
    'ru': 'с результатом в',
    'uk': 'з результатом в',
    'zh-cn': '结果存入'
};

Blockly.Words['openwa_msg_type'] = {
    'en': 'Message Type',
    'de': 'Nachrichtentyp',
    'es': 'Tipo de mensaje',
    'fr': 'Type de message',
    'it': 'Tipo di messaggio',
    'nl': 'Berichttype',
    'pl': 'Typ wiadomości',
    'pt': 'Tipo de mensagem',
    'ru': 'Тип сообщения',
    'uk': 'Тип повідомлення',
    'zh-cn': '消息类型'
};

Blockly.Words['openwa_type_text'] = {
    'en': 'Text Message',
    'de': 'Textnachricht',
    'es': 'Mensaje de texto',
    'fr': 'Message texte',
    'it': 'Messaggio di testo',
    'nl': 'Tekstbericht',
    'pl': 'Wiadomość tekstowa',
    'pt': 'Mensagem de texto',
    'ru': 'Текстовое сообщение',
    'uk': 'Текстове повідомлення',
    'zh-cn': '文本消息'
};

Blockly.Words['openwa_type_image'] = {
    'en': 'Image Message',
    'de': 'Bildnachricht',
    'es': 'Mensaje de imagen',
    'fr': 'Message image',
    'it': 'Messaggio con immagine',
    'nl': 'Afbeeldingsbericht',
    'pl': 'Wiadomość graficzna',
    'pt': 'Mensagem de imagem',
    'ru': 'Изображение',
    'uk': 'Зображення',
    'zh-cn': '图片消息'
};

Blockly.Words['openwa_type_video'] = {
    'en': 'Video Message',
    'de': 'Videonachricht',
    'es': 'Mensaje de video',
    'fr': 'Message vidéo',
    'it': 'Messaggio video',
    'nl': 'Videobericht',
    'pl': 'Wiadomość wideo',
    'pt': 'Mensagem de vídeo',
    'ru': 'Видеосообщение',
    'uk': 'Відеоповідомлення',
    'zh-cn': '视频消息'
};

Blockly.Words['openwa_type_audio'] = {
    'en': 'Audio/Voice Message',
    'de': 'Audio/Sprachnachricht',
    'es': 'Mensaje de audio/voz',
    'fr': 'Message audio/vocal',
    'it': 'Messaggio audio/vocale',
    'nl': 'Audio-/Spraakbericht',
    'pl': 'Wiadomość audio/głosowa',
    'pt': 'Mensagem de áudio/voz',
    'ru': 'Аудио/Голосовое сообщение',
    'uk': 'Аудіо/Голосове повідомлення',
    'zh-cn': '音频/语音消息'
};

Blockly.Words['openwa_type_document'] = {
    'en': 'Document',
    'de': 'Dokument',
    'es': 'Documento',
    'fr': 'Document',
    'it': 'Documento',
    'nl': 'Document',
    'pl': 'Dokument',
    'pt': 'Documento',
    'ru': 'Документ',
    'uk': 'Документ',
    'zh-cn': '文档'
};

Blockly.Words['openwa_url'] = {
    'en': 'URL (optional)',
    'de': 'URL (optional)',
    'es': 'URL (opcional)',
    'fr': 'URL (optionnel)',
    'it': 'URL (opzionale)',
    'nl': 'URL (optioneel)',
    'pl': 'URL (opcjonalnie)',
    'pt': 'URL (opcional)',
    'ru': 'URL (необязательно)',
    'uk': 'URL (необов\'язково)',
    'zh-cn': 'URL (可选)'
};

Blockly.Words['openwa_base64'] = {
    'en': 'Base64 String (optional)',
    'de': 'Base64 String (optional)',
    'es': 'Cadena Base64 (opcional)',
    'fr': 'Chaîne Base64 (optionnel)',
    'it': 'Stringa Base64 (opzionale)',
    'nl': 'Base64-string (optioneel)',
    'pl': 'Ciąg Base64 (opcjonalnie)',
    'pt': 'String Base64 (opcional)',
    'ru': 'Строка Base64 (необязательно)',
    'uk': 'Рядок Base64 (необов\'язково)',
    'zh-cn': 'Base64 字符串 (可选)'
};

Blockly.Words['openwa_mimetype'] = {
    'en': 'MIME-Type',
    'de': 'MIME-Type',
    'es': 'Tipo MIME',
    'fr': 'Type MIME',
    'it': 'Tipo MIME',
    'nl': 'MIME-type',
    'pl': 'Typ MIME',
    'pt': 'Tipo MIME',
    'ru': 'MIME-тип',
    'uk': 'MIME-тип',
    'zh-cn': 'MIME 类型'
};

Blockly.Words['openwa_caption'] = {
    'en': 'Caption (optional)',
    'de': 'Bildunterschrift (optional)',
    'es': 'Subtítulo (opcional)',
    'fr': 'Légende (optionnel)',
    'it': 'Didascalia (opzionale)',
    'nl': 'Onderschrift (optioneel)',
    'pl': 'Podpis (opcjonalnie)',
    'pt': 'Legenda (opcional)',
    'ru': 'Подпись (необязательно)',
    'uk': 'Підпис (необов\'язково)',
    'zh-cn': '说明/标题 (可选)'
};
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