const { Router, Request, Response, NextFunction } = require("express");
const router = Router();
const router_path = "/users";


const register_user = () => {
  console.log("I am here");
};

router.post(router_path, register_user);



module.exports = router;


