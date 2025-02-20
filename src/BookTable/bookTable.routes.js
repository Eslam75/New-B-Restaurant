import express from 'express';
import {  authMiddle } from '../../middleWare/middleWare.js';
import { getTables, updateTable } from './BookTable.controller.js';

const bookTable=express.Router()
bookTable.get("/getTables",getTables)
bookTable.put("/tables/:id",updateTable)


export default bookTable