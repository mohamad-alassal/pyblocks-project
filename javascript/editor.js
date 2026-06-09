/* =============================================
   EDITOR.JS - Blockly editor logic and server communication
   ============================================= */

let workspace = null;
let projectId = null;
let projectData = null;

let lightTheme = null;
let darkTheme = null;

try {
    lightTheme = Blockly.Theme.defineTheme('custom_light', {
        'base': Blockly.Themes.Classic,
        'componentStyles': {
            'workspaceBackgroundColour': '#f8f9fa',
            'toolboxBackgroundColour': '#ffffff',
            'toolboxForegroundColour': '#0f172a',
            'flyoutBackgroundColour': '#ffffff',
            'flyoutForegroundColour': '#374151',
            'scrollbarColour': '#6366f1',
            'scrollbarOpacity': 0.15
        }
    });

    darkTheme = Blockly.Theme.defineTheme('custom_dark', {
        'base': Blockly.Themes.Classic,
        'componentStyles': {
            'workspaceBackgroundColour': '#1e293b',
            'toolboxBackgroundColour': '#0f172a',
            'toolboxForegroundColour': '#f1f5f9',
            'flyoutBackgroundColour': '#0f172a',
            'flyoutForegroundColour': '#cbd5e1',
            'scrollbarColour': '#818cf8',
            'scrollbarOpacity': 0.3
        }
    });
} catch (e) {
    console.error('Failed to define custom Blockly themes:', e);
}

const TOOLBOX_DEFINITION = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Logic",
            "categorystyle": "logic_category",
            "contents": [
                { "kind": "block", "type": "controls_if" },
                { "kind": "block", "type": "logic_compare" },
                { "kind": "block", "type": "logic_operation" },
                { "kind": "block", "type": "logic_negate" },
                { "kind": "block", "type": "logic_boolean" },
                { "kind": "block", "type": "logic_null" },
                { "kind": "block", "type": "logic_ternary" }
            ]
        },
        {
            "kind": "category",
            "name": "Loops",
            "categorystyle": "loop_category",
            "contents": [
                { "kind": "block", "type": "controls_repeat_ext" },
                { "kind": "block", "type": "controls_whileUntil" },
                { "kind": "block", "type": "controls_for" },
                { "kind": "block", "type": "controls_forEach" },
                { "kind": "block", "type": "controls_flow_statements" }
            ]
        },
        {
            "kind": "category",
            "name": "Math",
            "categorystyle": "math_category",
            "contents": [
                { "kind": "block", "type": "math_number" },
                { "kind": "block", "type": "math_arithmetic" },
                { "kind": "block", "type": "math_single" },
                { "kind": "block", "type": "math_trig" },
                { "kind": "block", "type": "math_constant" },
                { "kind": "block", "type": "math_number_property" },
                { "kind": "block", "type": "math_round" },
                { "kind": "block", "type": "math_on_list" },
                { "kind": "block", "type": "math_modulo" },
                { "kind": "block", "type": "math_constrain" },
                { "kind": "block", "type": "math_random_int" },
                { "kind": "block", "type": "math_random_float" }
            ]
        },
        {
            "kind": "category",
            "name": "Text",
            "categorystyle": "text_category",
            "contents": [
                { "kind": "block", "type": "text" },
                { "kind": "block", "type": "text_join" },
                { "kind": "block", "type": "text_append" },
                { "kind": "block", "type": "text_length" },
                { "kind": "block", "type": "text_isEmpty" },
                { "kind": "block", "type": "text_indexOf" },
                { "kind": "block", "type": "text_charAt" },
                { "kind": "block", "type": "text_getSubstring" },
                { "kind": "block", "type": "text_changeCase" },
                { "kind": "block", "type": "text_trim" },
                { "kind": "block", "type": "text_print" },
                { "kind": "block", "type": "text_prompt_ext" }
            ]
        },
        {
            "kind": "category",
            "name": "Lists",
            "categorystyle": "list_category",
            "contents": [
                { "kind": "block", "type": "lists_create_empty" },
                { "kind": "block", "type": "lists_create_with" },
                { "kind": "block", "type": "lists_repeat" },
                { "kind": "block", "type": "lists_length" },
                { "kind": "block", "type": "lists_isEmpty" },
                { "kind": "block", "type": "lists_indexOf" },
                { "kind": "block", "type": "lists_getIndex" },
                { "kind": "block", "type": "lists_setIndex" },
                { "kind": "block", "type": "lists_getSublist" },
                { "kind": "block", "type": "lists_split" },
                { "kind": "block", "type": "lists_sort" }
            ]
        },
        {
            "kind": "sep"
        },
        {
            "kind": "category",
            "name": "Tkinter GUI",
            "colour": "290",
            "contents": [
                {
                    "kind": "label",
                    "text": "── Window & App ──"
                },
                { "kind": "block", "type": "tk_create_window" },
                { "kind": "block", "type": "tk_set_title" },
                { "kind": "block", "type": "tk_set_geometry" },
                { "kind": "block", "type": "tk_mainloop" },
                {
                    "kind": "label",
                    "text": "── Widgets ──"
                },
                { "kind": "block", "type": "tk_label" },
                { "kind": "block", "type": "tk_button" },
                { "kind": "block", "type": "tk_entry" },
                { "kind": "block", "type": "tk_text_widget" },
                { "kind": "block", "type": "tk_frame" },
                {
                    "kind": "label",
                    "text": "── Layout ──"
                },
                { "kind": "block", "type": "tk_pack" },
                { "kind": "block", "type": "tk_grid" },
                { "kind": "block", "type": "tk_place" },
                {
                    "kind": "label",
                    "text": "── Events ──"
                },
                { "kind": "block", "type": "tk_bind_button_command" },
                { "kind": "block", "type": "tk_messagebox_info" },
                { "kind": "block", "type": "tk_messagebox_error" },
                { "kind": "block", "type": "tk_messagebox_ask" },
                {
                    "kind": "label",
                    "text": "── Widget Config ──"
                },
                { "kind": "block", "type": "tk_config_bg" },
                { "kind": "block", "type": "tk_config_fg" },
                { "kind": "block", "type": "tk_config_font" },
                { "kind": "block", "type": "tk_get_entry" },
                { "kind": "block", "type": "tk_set_label_text" }
            ]
        },
        {
            "kind": "sep"
        },
        {
            "kind": "category",
            "name": "Variables",
            "custom": "VARIABLE",
            "categorystyle": "variable_category"
        },
        {
            "kind": "category",
            "name": "Functions",
            "custom": "PROCEDURE",
            "categorystyle": "procedure_category"
        }
    ]
};

