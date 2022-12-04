const express = require("express");
const router = express.Router();


const categorie_controller = require("../controllers/categorieController");
const gerecht_controller = require("../controllers/gerechtController");
const winkelMand_controller = require("../controllers/winkelMandController");
const review_controller = require("../controllers/reviewController");
const user_controller = require("../controllers/userController");
const login_controller = require("../controllers/loginController");





// GET catalog home page.
router.get("/", categorie_controller.index);     //Deze methode reageert enkel op get requests

//WINKELMAND ROUTES
router.get("/winkelmand/:id", winkelMand_controller.winkelmand_detail);
router.get("/showWinkelmand", winkelMand_controller.show_winkelmand);
router.get("/voegtoe/:id", winkelMand_controller.voegToe);
router.get("/reduce/:id", winkelMand_controller.reduce);
router.get("/addOne/:id", winkelMand_controller.addOne);
router.get("/remove/:id", winkelMand_controller.remove);
router.get("/checkOut", winkelMand_controller.checkout_winkelmand);
router.post("/checkOut", winkelMand_controller.checkout_winkelmand_post);


//REVIEW ROUTES
router.get("/reviews", review_controller.review_list);
router.get("/review/create", review_controller.review_create_get);
router.post("/review/create", review_controller.review_detail);
router.get("/review/:id", review_controller.review_detail);


//CATEGORIE ROUTES
router.get("/categories", categorie_controller.categorie_list);
router.get("/categorie/:id", categorie_controller.categorie_detail);

//GERECHT ROUTES
router.get("/gerecht/:id", gerecht_controller.gerecht_detail);
//router.post("/gerecht/:id/winkelmand", winkelMand_controller.addItemToCart);


//LOGIN ROUTES
router.get("/user/signup", login_controller.signUp_get);
router.post("/user/signup",login_controller.signUp_post);
router.get("/user/signin",login_controller.signIn_get);
router.post("/user/signin", login_controller.signIn_post);
router.get("/profile", login_controller.profile_get);
router.get("/user/logout",login_controller.logOut_get);





module.exports = router;