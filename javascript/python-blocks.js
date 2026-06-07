/* =============================================
   PYTHON-BLOCKS.JS - كتل مخصصة لمكتبات Python الأساسية
   ============================================= */

/**
 * تسجيل كتل مكتبة Random
 */

// random.randint(a, b) - رقم عشوائي بين a و b
Blockly.Blocks['python_random_randint'] = {
    init: function () {
        this.appendValueInput("MIN")
            .setCheck("Number")
            .appendField("random.randint من");
        this.appendValueInput("MAX")
            .setCheck("Number")
            .appendField("إلى");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("يعطي رقم عشوائي بين قيمتين");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_random_randint'] = function (block) {
    var value_min = Blockly.Python.valueToCode(block, 'MIN', Blockly.Python.ORDER_ATOMIC) || '0';
    var value_max = Blockly.Python.valueToCode(block, 'MAX', Blockly.Python.ORDER_ATOMIC) || '10';

    Blockly.Python.definitions_['import_random'] = 'import random';

    var code = 'random.randint(' + value_min + ', ' + value_max + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// random.choice(list) - اختيار عنصر عشوائي من قائمة
Blockly.Blocks['python_random_choice'] = {
    init: function () {
        this.appendValueInput("LIST")
            .setCheck("Array")
            .appendField("random.choice اختر عشوائياً من");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("يختار عنصر عشوائي من قائمة");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_random_choice'] = function (block) {
    var value_list = Blockly.Python.valueToCode(block, 'LIST', Blockly.Python.ORDER_ATOMIC) || '[]';

    Blockly.Python.definitions_['import_random'] = 'import random';

    var code = 'random.choice(' + value_list + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// random.random() - رقم عشوائي بين 0 و 1
Blockly.Blocks['python_random_random'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("random.random() رقم عشوائي من 0 إلى 1");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("يعطي رقم عشري عشوائي بين 0 و 1");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_random_random'] = function (block) {
    Blockly.Python.definitions_['import_random'] = 'import random';

    var code = 'random.random()';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

/**
 * تسجيل كتل مكتبة Time
 */

// time.sleep(seconds) - توقف البرنامج لفترة
Blockly.Blocks['python_time_sleep'] = {
    init: function () {
        this.appendValueInput("SECONDS")
            .setCheck("Number")
            .appendField("time.sleep انتظر");
        this.appendDummyInput()
            .appendField("ثانية");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("توقف تنفيذ البرنامج لعدد معين من الثواني");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_time_sleep'] = function (block) {
    var value_seconds = Blockly.Python.valueToCode(block, 'SECONDS', Blockly.Python.ORDER_ATOMIC) || '1';

    Blockly.Python.definitions_['import_time'] = 'import time';

    var code = 'time.sleep(' + value_seconds + ')\n';
    return code;
};

// time.time() - الوقت الحالي بالثواني
Blockly.Blocks['python_time_time'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("time.time() الوقت الحالي");
        this.setOutput(true, "Number");
        this.setColour(120);
        this.setTooltip("يعطي الوقت الحالي بالثواني منذ 1970");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_time_time'] = function (block) {
    Blockly.Python.definitions_['import_time'] = 'import time';

    var code = 'time.time()';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

/**
 * تسجيل كتل مكتبة Math المتقدمة
 */

// math.sqrt() - الجذر التربيعي
Blockly.Blocks['python_math_sqrt'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("math.sqrt الجذر التربيعي لـ");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("يحسب الجذر التربيعي للرقم");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_math_sqrt'] = function (block) {
    var value_num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC) || '0';

    Blockly.Python.definitions_['import_math'] = 'import math';

    var code = 'math.sqrt(' + value_num + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// math.pow() - الأس
Blockly.Blocks['python_math_pow'] = {
    init: function () {
        this.appendValueInput("BASE")
            .setCheck("Number")
            .appendField("math.pow");
        this.appendValueInput("EXP")
            .setCheck("Number")
            .appendField("أس");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("يحسب الرقم الأول مرفوع للأس الثاني");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_math_pow'] = function (block) {
    var value_base = Blockly.Python.valueToCode(block, 'BASE', Blockly.Python.ORDER_ATOMIC) || '0';
    var value_exp = Blockly.Python.valueToCode(block, 'EXP', Blockly.Python.ORDER_ATOMIC) || '2';

    Blockly.Python.definitions_['import_math'] = 'import math';

    var code = 'math.pow(' + value_base + ', ' + value_exp + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// math.floor() - تقريب للأسفل
Blockly.Blocks['python_math_floor'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("math.floor تقريب للأسفل");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("يقرب الرقم للأسفل إلى أقرب عدد صحيح");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_math_floor'] = function (block) {
    var value_num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC) || '0';

    Blockly.Python.definitions_['import_math'] = 'import math';

    var code = 'math.floor(' + value_num + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// math.ceil() - تقريب للأعلى
Blockly.Blocks['python_math_ceil'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("math.ceil تقريب للأعلى");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("يقرب الرقم للأعلى إلى أقرب عدد صحيح");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_math_ceil'] = function (block) {
    var value_num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC) || '0';

    Blockly.Python.definitions_['import_math'] = 'import math';

    var code = 'math.ceil(' + value_num + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// math.pi - ثابت باي
Blockly.Blocks['python_math_pi'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("math.pi (π = 3.14159...)");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("قيمة π (باي)");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_math_pi'] = function (block) {
    Blockly.Python.definitions_['import_math'] = 'import math';

    var code = 'math.pi';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

/**
 * تسجيل كتل مكتبة Datetime
 */

// datetime.now() - التاريخ والوقت الحالي
Blockly.Blocks['python_datetime_now'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("datetime.now() التاريخ والوقت الحالي");
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip("يعطي التاريخ والوقت الحالي");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_datetime_now'] = function (block) {
    Blockly.Python.definitions_['import_datetime'] = 'from datetime import datetime';

    var code = 'datetime.now()';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// استخراج السنة من datetime
Blockly.Blocks['python_datetime_year'] = {
    init: function () {
        this.appendValueInput("DATETIME")
            .appendField("استخرج السنة من");
        this.setOutput(true, "Number");
        this.setColour(290);
        this.setTooltip("يستخرج السنة من تاريخ");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_datetime_year'] = function (block) {
    var value_datetime = Blockly.Python.valueToCode(block, 'DATETIME', Blockly.Python.ORDER_MEMBER) || 'datetime.now()';

    Blockly.Python.definitions_['import_datetime'] = 'from datetime import datetime';

    var code = value_datetime + '.year';
    return [code, Blockly.Python.ORDER_MEMBER];
};

// استخراج الشهر من datetime
Blockly.Blocks['python_datetime_month'] = {
    init: function () {
        this.appendValueInput("DATETIME")
            .appendField("استخرج الشهر من");
        this.setOutput(true, "Number");
        this.setColour(290);
        this.setTooltip("يستخرج الشهر من تاريخ");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_datetime_month'] = function (block) {
    var value_datetime = Blockly.Python.valueToCode(block, 'DATETIME', Blockly.Python.ORDER_MEMBER) || 'datetime.now()';

    Blockly.Python.definitions_['import_datetime'] = 'from datetime import datetime';

    var code = value_datetime + '.month';
    return [code, Blockly.Python.ORDER_MEMBER];
};

// استخراج اليوم من datetime
Blockly.Blocks['python_datetime_day'] = {
    init: function () {
        this.appendValueInput("DATETIME")
            .appendField("استخرج اليوم من");
        this.setOutput(true, "Number");
        this.setColour(290);
        this.setTooltip("يستخرج اليوم من تاريخ");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_datetime_day'] = function (block) {
    var value_datetime = Blockly.Python.valueToCode(block, 'DATETIME', Blockly.Python.ORDER_MEMBER) || 'datetime.now()';

    Blockly.Python.definitions_['import_datetime'] = 'from datetime import datetime';

    var code = value_datetime + '.day';
    return [code, Blockly.Python.ORDER_MEMBER];
};

/**
 * كتل إضافية مفيدة
 */

// input() - قراءة مدخل من المستخدم
Blockly.Blocks['python_input'] = {
    init: function () {
        this.appendValueInput("PROMPT")
            .setCheck("String")
            .appendField("input() اقرأ من المستخدم رسالة:");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("يطلب من المستخدم إدخال نص");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_input'] = function (block) {
    var value_prompt = Blockly.Python.valueToCode(block, 'PROMPT', Blockly.Python.ORDER_ATOMIC) || '""';

    var code = 'input(' + value_prompt + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// int() - تحويل إلى عدد صحيح
Blockly.Blocks['python_int'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .appendField("int() حول إلى رقم صحيح");
        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip("يحول النص أو الرقم العشري إلى عدد صحيح");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_int'] = function (block) {
    var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';

    var code = 'int(' + value_value + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// float() - تحويل إلى عدد عشري
Blockly.Blocks['python_float'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .appendField("float() حول إلى رقم عشري");
        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip("يحول النص أو الرقم إلى عدد عشري");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_float'] = function (block) {
    var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';

    var code = 'float(' + value_value + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// str() - تحويل إلى نص
Blockly.Blocks['python_str'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .appendField("str() حول إلى نص");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("يحول أي قيمة إلى نص");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_str'] = function (block) {
    var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '""';

    var code = 'str(' + value_value + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// len() - طول القائمة أو النص
Blockly.Blocks['python_len'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .appendField("len() طول");
        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip("يعطي طول النص أو القائمة");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_len'] = function (block) {
    var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '""';

    var code = 'len(' + value_value + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// range() - إنشاء مدى رقمي
Blockly.Blocks['python_range'] = {
    init: function () {
        this.appendValueInput("START")
            .setCheck("Number")
            .appendField("range من");
        this.appendValueInput("STOP")
            .setCheck("Number")
            .appendField("إلى");
        this.setOutput(true, "Array");
        this.setColour(260);
        this.setTooltip("ينشئ مدى من الأرقام");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_range'] = function (block) {
    var value_start = Blockly.Python.valueToCode(block, 'START', Blockly.Python.ORDER_ATOMIC) || '0';
    var value_stop = Blockly.Python.valueToCode(block, 'STOP', Blockly.Python.ORDER_ATOMIC) || '10';

    var code = 'range(' + value_start + ', ' + value_stop + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};
