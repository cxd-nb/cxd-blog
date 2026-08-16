(function() {
    'use strict';

    // ===== 弹窗控制 =====
    const modal = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalCloseBtn');

    // 页面加载后显示弹窗（延迟一点点让过渡更自然）
    window.addEventListener('DOMContentLoaded', function() {
        modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    // 点击遮罩也可关闭（可选）
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // ===== 移动端菜单切换 =====
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    toggle.addEventListener('click', function() {
        const isOpen = navLinks.classList.toggle('open');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // 点击导航链接后关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    // ===== 主题切换 =====
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    // 检测本地存储主题
    let currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // ===== 联系表单提交 (模拟) =====
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = form.querySelector('.btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> 已发送！';
            btn.style.background = '#2ecc71';
            btn.style.boxShadow = '0 8px 24px rgba(46,204,113,0.30)';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.boxShadow = '';
                btn.disabled = false;
                form.reset();
            }, 2500);
        }, 1500);
    });

    // ===== 导航栏滚动阴影 =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.06)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // ===== 平滑滚动（兼容部分浏览器） =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

})();
/* ===== 联系区单栏布局（删除表单后使用） ===== */
.contact-wrapper.single-col {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 40px 56px;
}
.contact-wrapper.single-col .contact-info {
    max-width: 600px;
    margin: 0 auto;
}
.contact-wrapper.single-col .contact-item {
    justify-content: center;
}
.contact-wrapper.single-col .social-links {
    justify-content: center;
}
/* 响应式适配 */
@media (max-width: 900px) {
    .contact-wrapper.single-col {
        padding: 32px 24px;
    }
}
