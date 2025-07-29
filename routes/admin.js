var express = require("express");
var pool = require("./pool");
var upload = require("./multer");
var router = express.Router();
var LocalStorage = require("node-localstorage").LocalStorage;
var localStorage = new LocalStorage("./scratch");


router.get("/login_page", function (req, res, next) {
  res.render("loginpage", { message: "", color: "black" });
});

router.post("/chk_admin_login", function (req, res) {
  try {
    pool.query(
      "select * from admins where (emailid=? or mobileno=?) and password=?",
      [req.body.emailid, req.body.emailid, req.body.password],
      function (error, result) {
        if (error) {
          console.log(error);
          res.render("loginpage", {
            status: false,
            message: "Database Error",
          });
        } else {
          if (result.length == 1) {
            localStorage.setItem("ADMIN", JSON.stringify(result[0]));
            res.render("dashboard", { status: true, data: result[0] });
          } else {
            res.render("loginpage", {
              status: false,
              message: "Invalid EmailId/Mobile Number",
            });
          }
        }
      }
    );
  } catch (e) {
    res.render("loginpage", {
      status: false,
      message: "Critical Server Error....",
    });
  }
});

router.get("/logout",function(req,res){
  localStorage.clear()
  res.redirect('/admin/login_page')
})

module.exports=router