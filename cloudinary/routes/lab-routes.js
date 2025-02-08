//lab 3 page 117

const express = require("express");
const router  = express.Router();

router.get("/",  (req, res) => {
    res.json({ message: "Get todos" });
});


router.post("/", (req, res) => {
    res.json({ message: "Post todos" });
  });
  
router.put("/", (req, res) => {
    res.json({ message: "Put todos" });
});

router.patch("/", (req, res) => {
    res.json({ message: "patch todos" });
});

router.delete("/todos", (req, res) => {
    res.json({ message: "Delete todos" });
  });



module.exports = router;