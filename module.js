const burger = require('burgerjs');
    
burger.module([
    [{name: 'header'},{type: 'component'},{selector: 'nem-header'}, {properties: []}],
    [{name: 'news-form'},{type: 'component'},{selector: 'nem-news-form'}, {properties: []}],
    [{name: 'dashboard'},{type: 'page'},{order: '0'},{route: '/dashboard'}],
]);