import fs from "fs";
import path from "path";

// replace stylisticTs.default.configs with stylisticTs.configs
const filePath = path.join(process.cwd(), "lib", "externalRules.js");
const fileContent = fs.readFileSync(filePath, "utf8");
const newFileContent = fileContent.replace(
	/stylisticTs\.default\.configs/gu,
	"stylisticTs.configs"
);
fs.writeFileSync(filePath, newFileContent, "utf8");

// update HAGEMANTO_VERSION, HAGEMANTO_DESCRIPTION
const packageContent = JSON.parse(fs.readFileSync("package.json", "utf8"));
const indexPath = path.join(process.cwd(), "lib", "index.js");
const indexContent = fs.readFileSync(indexPath, "utf8");
fs.writeFileSync(
	indexPath,
	indexContent
		.replace(/HAGEMANTO_VERSION/gu, packageContent.version)
		.replace(/HAGEMANTO_DESCRIPTION/gu, packageContent.description)
		.replace(/HAGEMANTO_HOMEPAGE/gu, packageContent.homepage),
	"utf8"
);

console.log("Patched stylistic-ts config");
