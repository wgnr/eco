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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FilePersistance {
    constructor(fileName) {
        this.fileName = path_1.default.resolve(__dirname, fileName);
        this.ItemList = [];
    }
    readFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield fs_1.default.promises.readFile(this.fileName, "utf-8");
                this.ItemList = JSON.parse(list);
            }
            catch (error) {
                console.error("File can't be loaded.", error);
                this.ItemList = [];
            }
        });
    }
    writeFile() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.fileName);
            try {
                yield fs_1.default.promises.writeFile(this.fileName, JSON.stringify(this.ItemList), "utf-8");
            }
            catch (error) {
                console.error("Error in saving", error);
                return false;
            }
            return true;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readFile();
            return this.ItemList;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readFile();
            return this.ItemList.find((p) => p.id === id);
        });
    }
    add(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readFile();
            this.ItemList.push(body);
            return (yield this.writeFile()) ? body : null;
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readFile();
            const itemToUpdate = this.ItemList.find((p) => p.id === id);
            if (!itemToUpdate)
                return;
            for (const [k, v] of Object.entries(body))
                itemToUpdate[k] = v;
            return (yield this.writeFile()) ? itemToUpdate : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readFile();
            const itemToDelete = this.ItemList.find((p) => p.id === id);
            if (!itemToDelete)
                return;
            this.ItemList = this.ItemList.filter((p) => p.id !== id);
            return (yield this.writeFile()) ? itemToDelete : null;
        });
    }
    deleteFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.default.promises.unlink(this.fileName);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = FilePersistance;
