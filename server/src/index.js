const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//all currency
app.get("/getAllCurrencies", async (req, res) => {
  const nameURL =
    "  https://openexchangerates.org/api/currencies.json?app_id=f584022b8ec54cbebf0e5638bf547fa8";

  try {
    const nameResponse = await axios.get(nameURL);
    const nameData = nameResponse.data;

    return res.json(nameData);
  } catch (e) {
    console.error(e);
  }
});
//get target ammount
app.get("/convert", async(req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;

    try{
            const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=f584022b8ec54cbebf0e5638bf547fa8`;
            const dataResponse = await axios.get(dataUrl);
            const rates =dataResponse.data.rates;

            const sourceRate =rates[sourceCurrency];
            const targetRate = rates[targetCurrency];

            const targetAmount =(targetRate/sourceRate)*amountInSourceCurrency;

            return res.json(targetAmount.toFixed(2));

    }catch(err){
        console.error(err);
    }
});
//listen to port
app.listen(5000, () => {
  console.log("server started");
});
