const fs = require('fs');
const path = require('path');

// Path to the data folder and projects file
const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'projects.json');

/**
 * Initialize the simple JSON database
 */
function initDB() {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify([], null, 2), 'utf-8');
    }
}

/**
 * Get all projects from the database
 * @returns {Array} Array of project objects
 */
function getProjects() {
    initDB();
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading projects database:', err);
        return [];
    }
}

/**
 * Save the project list to the JSON file
 * @param {Array} projects Array of projects to save
 */
function saveProjects(projects) {
    initDB();
    try {
        fs.writeFileSync(dbPath, JSON.stringify(projects, null, 2), 'utf-8');
    } catch (err) {
        console.error('Error saving projects database:', err);
    }
}

/**
 * Get a specific project by its unique ID
 * @param {number|string} id Project ID
 * @returns {Object|null} Project object or null if not found
 */
function getProject(id) {
    const projects = getProjects();
    return projects.find(p => p.id == id) || null;
}

/**
 * Create a new project and save it
 * @param {string} name Project name
 * @returns {Object} The newly created project object
 * @throws {Error} If a project with the same name already exists
 */
function createProject(name) {
    const projects = getProjects();

    // Check for duplicate project names
    const existingProject = projects.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existingProject) {
        throw new Error('PROJECT_NAME_EXISTS');
    }

    const newProject = {
        id: Date.now(),
        name: name,
        blocksCount: 0,
        workspaceState: null,
        pythonCode: '# Write your code here\n',
        createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    saveProjects(projects);
    return newProject;
}

/**
 * Update an existing project's data
 * @param {number|string} id Project ID
 * @param {Object} updateData The data to update
 * @returns {Object|null} The updated project or null if not found
 */
function updateProject(id, updateData) {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id == id);
    if (index === -1) return null;

    projects[index] = {
        ...projects[index],
        ...updateData,
        id: projects[index].id
    };

    saveProjects(projects);
    return projects[index];
}

/**
 * Delete a project from the database
 * @param {number|string} id Project ID to delete
 * @returns {boolean} true if deleted successfully, false otherwise
 */
function deleteProject(id) {
    const projects = getProjects();
    const filtered = projects.filter(p => p.id != id);
    if (filtered.length === projects.length) return false;

    saveProjects(filtered);
    return true;
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
};
