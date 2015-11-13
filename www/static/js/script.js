    ////判断页面来源
    //var browser={
    //    versions:function(){
    //        var u = navigator.userAgent, app = navigator.appVersion;
    //        return { //移动终端浏览器版本信息
    //            trident: u.indexOf('Trident') > -1, //IE内核
    //            presto: u.indexOf('Presto') > -1, //opera内核
    //            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    //            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    //            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    //            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    //            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
    //            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
    //            iPad: u.indexOf('iPad') > -1, //是否iPad
    //            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    //        };
    //    }(),
    //    language:(navigator.browserLanguage || navigator.language).toLowerCase()
    //}
    ////alert("语言版本: "+browser.language);
    ////alert(" 是否为移动终端: "+browser.versions.mobile);
    ////alert(" ios终端: "+browser.versions.ios);
    ////alert(" android终端: "+browser.versions.android);
    ////alert(" 是否为iPhone: "+browser.versions.iPhone);
    ////alert(" 是否iPad: "+browser.versions.iPad);
    ////alert(navigator.userAgent);

    // Init App
    var myApp = new Framework7({
        modalTitle: '赖床福利',
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


    //防止多次点击喜欢按钮,设置flag
    var isLikeClick = false;
    //点击喜欢
    $$(document).on('click','.card-footer #like',function(e){
        //获取当前喜欢数
        var nowNum = parseInt($$('#like-num').html());
        var id = $$('.page-on-center .center').attr('id');
        if(isLikeClick == false){
            //喜欢数加1
            $$('#like-num').html(nowNum+1);
            isLikeClick = true;
            $$.post('/item/lookNum',{id:id,action:"add"});
        }else{
            //点过一次的再点回退1
            $$('#like-num').html(nowNum-1);
            isLikeClick = false;
            $$.post('/item/lookNum',{id:id,action:"minus"});
        }
    });

    var actionSheetButtons = [
        [
            // Group Label
            {
                text: '分享',
                label: true
            },
            {
                text: '分享到QQ好友',
                onClick: function () {
                    //myApp.alert('He Hoou!');
                    window.location.href="ios://@share?qq&"+valueString;
                }
            },
            {
                text: '分享到微信',
                //color: 'red',
                onClick: function () {
                    //myApp.alert('You have clicked red button!');
                    window.location.href="ios://@share?weixin&"+valueString;
                }
            },
        ],
        [
            {
                text: 'Cancel'
            }
        ]
    ];
    $$(document).on('click','#share', function (e) {
        //获取标题
        var title = $$('.page-on-center .navbar .center').text();
        //alert(title);
        //获取描述
        var description = $$('.page-on-center .page-content').children('h2').text();
        //alert(description);
        //获取当前url
        var url = window.location.href;
        //alert(url);
        //预览图
        var previewURL = $$('.page-on-center .card-content-inner img').attr('src');
        //alert(previewURL);
        if(!title || !description || !url || !previewURL) {
            myApp.alert('参数缺失,无法分享');
        }
        //用,组合字符串并且base64编码
        valueString = base64encode(utf16to8(title+','+description+','+url+','+previewURL))
        myApp.actions(actionSheetButtons);
    });

    //base64
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function base64encode(str) {
        var out, i, len;
        var c1, c2, c3;

        len = str.length;
        i = 0;
        out = "";
        while(i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if(i == len)
            {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if(i == len)
            {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }

    function utf16to8(str) {
        var out, i, len, c;

        out = "";
        len = str.length;
        for(i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
        }
        return out;
    }