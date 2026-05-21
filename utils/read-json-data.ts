import fs from "fs";

const jsonPath = "data/loginData.json";
const data: any = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
