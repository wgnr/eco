import { knex } from "knex";
import { rejects } from "node:assert";

const DB_NAME = `ecommerce`;
const TABLE_NAME = `products`;

export const KnexDB = knex({
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

async function getAll() {
  console.log("getAll");
  const p = new Promise((res, rej) =>
    KnexDB(TABLE_NAME)
      .select("*")
      .then((rows) => {
        const r = [];
        for (let row of rows) r.push(Object.fromEntries(Object.entries(row)));
        res(r);
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      })
  );

  return await p;
}

async function getById(id: string) {
  console.log("getById");
  const p = new Promise((res, rej) =>
    KnexDB(TABLE_NAME)
      .select("*")
      .where({ id })
      .limit(1)
      .then((rows) => {
        // TODO es necesario poner el return?
        if (!rows.length) return res({});
        res(Object.fromEntries(Object.entries(rows[0])));
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      })
  );

  return await p;
}

async function update(id: string, body: object) {
  console.log("update");

  const p = new Promise((res, rej) =>
    KnexDB(TABLE_NAME)
      .where({ id })
      .update(body)
      .then((data) => {
        if (data !== 1) rej(data);

        res(getById(id));
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      })
  );

  return await p;
}

async function deleteP(id: string) {
  try {
    await KnexDB(TABLE_NAME).where({ id }).del();
    return true;
  } catch (e) {
    console.error(e);
  }
}

async function add(body: any) {
  console.log("add");
  const p = new Promise((res, rej) =>
    KnexDB(TABLE_NAME)
      .insert(body)
      .then(() => res(body))
      .catch((err) => {
        console.log(err);
        rej(err);
      })
  );
  return await p;
}

export default { getAll, getById, add, update, delete: deleteP };
