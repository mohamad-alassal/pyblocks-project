/* =============================================
   PYTHON-BLOCKS.JS - Tkinter GUI blocks
   ============================================= */

// =============================================
// TKINTER – Window & App
// =============================================

Blockly.Blocks['tk_create_window'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create tkinter window as")
            .appendField(new Blockly.FieldVariable("root"), "VAR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Creates the main tkinter window (Tk root)");
    }
};
Blockly.Python['tk_create_window'] = function (block) {
    var varName = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return varName + ' = tk.Tk()\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_set_title'] = {
    init: function () {
        this.appendValueInput("WINDOW")
            .appendField("set title of window");
        this.appendValueInput("TITLE")
            .setCheck("String")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Sets the window title");
    }
};
Blockly.Python['tk_set_title'] = function (block) {
    var win = Blockly.Python.valueToCode(block, 'WINDOW', Blockly.Python.ORDER_ATOMIC) || 'root';
    var title = Blockly.Python.valueToCode(block, 'TITLE', Blockly.Python.ORDER_ATOMIC) || '"My App"';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return win + '.title(' + title + ')\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_set_geometry'] = {
    init: function () {
        this.appendValueInput("WINDOW")
            .appendField("set size of window");
        this.appendValueInput("SIZE")
            .setCheck("String")
            .appendField("to (e.g. \"400x300\")");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Sets the window size, e.g. \"400x300\"");
    }
};
Blockly.Python['tk_set_geometry'] = function (block) {
    var win = Blockly.Python.valueToCode(block, 'WINDOW', Blockly.Python.ORDER_ATOMIC) || 'root';
    var size = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_ATOMIC) || '"400x300"';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return win + '.geometry(' + size + ')\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_mainloop'] = {
    init: function () {
        this.appendValueInput("WINDOW")
            .appendField("start mainloop for window");
        this.setPreviousStatement(true, null);
        this.setColour(290);
        this.setTooltip("Starts the tkinter event loop (must be the last line)");
    }
};
Blockly.Python['tk_mainloop'] = function (block) {
    var win = Blockly.Python.valueToCode(block, 'WINDOW', Blockly.Python.ORDER_ATOMIC) || 'root';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return win + '.mainloop()\n';
};

// =============================================
// TKINTER – Widgets
// =============================================

Blockly.Blocks['tk_label'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create Label as")
            .appendField(new Blockly.FieldVariable("label1"), "VAR");
        this.appendValueInput("PARENT")
            .appendField("in window/frame");
        this.appendValueInput("TEXT")
            .setCheck("String")
            .appendField("with text");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Creates a tkinter Label widget");
    }
};
Blockly.Python['tk_label'] = function (block) {
    var varName = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    var parent = Blockly.Python.valueToCode(block, 'PARENT', Blockly.Python.ORDER_ATOMIC) || 'root';
    var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '"Hello"';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return varName + ' = tk.Label(' + parent + ', text=' + text + ')\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_button'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create Button as")
            .appendField(new Blockly.FieldVariable("btn1"), "VAR");
        this.appendValueInput("PARENT")
            .appendField("in window/frame");
        this.appendValueInput("TEXT")
            .setCheck("String")
            .appendField("with text");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Creates a tkinter Button widget");
    }
};
Blockly.Python['tk_button'] = function (block) {
    var varName = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    var parent = Blockly.Python.valueToCode(block, 'PARENT', Blockly.Python.ORDER_ATOMIC) || 'root';
    var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '"Click me"';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return varName + ' = tk.Button(' + parent + ', text=' + text + ')\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_entry'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create Entry (text input) as")
            .appendField(new Blockly.FieldVariable("entry1"), "VAR");
        this.appendValueInput("PARENT")
            .appendField("in window/frame");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Creates a tkinter Entry widget for user text input");
    }
};
Blockly.Python['tk_entry'] = function (block) {
    var varName = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    var parent = Blockly.Python.valueToCode(block, 'PARENT', Blockly.Python.ORDER_ATOMIC) || 'root';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return varName + ' = tk.Entry(' + parent + ')\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_text_widget'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create Text area as")
            .appendField(new Blockly.FieldVariable("text1"), "VAR");
        this.appendValueInput("PARENT")
            .appendField("in window/frame");
        this.appendValueInput("WIDTH")
            .setCheck("Number")
            .appendField("width");
        this.appendValueInput("HEIGHT")
            .setCheck("Number")
            .appendField("height (rows)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Creates a multi-line Text widget");
    }
};
Blockly.Python['tk_text_widget'] = function (block) {
    var varName = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    var parent = Blockly.Python.valueToCode(block, 'PARENT', Blockly.Python.ORDER_ATOMIC) || 'root';
    var width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_ATOMIC) || '30';
    var height = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_ATOMIC) || '5';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return varName + ' = tk.Text(' + parent + ', width=' + width + ', height=' + height + ')\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_frame'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create Frame as")
            .appendField(new Blockly.FieldVariable("frame1"), "VAR");
        this.appendValueInput("PARENT")
            .appendField("in window/frame");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Creates a tkinter Frame container");
    }
};
Blockly.Python['tk_frame'] = function (block) {
    var varName = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    var parent = Blockly.Python.valueToCode(block, 'PARENT', Blockly.Python.ORDER_ATOMIC) || 'root';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return varName + ' = tk.Frame(' + parent + ')\n';
};

