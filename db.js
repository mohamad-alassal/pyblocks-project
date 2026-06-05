const fs = require('fs');
const path = require('path');

// مسار المجلد والملف الخاص ببيانات المشاريع
const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'projects.json');

/**
 * تهيئة قاعدة البيانات البسيطة (ملف JSON)
 */
function initDB() {
    // إنشاء مجلد data إذا لم يكن موجوداً
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
    
    // إنشاء ملف projects.json بمصفوفة فارغة إذا لم يكن موجوداً
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify([], null, 2), 'utf-8');
    }
}

/**
 * جلب جميع المشاريع من قاعدة البيانات
 * @returns {Array} مصفوفة المشاريع
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
 * حفظ قائمة المشاريع في ملف JSON
 * @param {Array} projects مصفوفة المشاريع المراد حفظها
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
 * جلب مشروع محدد بواسطة معرّفه الفريد
 * @param {number|string} id معرف المشروع
 * @returns {Object|null} كائن المشروع أو null إذا لم يُعثر عليه
 */
function getProject(id) {
    const projects = getProjects();
    return projects.find(p => p.id == id) || null;
}

/**
 * إنشاء مشروع جديد وحفظه
 * @param {string} name اسم المشروع
 * @returns {Object} كائن المشروع المنشأ حديثاً
 */
function createProject(name) {
    const projects = getProjects();
    const newProject = {
        id: Date.now(), // استخدام الوقت الحالي كمعرّف فريد ومميز
        name: name,
        blocksCount: 0,
        workspaceState: null, // سيخزن حالة البلوكات لـ Blockly
        pythonCode: '# Write your code here\n',
        createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    saveProjects(projects);
    return newProject;
}

/**
 * تحديث بيانات مشروع موجود
 * @param {number|string} id معرف المشروع
 * @param {Object} updateData البيانات المراد تحديثها
 * @returns {Object|null} المشروع المحدث أو null إذا لم يوجد
 */
function updateProject(id, updateData) {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id == id);
    if (index === -1) return null;

    // دمج البيانات الجديدة مع البيانات القديمة للمشروع
    projects[index] = {
        ...projects[index],
        ...updateData,
        // تأكيد عدم تغيير المعرف
        id: projects[index].id 
    };

    saveProjects(projects);
    return projects[index];
}

/**
 * حذف مشروع من قاعدة البيانات
 * @param {number|string} id معرف المشروع المراد حذفه
 * @returns {boolean} true إذا تم الحذف بنجاح، وإلا false
 */
function deleteProject(id) {
    const projects = getProjects();
    const filtered = projects.filter(p => p.id != id);
    if (filtered.length === projects.length) return false; // لم يُعثر على المشروع لحذفه

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
