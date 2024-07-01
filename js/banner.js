(function () {
    // 完成横幅区的图片切换
    // 横幅区数据
    var datas = [
        {
            img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/15c05b32cf948b594477dfc3eb69fb69.jpg?w=2452&h=920',
            link: 'https://www.mi.com/mi11le-5g-ne',
        },
        {
            img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a532e33470d046b3f044d5ea49fc5e9e.png?thumb=1&w=2452&h=920&f=webp&q=90',
            link: 'https://www.mi.com/xiaomipad5',
        },
        {
            img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
            link: 'https://www.mi.com/a/h/22033.html?sign=b60a6ca9167bce2d1ed8ee319cf83c75',
        },
        {
            img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/af7be8f65065f405f57f46a02731f78d.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
            link: 'https://www.mi.com/a/h/22812.html?sign=aab397a7ecf2ae4c1765e9d11fdccca6',
        },
    ];

    /*
        1. 设置超链接的地址和图片路径
        2. 动态生成 span 元素
        3. 控制 span 元素的类样式
    */
    function $(selector) {
        return document.querySelector(selector);
    }
    var bannerDots = $('.banner-dots');
    var coverLinker = $('.banner-cover');
    var bannerCoverImg = $('.banner-cover img');
    var pointerLeft = $('.banner-pointer-left');
    var pointerRight = $('.banner-pointer-right');
    var banner = $('.banner');
    var curIndex = 0; // 目前位于第几张

    /**
     * 初始化
     */
    function init() {
        // 生成小点
        for (var i = 0; i < datas.length; i++) {
            var span = document.createElement('span');
            span.className = 'fl';
            (function (i) {
                span.addEventListener('click', function () {
                    curIndex = i;
                    change(i);
                });
            })(i);
            bannerDots.appendChild(span);
        };
        change(0);
        autoPlay();
    };

    /**
     * 将指定下标的数据显示到页面上
     * @param {number} index 要设置的数据索引
     */
    function change(index) {
        var data = datas[index];
        coverLinker.href = data.link;
        bannerCoverImg.src = data.img;
        // 先移除之前选中的效果
        var selected = bannerDots.querySelector('.banner-dots-selected');
        if (selected) {
            selected.className = 'fl';
        }
        bannerDots.children[index].className = 'banner-dots-selected fl';
    }

    /**
     * 向前翻
     */
    function toPrev() {
        curIndex--;
        if (curIndex < 0) {
            curIndex = datas.length - 1;
        }
        change(curIndex);
    }

    /**
     * 向后翻
     */
    function toNext() {
        curIndex++;
        if (curIndex >= datas.length) {
            curIndex = 0;
        }
        change(curIndex);
    }

    /**
     * 自动播放
     */
    var timer = null;
    function autoPlay() {
        timer = setInterval(toNext, 1500);
    };

    /**
     * 停止播放
     */
    function stopPlay() {
        clearInterval(timer);
        timer = null;
    };

    /**
     * 鼠标移入调用停止播放方法
     */
    banner.addEventListener('mouseenter', stopPlay);
    /**
     * 鼠标移出继续调用
     */
    banner.addEventListener('mouseleave', autoPlay);


    // 注册翻页事件
    pointerLeft.addEventListener('click', toPrev);
    pointerRight.addEventListener('click', toNext);

    init();
})();
