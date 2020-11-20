require('dotenv').config();
// const koa = require("koa");
import Koa from 'koa';
// const Router = require("koa-router");
import Router from 'koa-router';
// const bodyParser = require("koa-bodyparser");
import bodyParser from 'koa-bodyparser';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import api from './api';
//import createFakeData from './createFakeData';
import jwtMiddleware from './lib/jwtMiddleware';

//비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;

mongoose
.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify:false, useUnifiedTopology:true})
.then(()=>{
    console.log("Connected to MongoDB....");
    //createFakeData();
})
.catch(e => {
    console.error(e);
});

//const api = require('./api');

const app = new Koa();
const router = new Router();

// router.get('/', ctx => {
//     ctx.body="홈";
// });

// router.get("/about/:name?", ctx => {
//     const { name } = ctx.params;
//     //name의 존재 유무에 따라 다른 결과 출력
//     ctx.body= name ? `${name}의 소개`:'소개';
// })

// router.get('/posts', ctx => {
//     const {id} = ctx.query;
//     //id의 존재 유무에 다라 다른 결과 출력
//     ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다..';
// });

//라우터 설정
router.use('/api', api.routes());//api 라우트 적용

//라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

//PORT가 지정되어 있지 않다면 4000을 사용
const port = PORT || 4000;
app.listen(port, () => {
    console.log("Listening to port %d", port);
});