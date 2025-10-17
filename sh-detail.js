// 1. 获取暗影佣兵团详情页的机甲切换元素
const mechaBtns = document.querySelectorAll('.mecha-btn');
const mechaInfos = document.querySelectorAll('.mecha-info');

// 2. 机甲切换功能
mechaBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 移除所有按钮的active类
        mechaBtns.forEach(b => b.classList.remove('active'));
        // 激活当前按钮
        this.classList.add('active');
        // 获取当前机甲ID
        const mechaId = this.getAttribute('data-mecha');
        // 隐藏所有机甲信息
        mechaInfos.forEach(info => info.classList.remove('active'));
        // 显示当前机甲信息
        document.getElementById(mechaId).classList.add('active');
    });
});

// 3. 平滑滚动（针对返回首页链接）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 4. 触发进入动画
window.addEventListener('load', function() {
    const animateElements = document.querySelectorAll('.animate-from-bottom');
    animateElements.forEach(el => el.classList.add('active'));
});