// =============================================
// TKINTER – Layout
// =============================================

Blockly.Blocks['tk_pack'] = {
    init: function () {
        this.appendValueInput("WIDGET")
            .appendField("pack widget");
        this.appendDummyInput()
            .appendField("side")
            .appendField(new Blockly.FieldDropdown([
                ["top", "tk.TOP"],
                ["bottom", "tk.BOTTOM"],
                ["left", "tk.LEFT"],
                ["right", "tk.RIGHT"]
            ]), "SIDE");
        this.appendDummyInput()
            .appendField("padding")
            .appendField(new Blockly.FieldNumber(5, 0, 100), "PAD");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Places a widget using pack geometry manager");
    }
};
Blockly.Python['tk_pack'] = function (block) {
    var widget = Blockly.Python.valueToCode(block, 'WIDGET', Blockly.Python.ORDER_ATOMIC) || 'label1';
    var side = block.getFieldValue('SIDE');
    var pad = block.getFieldValue('PAD');
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return widget + '.pack(side=' + side + ', padx=' + pad + ', pady=' + pad + ')\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_grid'] = {
    init: function () {
        this.appendValueInput("WIDGET")
            .appendField("grid widget");
        this.appendValueInput("ROW")
            .setCheck("Number")
            .appendField("row");
        this.appendValueInput("COL")
            .setCheck("Number")
            .appendField("column");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Places a widget using grid geometry manager");
    }
};
Blockly.Python['tk_grid'] = function (block) {
    var widget = Blockly.Python.valueToCode(block, 'WIDGET', Blockly.Python.ORDER_ATOMIC) || 'label1';
    var row = Blockly.Python.valueToCode(block, 'ROW', Blockly.Python.ORDER_ATOMIC) || '0';
    var col = Blockly.Python.valueToCode(block, 'COL', Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return widget + '.grid(row=' + row + ', column=' + col + ', padx=5, pady=5)\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_place'] = {
    init: function () {
        this.appendValueInput("WIDGET")
            .appendField("place widget");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Places a widget at exact x, y coordinates");
    }
};
Blockly.Python['tk_place'] = function (block) {
    var widget = Blockly.Python.valueToCode(block, 'WIDGET', Blockly.Python.ORDER_ATOMIC) || 'label1';
    var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC) || '0';
    var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return widget + '.place(x=' + x + ', y=' + y + ')\n';
};

// =============================================
// TKINTER – Events
// =============================================

