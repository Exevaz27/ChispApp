# 🧠 MEMORIA Y CONTEXTO COMPLETO DEL PROYECTO: ChispApp ⚡

Este documento contiene la **historia completa, contexto, decisiones de diseño, ideas aprobadas y rechazadas** del desarrollo de la aplicación web de estudio de seguridad eléctrica. 
Cualquier agente de IA que continúe este proyecto debe leer este archivo para comprender el 100% del trasfondo.

---

## 1. 🎯 Objetivo del Proyecto y Perfil del Usuario
* **Nombre Oficial:** **ChispApp** ⚡
* **Objetivo:** Preparar al usuario para un examen formal de ingreso técnico para un puesto laboral de liniero / seguridad eléctrica en redes de distribución de Baja y Media Tensión (BT/MT).
* **Perfil del Usuario:** Persona sin conocimientos de programación que busca crear y perfeccionar su herramienta de estudio mediante instrucciones en lenguaje natural en español.
* **Idioma oficial del proyecto:** Español.
* **Tipo de Aplicación:** Web interactiva (SPA / PWA) moderna, instalable en celulares, responsiva (PC y Móvil), con tema oscuro (*glassmorphism*), **cero dependencias externas** (HTML5 + CSS3 + JavaScript Vanilla).
* **Repositorio GitHub:** [https://github.com/Exevaz27/ChispApp](https://github.com/Exevaz27/ChispApp)
* **Sitio Web en Vivo (GitHub Pages):** [https://exevaz27.github.io/ChispApp/](https://exevaz27.github.io/ChispApp/)

---

## 2. 📚 Temario Técnico Original (Las 32 Preguntas Oficiales)
El proyecto se basa estrictamente en el siguiente documento de 32 preguntas y respuestas provisto por el usuario:

1. **SIT (ATS o PTS):** Documento de Seguridad Integrada a la Tarea con secuencia de pasos, riesgos, EPP, recomendaciones en papel al encargado.
2. **ARPO:** Análisis de Riesgo Pre Operacional.
3. **Charla de 5 Minutos:** Reflexión grupal en el lugar de trabajo antes de iniciar la tarea analizando riesgos y medidas de control.
4. **Política Stop Work:** Interrumpir inmediatamente una tarea insegura (ejemplo: compañero sin T4 salva caídas en altura).
5. **5 Reglas de Oro:** 1° Corte efectivo y visible, 2° Bloqueo y señalización, 3° Verificar ausencia de tensión, 4° Puesta a tierra y cortocircuito, 5° Delimitar y señalizar.
6. **Doble Aislación:** Aislación funcional (guantes dieléctricos) + aislación respecto a tierra (alfombra dieléctrica / escalera aislante).
7. **TCT BT al Contacto:** Método de trabajo con tensión en BT reglamentado por Resolución SRT 3068/14.
8. **Prueba de Poste de Madera (4 Pasos):** 1. Visual/plomo, 2. Punzado 4 puntos cardinales base, 3. Golpe espiralado base a cima, 4. Tracción contraria a línea.
9. **Inspección de Poste de Hormigón:** Desprendimiento, fisuras, armadura expuesta, oscilación y piquete en base.
10. **Columnas que no admiten tiro de línea:** Postes de madera simples, columnas de PRFV y columnas de hormigón sin empotrar o de suspensión liviana.
11. **Columnas de Retención vs Suspensión:** Retención soportan esfuerzos mecánicos longitudinales/angulares; suspensión solo el peso de conductores.
12. **Poste con Tutor:** Prohibido usar escaleras; solo ascenso mediante hidroelevador.
13. **Fórmula Empotramiento LABT:** $10\% \text{ largo total} + 60\text{ cm}$ (ej: poste 8m $\to 1.40\text{m}$ enterrado, $6.60\text{m}$ visible).
14. **Berkley ART:** Aseguradora de Riesgos de Trabajo.
15. **Heridas Cortantes:** Informar a supervisor e higienista; desinfección/primeros auxilios.
16. **Caída de Altura / Traumatismo:** No mover al accidentado; llamar a emergencias médicas inmediatamente.
17. **RCP (Protocolo):** Abrir vía aérea (frente-mentón), 30 compresiones ininterrumpidas a 100/min en el pecho sin insuflaciones hasta que llegue emergencias.
18. **Reemplazo de Fusible NH en BT:** Delimitar, EPP, verificar tensión, abrir buzón de costado, retirar con manopla y probar paralelo, fusible de prueba menor, colocar definitivo.
19. **Voltímetro en Toma BT (Figuras A, B, C):** Fig. A (Fase-Neutro $\to 220\text{V}$), Fig. B (Fase-Fase distinta $\to 380\text{V}$), Fig. C (Fases ligadas $\to 0\text{V}$).
20. **Capacidad de Corriente Cable 95 mm²:** $266\text{ A}$ en régimen normal / $290\text{ A}$ en emergencia.
21. **Seccionadores bajo carga:** NO se pueden operar bajo carga (riesgo de arco y deflagración).
22. **Contacto Directo:** Contacto accidental con partes normalmente energizadas.
23. **Intensidad de Corriente:** Caudal o flujo de electrones a través de un conductor (Amperes).
24. **Tensión Eléctrica (F.E.M.):** Diferencia de potencial que impulsa a los electrones (Volts).
25. **Magnitudes Eléctricas:** Tensión $\to$ Volts, Corriente $\to$ Amperes, Resistencia $\to$ Ohms, Potencia $\to$ Watts.
26. **Distancias de Seguridad:** Personas (BT/MT: $0.80\text{m}$, AT: $1.50\text{m}$); Grúas/Hidroelevador (BT/MT: $3\text{m}$, AT: $5\text{m}$).
27. **Delimitación Urbana:** Vereda con vallas/conos; senda peatonal de $90\text{cm}$ mínimo sobre calzada si se ocupa vereda.
28. **Cambio de Ramal (Trafo Mochilero):** Consignar MT, abrir retornos, desconectar salidas, aislar puntas, realizar cambio.
29. **Cambio de Tapa de Medidor:** EPP completo (guantes dieléctricos BT, mecánicos, facial, ropa ignífuga, alfombra).
30. **Reparación de Puente al Vuelo:** Trabajo en altura con hidroelevador, arnés con cabo de posicionamiento y EPP/EPC.
31. **Charla de 5 Minutos (Objetivo):** Alinear al equipo sobre riesgos específicos del día.
32. **Verificación de Tensión Cero:** Uso de voltímetro homologado y contrastado antes y después.

---

## 3. 🛠️ Estructura y Módulos Desarrollados en ChispApp

1. **📖 Modo Estudio & Flashcards:**
   * Tarjetas con número oficial, puntos clave y respuestas completas.
   * Resaltado visual de valores críticos ($220\text{V}$, $380\text{V}$, $0\text{V}$, $266\text{A}$, $0.80\text{m}$, $10\%+60\text{cm}$, etc.).
   * Botón de lectura individual en voz alta (**🔊 Audio**).
   * **🎧 Reproductor Continuo de Audio ("Escuchar Todo en Orden"):** Playlist que lee todas las preguntas en secuencia con scroll automático suave, selector de voz natural/humana (`🎙️ Voz`), selector de velocidad ($1.0\times, 1.25\times, 1.5\times$), resalte dorado de tarjeta activa y barra flotante con botones (⏮️, ⏸️, ⏭️, ⏹️). Se blindó para permitir cambiar de voz y velocidad en vivo sin saltos ni interrupciones.
   * **📱 Modo Pantalla Siempre Activa (Screen Wake Lock):** Mantiene la pantalla encendida de forma automática mientras se escucha el temario para evitar que Android corte la voz.
   * **🌙 Modo Bolsillo (OLED Negro de Ahorro y Anti-Toques):** Botón que oscurece la pantalla al 100% (apagando los píxeles en pantallas OLED/AMOLED) y bloquea los toques accidentales para escuchar todo el temario en la calle con el celular en el bolsillo con consumo mínimo de batería.
   * **📱 Barra de Audio Responsive (Dock Inferior 2 Filas en Móvil):** En teléfonos celulares, la barra de audio se ancla en la parte inferior con diseño de doble nivel (fila 1: título + Modo Bolsillo + Detener; fila 2: selector de voz + selector de velocidad + botones táctiles grandes ⏮️ / ⏸️ / ⏭️), asegurando que ningún botón quede oculto ni recortado en pantallas de 360px a 420px.
   * **💻 Optimización para PC y Monitores Anchos:** Barra de audio horizontal en una sola fila compacta, tarjetas con altura balanceada alineadas a la misma fila, scrollbars oscuros personalizados y atajos de teclado rápidos (`Espacio` para Play/Pausa, `→ / ←` para Siguiente/Anterior, `/` o `Ctrl+K` para buscar, `1-4` para responder exámenes, `Esc` para cerrar modales).
   * Filtro ⭐ **"Solo Pendientes"** y filtro por categorías.
   * Modo **🃏 Flashcards** (oculta respuestas para memorizar).
   * **⚡ Botón Home en Logo y Título:** Al tocar el logo del rayo o el nombre ChispApp en la cabecera, la página se desplaza suavemente hacia arriba al instante.

2. **📝 Modo Examen & Simulacro:**
   * **💡 Modo Práctica:** Con explicaciones técnicas inmediatas al responder.
   * **⏱️ Modo Simulacro Real (15 Minutos):** Sin revelar respuestas intermedias, con temporizador de cuenta regresiva y alertas visuales.
   * **Ficha Diagnóstico por Tema:** Al finalizar, desglosa el porcentaje de acierto por categoría técnica.
   * **🔍 Revisión Pregunta por Pregunta:** Muestra en verde las acertadas y en rojo las erróneas comparando la respuesta del usuario con la oficial.
   * **🎯 Botón "Repetir solo preguntas falladas":** Abre un examen automático deduplicado con solo las preguntas erradas.
   * **📋 Botón "Copiar Mi Resumen":** Copia al portapapeles el resultado del examen formateado con emojis.
   * **🏆 Historial de Mejor Puntaje:** Guarda el récord personal en el navegador.

3. **🧩 Ordenamiento Secuencial:**
   * Tarjetas arrastrables y con botones (▲ / ▼) para ordenar secuencias críticas: *5 Reglas de Oro*, *Cambio de Fusible NH*, *Cambio de Ramal* y *RCP*.
   * **🛡️ Tarjeta de Justificación de Seguridad:** Al acertar, explica *por qué ese orden exacto salva vidas*.

4. **🎮 Zona de Minijuegos:**
   * **Match Eléctrico:** Emparejar magnitudes y conceptos (con botón **🔄 Volver a Jugar**).
   * **Desafío Verdadero/Falso:** Test rápido con explicaciones (con botón **🔄 Reiniciar Test**).
   * **Calculadora de Empotramiento de Postes:** Con fórmula oficial, botones rápidos (**8m, 10m, 12m, 14m**) y cálculo de **altura útil visible sobre el terreno**.

5. **📊 Simuladores Visuales:**
   * **🪵 Inspección de Postes de Madera:** Esquema interactivo con 4 etapas secuenciales obligatorias y botón **🔄 Reiniciar Inspección**.
   * **🔌 Voltímetro en Toma BT:** Simulación gráfica interactiva de Figuras A ($220\text{V}$), B ($380\text{V}$) y C ($0\text{V}$).
   * **Infografía de Distancias de Seguridad:** Barras proporcionales para personas y maquinaria.
   * **Esquema de Delimitación Urbana:** Vereda, senda peatonal ($90\text{cm}$) y calzada.

6. **🎯 Ruleta de Pregunta Relámpago:**
   * Modal para responder una pregunta técnica al azar en 1 minuto, con filtro anti-repetición consecutiva.

7. **📚 Diccionario / Glosario de Siglas:**
   * Modal accesible desde la cabecera con buscador en vivo de siglas técnicas (*SIT, ARPO, T4, SRT, EPP, EPC, etc.*).

---

## 4. 🚫 Decisiones e Ideas Rechazadas por el Usuario (NO VOLVER A PROPONER)
* ❌ **Guía de bolsillo imprimible (PDF/Hoja de bolsillo):** Fue explícitamente rechazada por el usuario en la sesión del 25/08/2026.
* ❌ **Sobrecargar con módulos nuevos sin antes perfeccionar los existentes:** El usuario prefiere un enfoque de pulir la calidad, botones de repetición y experiencia de uso antes de añadir pantallas innecesarias.
* ⚠️ **REGLA DE FLUJO DE TRABAJO OBLIGATORIA (Local Primero):** Cada vez que se realicen cambios, mejoras o correcciones, se deben implementar y probar **SIEMPRE primero en los archivos locales** de la PC. Únicamente cuando el usuario pruebe, dé su visto bueno y pida subirlo, se ejecutará el script `deploy_github.ps1` para actualizar GitHub / GitHub Pages.

---

## 5. 📂 Archivos del Proyecto
* `index.html`: Estructura semántica, accesibilidad, PWA y modales.
* `styles.css`: Hoja de estilos moderna con glassmorphism, responsive móvil y toasts.
* `data.js`: Base de datos de 32 preguntas, categorías, secuencias, match, verdadero/falso y glosario.
* `app.js`: Controlador interactivo, síntesis de voz Web Speech API con velocidad y persistencia.
* `manifest.json`: Configuración PWA para instalación en celulares.
* `deploy_github.ps1`: Script de deploy automático para GitHub y GitHub Pages.
* `PROJECT_MEMORY.md`: Este documento de contexto histórico.
