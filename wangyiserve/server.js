const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

let recommendData = require('./datas/index.json');
router.get('/recommend', (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.body = {
    code: 200,
    data: recommendData
  };
});

let indexCateModule = require('./datas/indexCateModule.json');
router.get('/indexCategory', (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.body = {
    code: 200,
    data: indexCateModule
  };
});

let cateNavDatas = require('./datas/cateNavDatas.json');
router.get('/navCategory', (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.body = {
    code: 200,
    data: cateNavDatas
  };
});

let cateLists = require('./datas/cateLists.json');
router.get('/categoryList/:id', (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  const { id } = ctx.params;
  const currentCategoryList = cateLists.find(item => {
    return +item.id === +id;
  });
  console.log(currentCategoryList);
  if (
    currentCategoryList !== undefined &&
    typeof currentCategoryList === 'object'
  ) {
    ctx.body = {
      code: 200,
      data: currentCategoryList
    };
  } else {
    ctx.body = {
      code: 404,
      message: '未找到对应的数据'
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen('4000', () => {
  console.log('服务器启动');
  console.log('服务器地址： http://localhost:4000');
});
