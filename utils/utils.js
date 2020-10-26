const fs = require("fs");
const { nextTick } = require("process");
const filePath = "stores.json";
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const getData = async () => {
  try {
    const data = await readFile(filePath, "utf-8");
    if (data) return JSON.parse(data);
    else throw new Error(`File is empty`);
  } catch (error) {
    throw new Error(`Error occurred while reading from file.`);
  }
};

const writeData = async (contents) => {
  await writeFile(filePath, JSON.stringify(contents));
};

module.exports = { getData, writeData };
