/* =============================================
   PYTHON-BLOCKS.JS - Custom blocks for core Python libraries
   ============================================= */

// =============================================
// Random Library Blocks
// =============================================

Blockly.Blocks['python_random_randint'] = {
    init: function () {
        this.appendValueInput("MIN")
            .setCheck("Number")
            .appendField("random.randint from");
        this.appendValueInput("MAX")
            .setCheck("Number")
            .appendField("to");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Returns a random integer between two values");
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

Blockly.Blocks['python_random_choice'] = {
    init: function () {
        this.appendValueInput("LIST")
            .setCheck("Array")
            .appendField("random.choice pick from");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("Picks a random element from a list");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_random_choice'] = function (block) {
    var value_list = Blockly.Python.valueToCode(block, 'LIST', Blockly.Python.ORDER_ATOMIC) || '[]';
    Blockly.Python.definitions_['import_random'] = 'import random';
    var code = 'random.choice(' + value_list + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_random_random'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("random.random() random float 0 to 1");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Returns a random decimal number between 0 and 1");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_random_random'] = function (block) {
    Blockly.Python.definitions_['import_random'] = 'import random';
    var code = 'random.random()';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// =============================================
// Time Library Blocks
// =============================================

Blockly.Blocks['python_time_sleep'] = {
    init: function () {
        this.appendValueInput("SECONDS")
            .setCheck("Number")
            .appendField("time.sleep wait");
        this.appendDummyInput()
            .appendField("seconds");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Pauses the program for a given number of seconds");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_time_sleep'] = function (block) {
    var value_seconds = Blockly.Python.valueToCode(block, 'SECONDS', Blockly.Python.ORDER_ATOMIC) || '1';
    Blockly.Python.definitions_['import_time'] = 'import time';
    var code = 'time.sleep(' + value_seconds + ')\n';
    return code;
};

Blockly.Blocks['python_time_time'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("time.time() current time");
        this.setOutput(true, "Number");
        this.setColour(120);
        this.setTooltip("Returns the current time in seconds since 1970");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_time_time'] = function (block) {
    Blockly.Python.definitions_['import_time'] = 'import time';
    var code = 'time.time()';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// =============================================
// Advanced Math Library Blocks
// =============================================

Blockly.Blocks['python_math_sqrt'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("math.sqrt square root of");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Calculates the square root of a number");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_math_sqrt'] = function (block) {
    var value_num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.definitions_['import_math'] = 'import math';
    var code = 'math.sqrt(' + value_num + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_math_pow'] = {
    init: function () {
        this.appendValueInput("BASE")
            .setCheck("Number")
            .appendField("math.pow");
        this.appendValueInput("EXP")
            .setCheck("Number")
            .appendField("to the power");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Calculates the first number raised to the power of the second");
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

Blockly.Blocks['python_math_floor'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("math.floor round down");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Rounds a number down to the nearest integer");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_math_floor'] = function (block) {
    var value_num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.definitions_['import_math'] = 'import math';
    var code = 'math.floor(' + value_num + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_math_ceil'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("math.ceil round up");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Rounds a number up to the nearest integer");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_math_ceil'] = function (block) {
    var value_num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.definitions_['import_math'] = 'import math';
    var code = 'math.ceil(' + value_num + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_math_pi'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("math.pi (π = 3.14159...)");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("The value of π (pi)");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_math_pi'] = function (block) {
    Blockly.Python.definitions_['import_math'] = 'import math';
    var code = 'math.pi';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

// =============================================
// Datetime Library Blocks
// =============================================

Blockly.Blocks['python_datetime_now'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("datetime.now() current date & time");
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip("Returns the current date and time");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_datetime_now'] = function (block) {
    Blockly.Python.definitions_['import_datetime'] = 'from datetime import datetime';
    var code = 'datetime.now()';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_datetime_year'] = {
    init: function () {
        this.appendValueInput("DATETIME")
            .appendField("extract year from");
        this.setOutput(true, "Number");
        this.setColour(290);
        this.setTooltip("Extracts the year from a date");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_datetime_year'] = function (block) {
    var value_datetime = Blockly.Python.valueToCode(block, 'DATETIME', Blockly.Python.ORDER_MEMBER) || 'datetime.now()';
    Blockly.Python.definitions_['import_datetime'] = 'from datetime import datetime';
    var code = value_datetime + '.year';
    return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Blocks['python_datetime_month'] = {
    init: function () {
        this.appendValueInput("DATETIME")
            .appendField("extract month from");
        this.setOutput(true, "Number");
        this.setColour(290);
        this.setTooltip("Extracts the month from a date");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_datetime_month'] = function (block) {
    var value_datetime = Blockly.Python.valueToCode(block, 'DATETIME', Blockly.Python.ORDER_MEMBER) || 'datetime.now()';
    Blockly.Python.definitions_['import_datetime'] = 'from datetime import datetime';
    var code = value_datetime + '.month';
    return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Blocks['python_datetime_day'] = {
    init: function () {
        this.appendValueInput("DATETIME")
            .appendField("extract day from");
        this.setOutput(true, "Number");
        this.setColour(290);
        this.setTooltip("Extracts the day from a date");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_datetime_day'] = function (block) {
    var value_datetime = Blockly.Python.valueToCode(block, 'DATETIME', Blockly.Python.ORDER_MEMBER) || 'datetime.now()';
    Blockly.Python.definitions_['import_datetime'] = 'from datetime import datetime';
    var code = value_datetime + '.day';
    return [code, Blockly.Python.ORDER_MEMBER];
};

// =============================================
// Additional Useful Blocks
// =============================================

Blockly.Blocks['python_input'] = {
    init: function () {
        this.appendValueInput("PROMPT")
            .setCheck("String")
            .appendField("input() read from user:");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Asks the user to enter text");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_input'] = function (block) {
    var value_prompt = Blockly.Python.valueToCode(block, 'PROMPT', Blockly.Python.ORDER_ATOMIC) || '""';
    var code = 'input(' + value_prompt + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_int'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .appendField("int() convert to integer");
        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip("Converts text or decimal to an integer");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_int'] = function (block) {
    var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
    var code = 'int(' + value_value + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_float'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .appendField("float() convert to decimal");
        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip("Converts text or number to a decimal");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_float'] = function (block) {
    var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
    var code = 'float(' + value_value + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_str'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .appendField("str() convert to text");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Converts any value to text");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_str'] = function (block) {
    var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '""';
    var code = 'str(' + value_value + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_len'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .appendField("len() length of");
        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip("Returns the length of text or a list");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_len'] = function (block) {
    var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '""';
    var code = 'len(' + value_value + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_range'] = {
    init: function () {
        this.appendValueInput("START")
            .setCheck("Number")
            .appendField("range from");
        this.appendValueInput("STOP")
            .setCheck("Number")
            .appendField("to");
        this.setOutput(true, "Array");
        this.setColour(260);
        this.setTooltip("Creates a range of numbers");
        this.setHelpUrl("");
    }
};

Blockly.Python['python_range'] = function (block) {
    var value_start = Blockly.Python.valueToCode(block, 'START', Blockly.Python.ORDER_ATOMIC) || '0';
    var value_stop = Blockly.Python.valueToCode(block, 'STOP', Blockly.Python.ORDER_ATOMIC) || '10';
    var code = 'range(' + value_start + ', ' + value_stop + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};
