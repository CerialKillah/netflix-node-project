var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
var LocalStorage = require("node-localstorage").LocalStorage;
var localStorage = new LocalStorage("./scratch");

/* GET home page. */

router.get("/user_page", function (req, res, next) {
  var query = "SELECT * FROM users ORDER BY categoryname, programname";

  pool.query(query, function (error, results) {
    if (error) {
      console.error("Database query error:", error);
      return res.render("error", {
        message: "Database connection failed",
        error: error,
      });
    }
    res.render("user", {data: results,});
  });
});


router.get("/program_interface", function (req, res, next) {
  try {
    var ADMIN = localStorage.getItem("ADMIN");
    console.log("xxxx", ADMIN);

    if (ADMIN) {
      res.render("programform", { message: "", color: "black" });
    } else {
      res.redirect("/admin/login_page");
    }
  } catch (error) {
    res.redirect("/admin/login_page");
  }
});

router.get("/search_program", function (req, res, next) {
 try {
    var ADMIN = localStorage.getItem("ADMIN");
    console.log("xxxx", ADMIN);
    if (!ADMIN) {
      res.redirect("/admin/admin_login");
    }
  } catch (error) {
    res.redirect("/admin/admin_login");
  }
  res.render("searchprogram", { message: "", color: "black" });
});

router.get("/fetch_all_category", function (req, res) {
  pool.query("select * from category", function (error, result) {
    if (error) {
      res.json({
        status: false,
        data: [],
        message: "Error in Query. Pls Contact Data Administrator...",
      });
    } else {
      res.json({ status: true, data: result, message: "Successful" });
    }
  });
});

router.get("/fetch_all_subcategory", function (req, res) {
  pool.query(
    "select * from subcategory where categoryid=?",
    [req.query.categoryid],
    function (error, result) {
      if (error) {
        res.json({
          status: false,
          data: [],
          message: "Error in Query. Please Contact Data Administrator...",
        });
      } else {
        res.json({ status: true, data: result, message: "Successful" });
      }
    }
  );
});

router.post("/insert_program", upload.fields([
  { name: 'poster', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), function (req, res) {
  console.log("Body:", req.body);
  console.log("Files:", req.files);
  
  try {
    // Extract filenames from the files object
    const posterFilename = req.files.poster ? req.files.poster[0].filename : null;
    const videoFilename = req.files.video ? req.files.video[0].filename : null;
    
    pool.query(
      "INSERT INTO programs(categoryid, subcategoryid, programname, description, status, casts, releasedate, poster, video) VALUES(?,?,?,?,?,?,?,?,?)",
      [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.programname,
        req.body.description,
        req.body.status,
        req.body.casts,
        req.body.releasedate,
        posterFilename,
        videoFilename
      ],
      function (error, result) {
        if (error) {
          console.log("Database error:", error);
          res.render("programform", {
            status: false,
            message: "Database error: " + error.message,
            color: "red",
          });
        } else {
          res.render("programform", {
            status: true,
            message: "Program Submitted Successfully",
            color: "green",
          });
        }
      }
    );
  } catch (error) {
    console.log("Catch error:", error);
    res.render("programform", {
      status: false,
      message: "Some Critical Error, Contact Backend Team: " + error.message,
      color: "red",
    });
  }
});

router.get("/display_all", function (req, res) {
  try {
    var ADMIN = localStorage.getItem("ADMIN");
    console.log("xxxx", ADMIN);
    if (!ADMIN) {
      res.redirect("/admin/admin_login");
    }
  } catch (error) {
    res.redirect("/admin/admin_login");
  }
  try {
    pool.query(
      "Select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname from programs P",
      function (error, result) {
        if (error) {
          console.log(error);
          res.render("displayall", {
            status: false,
            message: "Error in database query...",
          });
        } else {
          res.render("displayall", { status: true, data: result });
        }
      }
    );
  } catch (e) {
    res.render("displayall", {
      status: false,
      message: "Critical Server Error....",
    });
  }
});

router.get("/edit_delete_display", function (req, res, next) {
  try {
    pool.query(
      "Select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname from programs P where P.programid=?",
      [req.query.programid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.render("editdeletedisplay", {
            status: false,
            message: "Error in database query...",
          });
        } else {
          
          if(result.length==1){
          res.render("editdeletedisplay", { status: true, data: result[0] });
          } else {
            res.render('searchprogram',{message:"Record Not Found",color:"white"})
          }
        }
      }
    );
  } catch (e) {
    res.render("editdeletedisplay", {
      status: false,
      message: "Critical Server Error....",
    });
  }
});

router.post("/final_edit_delete", function (req, res) {
  console.log("Body:", req.body);
  console.log("File:", req.file);
  try {
    if (req.body.btn == "Edit") {
      pool.query(
        " update programs set categoryid=?, subcategoryid=?, programname=?, description=?, status=?, casts=?, releasedate=? where programid=?  ",
        [
          req.body.categoryid,
          req.body.subcategoryid,
          req.body.programname,
          req.body.description,
          req.body.status,
          req.body.casts,
          req.body.releasedate,
          req.body.programid,
        ],
        function (error, result) {
          if (error) {
            console.log(error);
            res.redirect("/programs/display_all");
          } else {
            res.redirect("/programs/display_all");
          }
        }
      );
    } else {
      pool.query(
        "delete from programs where programid=?",
        [req.body.programid],
        function (error, result) {
          if (error) {
            console.log(error);
            res.redirect("/programs/display_all");
          } else {
            res.redirect("/programs/display_all");
          }
        }
      );
    }
  } catch (error) {
    res.redirect("/programs/display_all");
  }
});

router.get("/show_poster", function (req, res) {
  res.render("showposter", { data: req.query });
});

router.post("/edit_poster", upload.single("poster"), function (req, res) {
  console.log("Body:", req.body);
  console.log("File:", req.file);
  try {
    pool.query(
      " update programs set poster=? where programid=?",
      [req.file.filename, req.body.programid],
      function (error, result) {
        if (error) {
          res.redirect("/programs/display_all");
        } else {
          res.redirect("/programs/display_all");
        }
      }
    );
  } catch (error) {
    res.redirect("/programs/display_all");
  }
});

router.post("/edit_video", upload.single('video'), function (req, res) {
  console.log("Body:", req.body);
  console.log("File:", req.file);
  try {
    pool.query(
      "UPDATE programs SET video=? WHERE programid=?",
      [req.file.filename, req.body.programid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.redirect("/programs/display_all");
        } else {
          res.redirect("/programs/display_all");
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.redirect("/programs/display_all");
  }
});

module.exports = router;
