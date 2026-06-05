const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// تفعيل استقبال بيانات JSON من الطلبات
app.use(express.json());

// تقديم الملفات الثابتة (HTML, CSS, JS) من المجلد الرئيسي للمشروع
app.use(express.static(__dirname));

// مجلد مؤقت لحفظ ملفات Python وتطبيقها
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

/* =============================================
   API ROUTES - مسارات واجهة برمجة التطبيقات
   ============================================= */

// 1. جلب كل المشاريع
app.get('/api/projects', (req, res) => {
    try {
        const projects = db.getProjects();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve projects' });
    }
});

// 2. جلب تفاصيل مشروع معين
app.get('/api/projects/:id', (req, res) => {
    try {
        const project = db.getProject(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve project' });
    }
});

// 3. إنشاء مشروع جديد
app.post('/api/projects', (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Project name is required' });
        }
        const newProject = db.createProject(name.trim());
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// 4. تحديث وحفظ بيانات مشروع
app.put('/api/projects/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { name, blocksCount, workspaceState, pythonCode } = req.body;
        
        const updated = db.updateProject(id, {
            name,
            blocksCount,
            workspaceState,
            pythonCode
        });

        if (!updated) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// 5. حذف مشروع
app.delete('/api/projects/:id', (req, res) => {
    try {
        const { id } = req.params;
        const deleted = db.deleteProject(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// 6. تشغيل كود بايثون وحساب النتيجة
app.post('/api/run', (req, res) => {
    const { code } = req.body;
    if (code === undefined) {
        return res.status(400).json({ error: 'No code provided' });
    }

    // اسم ملف عشوائي لتجنب تداخل طلبات المستخدمين
    const fileName = `run_${Date.now()}_${Math.floor(Math.random() * 1000)}.py`;
    const filePath = path.join(tempDir, fileName);

    // كتابة الكود البرمجي للملف
    fs.writeFile(filePath, code, 'utf-8', (err) => {
        if (err) {
            console.error('Error writing temp file:', err);
            return res.status(500).json({ error: 'Failed to prepare python code for execution' });
        }

        // تشغيل كود بايثون باستخدام موجه الأوامر 'py' على نظام ويندوز
        // وتحديد مهلة قصوى للتنفيذ (5 ثوانٍ) لمنع التجميد في حال التكرار اللانهائي (Infinite Loops)
        const command = `py "${filePath}"`;
        exec(command, { timeout: 5000 }, (execErr, stdout, stderr) => {
            // حذف الملف المؤقت بعد الانتهاء فوراً
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) console.error('Failed to delete temp file:', unlinkErr);
            });

            // معالجة الأخطاء والنتيجة
            let timedOut = false;
            if (execErr) {
                if (execErr.killed) {
                    timedOut = true;
                }
            }

            res.json({
                stdout: stdout || '',
                stderr: stderr || (execErr && !timedOut ? execErr.message : ''),
                timedOut,
                exitCode: execErr ? execErr.code : 0
            });
        });
    });
});

// بدء الاستماع على المنفذ المحدد
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  PythonBlocks backend running on: http://localhost:${PORT}`);
    console.log(`====================================================`);
});
