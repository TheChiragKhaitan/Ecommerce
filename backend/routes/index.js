const express = require("express")

const router = express.Router()

const userSignUpController = require("../controllers/user/userSignUp")
const userSignInController = require("../controllers/user/userSignin")
const userDetailsController = require("../controllers/user/userDetails")
const auth = require("../middleware/auth")
const userLogout = require("../controllers/user/userLogout")
const forgotPasswordController = require("../controllers/user/forgotPassword")
const allUsers = require("../controllers/user/allUsers")
const updateUser = require("../controllers/user/updateUser")
const getProductController = require('../controllers/product/getProduct')
const UploadProductController = require("../controllers/product/uploadProduct")
const updateProductController = require("../controllers/product/updateProduct")
const getCategoryProduct = require("../controllers/product/getCategoryProductOne")
const getCategoryWiseProduct = require('../controllers/product/getCategoryWiseProduct')
const getProductDetails = require("../controllers/product/getProductDetails")
const searchProduct = require('../controllers/product/searchProduct')
const filterProductController = require('../controllers/product/filterProduct')
const addToCartController = require('../controllers/user/addToCartController')
const countAddToCartProduct = require('../controllers/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controllers/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controllers/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controllers/user/deleteAddToCartProduct')



//Auth
router.post("/signup", userSignUpController)
router.post("/login", userSignInController)
router.get("/user-details", auth, userDetailsController)
router.get("/logout", userLogout)
router.post("/forgot-password", forgotPasswordController)

//admin panel
router.get("/all-user", auth, allUsers)
router.post("/update-user", auth, updateUser)

//product
router.get("/get-product", getProductController)
router.post("/upload-product", auth, UploadProductController)
router.post("/update-product", auth, updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",auth,addToCartController)
router.get("/countAddToCartProduct",auth,countAddToCartProduct)
router.get("/view-card-product",auth,addToCartViewProduct)
router.post("/update-cart-product",auth,updateAddToCartProduct)
router.post("/delete-cart-product",auth,deleteAddToCartProduct)


module.exports = router