import express, {Request, Response } from "express";
import  CaruselController  from "../modules/controllers/carusel.controllers";


export const router = express.Router();


router.get('/caruselList', function (req:Request, res:Response) {
    const files = CaruselController.getListImg()
    res.json({files});
 });
 
