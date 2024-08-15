import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "lib", "configs", "recommended.js");
const fileContent = fs.readFileSync(filePath, "utf8");
const newFileContent = fileContent.replace(
	/stylisticTs\.default\.configs/gu,
	"stylisticTs.configs"
);
fs.writeFileSync(filePath, newFileContent, "utf8");

console.log("Patched stylistic-ts config");
