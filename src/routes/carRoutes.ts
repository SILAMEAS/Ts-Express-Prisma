import express, { Router } from "express";
import {
  createCar,
  deleteCars,
  getCars,
  getOneCar,
  updateCar,
  createCars,
} from "../controller/carsController";

const router = express.Router();
// get all cars
router.get("/cars", getCars);
// get specific car
router.get("/car/:id", getOneCar);
// create cars
router.post("/createOne", createCar);
router.post("/createMany", createCars);
// delete car
router.delete("/car/:id", deleteCars);
// update car
router.put("/car/:id", updateCar);
// export all routers of car
export default router;
