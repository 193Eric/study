<template>
<div class="nav-box">
        <p class="nav-list">
            <router-link class="nav-item" to="/">首页</router-link>
            <router-link class="nav-item" to="/joke">笑话</router-link>
            <router-link class="nav-item" to="/joke-img">图片</router-link>
        </p>
</div>
</template>
<style lang='less'>
    .nav-box{
        position: fixed;
        bottom: 0;
        width: 100%;
        .nav-list{
            width:100%;
            display: flex;
            .nav-item{
                flex:1;
                color: #dae925;
                font-size: 20px;
                background:#000;
                line-height:40px;
                text-align:center;
                display:block;
                font-family: cursive;
                text-decoration:none;
            }
        }
    }
</style>     