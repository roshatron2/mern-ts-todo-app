"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
});
exports.default = (0, mongoose_1.model)("Todos", todoSchema);
//# sourceMappingURL=todo.js.map