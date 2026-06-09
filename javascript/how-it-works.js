/* =============================================
   HOW-IT-WORKS.JS
   ============================================= */

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
});

// ===== FAQ ACCORDION =====
function toggleFAQ(questionEl) {
    const item = questionEl.closest('.faq-item');
    if (!item) return;

    const isOpen = item.classList.contains('open');

    // Close all open items first
    document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
    });

    // If the clicked one was not open, open it
    if (!isOpen) {
        item.classList.add('open');
    }
}
