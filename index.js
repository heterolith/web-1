// 1. 先获取主页需要用到的所有元素（避免重复查询DOM）
const nav = document.getElementById('nav'); // 导航栏容器
const navMenu = document.getElementById('navMenu'); // 导航菜单
const menuBtn = document.getElementById('menuBtn'); // 汉堡按钮
const pullRefreshPopup = document.getElementById('pullRefreshPopup'); // 下拉刷新弹窗
const navElements = [nav, navMenu, menuBtn]; // 导航相关元素集合
const navLinks = document.querySelectorAll('.nav-menu a'); // 导航菜单的所有链接


// 2. 汉堡按钮控制导航菜单显示/隐藏（移动端用）
menuBtn.addEventListener('click', function() {
    // 给菜单和按钮加/移除active类（用于CSS控制样式）
    navMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    // 根据是否有active类，控制菜单显示方式
    navMenu.style.display = navMenu.classList.contains('active') ? 'flex' : 'none';
});


// 3. 点击页面空白处，自动关闭导航菜单（优化体验）
document.addEventListener('click', function(e) {
    // 判断点击的位置是否在导航相关元素之外
    const isClickOutsideNav = !navElements.some(el => el.contains(e.target));
    // 如果菜单是打开的，且点击了空白处，就关闭菜单
    if (isClickOutsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        navMenu.style.display = 'none';
    }
});


// 4. 导航链接平滑滚动（点击“首页/阵营库”等，平滑跳转到对应区域）
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止默认跳转行为
        // 获取链接的目标锚点（比如#factions、#mecha）
        const targetId = this.getAttribute('href').substring(1);
        // 根据锚点找到对应的页面元素
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // 计算目标元素的顶部位置（减去导航栏高度，避免被导航栏遮挡）
            const navHeight = nav.offsetHeight;
            const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            // 平滑滚动到目标位置
            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
            
            // 移动端：点击导航链接后自动关闭菜单（优化体验）
            if (window.innerWidth <= 992) {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('active');
                navMenu.style.display = 'none';
            }
        }
    });
});


// 5. 导航栏滑动跟随 + 下拉刷新功能
let lastScrollTop = 0; // 记录上一次滚动的位置
const pullThreshold = 50; // 下拉刷新的触发阈值（50px）
let isPulling = false; // 标记是否正在下拉


window.addEventListener('scroll', function() {
    // 获取当前滚动的垂直位置
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;


    // ① 导航栏滑动逻辑（滚动时保持导航栏在顶部，不消失）
    if (scrollTop < lastScrollTop) {
        // 向上滚动：导航栏保持显示
        nav.classList.remove('nav-lock');
        nav.classList.add('nav-follow');
    } else {
        // 向下滚动：导航栏依然保持显示（避免遮挡内容）
        nav.classList.add('nav-lock');
        nav.classList.remove('nav-follow');
    }
    // 更新上一次滚动位置（处理边界情况：滚动到顶部时设为0）
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;


    // ② 下拉刷新弹窗逻辑（只有滚动到顶部时才生效）
    if (scrollTop <= 0) {
        // 计算下拉的距离（scrollTop为负，取绝对值）
        const pullDistance = Math.abs(scrollTop);
        // 如果下拉距离超过阈值，显示“释放刷新”弹窗
        if (pullDistance >= pullThreshold) {
            pullRefreshPopup.classList.add('active');
            isPulling = true; // 标记正在下拉
        } else {
            // 没到阈值，隐藏弹窗
            pullRefreshPopup.classList.remove('active');
            isPulling = false;
        }
    } else {
        // 不在顶部，强制隐藏弹窗
        pullRefreshPopup.classList.remove('active');
        isPulling = false;
    }
});


// 6. 释放下拉时，模拟刷新效果
window.addEventListener('touchend', function() {
    // 如果正在下拉（满足刷新条件）
    if (isPulling) {
        // 更改弹窗文字为“刷新中...”
        pullRefreshPopup.innerHTML = '<div class="pull-refresh-text">刷新中...</div>';
        // 模拟1.5秒后刷新完成（实际项目中这里可以加真实的刷新逻辑）
        setTimeout(() => {
            // 刷新完成，隐藏弹窗并恢复文字
            pullRefreshPopup.classList.remove('active');
            pullRefreshPopup.innerHTML = '<div class="pull-refresh-text">释放刷新</div>';
        }, 1500);
        // 重置下拉状态
        isPulling = false;
    }
});


// 7. 窗口大小变化时，重置导航菜单样式（适配屏幕尺寸切换）
window.addEventListener('resize', function() {
    // 桌面端（屏幕宽度>992px）：强制显示导航菜单，移除active类
    if (window.innerWidth > 992) {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        navMenu.style.display = 'flex';
    } else {
        // 移动端：如果菜单没打开，就隐藏
        if (!navMenu.classList.contains('active')) {
            navMenu.style.display = 'none';
        }
    }
});


// 8. 页面加载完成后，初始化导航菜单状态
window.addEventListener('load', function() {
    // 重置滚动位置记录
    lastScrollTop = 0;
    // 桌面端默认显示菜单，移动端默认隐藏
    if (window.innerWidth > 992) {
        navMenu.style.display = 'flex';
    } else {
        navMenu.style.display = 'none';
    }
});