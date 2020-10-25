$(function () {
    
    // 默认设备横屏的时候出现提示
    new LandscapeTip();

    let bgm = new Bgm({
        src:'media/bgm.mp3', //mp3文件地址
        // autoplay: true,   // 是否自动开始播放，默认 true
        // loop: true,   // 是否循环播放，默认 true
        icon: 'img/play_icon.png', // 播放按钮图标
        iconPause: 'img/pause_icon.png', // 暂停按钮图标 
        // animation: true, // 如果为 true 上面的icon转动，默认true 
        x: 70,   // x 坐标，可选 ，默认右上角
        y: 20,    // y 坐标，可选，默认右上角
        w: 57, // 图片的宽 默认图片本身宽高
        h: 57, // 图片的高 默认图片本身宽高
      });

    /* 禁止拖动 */
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
        return false;
    }, {
        passive: false
    });

    /* 查看本地存储是否存在用户信息 */
    let saveName = localStorage.getItem("saveName");
    /* 本地有就隐藏信息填写页 */
    if(saveName){
        $('.page2').hide();
        $('.topic').show();
        // $('.topic').css('top','100%');
    }

    /* 1. 预加载控制图片加载显示  */
    /* 加载的图片路径 */
    var imgs = [
        'img/add_code.png',
        'img/again_btn.png',
        'img/area_bg_false.png',
        'img/area_bg_false_2.png',
        'img/area_bg_true.png',
        'img/area_bg_true2.png',
        'img/bg.png',
        'img/compound_btn.png',
        'img/create_back.png',
        'img/game_rule.png',
        'img/home_font1.png',
        'img/home_font2.png',
        'img/home_font3.png',
        'img/home_font4.png',
        'img/home_font5.png',
        'img/home_logo.png',
        'img/info_bg.png',
        'img/info_ipt.png',
        'img/info_logo.png',
        'img/introduce_font1.png',
        'img/introduce_font2.png',
        'img/keep_rule.png',
        'img/keep_rule_name.png',
        'img/label_bg.png',
        'img/load_font.png',
        'img/load_logo.png',
        'img/name_btn.png',
        'img/name_logo.png',
        'img/next_btn.png',
        'img/pause_icon.png',
        'img/play_icon.png',
        'img/rank_bg.png',
        'img/rank_btn.png',
        'img/rank_per_bg.png',
        'img/rank_per_line.png',
        'img/rank_per_title.png',
        'img/rank_title.png',
        'img/result_bg.png',
        'img/result_bgb.png',
        'img/result_font1.png',
        'img/result_font2.png',
        'img/result_font_bj.png',
        'img/result_font_by.png',
        'img/result_font_hj.png',
        'img/result_font_icon.png',
        'img/result_font_qt.png',
        'img/result_font_wz.png',
        'img/result_font_zs.png',
        'img/res_ava.png',
        'img/res_bg.png',
        'img/res_bgb.png',
        'img/res_code.png',
        'img/res_font_1.png',
        'img/res_font_2.png',
        'img/res_title.png',
        'img/res_title_bj.png',
        'img/res_title_by.png',
        'img/res_title_hj.png',
        'img/res_title_qt.png',
        'img/res_title_ry.png',
        'img/res_title_wz.png',
        'img/res_title_zs.png',
        'img/save_tips.png',
        'img/share_btn.png',
        'img/share_logo.png',
        'img/start_btn.png',
        'img/sure_btn.png',
        'img/topic_bg.png',
        'img/topic_bg_error.png',
        'img/topic_bg_true.png',
        'img/topic_end_bg.png',
        'img/topic_end_font.png',
        'img/topic_icon.png',
        'img/topic_icon_checked.png',
        'img/topic_icon_error.png',
        'img/topic_line.png',
        'img/topic_result_bg.png',
        'img/up.png',
        'img/dot.gif',
    ];
    //图片预加载
    $.preload(imgs, {
        // 是否有序加载
        order: false,
        minTimer: 3000,
        //每加载完一张执行的方法
        each: function (count) {
            // var percent = Math.round((count+1) / imgs.length * 100) + '%';
            // console.log(percent);
        },
        // 加载完所有的图片执行的方法
        end: function () {
            // console.log("加载完成");
            $(".loading").fadeOut();
            $(".home").fadeIn();

        }
    });

    /* 注册事件 */
    $('.start-btn').on("click",function(){
        $(".home").fadeOut();
        $(".touch-box").fadeIn();
    });

    /* 解决软键盘顶上去 页面不下来 */
    $('input').blur(function () {
        setTimeout(() => {
            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
            window.scrollTo(0, Math.max(scrollHeight, 0))
        }, 100)
    });

    /* 判断是否允许滑动的 flag */
    let swiperFlag = true;

    /* 处理介绍页和信息页滑动 */
    let ponitStartY = null,moveY = null,domOffsetY = null,disY = 0;
    let minY = 0,maxY = -100;
    $(".touch-box").get(0).addEventListener("touchstart",function(){
        /* 阻止冒泡事件 */
        event.stopPropagation();
        /* page1页面显示则处理滑动 */
        /* is判断元素是否隐藏 返回布尔值 隐藏=true 显示=false*/
        ponitStartY = event.targetTouches[0].pageY;
        /* 获取dom元素的top初始值 */
        domOffsetY = $(this).offset().top / window.innerHeight * 100 ;
    });
    $(".touch-box").get(0).addEventListener("touchmove",function(){
        event.stopPropagation();

        /* 判断如果到答题页 页面不能滑动 */
        if(!swiperFlag) return false;

        let ponitMoveY = event.targetTouches[0].pageY;
        /* 记录当前移动的距离 */
        disY =  (ponitMoveY - ponitStartY ) / window.innerHeight * 100;
        /* 算出移动距离+初始位置的距离 换算成百分比 */
        moveY = (ponitMoveY - ponitStartY ) / window.innerHeight * 100 + domOffsetY ;

        /* 处理滑动的边界限制 */
        if(moveY > 0 ){
            moveY = minY;
        }else if(moveY < maxY){
            moveY = maxY;
        }
        $(".touch-box").css("transition","none");
        $(".touch-box").css("top",moveY + "%");

    
    })
    $(".touch-box").get(0).addEventListener("touchend",function(){
        /* 阻止冒泡事件 */
        event.stopPropagation();

        /* 判断如果到答题页 页面不能滑动 */
        if(!swiperFlag) return false;

        /* page1页面显示则处理滑动 */
        let ponitEndtY = event.changedTouches[0].pageY;
        $(".touch-box").css("transition","top .3s");
        /* 放手时处理移动的距离 */
        // console.log((ponitEndtY - ponitStartY));
        if(Math.abs(disY) > 100/window.innerHeight*100){
            /* 处理你是往上面走还是下面走 */
            if((ponitEndtY - ponitStartY) > 0){
                $(".touch-box").css("top","0%");
            }else{
                $(".touch-box").css("top","-100%"); 
            }
        }else{
            /* 移动的距离足够小的时候 就回弹到初始位置 */



            $(".touch-box").css("top",domOffsetY + "%"); 
        }
    });

    /* 处理信息提交 */
    $('.info-btn').on('click',function(){
       let userName = $('.info-name').val();
       let userArea = $('.info-area').val();
       
       if(!userName){
            //提示
            layer.open({
                content: '请输入用户名',
                skin: 'msg',
                time: 2 //2秒后自动关闭
            });
            /* 防止没有填写信息 还进行本地存储 */
            return false;
       }

       /* 填写完就存进去 */
       localStorage.setItem("saveName",userName);
       localStorage.setItem("saveArea",userArea);

       $(".page2").fadeOut();
       $(".topic").fadeIn();
       swiperFlag = false;
    
    })

    /* 答题模块的处理 */
    /*  1.1 初始化页面数据 */
    let topicNum = 0;  // 记录题目下标
    let dataArr = data.data; // 记录所有的题目数据

    let nextFlag = true; /* 设置下一题的限流 */

    const createTopic = () => {
        let optionsArr = []; // 选项的答案数组

        /*  1.2 渲染题目dom内容 */
        /* 1.2.1 处理题目中的内容 */
        $(".topic-title span").text(topicNum+1);
        $(".topic-title p").html(dataArr[topicNum].topic);
        /* 1.2.2 处理题目中选项的内容 */
        dataArr[topicNum].options.forEach(item => {
            optionsArr.push(`<li>
                <div>
                    <img src="img/topic_icon.png" class="topic-icon">
                    <img src="img/topic_icon_checked.png" class="topic-icon-checked dn">
                    <img src="img/topic_icon_error.png" class="topic-icon-error dn">
                </div>
                <p>${item.letter}. ${item.content}</p>
            </li>`);
        });
        /* 插入到 装选项的 ul 中去吧 */
        $(".topic-content").html(optionsArr.join(""));
        /* 开启下一题的开关 */
        nextFlag = true;

    }
    createTopic();

    /* 动态创建的元素 必须得确保元素插入到页面中之后 再获取元素 注册事件 */
    /* 原生解决办法 : 确保元素插入成功了再注册 dom 事件 */
    /* jquery解决办法 : 绑定事件在已经存在页面中的父亲身上 事件类型后面传递目标元素 */

    /* jquery 注册的事情是 从父盒子 -> 子盒子 事件捕获阶段 因为我们使用了return false 阻止了 li 元素事件的进行 */


    /*  答题处理 处理单选和多选 */
    $(".topic-content").on("click","li",function(){
        /* 阻止冒泡事件 */
        event.stopPropagation();
        /* 判断多选题还是单选题 */
        if(dataArr[topicNum].correct.length <= 1 ){
            /* 单选题 */
            $(".topic-icon-checked").addClass('dn');
            /* 给点击当前设置选中状态 */
            $(this).children().eq(0).children('.topic-icon-checked').removeClass('dn');
        }else{
            /* 切换功能 */
            $(this).children().eq(0).children('.topic-icon-checked').toggleClass('dn');
        }
    
    });

    /* 模拟一组答案数组 */
    let answerArr = ["A","B","C","D","E","F"];
    let userScore = 0; /* 记录用户分数 */

    

    /* 点击下一题按钮 */
    $(".next-btn").on("click",function(){
        /* 防止用户狂点 */
        if(!nextFlag) return false;

        nextFlag = false;
 

        let userCheckedAns = ""; /* 记录用户选中的答案 */
        let checkedCount = 0; // 记录未选中题目数量
        let topicOptionArr = [...$(".topic-icon-checked")];
        /* 确保用户进行了答题 循环  */
        topicOptionArr.forEach(item => {
            /* 如果一个都没显示 累计未选中题目数量 */
            if(item.className.includes("dn")){
                checkedCount++;  
            }
        })
        /* 如果一个都没选中 则提示用户选择答案 */
        if(checkedCount == topicOptionArr.length){
            //提示
            layer.open({
                content: '请选择答案',
                skin: 'msg',
                time: 2 //2秒后自动关闭
            });
            nextFlag = true;
            return false;
        }
        
        /* 判断选中项和答案是否一致 */
        /* 1.先处理选中答案数据和后台给的标准答案数据一致 */ 
        /* 获取用户选中的选项 所有的答案选项里面的图片.topic-icon-checked是否显示 */
        topicOptionArr.forEach((item,idx) => {
            if(!item.className.includes("dn")){
                userCheckedAns += answerArr[idx];
            }
        })

        /* 2.取到正确答案和用户选择的答案进行处理 */
        /* 只需要取到每一个用户选择的答案去正确答案里面进行比较 如果存在一个是正确答案里面没有的 结果就是错 */
        let answerTrue = true; /* 假设用户答对了 */
        for(let i = 0; i < userCheckedAns.length; i++){
            /* 正确答案里面不包含用户选中的答案 -> 答错了 */
            if(!dataArr[topicNum].correct.includes(userCheckedAns[i])){
                /* 选择错误 */
                answerTrue = false;
            }
        }

        /* 3.判断答对还是答错 */
        if(answerTrue){
            /* 显示背景 计分 下一题 */ 
            /* 3.1 显示背景 
             * 修改对应li的背景颜色 true-bg 
             * 答案的下标 ->  li下标 
             * let answerArr = ["A","B","C","D","E","F"] 下标和 li 下标一致;
            */
           answerArr.forEach((item,idx) => {
             if(userCheckedAns.includes(item)){
                 console.log(idx);
                 $(".topic-content li").eq(idx).addClass("true-bg");
             }
           });

           /* 3.2 计分 */
           userScore += userCheckedAns.length;

           setTimeout(() => {
                /* 3.3 下一题 */
                topicNum ++;
                createTopic();
           }, 500);
          

        }else{
            /* 显示背景 弹层出现 */
            /* 4.1 显示背景 修改对应li的背景颜色 error-bg*/
            /* 用户的答案里面有 正确答案里面没有的 */
            [...userCheckedAns].forEach((item) => {
                /* 用户选择的答案 
                *   dataArr[topicNum].correct在正确答案中有的就显示 
                *   正确背景 */
                /* 用户选择的答案 在正确答案中没有的就显示 错误背景 */
                // answerArr.indexOf(item)  取到 li 对应的下标
                let idx = answerArr.indexOf(item);

                if(dataArr[topicNum].correct.includes(item)){
                    $(".topic-content li").eq(idx).addClass("true-bg");
                }else{
                    /* 让错误的点显示 */
                    $(".topic-content li").eq(idx).children().eq(0).children('.topic-icon-error').removeClass('dn');
                    $(".topic-content li").eq(idx).addClass("error-bg");
                }
            });

            /* 4.2 弹层出现 */
            $(".topic-res").fadeIn();
            $(".topic-inner").fadeOut();
            $(".res-info span").text(`x${topicNum}`);
            setTimeout(() => {
                $(".touch-box").fadeOut();
                $(".seniority-box").fadeIn();
                /* 更新分数 */
                $(".seniority-box .grade").text(userScore);

                if(userScore <= 24){
                    $(".result-font-hj").attr('src','img/result_font_qt.png');
                }else if(userScore <= 48){
                    $(".result-font-hj").attr('src','img/result_font_by.png');
                }else if(userScore <= 72){
                    $(".result-font-hj").attr('src','img/result_font_hj.png');
                }else if(userScore <= 96){
                    $(".result-font-hj").attr('src','img/result_font_bj.png');
                }else if(userScore <= 108){
                    $(".result-font-hj").attr('src','img/result_font_zs.png');
                }else{
                    $(".result-font-hj").attr('src','img/result_font_wz.png');
                }

            }, 1000);
        }
    
       
    });

    /* 点查看排行 */
    $(".seniority-btn").on("click",function(){
        $(".seniority-box").fadeOut();
        $(".ranking").fadeIn();
        var swiperOne = new Swiper('.swiper-one', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true
        });



    });

    let swiperTwo = null,swiperThr = null;
    /* 点击排行榜的标题 实现tab切换*/
    $(".ranking-box ol li").on("click",function(){
        let idx = $(this).index();
        /* 给当前的li 设置选中状态 其他的为默认状态 */
        $(this).addClass("active").siblings().removeClass("active");
        /*当前li对应模块显示 其他隐藏 */
        $(".ranking-box ul li").eq(idx).removeClass("dn").siblings().addClass("dn");

        /* 确保盒子显示再实例化 */
        if(idx == 1){
            if(!swiperTwo){
                swiperTwo = new Swiper('.swiper-two', {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    freeMode: true
                });
            }
         
        }else if(idx == 2){
            if(!swiperThr){

                swiperThr = new Swiper('.swiper-thr', {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    freeMode: true
                });
            }
            
        }
      
        
    });


    /* 点击再次冲榜按钮 */
    $(".again-btn").on("click",function(){
        // console.log(location.href);
        location.href = location.href;
    });


    $(".compound-btn").on("click",function(){
        $(".ranking-box").fadeOut();
        $('.grade').fadeIn();
    })


 

})