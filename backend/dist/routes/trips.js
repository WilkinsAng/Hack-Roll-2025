"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_1 = require("../supabase");
const router = (0, express_1.Router)();
// Add a new trip
router.post('/trips', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { data, error } = yield supabase_1.supabase.from('trips').insert([{ name }]);
    if (error) {
        res.status(400).json({ error: error.message });
        return;
    }
    res.status(200).json(data);
}));
// Get all trips
router.get('/trips', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.supabase.from('trips').select('*');
    if (error) {
        res.status(400).json({ error: error.message });
        return;
    }
    res.status(200).json(data);
}));
exports.default = router;
