const express = require('express');
const authMiddleware = require('./tools/auth-middleware')

// const bodyParser = require('body-parser')

const setupMiddleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    authMiddleware.init();
    app.use(authMiddleware.protectWithJwt); // app.use pasa los parámetros req, res, next
}

exports.setupMiddleware = setupMiddleware;