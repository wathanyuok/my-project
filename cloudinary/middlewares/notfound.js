const notfound = (req, res, next) => {
    
    res
      .status(404)
      .json({ message: "path not found onsdfsf this server" });
  };
  
  module.exports = notfound;
  