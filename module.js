const burger = require('burgerjs');
    
burger.module([
    [{name: 'header'},{type: 'component'},{selector: 'nem-header'}, {properties: []}],
    [{name: 'dashboard'},{type: 'page'},{order: '0'},{route: '/dashboard'}],
]);