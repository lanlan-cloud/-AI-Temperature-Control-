import AITemperatureControl from "../src/aiTemperatureControl.js";
import dotenv from "dotenv";

dotenv.config();

const ai = new AITemperatureControl(process.env.OPENAI_API_KEY);

(async () => {
  console.log(await ai.generate("Metáfora del sol", { profileId: "lan", temperature: 0.7 }));
  console.log(await ai.generate("Metáfora del mar", { profileId: "lan", temperature: 1.0 }));
  console.log(await ai.generate("Metáfora del viento", { profileId: "lan", temperature: 1.0 }));
  console.log(await ai.generate("Metáfora de la luna", { profileId: "lan", temperature: 0.5 }));
  console.log(await ai.generate("Metáfora del río", { profileId: "lan", temperature: 0.5 }));
})();
