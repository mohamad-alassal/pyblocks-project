/* =============================================
   PROJECTS.JS - منطق إدارة المشاريع والربط مع الـ Backend
   ============================================= */

// مصفوفة لتخزين المشاريع محلياً بعد جلبها من الخادم (لتسهيل البحث والفلترة السريعة)
let localProjects = [];

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DARK MODE - تفعيل وإدارة الوضع الداكن =====
    const darkToggle = document.getElementById('darkToggle');
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode === 'enabled') {
        document.body.classList.add('dark');
        if (darkToggle) darkToggle.textContent = '☀️';
    }

    if (darkToggle) {
        darkToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark');
            if (document.body.classList.contains('dark')) {
                localStorage.setItem('darkMode', 'enabled');
                darkToggle.textContent = '☀️';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkToggle.textContent = '🌙';
            }
        });
    }

    // ===== GET PROJECTS - جلب المشاريع من الخادم =====
    fetchProjects();

    // إضافة مستمع لزر Enter في حقل إدخال اسم المشروع بالنافذة المنبثقة
    const projectNameInput = document.getElementById('projectNameInput');
    if (projectNameInput) {
        projectNameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                createProject();
            }
        });
    }
});

/**
 * جلب المشاريع من الـ Backend وعرضها
 */
function fetchProjects() {
    fetch('/api/projects')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(projects => {
            localProjects = projects; // حفظ المشاريع محلياً للفلترة
            displayProjects(projects);
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            alert('حدث خطأ أثناء تحميل المشاريع من الخادم. يرجى التأكد من تشغيل الـ Backend.');
        });
}

/**
 * عرض بطاقات المشاريع في شبكة الـ HTML
 * @param {Array} projects مصفوفة المشاريع المراد عرضها
 */
function displayProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (!grid) return;
    grid.innerHTML = '';

    // إذا لم تكن هناك مشاريع، اعرض رسالة التنبيه الفارغة
    if (projects.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    // إنشاء بطاقة لكل مشروع
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        // فتح المشروع عند الضغط على البطاقة ككل (مع استثناء زر الحذف)
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('project-card-delete')) {
                openProject(project.id);
            }
        });

        card.innerHTML = `
            <!-- زر الحذف في الزاوية -->
            <button class="project-card-delete" onclick="deleteProject(event, ${project.id})" title="Delete project">
                ✕
            </button>
            
            <!-- أيقونة الملف -->
            <div class="project-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" stroke-width="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
            </div>

            <!-- اسم المشروع -->
            <div class="project-card-name">${escapeHTML(project.name)}</div>

            <!-- عدد الكتل والبيانات الميتا -->
            <div class="project-card-meta">${project.blocksCount || 0} blocks</div>

            <!-- زر الفتح -->
            <button class="project-card-open">
                Open <span>→</span>
            </button>
        `;

        grid.appendChild(card);
    });
}

/**
 * إنشاء مشروع جديد وإرسال طلب POST إلى الـ Backend
 */
function createProject() {
    const input = document.getElementById('projectNameInput');
    const projectName = input.value.trim();

    if (!projectName) {
        alert('يرجى إدخال اسم المشروع أولاً.');
        return;
    }

    // إرسال طلب POST لحفظ المشروع الجديد في الـ backend
    fetch('/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: projectName })
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to create project');
        return response.json();
    })
    .then(newProject => {
        closeModal();
        fetchProjects(); // إعادة تحميل القائمة من الخادم
        // توجيه المستخدم مباشرة لصفحة المحرر الخاصة بالمشروع الجديد
        openProject(newProject.id);
    })
    .catch(error => {
        console.error('Error creating project:', error);
        alert('فشل إنشاء المشروع. يرجى المحاولة مرة أخرى.');
    });
}

/**
 * حذف مشروع من الـ Backend
 * @param {Event} event الحدث لمنع انتشار الضغطة للبطاقة بأكملها
 * @param {number} projectId معرف المشروع
 */
function deleteProject(event, projectId) {
    event.stopPropagation(); // منع انتقال الضغطة لفتح المشروع

    if (!confirm('هل أنت متأكد من رغبتك في حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء.')) {
        return;
    }

    // إرسال طلب DELETE إلى الـ backend
    fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to delete project');
        return response.json();
    })
    .then(() => {
        fetchProjects(); // تحديث الشبكة بعد الحذف
    })
    .catch(error => {
        console.error('Error deleting project:', error);
        alert('فشل حذف المشروع.');
    });
}

/**
 * توجيه المتصفح لصفحة المحرر
 * @param {number} projectId معرف المشروع
 */
function openProject(projectId) {
    window.location.href = `editor.html?project=${projectId}`;
}

/**
 * فلترة المشاريع محلياً أثناء الكتابة في حقل البحث
 */
function filterProjects() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const filtered = localProjects.filter(project => 
        project.name.toLowerCase().includes(searchValue)
    );
    displayProjects(filtered);
}

// ===== MODAL FUNCTIONS - نوافذ الحوار المنبثقة =====

function openModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.classList.add('active');
        setTimeout(() => {
            document.getElementById('projectNameInput').focus();
        }, 100);
    }
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.getElementById('projectNameInput').value = '';
    }
}

function closeModalOnOverlay(event) {
    if (event.target.id === 'modalOverlay') {
        closeModal();
    }
}

/**
 * تنظيف نصوص المدخلات لمنع هجمات XSS
 */
function escapeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
