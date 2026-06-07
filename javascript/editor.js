/* =============================================
   EDITOR.JS - منطق محرر الكتل (Blockly) والربط مع الخادم
   ============================================= */

// متغيرات عامة لمساحة عمل Blockly والبيانات الخاصة بالمشروع الحالي
let workspace = null;
let projectId = null;
let projectData = null;

// تعريف كائنات الثيمات المخصصة لـ Blockly لدعم الوضعين الداكن والفاتح
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

// تعريف البنية البرمجية لصندوق الأدوات (Toolbox) الخاص بـ Blockly مع مجموعة غنية وموسعة من البلوكات
const TOOLBOX_DEFINITION = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Logic (المنطق)",
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
            "name": "Loops (التكرار)",
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
            "name": "Math (الرياضيات)",
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
            "name": "Text (النصوص)",
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
            "name": "Lists (القوائم)",
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
            "kind": "sep" // خط فاصل في القائمة
        },
        {
            "kind": "category",
            "name": "Python Libraries (مكتبات بايثون)",
            "colour": "210",
            "contents": [
                {
                    "kind": "label",
                    "text": "Random (عشوائي)"
                },
                { "kind": "block", "type": "python_random_randint" },
                { "kind": "block", "type": "python_random_choice" },
                { "kind": "block", "type": "python_random_random" },
                {
                    "kind": "label",
                    "text": "Time (الوقت)"
                },
                { "kind": "block", "type": "python_time_sleep" },
                { "kind": "block", "type": "python_time_time" },
                {
                    "kind": "label",
                    "text": "Math Advanced (رياضيات متقدمة)"
                },
                { "kind": "block", "type": "python_math_sqrt" },
                { "kind": "block", "type": "python_math_pow" },
                { "kind": "block", "type": "python_math_floor" },
                { "kind": "block", "type": "python_math_ceil" },
                { "kind": "block", "type": "python_math_pi" },
                {
                    "kind": "label",
                    "text": "Datetime (التاريخ)"
                },
                { "kind": "block", "type": "python_datetime_now" },
                { "kind": "block", "type": "python_datetime_year" },
                { "kind": "block", "type": "python_datetime_month" },
                { "kind": "block", "type": "python_datetime_day" }
            ]
        },
        {
            "kind": "category",
            "name": "Python Built-in (دوال مدمجة)",
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
            "name": "Variables (المتغيرات)",
            "custom": "VARIABLE", // تصنيف ديناميكي لإنشاء وإدارة المتغيرات
            "categorystyle": "variable_category"
        },
        {
            "kind": "category",
            "name": "Functions (الدوال)",
            "custom": "PROCEDURE", // تصنيف ديناميكي لإنشاء وإدارة الدوال البرمجية
            "categorystyle": "procedure_category"
        }
    ]
};

document.addEventListener('DOMContentLoaded', function () {

    // التحقق المسبق من الوضع الداكن وتطبيقه على الجسم فوراً لتجنب الوميض الأبيض
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark');
    }

    // ===== 1. استخراج معرف المشروع من رابط الصفحة =====
    const urlParams = new URLSearchParams(window.location.search);
    projectId = urlParams.get('project');

    if (!projectId) {
        alert('لم يتم تحديد مشروع لفتحه.');
        window.location.href = 'Projects.html';
        return;
    }

    // ===== 2. تهيئة مساحة عمل Blockly =====
    initBlockly();

    // ===== 3. جلب بيانات المشروع من الخادم وبدء التحميل =====
    loadProjectData();

    // ===== 4. تفعيل أزرار الواجهة =====
    setupEventListeners();

    // ===== 5. تهيئة تبديل الوضع الداكن =====
    initDarkMode();

    // ===== 6. تهيئة اللوحة السفلية القابلة للطي =====
    initBottomPanel();
});

/**
 * تهيئة مكتبة Google Blockly وربطها مع الحاوية الرسومية
 */
