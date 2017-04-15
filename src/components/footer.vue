<template>
<div class="nav-box">
        <p class="nav-list">
            <router-link class="nav-item" to="/">
                <i :class= "[home?'index1':'index']"></i>
            </router-link>
            <router-link class="nav-item" to="/my">
                <i :class= "[my?'my1':'my']"></i>
            </router-link>
        </p>
</div>
</template>
<script>
    export default{
        name:"footer",
        data(){
            return{
            }
        },
        //利用vuex来控制状态变化,vuex状态变化的时候，computed会变化。
        computed : {
            home(){
                return this.$store.state.home
            },
            my(){
                return this.$store.state.my
            }
        }
    }
</script>
<style lang='less'>
    .nav-box{
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
        border-top: 1px solid #f0f0f0;
        .nav-list{
            width:100%;
            display: flex;
            z-index:10;
            .nav-item{
                flex:1;
                color: #fff;
                height:40px;
                text-align:center;
                display:block;
                font-family: cursive;
                text-decoration:none;
                i{
                    width: 90px;
                    height: 100%;
                    display: block;
                    background-repeat: no-repeat;
                    background-size: 120%;
                    margin: 0 auto;
                    background-position-y: center;
                    background-position-x: center;
                    position: relative;
                    top: -5px;
                }
            }
            .index{
                background-image:url("./../assets/images/shop.png");
            }
            .index1{
                background-image:url("./../assets/images/shop-1.png");
            }
            .my{
                background-image:url("./../assets/images/center.png");
            }
            .my1{
                background-image:url("./../assets/images/center-1.png");
            }
        }
    }
</style>     