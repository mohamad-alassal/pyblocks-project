const express = require('express');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON body parsing
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the project root
app.use(express.static(__dirname));

// Temp directory for executing Python scripts
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

/* =============================================
   API ROUTES
   ============================================= */

// 1. Get all projects
app.get('/api/projects', (req, res) => {
    try {
        const projects = db.getProjects();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve projects' });
    }
});

// 2. Get a specific project
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

// 3. Create a new project
app.post('/api/projects', (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Project name is required' });
        }
        const newProject = db.createProject(name.trim());
        res.status(201).json(newProject);
    } catch (err) {
        if (err.message === 'PROJECT_NAME_EXISTS') {
            return res.status(409).json({ error: 'A project with this name already exists' });
        }
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// 4. Update project data
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

// 5. Delete a project
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

// 6. Run Python code and return the result
app.post('/api/run', (req, res) => {
    const { code, stdin } = req.body;
    if (code === undefined) {
        return res.status(400).json({ error: 'No code provided' });
    }

    // Random filename to avoid user request collisions
    const fileName = `run_${Date.now()}_${Math.floor(Math.random() * 1000)}.py`;
    const filePath = path.join(tempDir, fileName);

    // Write code to temp file
    fs.writeFile(filePath, code, 'utf-8', (err) => {
        if (err) {
            console.error('Error writing temp file:', err);
            return res.status(500).json({ error: 'Failed to prepare python code for execution' });
        }

        // Run Python using spawn with stdin support and 5-second timeout
        const py = spawn('py', [filePath], { timeout: 5000 });
        let stdout = '';
        let stderr = '';
        let timedOut = false;

        // Pipe stdin input if provided
        if (stdin) {
            py.stdin.write(stdin);
        }
        py.stdin.end();

        py.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        py.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        py.on('error', (err) => {
            stderr += err.message;
        });

        py.on('close', (exitCode) => {
            timedOut = exitCode === null;

            // Delete temp file
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) console.error('Failed to delete temp file:', unlinkErr);
            });

            res.json({
                stdout: stdout || '',
                stderr: stderr || '',
                timedOut,
                exitCode: exitCode === null ? 1 : exitCode
            });
        });
    });
});

// Start listening on the specified port
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  PythonBlocks backend running on: http://localhost:${PORT}`);
    console.log(`====================================================`);
});