Blockly.Blocks['tk_bind_button_command'] = {
    init: function () {
        this.appendValueInput("BUTTON")
            .appendField("when button");
        this.appendValueInput("FUNC")
            .setCheck("String")
            .appendField("is clicked, call function named");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("Binds a function to a button's click event");
    }
};
Blockly.Python['tk_bind_button_command'] = function (block) {
    var btn = Blockly.Python.valueToCode(block, 'BUTTON', Blockly.Python.ORDER_ATOMIC) || 'btn1';
    var func = Blockly.Python.valueToCode(block, 'FUNC', Blockly.Python.ORDER_ATOMIC) || '"my_function"';
    // Strip surrounding quotes from the function name string
    var funcName = func.replace(/^['"]|['"]$/g, '');
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return btn + '.config(command=' + funcName + ')\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_messagebox_info'] = {
    init: function () {
        this.appendValueInput("TITLE")
            .setCheck("String")
            .appendField("show info message title");
        this.appendValueInput("MSG")
            .setCheck("String")
            .appendField("message");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("Shows an information message box");
    }
};
Blockly.Python['tk_messagebox_info'] = function (block) {
    var title = Blockly.Python.valueToCode(block, 'TITLE', Blockly.Python.ORDER_ATOMIC) || '"Info"';
    var msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC) || '"Hello!"';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    Blockly.Python.definitions_['import_messagebox'] = 'from tkinter import messagebox';
    return 'messagebox.showinfo(' + title + ', ' + msg + ')\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_messagebox_error'] = {
    init: function () {
        this.appendValueInput("TITLE")
            .setCheck("String")
            .appendField("show error message title");
        this.appendValueInput("MSG")
            .setCheck("String")
            .appendField("message");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("Shows an error message box");
    }
};
Blockly.Python['tk_messagebox_error'] = function (block) {
    var title = Blockly.Python.valueToCode(block, 'TITLE', Blockly.Python.ORDER_ATOMIC) || '"Error"';
    var msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC) || '"Something went wrong"';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    Blockly.Python.definitions_['import_messagebox'] = 'from tkinter import messagebox';
    return 'messagebox.showerror(' + title + ', ' + msg + ')\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_messagebox_ask'] = {
    init: function () {
        this.appendValueInput("TITLE")
            .setCheck("String")
            .appendField("ask yes/no — title");
        this.appendValueInput("MSG")
            .setCheck("String")
            .appendField("question");
        this.setOutput(true, "Boolean");
        this.setColour(0);
        this.setTooltip("Shows a yes/no dialog. Returns True if user clicked Yes");
    }
};
Blockly.Python['tk_messagebox_ask'] = function (block) {
    var title = Blockly.Python.valueToCode(block, 'TITLE', Blockly.Python.ORDER_ATOMIC) || '"Confirm"';
    var msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC) || '"Are you sure?"';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    Blockly.Python.definitions_['import_messagebox'] = 'from tkinter import messagebox';
    var code = 'messagebox.askyesno(' + title + ', ' + msg + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// =============================================
// TKINTER – Widget Config
// =============================================

