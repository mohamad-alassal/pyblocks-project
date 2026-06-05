// الاستماع لحدث حركة الماوس على مستوى الصفحة
document.addEventListener('mousemove', (e) => {
    // جلب إحداثيات الماوس
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // تحديث موقع الدائرة لتتبع الماوس
    circle.style.left = `${mouseX}px`;
    circle.style.top = `${mouseY}px`;
});