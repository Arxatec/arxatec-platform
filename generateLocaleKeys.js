import fs from "fs";

// Schema es.json
const inputFile = "./app/assets/lang/es.json";
const outputFile = "./app/lang/index.ts";

function generateKeys(obj, prefix = "") {
  let result = [];
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      result = result.concat(generateKeys(obj[key], `${prefix}${key}.`));
    } else {
      const varName = `${prefix}${key}`.replace(/\./g, "_").toLowerCase();
      const value = `${prefix}${key}`;
      result.push(`  ${varName}: "${value}"`);
    }
  }
  return result;
}

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  const jsonData = JSON.parse(data);
  const keysArray = generateKeys(jsonData.translation);
  const keysOutput = `export const LocaleKeys = {\n${keysArray.join(
    ",\n"
  )}\n};`;

  fs.writeFile(outputFile, keysOutput, (err) => {
    if (err) {
      console.error("Error al escribir el archivo:", err);
    } else {
      console.log("Claves generadas con éxito en index.ts");
    }
  });
});
