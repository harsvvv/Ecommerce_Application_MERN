import express from 'express';
import { Router } from 'express';
import { UserSignUpController } from '../controller/user/userSignUp.js';
import {userSignIN} from '../controller/user/userSignIn.js'
import { userDetailController } from '../controller/user/userDetails.js';
import { authToken } from '../middleware/authToken.js';
import { userLogOut } from '../controller/user/userLogOut.js';
import { allUsers } from '../controller/user/allUsers.js';
import { updateUser } from '../controller/user/updateUser.js';
import { uploadProductController } from '../controller/product/uploadProduct.js';
import { getProductController } from '../controller/product/getProduct.js';
import { updateProductController } from '../controller/product/updateProduct.js';
import { getCategoryProduct } from '../controller/product/getCategoryProductOne.js';
import { getCategoryWiseProduct } from '../controller/product/getCategoryWiseProduct.js';
import { getProductDetails } from '../controller/product/getProductDetails.js';
import { addToCartController } from '../controller/user/addToCartController.js';
// import { countAddToCartProduct } from '../controller/user/countAddToCartProuct.js';
import { addToCartViewProduct } from '../controller/user/addToCartViewProduct.js';
import { updateAddToCartProduct } from '../controller/user/updateAddtoCartProduct.js';
import { deleteAddToCartProduct } from '../controller/user/deleteAddToCartProduct.js';
import { searchProduct } from '../controller/product/searchProduct.js';
import { countAddToCartProduct } from '../controller/user/countAddToCartProduct.js';

const router=Router();

router.post("/signup",UserSignUpController);
router.post("/login",userSignIN);
router.get("/user-details",authToken,userDetailController);
router.get("/userLogout",userLogOut);
router.get("/all-user",authToken,allUsers);
router.get("/all-user",authToken,allUsers);
router.post("/update-user",authToken,updateUser);

// upload product
router.post("/upload-product",authToken,uploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController);
router.get("/get-categoryProduct",getCategoryProduct);
router.post("/category-product",getCategoryWiseProduct);
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
// add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct);
router.get("/view-card-product",authToken,addToCartViewProduct);
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)
export default router;