Blockly.Blocks['tk_config_bg'] = {
    init: function () {
        this.appendValueInput("WIDGET")
            .appendField("set background color of");
        this.appendValueInput("COLOR")
            .setCheck("String")
            .appendField("to (e.g. \"#ff0000\" or \"blue\")");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(45);
        this.setTooltip("Sets the background color of a widget");
    }
};
Blockly.Python['tk_config_bg'] = function (block) {
    var widget = Blockly.Python.valueToCode(block, 'WIDGET', Blockly.Python.ORDER_ATOMIC) || 'label1';
    var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC) || '"white"';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return widget + '.config(bg=' + color + ')\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_config_fg'] = {
    init: function () {
        this.appendValueInput("WIDGET")
            .appendField("set text color of");
        this.appendValueInput("COLOR")
            .setCheck("String")
            .appendField("to (e.g. \"#ffffff\" or \"red\")");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(45);
        this.setTooltip("Sets the foreground (text) color of a widget");
    }
};
Blockly.Python['tk_config_fg'] = function (block) {
    var widget = Blockly.Python.valueToCode(block, 'WIDGET', Blockly.Python.ORDER_ATOMIC) || 'label1';
    var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC) || '"black"';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return widget + '.config(fg=' + color + ')\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_config_font'] = {
    init: function () {
        this.appendValueInput("WIDGET")
            .appendField("set font of");
        this.appendValueInput("FAMILY")
            .setCheck("String")
            .appendField("font family (e.g. \"Arial\")");
        this.appendValueInput("SIZE")
            .setCheck("Number")
            .appendField("size");
        this.appendDummyInput()
            .appendField("style")
            .appendField(new Blockly.FieldDropdown([
                ["normal", "normal"],
                ["bold", "bold"],
                ["italic", "italic"],
                ["bold italic", "bold italic"]
            ]), "STYLE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(45);
        this.setTooltip("Sets the font of a widget");
    }
};
Blockly.Python['tk_config_font'] = function (block) {
    var widget = Blockly.Python.valueToCode(block, 'WIDGET', Blockly.Python.ORDER_ATOMIC) || 'label1';
    var family = Blockly.Python.valueToCode(block, 'FAMILY', Blockly.Python.ORDER_ATOMIC) || '"Arial"';
    var size = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_ATOMIC) || '12';
    var style = block.getFieldValue('STYLE');
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return widget + '.config(font=(' + family + ', ' + size + ', "' + style + '"))\n';
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_get_entry'] = {
    init: function () {
        this.appendValueInput("ENTRY")
            .appendField("get text from entry");
        this.setOutput(true, "String");
        this.setColour(45);
        this.setTooltip("Gets the current text from an Entry widget");
    }
};
Blockly.Python['tk_get_entry'] = function (block) {
    var entry = Blockly.Python.valueToCode(block, 'ENTRY', Blockly.Python.ORDER_ATOMIC) || 'entry1';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    var code = entry + '.get()';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// ─────────────────────────────────────────────
Blockly.Blocks['tk_set_label_text'] = {
    init: function () {
        this.appendValueInput("LABEL")
            .appendField("set text of label");
        this.appendValueInput("TEXT")
            .setCheck("String")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(45);
        this.setTooltip("Updates the text displayed by a Label widget");
    }
};
Blockly.Python['tk_set_label_text'] = function (block) {
    var label = Blockly.Python.valueToCode(block, 'LABEL', Blockly.Python.ORDER_ATOMIC) || 'label1';
    var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '""';
    Blockly.Python.definitions_['import_tkinter'] = 'import tkinter as tk';
    return label + '.config(text=' + text + ')\n';
};


// =============================================
// RAW PYTHON BLOCK — shows full Python code as a single block
// Used for complex projects like Calculator
// =============================================

Blockly.Blocks['raw_python'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('🐍 Python Program');
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabelSerializable('(Full code stored — click RUN to launch)'), 'INFO');
        this.setColour(290);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setTooltip('This block holds a complete Python program. Press RUN_SCRIPT to execute it.');
        this.setDeletable(false);
        this.setMovable(true);
    }
};

Blockly.Python['raw_python'] = function (block) {
    // The actual code is stored in pythonCode on the server,
    // but we still return a placeholder so the preview works.
    return '# Calculator program — press RUN_SCRIPT to launch the GUI window\n';
};
// These blocks existed in older saved projects.
// Kept here so old workspaces still load correctly.
// =============================================

