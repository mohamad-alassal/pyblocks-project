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
            "name": "Python Libraries",
            "colour": "210",
            "contents": [
                {
                    "kind": "label",
                    "text": "Random"
                },
                { "kind": "block", "type": "python_random_randint" },
                { "kind": "block", "type": "python_random_choice" },
                { "kind": "block", "type": "python_random_random" },
                {
                    "kind": "label",
                    "text": "Time"
                },
                { "kind": "block", "type": "python_time_sleep" },
                { "kind": "block", "type": "python_time_time" },
                {
                    "kind": "label",
                    "text": "Math Advanced"
                },
                { "kind": "block", "type": "python_math_sqrt" },
                { "kind": "block", "type": "python_math_pow" },
                { "kind": "block", "type": "python_math_floor" },
                { "kind": "block", "type": "python_math_ceil" },
                { "kind": "block", "type": "python_math_pi" },
                {
                    "kind": "label",
                    "text": "Datetime"
                },
                { "kind": "block", "type": "python_datetime_now" },
                { "kind": "block", "type": "python_datetime_year" },
                { "kind": "block", "type": "python_datetime_month" },
                { "kind": "block", "type": "python_datetime_day" }
            ]
        },
        {
            "kind": "category",
            "name": "Python Built-in",
            "colour": "160",
            "contents": [
                { "kind": "block", "type": "python_input" },
                { "kind": "block", "type": "python_int" },
                { "kind": "block", "type": "python_float" },
                { "kind": "block", "type": "python_str" },
                { "kind": "block", "type": "python_len" },
                { "kind": "block", "type": "python_range" }
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
            alert('Failed to load project data from the server.');
            window.location.href = 'Projects.html';
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