document.addEventListener('DOMContentLoaded', function () {

    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark');
    }

    // ===== 1. Extract project ID from URL =====
    const urlParams = new URLSearchParams(window.location.search);
    projectId = urlParams.get('project');

    if (!projectId) {
        alert('No project specified to open.');
        window.location.href = 'Projects.html';
        return;
    }

    // ===== 2. Initialize Blockly workspace =====
    initBlockly();

    // ===== 3. Fetch project data from server =====
    loadProjectData();

    // ===== 4. Setup UI event listeners =====
    setupEventListeners();

    // ===== 5. Initialize dark mode toggle =====
    initDarkMode();

    // ===== 6. Initialize collapsible bottom panel =====
    initBottomPanel();
});

function initBlockly() {
    const blocklyDiv = document.getElementById('blocklyDiv');
    if (!blocklyDiv) return;

    const isDark = document.body.classList.contains('dark');
    const initialTheme = isDark ? darkTheme : lightTheme;

    workspace = Blockly.inject(blocklyDiv, {
        theme: initialTheme,
        toolbox: TOOLBOX_DEFINITION,
        scrollbars: true,
        trashcan: true,
        grid: {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
        },
        zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2
        }
    });

    workspace.addChangeListener(function (event) {
        if (event.type === Blockly.Events.VIEWPORT_CHANGE || event.type === Blockly.Events.SELECTED) {
            return;
        }

        updatePythonCodePreview();
        autoSaveProject();
    });

    window.addEventListener('resize', function () {
        Blockly.svgResize(workspace);
    });

    // Fix toolbox selected category styling
    fixToolboxSelection();
}

function fixToolboxSelection() {
    // Use a MutationObserver to watch when Blockly adds/removes the selected class
    const toolbox = document.querySelector('.blocklyToolboxDiv');
    if (!toolbox) {
        // Toolbox not ready yet, retry
        setTimeout(fixToolboxSelection, 300);
        return;
    }

    const observer = new MutationObserver(function () {
        document.querySelectorAll('.blocklyTreeRow').forEach(function (row) {
            const isSelected = row.classList.contains('blocklyTreeSelected') ||
                               row.closest('.blocklyTreeSelected') !== null;

            if (isSelected) {
                row.style.setProperty('background-color', '#4f46e5', 'important');
                row.style.setProperty('color', '#ffffff', 'important');
                row.style.setProperty('border-radius', '50px', 'important');
                const label = row.querySelector('.blocklyTreeLabel');
                if (label) label.style.setProperty('color', '#ffffff', 'important');
            } else {
                row.style.removeProperty('background-color');
                row.style.removeProperty('color');
                const label = row.querySelector('.blocklyTreeLabel');
                if (label) label.style.removeProperty('color');
            }
        });
    });

    observer.observe(toolbox, { attributes: true, subtree: true, attributeFilter: ['class'] });
}

