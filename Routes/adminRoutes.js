const express = require('express')
const adminController = require('../Controllers/adminController')
const auth = require('../Middleware/adminAuth')

const adminRoute = express()
adminRoute.set('view engine','ejs');
adminRoute.set('views', './Views/Admin'); 


adminRoute.get('/home',auth.isLogin,adminController.Home)
adminRoute.get('/edit',auth.isLogin,adminController.Edit)
adminRoute.post('/edit',auth.isLogin,adminController.Update)
adminRoute.post('/delete',auth.isLogin,adminController.Delete)




module.exports = adminRoute