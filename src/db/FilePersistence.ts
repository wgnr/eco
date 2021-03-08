import fs from "fs";
import path from "path";

export default class FilePersistance {
  private ItemList: any[];
  private fileName;

  constructor(fileName: string) {
    this.fileName = path.resolve(__dirname, fileName);
    this.ItemList = [];
  }

  private async readFile() {
    try {
      const list = await fs.promises.readFile(this.fileName, "utf-8");
      this.ItemList = JSON.parse(list);
    } catch (error) {
      console.error("File can't be loaded.", error);
      this.ItemList = [];
    }
  }

  private async writeFile() {
    console.log(this.fileName);
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.ItemList),
        "utf-8"
      );
    } catch (error) {
      console.error("Error in saving", error);
      return false;
    }
    return true;
  }

  async getAll() {
    await this.readFile();
    return this.ItemList;
  }

  async getById(id: string) {
    await this.readFile();
    return this.ItemList.find((p) => p.id === id);
  }

  async add(body: any) {
    await this.readFile();
    this.ItemList.push(body);
    return (await this.writeFile()) ? body : null;
  }

  async update(id: string, body: any) {
    await this.readFile();
    const itemToUpdate = this.ItemList.find((p) => p.id === id);
    if (!itemToUpdate) return;

    for (const [k, v] of Object.entries(body)) itemToUpdate[k] = v;

    return (await this.writeFile()) ? itemToUpdate : null;
  }

  async delete(id: string) {
    await this.readFile();
    const itemToDelete = this.ItemList.find((p) => p.id === id);
    if (!itemToDelete) return;

    this.ItemList = this.ItemList.filter((p) => p.id !== id);
    return (await this.writeFile()) ? itemToDelete : null;
  }

  async deleteFile() {
    try {
      await fs.promises.unlink(this.fileName);
    } catch (e) {
      console.log(e);
    }
  }
}
