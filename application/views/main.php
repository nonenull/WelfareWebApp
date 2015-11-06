<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="theme-color" content="#2196f3">
    <title>赖床福利</title>
    <link rel="stylesheet" href="static/css/framework7.material.css">
    <link rel="stylesheet" href="static/css/framework7.material.colors.css">
    <link rel="stylesheet" href="static/css/kitchen-sink.css">
</head>
<body>
<div class="statusbar-overlay"></div>
<div class="panel-overlay"></div>

<!-- 左菜单 开始-->
<div class="panel panel-left panel-cover">
    <div class="view navbar-fixed">
        <div class="pages">
            <div data-page="panel-left" class="page">
                <div class="navbar">
                    <div class="navbar-inner">
                        <div class="center">分类</div>
                    </div>
                </div>
                <div class="page-content">
                    <div class="content-block-title">精彩内容为您呈现,每日更新</div>
                    <div class="list-block">
                        <ul>
                            <li><a class="item-link item-content" href="#">
                                    <div class="item-media"><img width="80" src="/static/img/video.jpg"></div>
                                    <div class="item-inner">
                                        <div class="item-text">搞笑视频</div>
                                    </div>
                                </a></li>
                            <li><a class="item-link item-content" href="#">
                                    <div class="item-media"><img width="80" src="/static/img/preview.gif"></div>
                                    <div class="item-inner">
                                        <div class="item-text">搞笑图片</div>
                                    </div>
                                </a></li>
                            <li><a class="item-link item-content" href="#">
                                    <div class="item-media"><img width="80" src="/static/img/preview.gif"></div>
                                    <div class="item-inner">
                                        <div class="item-text">搞笑新闻</div>
                                    </div>
                                </a></li>
                            <li><a class="item-link item-content" href="#">
                                    <div class="item-media"><img width="80" src="/static/img/preview.gif"></div>
                                    <div class="item-inner">
                                        <div class="item-text">搞笑漫画</div>
                                    </div>
                                </a></li>
                            <li><a class="item-link item-content" href="#">
                                    <div class="item-media"><img width="80" src="/static/img/preview.gif"></div>
                                    <div class="item-inner">
                                        <div class="item-text">内涵段子</div>
                                    </div>
                                </a></li>
                        </ul>
                    </div>
                    <!--              <div class="content-block">-->
                    <!--                <p>Long text block goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sem urna, gravida non scelerisque id, fringilla ac velit. Phasellus elementum a ipsum at ornare. Mauris sagittis rhoncus euismod. Integer convallis augue eu lacus ultrices, in dictum elit consequat. Nulla faucibus massa id felis egestas eleifend. Proin consequat dignissim magna ut scelerisque. Vestibulum ac lorem semper, posuere sapien nec, pharetra massa. Nulla a tellus facilisis, sollicitudin quam porta, aliquam lorem. Fusce dignissim eros ac diam molestie, ut ultrices lorem tristique. Ut facilisis augue ac nisi egestas malesuada. Nunc posuere tortor quis eleifend mollis. Aliquam erat volutpat. Donec feugiat elit tellus, nec convallis orci elementum in. Sed urna mi, vestibulum id tempus id, pretium et ante. Pellentesque eget sollicitudin ligula. Phasellus pellentesque velit eu porta suscipit.</p>-->
                    <!--              </div>-->
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 左菜单 结束-->

<div class="view view-main" data-page="index">
    <div class="pages navbar-fixed">
        <div data-page="index" class="page">
            <div class="navbar">
                <div class="navbar-inner">
                    <div class="center">赖床福利</div>
                    <div class="right"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a>
                    </div>
                </div>
            </div>
            <div class="page-content pull-to-refresh-content infinite-scroll" data-distance="300" data-ptr-distance="60">
                <div class="pull-to-refresh-layer">
                    <div class="preloader"></div>
                    <div class="pull-to-refresh-arrow"></div>
                </div>
                <div class="list-block media-list" id="indexContent">
                    <ul>
                    <?php
                        define('IMG_PATH','/static/img/');
                        foreach ($indexData as $k => $v) {
                            if($v->classify == 'video'){
                                $preview = IMG_PATH.'video.png';
                            }else{
                                $preview = IMG_PATH.'images.png';
                            }
                            echo '<li><a class="item-link item-content" href="/item/get/'.$v->id.'">
                                <div class="item-media"><img data-src="'.$preview.'" style="height:40px;width:40px;" class="lazy"/></div>
                                <div class="item-inner">
                                    <div class="item-title-row">
                                        <div class="item-title">'.$v->title.'</div>
                                    </div>
                                    <div class="item-subtitle">'.$v->lookNum.$v->classify.'</div>
                                </div>
                            </a></li>';
                        }
                    ?>
                    </ul>
                </div>
                <div class="infinite-scroll-preloader"><div class="preloader"></div></div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="static/js/framework7.js"></script>
<script type="text/javascript" src="static/js/framework7.upscroller.min.js"></script>
<script type="text/javascript" src="static/js/script.js"></script>
<style>
    .infinite-scroll-preloader {
        margin-top:-20px;
        margin-bottom: 10px;
        text-align: center;
        display: none;
    }
    .infinite-scroll-preloader .preloader {
        width:34px;
        height:34px;
    }
</style>
<link href="http://fonts.googleapis.com/css?family=Roboto:400,300,500,700" rel="stylesheet" type="text/css">
<link href="static/css/framework7.upscroller.min.css" rel="stylesheet" type="text/css">
</body>
</html>