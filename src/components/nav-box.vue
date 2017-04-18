<template>
    <div class='box'>
        <router-link class="item" to="/luck"><i class='luck'></i>运势</router-link>
        <router-link class="item" to="/joke-img"><i class='joke-img'></i>笑一笑</router-link>
        <router-link class="item" to="/today"><i class='today'></i>今天</router-link>
        <router-link class="item" to="/eg"><i class='eg'></i>英文励志</router-link>
        <router-link class="item" to="/ip"><i class='ip'></i>获得ip</router-link>
        <router-link class="item" to="/cn-eg"><i class='cn-eg'></i>翻译</router-link>
        <router-link class="item" to="/"><i class='other'></i>敬请期待</router-link>
        <router-link class="item" to="/"><i class='other'></i>敬请期待</router-link>
    </div>
</template>
<style lang='less'>
.images(@img:other){
    background-image:url("./../assets/images/@{img}.jpg");
}
    .box{
        width:100%;
        margin:10px 0;
        .item{
            width:25%;
            float:left;
            height:60px;
            text-align:center;
            color:#00a6c6;
            text-decoration: none;
            font-size:12px;
            i{
                width:35px;
                height:35px;
                border-radius:50%;
                display:block;
                margin:5px auto;
                background-size:100%;
            }
        
            .luck{
                .images(luck)
            }
            .joke-img{
                .images(joke)
            }
            .today{
                .images(today)
            }
            .eg{
                .images(eg)
            }
            .ip{
                .images(ip)
            }
            .cn-eg{
                .images(cn-eg)
            }
            .other{
                .images()
            }
        }
    }
</style>