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
exports.KnexDB = void 0;
const knex_1 = require("knex");
const DB_NAME = `ecommerce`;
const TABLE_NAME = `products`;
exports.KnexDB = knex_1.knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        port: 3306,
        password: "example",
        database: DB_NAME,
    },
    pool: { min: 0, max: 7 },
});
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("getAll");
        const p = new Promise((res, rej) => exports.KnexDB(TABLE_NAME)
            .select("*")
            .then((rows) => {
            const r = [];
            for (let row of rows)
                r.push(Object.fromEntries(Object.entries(row)));
            res(r);
        })
            .catch((err) => {
            console.log(err);
            rej(err);
        }));
        return yield p;
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("getById");
        const p = new Promise((res, rej) => exports.KnexDB(TABLE_NAME)
            .select("*")
            .where({ id })
            .limit(1)
            .then((rows) => {
            // TODO es necesario poner el return?
            if (!rows.length)
                return res({});
            res(Object.fromEntries(Object.entries(rows[0])));
        })
            .catch((err) => {
            console.log(err);
            rej(err);
        }));
        return yield p;
    });
}
function update(id, body) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("update");
        const p = new Promise((res, rej) => exports.KnexDB(TABLE_NAME)
            .where({ id })
            .update(body)
            .then((data) => {
            if (data !== 1)
                rej(data);
            res(getById(id));
        })
            .catch((err) => {
            console.log(err);
            rej(err);
        }));
        return yield p;
    });
}
function deleteP(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.KnexDB(TABLE_NAME).where({ id }).del();
            return true;
        }
        catch (e) {
            console.error(e);
        }
    });
}
function add(body) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("add");
        const p = new Promise((res, rej) => exports.KnexDB(TABLE_NAME)
            .insert(body)
            .then(() => res(body))
            .catch((err) => {
            console.log(err);
            rej(err);
        }));
        return yield p;
    });
}
exports.default = { getAll, getById, add, update, delete: deleteP };
