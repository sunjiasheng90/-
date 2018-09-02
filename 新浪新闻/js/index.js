let $oul=$('.ul_box'),
    $lisBox=$('.list_box');


function bannerFn() {
    let mySwiper = new Swiper('.bannerBox',{
        autoplay:{
            disableOnInteraction:false,
            delay:1000,

        },
        loop: true,
        pagination: {
            el: '.pageBox',
            type: 'fraction',
            currentClass : 'currentPage',
            totalClass : 'totalPage',
        },
    });
}


/*获取数据*/
/*$.ajax({
    type:'post',/!*方式*!/
    url:'./data/banner.json',/!*路径*!/
    data:{/!*发送给后台数据*!/
        t:123,
        q:234
    },
    success:function (data) {/!*请求成功执行函数*!/
        console.log(data);
        giveHtml(data);
        bannerFn();
    },
    error:function () {/!*请求失败执行函数*!/

    }

});*/

function giveHtml(data) {
    data=data||[];
    let str = '';
    data.forEach(item=>{
        let {img,title}=item;
        str+=`<li class="swiper-slide">
                    <a href="##">
                        <img src="${img}" alt="">
                        <div>${title}</div>
                    </a>
                </li>`
    });
    $oul.html(str)
}


/*promise*/
let p = new Promise(function (resolve,reject) {
   $.ajax({
       type:'get',
       url:'./data/banner.json',
       success:function (data) {
           resolve(data)
       },
       error:function (res) {
           reject(res)
       }
   })
});
/*
p.then(function (data) {
   /!*执行成功的函数*!/
    console.log(data);
    giveHtml(data);
    return data


},function () {
    /!*执行失败的函数*!/

}).then(function (data) {
    console.log(data);
    bannerFn();
},function () {

});*/
p.then(function (data) {
    /*执行成功的函数*/
    console.log(data);
    giveHtml(data);
    return data


}).then(function (data) {
    console.log(data);
    bannerFn();
}).catch(function (res) {
    console.log(res);
});


/*新闻*/
let listPro= new Promise(function (resolve,reject) {
   $.ajax({
       type:'get',
       url:'./data/list.json',
       data:{t:1},
       success:function (data) {
           resolve(data);
           console.log(data);
       },
       error:function (res) {
           reject(res)
       }
   })
});

function giveListHtml(data) {
    data=data||[];
    let str='';
    data.forEach(item=>{
        let {num,type,title,img}=item;

        switch (type) {
            case 0:
                str+=`<a class="type_0" href="##">
            <div class="text_box">
                <p>${title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>

            </div>
        </a>`;
                break;
            case 1:
                str+=`        <a class="type_1" href="##">
            <div class="img_box"><img
                    src="${img}" alt="">
            </div>
            <div class="text_box">
                <p>${title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>

            </div>

        </a>
`;
                break;
            case 3:
                str+=`  <a class="type_3" href="##">
            <p>${title}</p>
            <div class="three_pic">
                <img src="${img[0]}" alt="">
                <img src="${img[1]}" alt="">
                <img src="${img[2]}" alt="">
            </div>
            <div class="comment_box">
                <mark>广告</mark>
                <cite>诸葛找房</cite>
                <em class="">

                    <span class="icon_com"></span>
                    <span class="">${num}</span>
                </em>
            </div>

        </a>`;
                break
        }
    });
    $lisBox.html(str);
}

listPro.then(function (data) {
 giveListHtml(data)
});