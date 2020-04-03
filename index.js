// 在项目启动时;把所有的路由组件以及提前全部加载掉了
// import sellers from "pages/ele-sellers/ele-sellers.vue";
// import goods from "pages/ele-goods/ele-goods.vue";
// import ratings from "pages/ele-ratings/ele-ratings.vue";
// import shop from "pages/ele-shop/ele-shop.vue";
// import Msite from "pages/Msite/Msite.vue";
// import Order from "pages/Order/Order.vue";
// import Profile from "pages/Profile/Profile.vue";
// import Search from "pages/Search/Search.vue";
// import Login from "pages/Login/Login.vue";
// import UserDetail from "pages/UserDetail/UserDetail.vue";




// 什么是路由懒加载:
//     当我们需要使用到当前的路由的时 再去加载这个路由所对应的路由组件
//
//     路由懒加载 要结合webpack
//         webpack中import函数
//         webpack中提供了魔法注释
//
//         import(/*webpackChunkName:"a"*/) 本质上在webpack中是用来做代码分割的
//             将app.js中的指定内容单独打包
//                 --> a.js
//                 --> b.js

const sellers = () => import(/*webpackChunkName:"sellers"*/ "pages/ele-sellers/ele-sellers.vue")
const goods = () => import(/*webpackChunkName:"goods"*/ "pages/ele-goods/ele-goods.vue")
const ratings = () => import(/*webpackChunkName:"ratings"*/ "pages/ele-ratings/ele-ratings.vue")
const shop = () => import(/*webpackChunkName:"shop"*/ "pages/ele-shop/ele-shop.vue")
const Msite = () => import(/*webpackChunkName:"Msite"*/ "pages/Msite/Msite.vue")
const Order = () => import(/*webpackChunkName:"Order"*/ "pages/Order/Order.vue")
const Profile = () => import(/*webpackChunkName:"Profile"*/ "pages/Profile/Profile.vue")
const Search = () => import(/*webpackChunkName:"Search"*/ "pages/Search/Search.vue")
const Login = () => import(/*webpackChunkName:"Login"*/ "pages/Login/Login.vue")
const UserDetail = () => import(/*webpackChunkName:"UserDetail"*/ "pages/UserDetail/UserDetail.vue")



import store from "@/store";
export default [
    {path:"/Msite",component:Msite,meta:{showFooter:true}},
    {path:"/Order",component:Order,meta:{showFooter:true}},
    {path:"/Profile",component:Profile,meta:{showFooter:true}},
    {path:"/Search",component:Search,meta:{showFooter:true}},
    {
        path:"/Login",
        component:Login,
        meta:{showFooter:false},
        beforeEnter: (to, from, next) => {
            //如果处于登录状态 那一定不能再去登录页
            if(store.state.user._id){
                next('/Msite')
            }else{
                next()
            }
        }
    },
    {path:"/UserDetail",component:UserDetail,meta:{showFooter:false}},
    {
        path:"/Shop/:id",
        component:shop,
        props:true,
        children:[
            {path:"goods",component:goods},
            {path:"ratings",component:ratings},
            {path:"sellers",component:sellers},
            {path:"",redirect:"goods"}
        ]
    },
    {path:"/",redirect:"/Msite"}
]
