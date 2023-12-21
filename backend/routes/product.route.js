const router = require("express").Router();

const {
  allTransactions,
  statistics,
  barChart,
  pieChart,
  combinedData

} = require("../controllers/product.controller");



router.get("/allTransactions",  allTransactions  );
router.get("/statistics", statistics)
router.get("/bar-chart", barChart)
router.get("/pie-chart", pieChart)
router.get("/combined-data",  combinedData)






module.exports = router;
