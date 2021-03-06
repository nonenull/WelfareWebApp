<div data-page="lazy-load" class="page">
  <div class="navbar">
    <div class="navbar-inner">
      <div class="left"><a href="index.html" class="back link icon-only"><i class="icon icon-back"></i></a></div>
      <?php echo '<div class="center" id="'.$itemData[0]->id.'">'. $itemData[0]->title .'</div>'; ?>
      <div class="right"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a></div>
    </div>
  </div>
    <div class="page-content">
      <?php
        $itemData = $itemData[0];
        if($itemData->description){
          $title = $itemData->description;
        }else{
          $title = $itemData->title;
        }
        switch($itemData->classify){
          case 'text':
            $content = '<h2>'.$itemData->content.'</h2>';
            break;
          case 'picture':
            $content = '<img width="100%" src="' . $itemData->content . '">';
            break;
          case 'gif':
            $content = '<img width="100%" src="' . $itemData->content . '">';
            break;
          default:
            $content = '获取内容出错';
        }
        echo '<p><h2 style="text-align: center;margin:0 10px;">' . $title . '</h2></p>
            <div class="card ks-facebook-card">
                <div class="card-header no-border">
                  <div class="ks-facebook-avatar">
                    <img width="34" height="34" data-src="http://lorempixel.com/68/68/people/1/" class="lazy">
                  </div>
                  <div class="ks-facebook-name">' . $itemData->classify . '</div>
                  <div class="ks-facebook-date">' . $itemData->createTime . '</div>
                </div>
                <div class="card-content">
                  <div class="card-content-inner">
                    '.$content.'
                    <div class="card-footer no-border">
                      <span id="like-num">'. $itemData->lookNum .'</span>
                      <a class="link" href="#" id="like">喜欢</a>
                      <a class="link" href="#" id="comment">评论</a>
                      <a class="link" href="#" id="share">分享</a>
                    </div>
                  </div>
              </div>
            </div>';
      ?>
    </div>
</div>