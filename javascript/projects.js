/* =============================================
   PROJECTS.JS - Project management logic and backend communication
   ============================================= */

let localProjects = [];

document.addEventListener('DOMContentLoaded', function () {

    // ===== DARK MODE =====
    const darkToggle = document.getElementById('darkToggle');
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode === 'enabled') {
        document.body.classList.add('dark');
        if (darkToggle) darkToggle.textContent = '☀️';
    }

    if (darkToggle) {
        darkToggle.addEventListener('click', function () {
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

    // ===== GET PROJECTS =====
    fetchProjects();

    const projectNameInput = document.getElementById('projectNameInput');
    if (projectNameInput) {
        projectNameInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                createProject();
            }
        });
    }
});

function fetchProjects() {
    fetch('/api/projects')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(projects => {
            localProjects = projects;
            displayProjects(projects);
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            alert('An error occurred while loading projects. Please make sure the backend is running.');
        });
}

function displayProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');

    if (!grid) return;
    grid.innerHTML = '';

    if (projects.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.addEventListener('click', function (e) {
            if (!e.target.classList.contains('project-card-delete')) {
                openProject(project.id);
            }
        });

        card.innerHTML = `
            <button class="project-card-delete" onclick="deleteProject(event, ${project.id})" title="Delete project">
                ✕
            </button>
            
            <div class="project-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" stroke-width="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
            </div>

            <div class="project-card-name">${escapeHTML(project.name)}</div>

            <div class="project-card-meta">${project.blocksCount || 0} blocks</div>

            <button class="project-card-open">
                Open <span>→</span>
            </button>
        `;

        grid.appendChild(card);
    });
}

function createProject() {
    const input = document.getElementById('projectNameInput');
    const projectName = input.value.trim();

    if (!projectName) {
        alert('Please enter a project name first.');
        return;
    }

    fetch('/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: projectName })
    })
        .then(response => {
            if (response.status === 409) {
                throw new Error('DUPLICATE_NAME');
            }
            if (!response.ok) throw new Error('Failed to create project');
            return response.json();
        })
        .then(newProject => {
            closeModal();
            fetchProjects();
            openProject(newProject.id);
        })
        .catch(error => {
            console.error('Error creating project:', error);
            if (error.message === 'DUPLICATE_NAME') {
                alert('A project with this name already exists!\n\nPlease choose another name.');
            } else {
                alert('Failed to create project. Please try again.');
            }
        });
}

function deleteProject(event, projectId) {
    event.stopPropagation();

    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        return;
    }

    fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to delete project');
            return response.json();
        })
        .then(() => {
            fetchProjects();
        })
        .catch(error => {
            console.error('Error deleting project:', error);
            alert('Failed to delete project.');
        });
}

function openProject(projectId) {
    window.location.href = `editor.html?project=${projectId}`;
}

function filterProjects() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const filtered = localProjects.filter(project =>
        project.name.toLowerCase().includes(searchValue)
    );
    displayProjects(filtered);
}

// ===== MODAL FUNCTIONS =====

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
