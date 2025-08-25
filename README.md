# -AI-Temperature-Control-
Este proyecto es una demo simple para experimentar con la **temperatura en modelos de IA** usando la API de OpenAI.

🔹 Ventajas
✅ Estabilidad inmediata en cualquier cambio de temperatura

✅ Compatible con múltiples perfiles de usuario

✅ Funciona con cualquier modelo LLM de OpenAI

✅ Fácil de instalar y usar con solo generate(prompt, {profileId, temperature})

Estabilidad en el cambio de temperaturas dentro de los modelos
Si un perfil intenta usar **temperaturas distintas** dentro de una ventana (p. ej., 1 hora), el paquete **fuerza temperatura 0** para ese perfil. Útil para flujos donde quieres consistencia y menor alucinación.
