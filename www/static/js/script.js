    // Init App
    var myApp = new Framework7({
        modalTitle: 'Framework7',
        pushState: true,
        swipeBackPage:true,
        swipeBackPageThreshold:'30',
        swipeBackPageAnimateShadow:true,
        swipeBackPageAnimateOpacity:true,
        animateNavBackIcon: true,
        upscroller: {text : 'Top'},
        // Enable Material theme
        material: true,
    });

    // Expose Internal DOM library
    var $$ = Dom7;

    // Add main view
    var mainView = myApp.addView('.view-main', {});

    // 下拉刷新页面
    var ptrContent = $$('.pull-to-refresh-content');

    // 添加'refresh'监听器
    ptrContent.on('refresh', function (e) {
        $$.post('/main/getIndexContent',{refresh:1},function(data){refresh(data);});
    });
    function refresh(data){
        // 列表元素的HTML字符串
        var dataJsonObject = eval('(' + data + ')');
        var itemHtmlLength = dataJsonObject.length;
        var itemHtml='';
        var IMG_PATH = '/static/img/';
        for(i=0;i<itemHtmlLength;i++){
            if(dataJsonObject[i].classify == 'video'){
                var preview = IMG_PATH+'video.png';
            }else{
                var preview = IMG_PATH+'images.png';
            }
            itemHtml += '<li><a class="item-link item-content" href="/item/get/'+dataJsonObject[i].id+'">'+
                '<div class="item-media"><img src="'+ preview +'" style="height:40px;width:40px;"/></div>'+
                '<div class="item-inner">'+
                '<div class="item-title-row">'+
                '<div class="item-title">'+dataJsonObject[i].title+'</div>'+
                '</div>'+
                '<div class="item-subtitle">'+dataJsonObject[i].classify+'</div>'+
                '</div>'+
                '</a></li>';
        }
        // 模拟UI的加载过程
        setTimeout(function () {
            // 前插新列表元素
            ptrContent.find('#indexContent ul').html(itemHtml);
            // 加载完毕需要重置
            myApp.pullToRefreshDone();
        }, 1000);
    }

    /*
     *   主页无限滚动加载下一页
     */
    // 加载flag
    var loading = false;

    // 上次加载的序号
    var lastIndex = $$('#indexContent li').length;

    // 最多可加载的条目
    // var maxItems = 1000;

    // 每次加载添加多少条目
    var itemsPerLoad = 30;

    // 注册'infinite'事件处理函数
    $$('.infinite-scroll').on('infinite', function () {
        // 如果正在加载，则退出
        if (loading) return;
        // 设置flag
        loading = true;
        //显示loading圈圈
        $$('.infinite-scroll-preloader').show();
        $$.post('/main/getNextPageContent',{limitStartPage:lastIndex,limitGetNumPage:itemsPerLoad},function(data){loadNextPage(data);});
    });
    function loadNextPage(data){
        // 列表元素的HTML字符串
        var dataJsonObject = eval('(' + data + ')');
        var itemHtmlLength = dataJsonObject.length;
        var itemHtml='';
        var IMG_PATH = '/static/img/';
        for(i=0;i<itemHtmlLength;i++){
            if(dataJsonObject[i].classify == 'video'){
                var preview = IMG_PATH+'video.png';
            }else{
                var preview = IMG_PATH+'images.png';
            }
            itemHtml += '<li><a class="item-link item-content" href="/item/get/'+dataJsonObject[i].id+'">'+
                '<div class="item-media"><img src="'+ preview +'" style="height:40px;width:40px;"/></div>'+
                '<div class="item-inner">'+
                '<div class="item-title-row">'+
                '<div class="item-title">'+dataJsonObject[i].title+'</div>'+
                '</div>'+
                '<div class="item-subtitle">'+dataJsonObject[i].classify+'</div>'+
                '</div>'+
                '</a></li>';
        }
        // 模拟UI的加载过程
        setTimeout(function () {
            // 前插新列表元素
            ptrContent.find('#indexContent ul').append(itemHtml);
            //加载完毕隐藏loading圈圈
            $$('.infinite-scroll-preloader').hide();
            lastIndex = $$('#indexContent li').length;
            // 加载完毕需要重置loading状态
            loading = false;
        }, 1000);
    }

    //预设滑动多长距离触发
    trigger = 50;
    // 获取第一个
    $$("body").on("touchstart", function(e) {
        startX = e.targetTouches[0].pageX;
        // 得出触发事件的X坐标
        endX = startX + trigger;
    });

    //监听滑动时间
    $$('body').on('touchmove',function(e){
        //滑动X坐标
        var nowX = e.targetTouches[0].pageX;
        // 如果滑动距离不够，不触发任何事件
        if(nowX < endX) return;
        //
        mainView.router.back()
    });