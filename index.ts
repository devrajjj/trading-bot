import axios from "axios";
import { depthManager } from "./depthManager";

const solInrMarket = new depthManager("B-XAI_INR");

const usdtInrMarket = new depthManager("B-USDT_INR");

const solUsdtMarket = new depthManager("B-XAI_USDT");

setInterval(()=>{
    console.log(solInrMarket.getRelevantDepth());
    console.log(usdtInrMarket.getRelevantDepth());
    console.log(solUsdtMarket.getRelevantDepth());
    //there are two sides we can sit on
    //sell SOL for INR, buy USDT from INR, buy SOL from INR
    //lets say u start with 1 SOL
    const canGetInr = solInrMarket.getRelevantDepth().lowestAsk - 0.001;
    const canGetUsdt = canGetInr/ usdtInrMarket.getRelevantDepth().lowestAsk;
    const canGetSol = canGetUsdt / solUsdtMarket.getRelevantDepth().lowestAsk;

    console.log(`You can convert ${1} SOL into ${canGetSol} SOL`);

    //buy SOL from INR, sell SOL for USDT, sell USDT for INR.
    const initialInr = solInrMarket.getRelevantDepth().highestBid + 0.001;
    const canGetUsdt2 = 1 * usdtInrMarket.getRelevantDepth().highestBid;
    const canGetInr2 = usdtInrMarket.getRelevantDepth().highestBid * canGetUsdt2;
    
    console.log(`You can convert ${initialInr} SOL into ${canGetInr2} INR`);
    
},2000)