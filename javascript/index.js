/* =============================================
   INDEX.JS - منطق الصفحة الرئيسية (Landing Page)
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DARK MODE - تفعيل وإدارة الوضع الداكن =====
    const darkToggle = document.getElementById('darkToggle');
    const savedMode = localStorage.getItem('darkMode');
    
    // التحقق من الوضع المحفوظ في الـ LocalStorage لتطبيقه فوراً
    if (savedMode === 'enabled') {
        document.body.classList.add('dark');
        if (darkToggle) darkToggle.textContent = '☀️'; // تغيير الرمز لشمس
    }

    // زر تبديل الوضع الداكن/الفاتح
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

    // ===== STATS COUNTER ANIMATION - أنيميشن الأرقام الإحصائية =====
    const statsSection = document.querySelector('.stats-section');
    
    if (statsSection) {
        const observerOptions = {
            threshold: 0.5 // يشتغل الأنيميشن عندما يظهر 50% من القسم على الشاشة
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                    // إيقاف مراقبة العنصر بعد تشغيل الأنيميشن مرة واحدة
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(statsSection);
    }
});

/**
 * دالة الانتقال السلس إلى قسم الميزات
 */
function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * دالة تحريك العداد رقمياً من 0 إلى الهدف
 * @param {HTMLElement} element عنصر العداد الرقمي
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    let current = 0;
    const duration = 1500; // مدة الأنيميشن بالملي ثانية
    const startTime = performance.now();

    function update(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // استخدام دالة easeOutQuad للحصول على حركة عد طبيعية وسلسة
        const easeProgress = progress * (2 - progress);
        current = Math.floor(easeProgress * target);

        element.textContent = (suffix === '%') ? current + suffix : '+' + current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = (suffix === '%') ? target + suffix : '+' + target;
        }
    }

    requestAnimationFrame(update);
}