function initBlockly() {
    const blocklyDiv = document.getElementById('blocklyDiv');
    if (!blocklyDiv) return;

    // تحديد الثيم الأولي بناء على وضع الصفحة
    const isDark = document.body.classList.contains('dark');
    const initialTheme = isDark ? darkTheme : lightTheme;

    // حقن Blockly في الحاوية مع تمرير خصائص التنسيق والتحكم والثيم المخصص
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

    // إضافة مستمع لحالة التغيير في مساحة العمل لتحديث كود Python تلقائياً وحفظه تلقائياً
    workspace.addChangeListener(function (event) {
        // عدم تحديث الكود إذا كان الحدث عبارة عن حركة كاميرا أو تحديد كتلة فقط
        if (event.type === Blockly.Events.VIEWPORT_CHANGE || event.type === Blockly.Events.SELECTED) {
            return;
        }

        // تحديث عرض الكود الرسومي
        updatePythonCodePreview();

        // التوفير التلقائي: حفظ المشروع في الخلفية بعد كل تعديل
        autoSaveProject();
    });

    // إضافة مستمع لإعادة ضبط حجم Blockly عند تغيير حجم النافذة (خاصة في شاشات الموبايل)
    window.addEventListener('resize', function () {
        Blockly.svgResize(workspace);
    });
}

/**
 * تحديث الكود المعروض في التبويب الجانبي بالبايثون الحقيقي
 */
function updatePythonCodePreview() {
    const codeDisplay = document.getElementById('codeDisplay');
    if (!codeDisplay || !workspace) return;

    try {
        // استخدام محرك Blockly لتوليد كود بايثون نظيف
        const code = Blockly.Python.workspaceToCode(workspace);

        if (code.trim() === '') {
            codeDisplay.textContent = `# اسحب البلوكات إلى مساحة العمل للبدء بالبرمجة!\n# Drag blocks here to get started...\n\nprint("Hello, PythonBlocks!")`;
        } else {
            codeDisplay.textContent = code;
        }
    } catch (err) {
        console.error('Error generating Python code:', err);
        codeDisplay.textContent = '# حدث خطأ أثناء توليد الكود:\n' + err.message;
    }
}

/**
 * جلب بيانات المشروع من الخادم عبر API
 */
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

            // عرض اسم المشروع
            document.getElementById('projectName').textContent = project.name;

            // تحميل كتل Blockly المخزنة مسبقاً (إن وُجدت)
            if (project.workspaceState && workspace) {
                // استعادة حالة الكتل من بيانات الـ JSON المخزنة
                Blockly.serialization.workspaces.load(project.workspaceState, workspace);
            }

            // تحديث الكود لأول مرة بعد التحميل
            updatePythonCodePreview();

            if (projectStatus) projectStatus.textContent = '● Ready';
        })
        .catch(error => {
            console.error('Error loading project:', error);
            alert('فشل في تحميل بيانات المشروع من الخادم.');
            window.location.href = 'Projects.html';
        });
}

// مؤقت لحفظ التغيرات تلقائياً بدون الضغط المتكرر على الخادم (Debounce Save)
let autoSaveTimer = null;

function autoSaveProject() {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);

    // الانتظار لمدة 1.5 ثانية بعد آخر تعديل قبل الحفظ التلقائي
    autoSaveTimer = setTimeout(function () {
        saveProjectToServer(false); // حفظ تلقائي صامت بدون رسائل تنبيهية
    }, 1500);
}

/**
 * حفظ حالة المشروع الحالية في الـ Backend
 * @param {boolean} showFeedback هل يتم عرض تنبيه بصري للمستخدم عند الحفظ؟ (مفيد للحفظ اليدوي)
 */
function saveProjectToServer(showFeedback = false) {
    if (!workspace || !projectId || !projectData) return;

    const projectStatus = document.querySelector('.project-status');
    if (projectStatus) projectStatus.textContent = '● Saving...';

    // حفظ حالة مساحة العمل ككائن JSON
    const workspaceState = Blockly.serialization.workspaces.save(workspace);
    const pythonCode = Blockly.Python.workspaceToCode(workspace);
    const blocksCount = workspace.getAllBlocks(false).length;

    // إرسال طلب PUT لتحديث بيانات المشروع في الـ backend
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
            if (showFeedback) alert('فشل الحفظ التلقائي. يرجى التحقق من اتصالك بالخادم.');
        });
}

/**
 * تهيئة أزرار الهيدر والتبديل
 */
function setupEventListeners() {

    // زر الحفظ اليدوي (FORCE SAVE)
    const forceSaveBtn = document.getElementById('forceSaveBtn');
    if (forceSaveBtn) {
        forceSaveBtn.addEventListener('click', function () {
            saveProjectToServer(true);
        });
    }

    // زر نسخ الكود البرمجي
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
                alert('فشل في نسخ الكود: ' + err);
            });
        });
    }

    // زر تشغيل الكود (RUN IT NOW)
    const runBtn = document.getElementById('runBtn');
    if (runBtn) {
        runBtn.addEventListener('click', function () {
            runPythonCode();
        });
    }
}

