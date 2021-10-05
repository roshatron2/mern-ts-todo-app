"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./utils/db"));
const todos_1 = __importDefault(require("./routes/todos"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
(0, db_1.default)();
app.use("/", todos_1.default);
app.use("/auth", auth_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("listening on port " + process.env.PORT));
//# sourceMappingURL=app.js.map