function updatePythonCodePreview() {
    const codeDisplay = document.getElementById('codeDisplay');
    if (!codeDisplay || !workspace) return;

    try {
        const code = Blockly.Python.workspaceToCode(workspace);

        if (code.trim() === '') {
            codeDisplay.textContent = `# Drag blocks to the workspace to start coding!\n\nprint("Hello, PythonBlocks!")`;
        } else {
            codeDisplay.textContent = code;
        }
    } catch (err) {
        console.error('Error generating Python code:', err);
        codeDisplay.textContent = '# Error generating code:\n' + err.message;
    }
}

function loadProjectData() {
    const projectStatus = document.querySelector('.project-status');
    if (projectStatus) projectStatus.textContent = '● Loading...';

    fetch(`/api/projects/${projectId}`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load project details');
            return response.json();
        })
        .then(project => {
            projectData = project;

            document.getElementById('projectName').textContent = project.name;

            if (project.workspaceState && workspace) {
                Blockly.serialization.workspaces.load(project.workspaceState, workspace);
            }

            updatePythonCodePreview();

            if (projectStatus) projectStatus.textContent = '● Ready';
        })
        .catch(error => {
            console.error('Error loading project:', error);
            if (projectStatus) projectStatus.textContent = '● Load Error';
            document.getElementById('projectName').textContent = projectData ? projectData.name : 'Error';
            alert('Failed to load project data from the server. Check that the server is running.');
        });
}

let autoSaveTimer = null;

function autoSaveProject() {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);

    autoSaveTimer = setTimeout(function () {
        saveProjectToServer(false);
    }, 1500);
}

function saveProjectToServer(showFeedback = false) {
    if (!workspace || !projectId || !projectData) return;

    const projectStatus = document.querySelector('.project-status');
    if (projectStatus) projectStatus.textContent = '● Saving...';

    const workspaceState = Blockly.serialization.workspaces.save(workspace);
    const pythonCode = Blockly.Python.workspaceToCode(workspace);
    const blocksCount = workspace.getAllBlocks(false).length;

    fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: projectData.name,
            blocksCount: blocksCount,
            workspaceState: workspaceState,
            pythonCode: pythonCode
        })
    })
        .then(response => {
            if (!response.ok) throw new Error('Save failed');
            return response.json();
        })
        .then(updatedProject => {
            projectData = updatedProject;
            if (projectStatus) projectStatus.textContent = '● Saved';

            if (showFeedback) {
                const saveBtn = document.getElementById('forceSaveBtn');
                const originalContent = saveBtn.innerHTML;

                saveBtn.innerHTML = '✓ SAVED!';
                saveBtn.style.background = '#10b981';

                setTimeout(() => {
                    saveBtn.innerHTML = originalContent;
                    saveBtn.style.background = '';
                }, 1500);
            }
        })
        .catch(error => {
            console.error('Error saving project:', error);
            if (projectStatus) projectStatus.textContent = '● Error saving';
            if (showFeedback) alert('Failed to save. Please check your server connection.');
        });
}

function setupEventListeners() {

    const forceSaveBtn = document.getElementById('forceSaveBtn');
    if (forceSaveBtn) {
        forceSaveBtn.addEventListener('click', function () {
            saveProjectToServer(true);
        });
    }

    const copyCodeBtn = document.getElementById('copyCodeBtn');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', function () {
            const code = Blockly.Python.workspaceToCode(workspace);
            navigator.clipboard.writeText(code).then(() => {
                const originalText = copyCodeBtn.innerHTML;
                copyCodeBtn.innerHTML = '✓ Copied!';
                copyCodeBtn.style.background = '#10b981';
                copyCodeBtn.style.color = 'white';

                setTimeout(() => {
                    copyCodeBtn.innerHTML = originalText;
                    copyCodeBtn.style.background = '';
                    copyCodeBtn.style.color = '';
                }, 2000);
            }).catch(err => {
                alert('Failed to copy code: ' + err);
            });
        });
    }

    const runBtn = document.getElementById('runBtn');
    if (runBtn) {
        runBtn.addEventListener('click', function () {
            runPythonCode();
        });
    }

    // ===== RESIZABLE PANEL SPLITTER =====
    initPanelResizer();
}