/**
 * إرسال كود بايثون إلى الـ backend لتشغيله وعرض مخرجات الكونسول
 */
function runPythonCode() {
    if (!workspace) return;

    const code = Blockly.Python.workspaceToCode(workspace);
    const consoleDisplay = document.getElementById('consoleDisplay');

    consoleDisplay.textContent = '>>> Running code on server...\n';

    // حفظ التغييرات أولاً قبل التشغيل
    saveProjectToServer(false);

    // إرسال الكود للـ Backend لتشغيله بشكل حقيقي
    fetch('/api/run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
        .then(response => {
            if (!response.ok) throw new Error('Server error running code');
            return response.json();
        })
        .then(result => {
            consoleDisplay.textContent = ''; // تفريغ

            // طباعة المخرجات القياسية stdout إن وجدت
            if (result.stdout) {
                consoleDisplay.textContent += result.stdout;
            }

            // طباعة الأخطاء stderr باللون الأحمر أو بشكل مميز إن وجدت
            if (result.stderr) {
                consoleDisplay.textContent += `\n[ERROR]:\n${result.stderr}`;
            }

            // التنبيه في حالة انتهاء المهلة (Loop لانهائي)
            if (result.timedOut) {
                consoleDisplay.textContent += `\n\n[TIMEOUT]: تم إيقاف البرنامج قسراً لتجاوزه حد 5 ثوانٍ (قد يحتوي كودك على تكرار لانهائي)`;
            }

            // طباعة سطر النهاية
            consoleDisplay.textContent += `\n\n>>> Execution completed (Exit code: ${result.exitCode})`;
        })
        .catch(error => {
            console.error('Error running Python code:', error);
            consoleDisplay.textContent += `\n[CRITICAL ERROR]: فشل في الاتصال بالخادم لتشغيل الكود.`;
        });
}



/**
 * مسح الكونسول وإعادته للوضع الافتراضي
 */
function clearConsole() {
    const consoleDisplay = document.getElementById('consoleDisplay');
    if (consoleDisplay) {
        consoleDisplay.textContent = 'Ready to run...';
    }
}

// ===== DARK MODE TOGGLE - إدارة وتبديل الوضع الليلي =====

function initDarkMode() {
    const darkToggle = document.getElementById('darkToggle');
    const savedMode = localStorage.getItem('darkMode');

    // التحقق المسبق وتأكيد حالة الأيقونة والثيم
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

            // تحديث ثيم Blockly بناء على الاختيار
            setBlocklyTheme(isDark);
        });
    }
}

/**
 * تبديل الثيم الداكن لـ Blockly
 * @param {boolean} isDark هل الوضع الداكن مفعّل؟
 */
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

/**
 * تهيئة اللوحة السفلية وجعلها قابلة للطي (التصغير والتوسيع) لزيادة مساحة العمل الرسومية
 */
function initBottomPanel() {
    const bottomPanel = document.getElementById('bottomPanel');
    const bottomPanelBar = document.getElementById('bottomPanelBar');
    const togglePanelBtn = document.getElementById('togglePanelBtn');

    if (!bottomPanel || !bottomPanelBar || !togglePanelBtn) return;

    // عند الضغط على شريط اللوحة السفلية
    bottomPanelBar.addEventListener('click', function (e) {
        if (e.target === togglePanelBtn) return;
        toggleCollapse();
    });

    // عند الضغط على زر التبديل
    togglePanelBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleCollapse();
    });

    function toggleCollapse() {
        bottomPanel.classList.toggle('minimized');
        const isMinimized = bottomPanel.classList.contains('minimized');

        if (isMinimized) {
            togglePanelBtn.textContent = '▲ Expand (توسيع)';
        } else {
            togglePanelBtn.textContent = '▼ Minimize (تصغير)';
        }

        // تحديث حجم مساحة عمل Blockly بشكل فوري ليتلاءم مع حجم الشاشة الجديد
        if (workspace) {
            Blockly.svgResize(workspace);
        }

        // إعادة تحديث الحجم بعد انتهاء حركة الأنيماشين
        setTimeout(function () {
            if (workspace) {
                Blockly.svgResize(workspace);
            }
        }, 300);
    }
}
