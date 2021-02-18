const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/gamestock"
);

const companyNameSymbolSeed = [
  {
  "Company Name": "iShares MSCI All Country Asia Information Technology Index Fund",
  "Financial Status": "N",
  "Market Category": "G",
  "Round Lot Size": 100,
  "Security Name": "iShares MSCI All Country Asia Information Technology Index Fund",
  "Symbol": "AAIT",
  "Test Issue": "N"
  },
  {
  "Company Name": "American Airlines Group, Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "American Airlines Group, Inc. - Common Stock",
  "Symbol": "AAL",
  "Test Issue": "N"
  },
  {
  "Company Name": "Atlantic American Corporation",
  "Financial Status": "N",
  "Market Category": "G",
  "Round Lot Size": 100,
  "Security Name": "Atlantic American Corporation - Common Stock",
  "Symbol": "AAME",
  "Test Issue": "N"
  },
  {
  "Company Name": "Applied Optoelectronics, Inc.",
  "Financial Status": "N",
  "Market Category": "G",
  "Round Lot Size": 100,
  "Security Name": "Applied Optoelectronics, Inc. - Common Stock",
  "Symbol": "AAOI",
  "Test Issue": "N"
  },
  {
  "Company Name": "AAON, Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "AAON, Inc. - Common Stock",
  "Symbol": "AAON",
  "Test Issue": "N"
  },
  {
  "Company Name": "Apple Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Apple Inc. - Common Stock",
  "Symbol": "AAPL",
  "Test Issue": "N"
  },
  {
  "Company Name": "Avalanche Biotechnologies, Inc.",
  "Financial Status": "N",
  "Market Category": "G",
  "Round Lot Size": 100,
  "Security Name": "Avalanche Biotechnologies, Inc. - Common Stock",
  "Symbol": "AAVL",
  "Test Issue": "N"
  },
  {
  "Company Name": "Atlas Air Worldwide Holdings",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Atlas Air Worldwide Holdings - Common Stock",
  "Symbol": "AAWW",
  "Test Issue": "N"
  },
  {
  "Company Name": "iShares MSCI All Country Asia ex Japan Index Fund",
  "Financial Status": "N",
  "Market Category": "G",
  "Round Lot Size": 100,
  "Security Name": "iShares MSCI All Country Asia ex Japan Index Fund",
  "Symbol": "AAXJ",
  "Test Issue": "N"
  },
  {
  "Company Name": "Aoxin Tianli Group, Inc.",
  "Financial Status": "N",
  "Market Category": "S",
  "Round Lot Size": 100,
  "Security Name": "Aoxin Tianli Group, Inc. - Common Shares",
  "Symbol": "ABAC",
  "Test Issue": "N"
  },
  {
  "Company Name": "ABAXIS, Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "ABAXIS, Inc. - Common Stock",
  "Symbol": "ABAX",
  "Test Issue": "N"
  },
  {
  "Company Name": "Ameris Bancorp",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Ameris Bancorp - Common Stock",
  "Symbol": "ABCB",
  "Test Issue": "N"
  },
  {
  "Company Name": "Cambium Learning Group, Inc.",
  "Financial Status": "N",
  "Market Category": "S",
  "Round Lot Size": 100,
  "Security Name": "Cambium Learning Group, Inc. - Common Stock",
  "Symbol": "ABCD",
  "Test Issue": "N"
  },
  {
  "Company Name": "The Advisory Board Company",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "The Advisory Board Company - Common Stock",
  "Symbol": "ABCO",
  "Test Issue": "N"
  },
  {
  "Company Name": "Anchor BanCorp Wisconsin Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Anchor BanCorp Wisconsin Inc. - Common Stock",
  "Symbol": "ABCW",
  "Test Issue": "N"
  },
  {
  "Company Name": "Alcentra Capital Corp.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Alcentra Capital Corp. - Common Stock",
  "Symbol": "ABDC",
  "Test Issue": "N"
  },
  {
  "Company Name": "Abengoa, S.A.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Abengoa, S.A. - American Depositary Shares",
  "Symbol": "ABGB",
  "Test Issue": "N"
  },
  {
  "Company Name": "ARCA biopharma, Inc.",
  "Financial Status": "N",
  "Market Category": "S",
  "Round Lot Size": 100,
  "Security Name": "ARCA biopharma, Inc. - Common Stock",
  "Symbol": "ABIO",
  "Test Issue": "N"
  },
  {
  "Company Name": "ABIOMED, Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "ABIOMED, Inc. - Common Stock",
  "Symbol": "ABMD",
  "Test Issue": "N"
  },
  {
  "Company Name": "Autobytel Inc.",
  "Financial Status": "N",
  "Market Category": "S",
  "Round Lot Size": 100,
  "Security Name": "Autobytel Inc. - Common Stock",
  "Symbol": "ABTL",
  "Test Issue": "N"
  },
  {
  "Company Name": "Abengoa Yield plc",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Abengoa Yield plc - Ordinary Shares",
  "Symbol": "ABY",
  "Test Issue": "N"
  },
  {
  "Company Name": "ACADIA Pharmaceuticals Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "ACADIA Pharmaceuticals Inc. - Common Stock",
  "Symbol": "ACAD",
  "Test Issue": "N"
  },
  {
  "Company Name": "American Capital, Ltd.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "American Capital, Ltd. - Common Stock",
  "Symbol": "ACAS",
  "Test Issue": "N"
  },
  {
  "Company Name": "Arctic Cat Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Arctic Cat Inc. - Common Stock",
  "Symbol": "ACAT",
  "Test Issue": "N"
  },
  {
  "Company Name": "Aceto Corporation",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Aceto Corporation - Common Stock",
  "Symbol": "ACET",
  "Test Issue": "N"
  },
  {
  "Company Name": "Atlantic Coast Financial Corporation",
  "Financial Status": "N",
  "Market Category": "G",
  "Round Lot Size": 100,
  "Security Name": "Atlantic Coast Financial Corporation - Common Stock",
  "Symbol": "ACFC",
  "Test Issue": "N"
  },
  {
  "Company Name": "Acorn Energy, Inc.",
  "Financial Status": "N",
  "Market Category": "G",
  "Round Lot Size": 100,
  "Security Name": "Acorn Energy, Inc. - Common Stock",
  "Symbol": "ACFN",
  "Test Issue": "N"
  },
  {
  "Company Name": "Arch Capital Group Ltd.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Arch Capital Group Ltd. - Common Stock",
  "Symbol": "ACGL",
  "Test Issue": "N"
  },
  {
  "Company Name": "Acadia Healthcare Company, Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Acadia Healthcare Company, Inc. - Common Stock",
  "Symbol": "ACHC",
  "Test Issue": "N"
  },
  {
  "Company Name": "Achillion Pharmaceuticals, Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Achillion Pharmaceuticals, Inc. - Common Stock",
  "Symbol": "ACHN",
  "Test Issue": "N"
  },
  {
  "Company Name": "ACI Worldwide, Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "ACI Worldwide, Inc. - Common Stock",
  "Symbol": "ACIW",
  "Test Issue": "N"
  },
  {
  "Company Name": "Axcelis Technologies, Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Axcelis Technologies, Inc. - Common Stock",
  "Symbol": "ACLS",
  "Test Issue": "N"
  },
  {
  "Company Name": "ACNB Corporation",
  "Financial Status": "N",
  "Market Category": "S",
  "Round Lot Size": 100,
  "Security Name": "ACNB Corporation - Common Stock",
  "Symbol": "ACNB",
  "Test Issue": "N"
  },
  {
  "Company Name": "Acorda Therapeutics, Inc.",
  "Financial Status": "N",
  "Market Category": "Q",
  "Round Lot Size": 100,
  "Security Name": "Acorda Therapeutics, Inc. - Common Stock",
  "Symbol": "ACOR",
  "Test Issue": "N"
  },
    {
    "Symbol": "ZNH",
    "Company Name": "China Southern Airlines Company Limited Common Stock"
    },
    {
    "Symbol": "ZOES",
    "Company Name": "Zoe's Kitchen, Inc. Common Stock"
    },
    {
    "Symbol": "ZPIN",
    "Company Name": "Zhaopin Limited American Depositary Shares, each reprenting two Ordinary Shares"
    },
    {
    "Symbol": "ZQK",
    "Company Name": "Quiksilver, Inc. Common Stock"
    },
    {
    "Symbol": "ZTR",
    "Company Name": "Zweig Total Return Fund, Inc. (The) Common Stock"
    },
    {
    "Symbol": "ZTS",
    "Company Name": "Zoetis Inc. Class A Common Stock"
    },
    {
    "Symbol": "ZX",
    "Company Name": "China Zenix Auto International Limited American Depositary Shares, each representing four ordinary shares."
    }
  ];

db.SymbolName
  .remove({})
  .then(() => db.SymbolName.collection.insertMany(companyNameSymbolSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
