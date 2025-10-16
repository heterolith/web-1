// 机甲详情页公共交互：图片切换、返回按钮、参数高亮等
document.addEventListener('DOMContentLoaded', function() {
    // 1. 机甲图片切换功能（点击缩略图换主图）
    const mainImg = document.querySelector('.mecha-main-img img');
    const thumbnails = document.querySelectorAll('.mecha-thumb');
    
    if (thumbnails.length > 0) {
        // 给每个缩略图加点击事件
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // 移除所有缩略图的active类
                thumbnails.forEach(t => t.classList.remove('active'));
                // 给当前点击的缩略图加active类
                this.classList.add('active');
                // 获取缩略图的图片地址，替换主图
                const imgSrc = this.querySelector('img').getAttribute('src');
                mainImg.setAttribute('src', imgSrc);
                // 可选：给主图加淡入动画（需配合CSS，这里先加过渡效果）
                mainImg.style.opacity = '0';
                setTimeout(() => {
                    mainImg.style.opacity = '1';
                }, 100);
            });
        });
        // 初始化：给第一个缩略图加active类
        thumbnails[0].classList.add('active');
    }

    // 2. 返回按钮逻辑（点击返回上一页，若没有上一页则返回阵营页）
    const backBtn = document.querySelector('.mecha-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // 先尝试返回上一页（用户可能从阵营页跳转过来）
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // 若没有上一页，默认返回钢铁守卫阵营页（可根据实际需求修改）
                window.location.href = 'sg-detail.html';
            }
        });
    }

    // 3. 机甲参数高亮（自动给数值加高亮类，如“89.5吨”“S级”）
    const paramTds = document.querySelectorAll('.params-table td');
    paramTds.forEach(td => {
        const text = td.textContent.trim();
        // 匹配数值（含数字、小数点、单位）或等级（S/A/B/C级）
        const valueRegex = /(\d+(\.\d+)?\s*[a-zA-Z%吨米小时]+)|([SABC]-?级)/;
        if (valueRegex.test(text)) {
            // 替换匹配到的内容，加高亮类
            td.innerHTML = text.replace(valueRegex, '<span class="param-highlight">$&</span>');
        }
    });

    // 4. 平滑滚动（若页面有锚点链接，如“回到顶部”）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});