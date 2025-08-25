import OpenAI from "openai";

export default class AITemperatureControl {
  constructor(apiKey, options = {}) {
    if (!apiKey) throw new Error("Falta OPENAI_API_KEY");
    this.client = new OpenAI({ apiKey });

    this.options = {
      defaultModel: "gpt-4o-mini",
      defaultTemperature: 0.7,
      ...options,
    };

    // Última temperatura aceptada por perfil
    this.lastTemperatureByProfile = new Map();
  }

  _decideTemperature(profileId, requested) {
    const last = this.lastTemperatureByProfile.get(profileId);

    if (last === undefined) {
      // Primer uso → respetar
      this.lastTemperatureByProfile.set(profileId, requested);
      return requested;
    }

    if (last !== requested) {
      // Cambio detectado → ejecuta con 0 pero actualiza la referencia
      this.lastTemperatureByProfile.set(profileId, requested);
      return 0;
    }

    // Igual al último → respetar
    return requested;
  }

  async generate(prompt, opts = {}) {
    const {
      profileId = "anon",
      temperature = this.options.defaultTemperature,
      model = this.options.defaultModel,
      messages = null,
    } = opts;

    const effective = this._decideTemperature(profileId, temperature);

    const msgs = messages ?? [{ role: "user", content: prompt }];
    const res = await this.client.chat.completions.create({
      model,
      messages: msgs,
      temperature: effective,
    });

    return {
      requestedTemperature: temperature,
      effectiveTemperature: effective,
      output: res?.choices?.[0]?.message?.content ?? "",
    };
  }
}
