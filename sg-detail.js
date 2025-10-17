// 1. 获取钢铁守卫详情页需要的元素（机甲切换相关）
const mechaBtns = document.querySelectorAll('.mecha-btn'); // 所有机甲切换按钮
const mechaInfos = document.querySelectorAll('.mecha-info'); // 所有机甲信息面板


// 2. 机甲切换功能（点击按钮显示对应机甲信息）
mechaBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 第一步：移除所有按钮的active类（取消所有按钮的激活状态）
        mechaBtns.forEach(b => b.classList.remove('active'));
        // 第二步：给当前点击的按钮添加active类（激活当前按钮）
        this.classList.add('active');
        // 第三步：获取当前按钮对应的机甲ID（从data-mecha属性中获取）
        const mechaId = this.getAttribute('data-mecha');
        // 第四步：移除所有机甲信息面板的active类（隐藏所有面板）
        mechaInfos.forEach(info => info.classList.remove('active'));
        // 第五步：给对应ID的机甲信息面板添加active类（显示当前选中的面板）
        document.getElementById(mechaId).classList.add('active');
    });
});


// 3. 平滑滚动功能（针对“返回首页”等锚点链接）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止默认跳转行为
        // 获取链接的目标锚点（比如#top）
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // 如果是#，不执行任何操作
        // 根据锚点找到对应的元素
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // 平滑滚动到目标位置
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// 4. 触发详情页“由下向上”进入动画（页面加载完成后执行）
window.addEventListener('load', function() {
    // 获取所有需要动画的元素（带animate-from-bottom类的元素）
    const animateElements = document.querySelectorAll('.animate-from-bottom');
    // 给每个元素添加active类，触发动画
    animateElements.forEach(el => {
        el.classList.add('active');
    });
});