Blockly.Blocks['python_input'] = {
    init: function () {
        this.appendValueInput("PROMPT")
            .setCheck("String")
            .appendField("input() read from user:");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Asks the user to enter text");
    }
};
Blockly.Python['python_input'] = function (block) {
    var value_prompt = Blockly.Python.valueToCode(block, 'PROMPT', Blockly.Python.ORDER_ATOMIC) || '""';
    return ['input(' + value_prompt + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_int'] = {
    init: function () {
        this.appendValueInput("VALUE").appendField("int() convert to integer");
        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip("Converts text or decimal to an integer");
    }
};
Blockly.Python['python_int'] = function (block) {
    var v = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
    return ['int(' + v + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_float'] = {
    init: function () {
        this.appendValueInput("VALUE").appendField("float() convert to decimal");
        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip("Converts text or number to a decimal");
    }
};
Blockly.Python['python_float'] = function (block) {
    var v = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
    return ['float(' + v + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_str'] = {
    init: function () {
        this.appendValueInput("VALUE").appendField("str() convert to text");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Converts any value to text");
    }
};
Blockly.Python['python_str'] = function (block) {
    var v = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '""';
    return ['str(' + v + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_len'] = {
    init: function () {
        this.appendValueInput("VALUE").appendField("len() length of");
        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip("Returns the length of text or a list");
    }
};
Blockly.Python['python_len'] = function (block) {
    var v = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '""';
    return ['len(' + v + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_range'] = {
    init: function () {
        this.appendValueInput("START").setCheck("Number").appendField("range from");
        this.appendValueInput("STOP").setCheck("Number").appendField("to");
        this.setOutput(true, "Array");
        this.setColour(260);
        this.setTooltip("Creates a range of numbers");
    }
};
Blockly.Python['python_range'] = function (block) {
    var start = Blockly.Python.valueToCode(block, 'START', Blockly.Python.ORDER_ATOMIC) || '0';
    var stop = Blockly.Python.valueToCode(block, 'STOP', Blockly.Python.ORDER_ATOMIC) || '10';
    return ['range(' + start + ', ' + stop + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_random_randint'] = {
    init: function () {
        this.appendValueInput("MIN").setCheck("Number").appendField("random.randint from");
        this.appendValueInput("MAX").setCheck("Number").appendField("to");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Returns a random integer between two values");
    }
};
Blockly.Python['python_random_randint'] = function (block) {
    var min = Blockly.Python.valueToCode(block, 'MIN', Blockly.Python.ORDER_ATOMIC) || '0';
    var max = Blockly.Python.valueToCode(block, 'MAX', Blockly.Python.ORDER_ATOMIC) || '10';
    Blockly.Python.definitions_['import_random'] = 'import random';
    return ['random.randint(' + min + ', ' + max + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_random_choice'] = {
    init: function () {
        this.appendValueInput("LIST").setCheck("Array").appendField("random.choice pick from");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("Picks a random element from a list");
    }
};
Blockly.Python['python_random_choice'] = function (block) {
    var list = Blockly.Python.valueToCode(block, 'LIST', Blockly.Python.ORDER_ATOMIC) || '[]';
    Blockly.Python.definitions_['import_random'] = 'import random';
    return ['random.choice(' + list + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_random_random'] = {
    init: function () {
        this.appendDummyInput().appendField("random.random() random float 0 to 1");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Returns a random decimal number between 0 and 1");
    }
};
Blockly.Python['python_random_random'] = function (block) {
    Blockly.Python.definitions_['import_random'] = 'import random';
    return ['random.random()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_time_sleep'] = {
    init: function () {
        this.appendValueInput("SECONDS").setCheck("Number").appendField("time.sleep wait");
        this.appendDummyInput().appendField("seconds");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Pauses the program for a given number of seconds");
    }
};
Blockly.Python['python_time_sleep'] = function (block) {
    var s = Blockly.Python.valueToCode(block, 'SECONDS', Blockly.Python.ORDER_ATOMIC) || '1';
    Blockly.Python.definitions_['import_time'] = 'import time';
    return 'time.sleep(' + s + ')\n';
};

Blockly.Blocks['python_time_time'] = {
    init: function () {
        this.appendDummyInput().appendField("time.time() current time");
        this.setOutput(true, "Number");
        this.setColour(120);
        this.setTooltip("Returns the current time in seconds since 1970");
    }
};
Blockly.Python['python_time_time'] = function (block) {
    Blockly.Python.definitions_['import_time'] = 'import time';
    return ['time.time()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_math_sqrt'] = {
    init: function () {
        this.appendValueInput("NUM").setCheck("Number").appendField("math.sqrt square root of");
        this.setOutput(true, "Number"); this.setColour(230);
        this.setTooltip("Square root");
    }
};
Blockly.Python['python_math_sqrt'] = function (block) {
    var n = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.definitions_['import_math'] = 'import math';
    return ['math.sqrt(' + n + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_math_pow'] = {
    init: function () {
        this.appendValueInput("BASE").setCheck("Number").appendField("math.pow");
        this.appendValueInput("EXP").setCheck("Number").appendField("to the power");
        this.setOutput(true, "Number"); this.setColour(230);
        this.setTooltip("Power");
    }
};
Blockly.Python['python_math_pow'] = function (block) {
    var b = Blockly.Python.valueToCode(block, 'BASE', Blockly.Python.ORDER_ATOMIC) || '0';
    var e = Blockly.Python.valueToCode(block, 'EXP', Blockly.Python.ORDER_ATOMIC) || '2';
    Blockly.Python.definitions_['import_math'] = 'import math';
    return ['math.pow(' + b + ', ' + e + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_math_floor'] = {
    init: function () {
        this.appendValueInput("NUM").setCheck("Number").appendField("math.floor round down");
        this.setOutput(true, "Number"); this.setColour(230); this.setTooltip("Floor");
    }
};
Blockly.Python['python_math_floor'] = function (block) {
    var n = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.definitions_['import_math'] = 'import math';
    return ['math.floor(' + n + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_math_ceil'] = {
    init: function () {
        this.appendValueInput("NUM").setCheck("Number").appendField("math.ceil round up");
        this.setOutput(true, "Number"); this.setColour(230); this.setTooltip("Ceil");
    }
};
Blockly.Python['python_math_ceil'] = function (block) {
    var n = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.definitions_['import_math'] = 'import math';
    return ['math.ceil(' + n + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_math_pi'] = {
    init: function () {
        this.appendDummyInput().appendField("math.pi (π = 3.14159...)");
        this.setOutput(true, "Number"); this.setColour(230); this.setTooltip("Pi");
    }
};
Blockly.Python['python_math_pi'] = function (block) {
    Blockly.Python.definitions_['import_math'] = 'import math';
    return ['math.pi', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['python_datetime_now'] = {
    init: function () {
        this.appendDummyInput().appendField("datetime.now() current date & time");
        this.setOutput(true, null); this.setColour(290); this.setTooltip("Current datetime");
    }
};
Blockly.Python['python_datetime_now'] = function (block) {
    Blockly.Python.definitions_['import_datetime'] = 'from datetime import datetime';
    return ['datetime.now()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['python_datetime_year'] = {
    init: function () {
        this.appendValueInput("DATETIME").appendField("extract year from");
        this.setOutput(true, "Number"); this.setColour(290); this.setTooltip("Year");
    }
};
Blockly.Python['python_datetime_year'] = function (block) {
    var dt = Blockly.Python.valueToCode(block, 'DATETIME', Blockly.Python.ORDER_MEMBER) || 'datetime.now()';
    Blockly.Python.definitions_['import_datetime'] = 'from datetime import datetime';
    return [dt + '.year', Blockly.Python.ORDER_MEMBER];
};

Blockly.Blocks['python_datetime_month'] = {
    init: function () {
        this.appendValueInput("DATETIME").appendField("extract month from");
        this.setOutput(true, "Number"); this.setColour(290); this.setTooltip("Month");
    }
};
Blockly.Python['python_datetime_month'] = function (block) {
    var dt = Blockly.Python.valueToCode(block, 'DATETIME', Blockly.Python.ORDER_MEMBER) || 'datetime.now()';
    Blockly.Python.definitions_['import_datetime'] = 'from datetime import datetime';
    return [dt + '.month', Blockly.Python.ORDER_MEMBER];
};

Blockly.Blocks['python_datetime_day'] = {
    init: function () {
        this.appendValueInput("DATETIME").appendField("extract day from");
        this.setOutput(true, "Number"); this.setColour(290); this.setTooltip("Day");
    }
};
Blockly.Python['python_datetime_day'] = function (block) {
    var dt = Blockly.Python.valueToCode(block, 'DATETIME', Blockly.Python.ORDER_MEMBER) || 'datetime.now()';
    Blockly.Python.definitions_['import_datetime'] = 'from datetime import datetime';
    return [dt + '.day', Blockly.Python.ORDER_MEMBER];
};