function runPythonCode() {
    if (!workspace) return;

    const code = Blockly.Python.workspaceToCode(workspace);
    const consoleDisplay = document.getElementById('consoleDisplay');
    const stdinInput = document.getElementById('stdinInput');
    const stdin = stdinInput ? stdinInput.value : '';

    consoleDisplay.textContent = '>>> Running code on server...\n';

    saveProjectToServer(false);

    fetch('/api/run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code, stdin: stdin })
    })
        .then(response => {
            if (!response.ok) throw new Error('Server error running code');
            return response.json();
        })
        .then(result => {
            consoleDisplay.textContent = '';

            if (result.stdout) {
                consoleDisplay.textContent += result.stdout;
            }

            if (result.stderr) {
                consoleDisplay.textContent += `\n[ERROR]:\n${result.stderr}`;
            }

            if (result.timedOut) {
                consoleDisplay.textContent += `\n\n[TIMEOUT]: The program was forcefully stopped (exceeded 5-second limit - your code may contain an infinite loop)`;
            }

            consoleDisplay.textContent += `\n\n>>> Execution completed (Exit code: ${result.exitCode})`;
        })
        .catch(error => {
            console.error('Error running Python code:', error);
            consoleDisplay.textContent += `\n[CRITICAL ERROR]: Failed to connect to the server to run the code.`;
        });
}

function clearConsole() {
    const consoleDisplay = document.getElementById('consoleDisplay');
    if (consoleDisplay) {
        consoleDisplay.textContent = 'Ready to run...';
    }
    const stdinInput = document.getElementById('stdinInput');
    if (stdinInput) {
        stdinInput.value = '';
    }
}

// ===== DARK MODE TOGGLE =====

function initDarkMode() {
    const darkToggle = document.getElementById('darkToggle');
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode === 'enabled') {
        if (darkToggle) darkToggle.textContent = '☀️';
        setBlocklyTheme(true);
    }

    if (darkToggle) {
        darkToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');

            if (isDark) {
                localStorage.setItem('darkMode', 'enabled');
                darkToggle.textContent = '☀️';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkToggle.textContent = '🌙';
            }

            setBlocklyTheme(isDark);
        });
    }
}

function setBlocklyTheme(isDark) {
    if (!workspace) return;

    try {
        if (isDark && darkTheme) {
            workspace.setTheme(darkTheme);
        } else if (!isDark && lightTheme) {
            workspace.setTheme(lightTheme);
        }
    } catch (e) {
        console.error('Error applying Blockly theme:', e);
    }
}

function initBottomPanel() {
    const bottomPanel = document.getElementById('bottomPanel');
    const bottomPanelBar = document.getElementById('bottomPanelBar');
    const togglePanelBtn = document.getElementById('togglePanelBtn');

    if (!bottomPanel || !bottomPanelBar || !togglePanelBtn) return;

    bottomPanelBar.addEventListener('click', function (e) {
        if (e.target === togglePanelBtn) return;
        toggleCollapse();
    });

    togglePanelBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleCollapse();
    });

    function toggleCollapse() {
        bottomPanel.classList.toggle('minimized');
        const isMinimized = bottomPanel.classList.contains('minimized');

        if (isMinimized) {
            togglePanelBtn.textContent = '▲ Expand';
        } else {
            togglePanelBtn.textContent = '▼ Minimize';
        }

        if (workspace) {
            Blockly.svgResize(workspace);
        }

        setTimeout(function () {
            if (workspace) {
                Blockly.svgResize(workspace);
            }
        }, 300);
    }
}

// ===== RESIZABLE PANEL SPLITTER =====

function initPanelResizer() {
    const resizer = document.getElementById('panelResizer');
    const codePanel = document.getElementById('codePanel');
    const consolePanel = document.getElementById('consolePanel');
    const container = document.getElementById('bottomPanelContent');

    if (!resizer || !codePanel || !consolePanel || !container) return;

    let isResizing = false;
    let startX = 0;
    let startCodeWidth = 0;

    resizer.addEventListener('mousedown', function (e) {
        isResizing = true;
        startX = e.clientX;
        startCodeWidth = codePanel.getBoundingClientRect().width;

        resizer.classList.add('dragging');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
        if (!isResizing) return;

        const containerWidth = container.getBoundingClientRect().width;
        const resizerWidth = resizer.offsetWidth;
        const delta = e.clientX - startX;
        const newCodeWidth = startCodeWidth + delta;

        const minWidth = 80;
        const maxWidth = containerWidth - resizerWidth - minWidth;

        if (newCodeWidth < minWidth || newCodeWidth > maxWidth) return;

        const codePct = (newCodeWidth / containerWidth) * 100;
        const consolePct = ((containerWidth - resizerWidth - newCodeWidth) / containerWidth) * 100;

        codePanel.style.flex = `0 0 ${codePct}%`;
        consolePanel.style.flex = `0 0 ${consolePct}%`;
    });

    document.addEventListener('mouseup', function () {
        if (!isResizing) return;
        isResizing = false;
        resizer.classList.remove('dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    });
}
