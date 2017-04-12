<template>
<div class="nav-box">
        <p class="nav-list">
            <router-link class="nav-item" to="/">最新资讯</router-link>
            <router-link class="nav-item" to="/today">今日运势</router-link>
            <router-link class="nav-item" to="/joke-img">笑一笑</router-link>
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
            z-index:10;
            .nav-item{
                flex:1;
                color: #fff;
                font-size: 14px;
                background:#00a6c6;
                line-height:40px;
                text-align:center;
                display:block;
                font-family: cursive;
                text-decoration:none;
            
            }
        }
    }
</style>     