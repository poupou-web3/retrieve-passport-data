import { PassportReader } from "@gitcoinco/passport-sdk-reader";
import csvParser from "csv-parser";
import fs from "fs";
import csvWriter from "csv-writer";

const createCsvWriter = csvWriter.createObjectCsvWriter;

//read csv from address.csv in data folder and return array of addresses
async function readCsv() {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream("./data/address.csv")
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        console.log(results);
        resolve(results);
      });
  });
}

console.log("starting");

// for each address in csv, get passport and write to csv with address and passport
async function main() {
  const addresses = await readCsv();
  // console.log(addresses);

  // create a new instance pointing at Gitcoins mainnet Ceramic node
  const reader = new PassportReader(
    "https://ceramic.passport-iam.gitcoin.co",
    "1"
  );

  const passports = [];

  for (const address of addresses) {
    const addr = address.address;
    console.log(addr);
    const passport = await reader.getPassport(addr);
    console.log(passport);
    // passports.push({ address: addr, passport: passport });
    passports.push({ address: addr, passport: JSON.stringify(passport) });
  }

  //write address and passports to csv
  const csvWriter = createCsvWriter({
    path: "./data/passports.csv",
    header: [
      { id: "address", title: "address" },
      { id: "passport", title: "passport" },
    ],
  });

  csvWriter.writeRecords(passports).then(() => {
    console.log("The CSV file was written successfully");
  });
}

main();
