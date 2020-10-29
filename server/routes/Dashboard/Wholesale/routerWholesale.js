const express = require("express");
const router = express.Router();
const controllerWholesale = require("../../../controllers/Dashboard/Wholesale/controllerWholesale");

router.get("/inventoryValues", controllerWholesale.order1);

router.get("/previousBusinessDay", controllerWholesale.order2);

router.get("/userStatuses", controllerWholesale.order3);

router.get("/inventoryValuesMake", controllerWholesale.order4);
router.get("/inventoryValuesStock", controllerWholesale.order5);
router.get("/inventoryValuesColorCode", controllerWholesale.order6);

router.get("/salesDayChartLast1Month", controllerWholesale.order7);
router.get("/salesDayChartLast3Months", controllerWholesale.order8);
router.get("/salesDayChartLast6Months", controllerWholesale.order9);

router.get("/auctionDayChartLast1Month", controllerWholesale.order10);
router.get("/auctionDayChartLast3Months", controllerWholesale.order11);
router.get("/auctionDayChartLast6Months", controllerWholesale.order12);

module.exports = router;
