// Base de datos de estudio de Seguridad Eléctrica y Redes BT/MT
const studyData = {
  categories: [
    { id: "all", name: "📚 Todo el Temario", icon: "⚡" },
    { id: "seguridad", name: "🛡️ Seguridad, Normas y EPP", icon: "🛡️" },
    { id: "reglas-maniobras", name: "⚡ Reglas de Oro y Maniobras", icon: "🔧" },
    { id: "postacion", name: "🪵 Postación, Columnas y Vía Pública", icon: "🏗️" },
    { id: "primeros-auxilios", name: "🚑 Primeros Auxilios y Emergencias", icon: "❤️" },
    { id: "mediciones", name: "🔌 Fundamentos y Mediciones BT", icon: "📊" }
  ],

  questions: [
    {
      id: 1,
      category: "seguridad",
      number: 1,
      title: "¿Qué es un SIT (o ATS / PTS)?",
      summary: "Documento de Seguridad Integrada a la Tarea",
      fullAnswer: "Es un DOCUMENTO DE SEGURIDAD INTEGRADA A LA TAREA (según la empresa puede llamarse ATS o PTS) que indica la secuencia de pasos, descripción de los riesgos, Elementos de Protección Personal (EPP), recomendaciones para realizar una determinada tarea de forma segura y se debe solicitar en papel al encargado.",
      keyPoints: [
        "Documento de Seguridad Integrada a la Tarea (ATS/PTS).",
        "Indica: secuencia de pasos, descripción de riesgos, EPP requeridos y recomendaciones de seguridad.",
        "Se debe solicitar en papel al encargado antes de iniciar la tarea."
      ],
      mcOptions: [
        "Un documento de seguridad que indica pasos, riesgos, EPP y recomendaciones de trabajo seguro que se solicita en papel al encargado.",
        "Una autorización verbal que el supervisor da antes de subir a una escalera.",
        "Un informe mensual de accidentes laborales que se envía a la ART.",
        "El comprobante de entrega de herramientas y materiales de pañol."
      ],
      correctIndex: 0,
      explanation: "El SIT/ATS/PTS es el documento formal en papel que planifica los pasos seguros, riesgos y EPP necesarios para la tarea."
    },
    {
      id: 2,
      category: "seguridad",
      number: 2,
      title: "¿Qué significa la sigla ARPO?",
      summary: "Análisis de Riesgo Pre Operacional",
      fullAnswer: "ANALISIS DE RIESGO PRE OPERACIONAL.",
      keyPoints: [
        "A: Análisis",
        "R: de Riesgo",
        "P: Pre",
        "O: Operacional"
      ],
      mcOptions: [
        "Análisis de Riesgo Pre Operacional",
        "Autorización Rápida Para Operarios",
        "Asignación de Recursos y Protección Operativa",
        "Auditoría de Redes y Postes de Operación"
      ],
      correctIndex: 0,
      explanation: "ARPO corresponde a Análisis de Riesgo Pre Operacional, evaluación previa en el lugar de trabajo antes de iniciar maniobras."
    },
    {
      id: 3,
      category: "seguridad",
      number: 3,
      title: "¿Para qué se realiza la Charla de 5 Minutos?",
      summary: "Revisión previa de riesgos y métodos seguros",
      fullAnswer: "Es una charla de revisión sobre los posibles riesgos en el trabajo inmediato a realizar y sus métodos seguros.",
      keyPoints: [
        "Se realiza antes de empezar el trabajo inmediato.",
        "Revisa los riesgos específicos del lugar y la tarea.",
        "Alinea a todo el equipo con los métodos y procedimientos seguros."
      ],
      mcOptions: [
        "Para revisar los posibles riesgos en el trabajo inmediato a realizar y definir los métodos seguros.",
        "Para controlar el horario de llegada de la cuadrilla.",
        "Para asignar el vehículo que manejará cada operario.",
        "Para firmar el recibo de sueldo y descanso semanal."
      ],
      correctIndex: 0,
      explanation: "La charla de 5 minutos es la instancia clave de comunicación en campo para concientizar al equipo sobre riesgos y métodos seguros inmediatos."
    },
    {
      id: 4,
      category: "postacion",
      number: 4,
      title: "¿Cómo se verifica el estado de un poste de madera y de una columna de hormigón?",
      summary: "Verificación de madera (punzado, golpe y movimiento) y hormigón (visual, oscilación y piquete)",
      fullAnswer: "• POSTE DE MADERA: Visualmente que no esté quebrado, que no presente grandes rajaduras y que esté a plomo. Se lo punza en los 4 puntos cardinales en su base para comprobar que no esté podrido, se lo golpea de forma espiralada desde su base hasta donde nos dé el brazo para verificar que no esté ahuecado y por último se lo mueve en sentido contrario a la línea.\n\n• COLUMNA DE HORMIGÓN: De forma visual que no esté descascarada ni tenga los alambres a la vista, se oscila en contra a la línea para comprobar que esté firme y se verifica piquete.",
      keyPoints: [
        "Madera: 1) Visual (rajaduras, a plomo, no quebrado). 2) Punzar 4 puntos cardinales en base (podredumbre). 3) Golpear en espiral desde la base hacia arriba (ahuecamiento). 4) Mover en sentido contrario a la línea.",
        "Hormigón: 1) Visual (sin descascarar, sin armadura/alambre a la vista). 2) Oscilar en contra de la línea (firmeza). 3) Verificar piquete."
      ],
      mcOptions: [
        "Madera: Visual, punzar 4 puntos en base, golpear en espiral y mover contra la línea. Hormigón: Visual (sin armadura a la vista), oscilar contra la línea y verificar piquete.",
        "Madera: Solo mirar que no esté inclinado. Hormigón: Pintarlo de blanco en la base para ver rajaduras.",
        "Madera: Subir con trepadores para probar peso. Hormigón: Golpear con maza de 5 kg en la cima.",
        "Tanto madera como hormigón solo se revisan desde el camión hidroelevador con binoculares."
      ],
      correctIndex: 0,
      explanation: "El poste de madera requiere punzado (base 4 puntos cardinales), golpe espiralado y fuerza contraria a la línea. El hormigón requiere inspección visual de armaduras, oscilación y piquete."
    },
    {
      id: 5,
      category: "seguridad",
      number: 5,
      title: "¿Qué significa realizar el autocontrol de EPP?",
      summary: "Control personal diario antes y después de cada tarea",
      fullAnswer: "Que yo controle el estado de mis EPP (Elementos de Protección Personal) antes y después de cada tarea diariamente.",
      keyPoints: [
        "Responsabilidad individual del operario.",
        "Frecuencia: antes y después de cada tarea, todos los días.",
        "Garantiza que el equipo esté apto para salvar vidas en cada intervención."
      ],
      mcOptions: [
        "Que cada trabajador controle personalmente el estado de sus EPP antes y después de cada tarea diariamente.",
        "Que el higienista de la empresa revise los elementos una vez al mes.",
        "Comprar el equipo de protección en una ferretería autorizada.",
        "Firmar una planilla al inicio del año declarando que se tienen todos los elementos."
      ],
      correctIndex: 0,
      explanation: "El autocontrol es la inspección diaria personal y constante (antes y después de cada labor) de tus propios EPP."
    },
    {
      id: 6,
      category: "seguridad",
      number: 6,
      title: "¿Cómo revisa sus guantes dieléctricos y arnés de seguridad?",
      summary: "Arnés: revisión integral (textiles, herrajes, T4). Guantes: inflado y estado general",
      fullAnswer: "• EL ARNÉS se debe revisar por completo y todas sus partes: textiles (sin cortes ni quemaduras), herrajes, ganchos (sin deformaciones), que no se exponga a sustancias corrosivas, controlar el T4, los conectores, etc.\n• LOS GUANTES se los verifica inflándolos para comprobar que no estén pinchados ni tengan pérdidas de aire, y chequear su estado general y fecha de ensayo.",
      keyPoints: [
        "Arnés: Inspección total de costuras, cintas textiles, herrajes metálicos, mosquetones, seguro T4 y libre de químicos corrosivos.",
        "Guantes dieléctricos: Prueba neumática manual (inflarlos y girar la manga para retener aire y detectar pinchaduras microscópicas)."
      ],
      mcOptions: [
        "Arnés: Revisión completa de textiles, herrajes, ganchos, conectores y T4. Guantes: Inflándolos para detectar pinchaduras y chequeo general.",
        "Arnés: Lavarlo con solvente químico. Guantes: Sumergirlos en aceite para flexibilizarlos.",
        "Arnés: Probarlo dejándose caer desde 1 metro. Guantes: Solo verificar el color exterior.",
        "Solo se revisan si sufrieron una descarga eléctrica previa."
      ],
      correctIndex: 0,
      explanation: "Los guantes dieléctricos NUNCA se usan sin prueba previa de inflado. El arnés requiere control minucioso de costuras, herrajes y del dispositivo anticaídas T4."
    },
    {
      id: 7,
      category: "reglas-maniobras",
      number: 7,
      title: "Las 5 Reglas de Oro de la Seguridad Eléctrica",
      summary: "1. Corte visible, 2. Bloqueo/señalización, 3. Ausencia de tensión, 4. Puesta a tierra y CC, 5. Delimitar",
      fullAnswer: "1. Corte efectivo y visible de toda posible fuente de tensión.\n2. Bloqueo y señalización de los aparatos de corte.\n3. Verificar ausencia de tensión.\n4. Puesta a tierra y en cortocircuito (PAT y CC).\n5. Delimitar y señalizar el área de trabajo.",
      keyPoints: [
        "1. Corte visible y efectivo",
        "2. Bloqueo y señalización",
        "3. Comprobación de ausencia de tensión",
        "4. Puesta a tierra y en cortocircuito",
        "5. Delimitación y señalización de la zona de trabajo"
      ],
      mcOptions: [
        "1. Corte efectivo y visible | 2. Bloqueo y señalización | 3. Verificar ausencia de tensión | 4. Puesta a tierra y CC | 5. Delimitar área",
        "1. Puesta a tierra | 2. Corte visible | 3. Delimitar área | 4. Bloqueo | 5. Verificar tensión",
        "1. Delimitar área | 2. Bloqueo | 3. Poner guantes | 4. Cortar cables | 5. Avisar al supervisor",
        "1. Verificar ausencia de tensión | 2. Corte visible | 3. Poner a tierra | 4. Bloquear | 5. Comenzar a trabajar"
      ],
      correctIndex: 0,
      explanation: "El orden estricto de las 5 Reglas de Oro es: 1° Cortar, 2° Bloquear/Señalar, 3° Verificar tensión CERO, 4° Aterrar y cortocircuitar, 5° Delimitar la zona."
    },
    {
      id: 8,
      category: "postacion",
      number: 8,
      title: "¿Qué configuraciones de postes/columnas NO pueden retener el esfuerzo de tiro de líneas?",
      summary: "Poste de madera simple, Poste de PRFV y Columna de hormigón sin base (solo enterrada)",
      fullAnswer: "Las configuraciones que NO pueden retener el esfuerzo de tiro son:\n• POSTE DE MADERA SIMPLE\n• POSTE DE PRFV (Poliéster Reforzado con Fibra de Vidrio)\n• COLUMNA DE HORMIGÓN SIN BASE (enterrada solamente)\n\n(Son estructuras concebidas únicamente para apoyo/alineación y soportar peso vertical, no tiro angular o terminal).",
      keyPoints: [
        "Poste de madera simple (sin rienda ni estructura especial).",
        "Poste de PRFV (Poliester con Fibra de Vidrio).",
        "Columna de hormigón sin base de hormigón (solo enterrada en tierra).",
        "Para retener tiro se requiere columna de retención con base pesada o estructuras arriostradas."
      ],
      mcOptions: [
        "Poste de madera simple, Poste de PRFV y Columna de hormigón sin base (solo enterrada).",
        "Columna de hormigón de retención con base de 2 metros cúbicos.",
        "Poste de madera con doble rienda de tiro en ángulo.",
        "Torre metálica reticulada con zapata de hormigón armado."
      ],
      correctIndex: 0,
      explanation: "Los postes simples de madera, PRFV o columnas sin base son de simple 'apoyo' y cederían ante la tensión mecánica longitudinal o de quiebre de una o más líneas amarradas."
    },
    {
      id: 9,
      category: "postacion",
      number: 9,
      title: "¿Cómo se delimita una zona de trabajo urbana (ocupando vereda y parcialmente calzada)?",
      summary: "Carteles, conos, vallas, cinta de peligro y senda peatonal de 90 cm en calzada si se ocupa la vereda",
      fullAnswer: "Con carteles, conos, cinta de peligro, vallas, etc. Se hace una SENDA PEATONAL DE 90 CM DE ANCHO sobre la calzada en caso de ocupar toda la vereda. Si es necesario ocupar parte de la calzada, se delimita con carteles de desvío dando preaviso con conos, cinta de peligro y vallas.",
      keyPoints: [
        "Elementos EPC: Carteles de aviso/desvío, conos viales reflectivos, cinta de peligro y vallas de contención.",
        "Senda peatonal obligatoria: Mínimo 90 cm de ancho sobre la calzada si la vereda queda bloqueada.",
        "Preaviso vehicular con conos y cartelería anticipada para desvío seguro del tránsito."
      ],
      mcOptions: [
        "Con carteles, conos, vallas y cinta de peligro. Si se ocupa toda la vereda, crear senda peatonal de 90 cm sobre calzada y preaviso con desvíos.",
        "Poner un cono al lado de la camioneta y pedirle a los peatones que crucen corriendo.",
        "Basta con encender las balizas del vehículo de trabajo sin necesidad de vallar.",
        "Cerrar la calle por completo sin dejar paso peatonal hasta terminar la jornada."
      ],
      correctIndex: 0,
      explanation: "La seguridad pública exige señalización anticipada (preaviso con conos y carteles) y garantizar el paso seguro de peatones mediante una senda protegida de al menos 90 cm."
    },
    {
      id: 10,
      category: "postacion",
      number: 10,
      title: "Diferencias estructurales y de montaje entre columna de Hormigón de RETENCIÓN y de APOYO",
      summary: "Retención: más gruesa y base de hormigón grande. Apoyo: más delgada y enterrada o con base chica",
      fullAnswer: "• COLUMNA DE RETENCIÓN: Es más gruesa en sus dimensiones geométricas y estructurales y lleva una BASE DE HORMIGÓN GRANDE, lo cual le permite retener y soportar el esfuerzo mecánico de tiro de más de una línea.\n• COLUMNA DE APOYO: Es más delgada en sus dimensiones y puede ir solo enterrada en tierra o con una base de hormigón chica, ya que solo soporta el peso vertical de los conductores.",
      keyPoints: [
        "Columna de Retención: Mayor sección (más gruesa) + Base/macizo de hormigón de gran volumen (resiste tiro de líneas).",
        "Columna de Apoyo: Menor sección (más esbelta) + Enterrada en suelo o base reducida (solo sostiene peso propio y de cables)."
      ],
      mcOptions: [
        "Retención: Más gruesa y con base de hormigón grande para retener tiro de líneas. Apoyo: Más delgada, puede ir solo enterrada o con base chica.",
        "Retención: Es de madera y se pinta de amarillo. Apoyo: Es metálica hueca.",
        "No tienen diferencias; se usa el mismo poste y la misma profundidad para cualquier función.",
        "La columna de apoyo siempre lleva base gigante y la de retención nunca lleva cimientos."
      ],
      correctIndex: 0,
      explanation: "Las columnas de retención soportan grandes fuerzas mecánicas horizontales de tracción, requiriendo mayor robustez y macizo de hormigón."
    },
    {
      id: 11,
      category: "primeros-auxilios",
      number: 11,
      title: "Primeros Auxilios, ART y Protocolo de RCP",
      summary: "Herida/Traumatismo: aviso supervisor, higienista, emergencias. ART: Berkley. RCP: Vía aérea, 30 compresiones a 100/min sin parar",
      fullAnswer: "• EN CASO DE HERIDA: Dar aviso a supervisor e higienista y utilizar el botiquín de primeros auxilios.\n• EN CASO DE TRAUMATISMO O CAÍDA: Llamar a emergencias (médicas), dar aviso a supervisor e higienista.\n• ART: BERKLEY ART.\n• MANIOBRA DE RCP:\n  a) Abriendo la vía aérea tirando la cabeza para atrás y el mentón hacia arriba (maniobra frente-mentón).\n  b) Iniciando 30 compresiones ininterrumpidas en el centro del pecho a un ritmo de 100 a 120 por minuto sin insuflaciones (solo manos).\n  c) Solo debemos parar cuando llegue el servicio de emergencias médicas o la persona reaccione.",
      keyPoints: [
        "Avisos: Supervisor + Higienista + Emergencias médicas en casos graves.",
        "Aseguradora (ART): Berkley ART.",
        "RCP: 1° Vía aérea (cabeza atrás, mentón arriba). 2° 30 compresiones en el centro del pecho a ritmo 100/min sin insuflaciones. 3° No detenerse hasta relevo médico o respuesta."
      ],
      mcOptions: [
        "Avisar a supervisor/higienista/emergencias. ART: Berkley. RCP: Abrir vía aérea, 30 compresiones en el pecho a 100/min sin parar hasta auxilio médico.",
        "Trasladar inmediatamente al accidentado en el camión sin avisar a nadie. ART: No se declara.",
        "Hacer 5 compresiones y esperar 10 minutos para ver si respira solo.",
        "Darle de beber agua fría a una persona inconsciente antes de llamar a la ambulancia."
      ],
      correctIndex: 0,
      explanation: "En emergencias se notifica a la cadena de mando y emergencias (cobertura Berkley ART). El RCP continuo de alta calidad con 30 compresiones a 100/min es vital."
    },
    {
      id: 12,
      category: "seguridad",
      number: 12,
      title: "¿Qué es la Política de Stop Work (Parar el Trabajo)? (Ejemplo Práctico)",
      summary: "Detener la tarea ante un riesgo o falta de seguridad (ej: compañero sin colocar el anticaídas T4)",
      fullAnswer: "Es el derecho y obligación de cualquier trabajador de detener una tarea insegura inmediatamente. Ejemplo: 'Un trabajador está por subir a la escalera y no se colocó el T4; detengo el trabajo para que se coloque el T4 y continúe con la tarea a realizar de forma segura'.",
      keyPoints: [
        "Cualquier miembro del equipo tiene la autoridad de parar el trabajo.",
        "Se aplica inmediatamente ante una condición o acto inseguro.",
        "Ejemplo: Detener a un compañero que va a subir a la escalera sin fijar el dispositivo anticaídas T4."
      ],
      mcOptions: [
        "Detener la tarea si un compañero está por subir a la escalera sin colocarse el T4, exigir su colocación y luego continuar de forma segura.",
        "Suspender la jornada laboral cuando hace calor sin avisar al supervisor.",
        "Apagar los celulares de la cuadrilla durante toda la jornada de trabajo.",
        "Trabajar más rápido para terminar la tarea antes de que lleguen los inspectores."
      ],
      correctIndex: 0,
      explanation: "El Stop Work faculta a cualquier operario a frenar la actividad ante un riesgo inminente (como subir a la escalera sin el arnés/T4) sin represalias."
    },
    {
      id: 13,
      category: "reglas-maniobras",
      number: 13,
      title: "Medidas de seguridad previas al Cambio de Ramal entre Transformador Mochilero y Caja de Distribución",
      summary: "1. Consignar MT -> 2. Vallado/pruebas/abrir retornos -> 3. Abrir caja y desconectar -> 4. Aislar puntas -> 5. Cambiar ramal",
      fullAnswer: "1. Realizar las operaciones necesarias para la consignación de la instalación de MT.\n2. Luego, realizando los pasos previos (vallados, prueba de poste) y siguiendo los procedimientos para realizar las maniobras, abrimos los elementos a distinto potencial (puede existir un retorno por un grupo electrógeno u otro medio que esté alimentando a algún cliente o la caja de distribución).\n3. Abrimos la caja y desconectamos todas las conexiones de salida.\n4. Aislamos la punta de los cables que desinstalamos.\n5. Procedemos a hacer el cambio de ramal y volvemos a instalar todos los cables que desinstalamos.",
      keyPoints: [
        "1° Consignación completa de Media Tensión (MT).",
        "2° Medidas previas (vallado, poste) y apertura de elementos a distinto potencial para prevenir retornos (ej. generadores).",
        "3° Apertura de caja y desconexión de salidas.",
        "4° Aislación preventiva de puntas desconectadas.",
        "5° Montaje del nuevo ramal y reconexión ordenada."
      ],
      mcOptions: [
        "1. Consignar MT | 2. Pasos previos y abrir elementos a distinto potencial (retornos) | 3. Abrir caja y desconectar salidas | 4. Aislar puntas | 5. Cambiar ramal y reconectar.",
        "1. Cortar cables con tensión | 2. Cambiar ramal | 3. Conectar transformador | 4. Poner cinta | 5. Cortar MT.",
        "1. Cambiar fusible | 2. Subir al poste sin vallar | 3. Abrir caja | 4. Empalmar con cables vivos | 5. Salir del lugar.",
        "1. Desconectar salidas sin cortar MT | 2. Tirar del ramal viejo | 3. Aislar | 4. Avisar a clientes | 5. Finalizar."
      ],
      correctIndex: 0,
      explanation: "Nunca se interviene un ramal sin consignación previa de MT, verificación de retornos de baja tensión (grupos electrógenos) y aislación de conductores sueltos."
    },
    {
      id: 14,
      category: "postacion",
      number: 14,
      title: "¿A qué profundidad se debe empotrar un poste para Línea Aérea de Baja Tensión (LABT)?",
      summary: "Profundidad = 10% del largo del poste + 60 cm",
      fullAnswer: "SIEMPRE ES EL 10% DEL LARGO DEL POSTE MÁS 60 CM. Esa fórmula nos da la profundidad exacta de empotramiento en el terreno.",
      keyPoints: [
        "Fórmula oficial: Profundidad = (Largo total del poste × 0.10) + 0.60 m.",
        "Ejemplo para poste de 8 metros: (8m × 0.10) + 0.60m = 0.80m + 0.60m = 1.40 metros de pozo.",
        "Ejemplo para poste de 10 metros: (10m × 0.10) + 0.60m = 1.00m + 0.60m = 1.60 metros."
      ],
      mcOptions: [
        "El 10% del largo total del poste más 60 centímetros.",
        "Siempre exactamente 1 metro fijo sin importar la altura.",
        "La mitad de la altura total del poste.",
        "El 25% del largo total del poste menos 30 centímetros."
      ],
      correctIndex: 0,
      explanation: "Regla técnica estándar de distribución: Empotramiento = 10% de la longitud + 60 cm (0.60 m)."
    },
    {
      id: 15,
      category: "seguridad",
      number: 15,
      title: "¿Qué significa el concepto de DOBLE AISLACIÓN en trabajos con tensión?",
      summary: "Dos aislaciones: 1) Funcional (guantes dieléctricos) y 2) De tierra (alfombra o escalera dieléctrica)",
      fullAnswer: "El concepto de DOBLE AISLACIÓN se refiere a un sistema de trabajo que consta de dos barreras de aislación independientes:\n1. UNA AISLACIÓN FUNCIONAL: Que aísla al operario de la parte de la instalación energizada (mediante guantes dieléctricos acordes a la tensión).\n2. UNA AISLACIÓN DE TIERRA: Que aísla al operario del potencial de tierra (mediante alfombra dieléctrica a nivel del suelo o escalera dieléctrica en altura).",
      keyPoints: [
        "Barrera 1 (Funcional): Guantes dieléctricos homologados que aíslan de la parte viva.",
        "Barrera 2 (Potencial de tierra): Alfombra dieléctrica (a nivel de piso) o Escalera de fibra/dieléctrica (en altura).",
        "Ambas deben cumplirse en simultáneo para evitar que el cuerpo sea camino de corriente a tierra."
      ],
      mcOptions: [
        "Sistema de dos aislaciones: una funcional (guantes dieléctricos) y una de tierra (alfombra dieléctrica a nivel o escalera dieléctrica en altura).",
        "Usar dos pares de guantes de cuero uno encima del otro.",
        "Poner doble capa de cinta aisladora en los empalmes.",
        "Trabajar con dos personas aisladas observando desde el suelo."
      ],
      correctIndex: 0,
      explanation: "Doble aislación = Aislación de la fuente con tensión (guantes dieléctricos) + Aislación respecto a masa/tierra (alfombra/escalera dieléctrica)."
    },
    {
      id: 16,
      category: "seguridad",
      number: 16,
      title: "¿En qué consiste el método de Trabajo a Contacto en TCT BT?",
      summary: "Trabajo con líneas energizadas bajo métodos escritos y operarios habilitados (Res. 3068) con doble aislación",
      fullAnswer: "El método de Trabajo a Contacto en Trabajos con Tensión (TCT) en Baja Tensión consiste en un sistema que requiere MÉTODOS ESCRITOS Y HOMOLOGACIÓN DE LOS TRABAJADORES que permite trabajar con líneas energizadas (según Resolución 3068), con los EPP correspondientes y cumpliendo SIEMPRE la doble aislación.",
      keyPoints: [
        "Permite intervenir líneas energizadas de Baja Tensión.",
        "Exige procedimientos escritos formalizados.",
        "Operarios capacitados y homologados según Resolución SRT 3068.",
        "Cumplimiento estricto de EPP y doble aislación obligatoria."
      ],
      mcOptions: [
        "Sistema con procedimientos escritos y operarios homologados (Res 3068) para trabajar con líneas energizadas cumpliendo doble aislación y EPP.",
        "Trabajar en cables vivos con las manos desnudas tocando el neutro.",
        "Hacer contacto telefónico con la central antes de cortar la luz.",
        "Un método donde solo se tocan postes de madera sin herramientas."
      ],
      correctIndex: 0,
      explanation: "La Res. SRT 3068 regula el Trabajo con Tensión (TCT) a contacto en BT, exigiendo capacitación específica, homologación y doble aislación."
    },
    {
      id: 17,
      category: "reglas-maniobras",
      number: 17,
      title: "Metodología, EPP y EPC para realizar un Cambio de Tapa de Medidor",
      summary: "Delimitar, doble aislación, retirar de costado con cuidado por deflagración, sujetar medidor si está suelto",
      fullAnswer: "• METODOLOGÍA: Se delimita la zona de trabajo y se aplica doble aislación. Se retira la tapa en mal estado de forma muy cuidadosa, preferentemente de costado para evitar quedar de frente ante una posible deflagración si el medidor estuviera suelto. Si el medidor está suelto, se lo sujeta de forma correcta, se limpia el habitáculo con precaución y se coloca la tapa nueva.\n• EPP: Guantines de algodón, guantes dieléctricos de BT, guantes de protección mecánica, ropa ignífuga, calzado dieléctrico, casco y máscara facial antideflagración, y alfombra dieléctrica.\n• EPC: Vallas, conos, cinta de peligro y cartel de señalización.",
      keyPoints: [
        "EPP completos: Guantines, dieléctricos BT, mecánicos, ignífuga, calzado dieléctrico, casco + máscara antideflagración, alfombra.",
        "EPC: Conos, vallas, cintas y carteles.",
        "Técnica clave: Posicionarse de costado al abrir/retirar tapa por riesgo de arco o deflagración por medidor suelto."
      ],
      mcOptions: [
        "Delimitar, doble aislación, retirar tapa de costado por riesgo de deflagración. EPP: Guantes BT+mecánicos, ropa ignífuga, máscara facial, alfombra. EPC: Vallas y conos.",
        "Arrancar la tapa de un tirón parado de frente sin guantes ni máscara para terminar rápido.",
        "Cambiar la tapa sin EPP siempre que sea un día soleado y seco.",
        "Desconectar toda la ciudad desde la subestación central para cambiar una tapa plástica."
      ],
      correctIndex: 0,
      explanation: "El riesgo de cortocircuito y arco eléctrico al mover un medidor suelto exige máscara antideflagración, ropa ignífuga y ubicarse siempre de costado."
    },
    {
      id: 18,
      category: "postacion",
      number: 18,
      title: "¿Cuáles son las Distancias de Seguridad para trabajos en proximidad de líneas aéreas energizadas?",
      summary: "BT: 0.80 m | MT: 0.80 m | AT: 1.50 m",
      fullAnswer: "Las distancias mínimas de seguridad para personas y herramientas en proximidad son:\n• BAJA TENSIÓN (BT): 0.80 metros\n• MEDIA TENSIÓN (MT): 0.80 metros\n• ALTA TENSIÓN (AT): 1.50 metros",
      keyPoints: [
        "Baja Tensión (BT): 0.80 metros (80 cm).",
        "Media Tensión (MT): 0.80 metros (80 cm).",
        "Alta Tensión (AT): 1.50 metros.",
        "Zona de guarda que no debe invadirse sin elementos específicos y protocolos de TCT."
      ],
      mcOptions: [
        "BT: 0.80 m | MT: 0.80 m | AT: 1.50 m",
        "BT: 0.10 m | MT: 0.20 m | AT: 0.50 m",
        "BT: 2.00 m | MT: 5.00 m | AT: 10.00 m",
        "BT: 0.00 m (se puede tocar) | MT: 1.00 m | AT: 3.00 m"
      ],
      correctIndex: 0,
      explanation: "Distancias reglamentarias en proximidad de redes aéreas: BT = 0.80 m, MT = 0.80 m, AT = 1.50 m."
    },
    {
      id: 19,
      category: "postacion",
      number: 19,
      title: "¿Cuál es la Distancia de Seguridad para operar con GRÚAS cerca de redes eléctricas energizadas?",
      summary: "BT: 3 m | MT: 3 m | AT: 5 m",
      fullAnswer: "Las distancias de seguridad mínimas para partes móviles de grúas o hidroelevadores son:\n• BAJA TENSIÓN (BT): 3 metros\n• MEDIA TENSIÓN (MT): 3 metros\n• ALTA TENSIÓN (AT): 5 metros",
      keyPoints: [
        "Baja Tensión (BT): 3 metros de separación mínima.",
        "Media Tensión (MT): 3 metros de separación mínima.",
        "Alta Tensión (AT): 5 metros de separación mínima.",
        "Las distancias para maquinaria pesada/grúas son mayores que para personas debido a la oscilación y tamaño del brazo."
      ],
      mcOptions: [
        "BT: 3 metros | MT: 3 metros | AT: 5 metros",
        "BT: 0.80 metros | MT: 0.80 metros | AT: 1.50 metros",
        "BT: 1 metro | MT: 1 metro | AT: 2 metros",
        "No hay distancia mínima si la grúa tiene ruedas de goma."
      ],
      correctIndex: 0,
      explanation: "Para grúas e hidroelevadores, la normativa exige un margen mucho más amplio: 3 metros en BT/MT y 5 metros en AT para evitar contactos accidentales por movimiento del brazo."
    },
    {
      id: 20,
      category: "mediciones",
      number: 20,
      title: "¿Cuál es la corriente máxima admisible por un cable preensamblado de 95 mm²?",
      summary: "266 A (máxima admisible) | 290 A (en emergencia)",
      fullAnswer: "• 266 A (Amperes) como Corriente Máxima Admisible en régimen permanente.\n• 290 A (Amperes) como Corriente Máxima Admisible en condición de Emergencia.",
      keyPoints: [
        "Régimen normal/permanente: 266 Amperes.",
        "Régimen de emergencia: 290 Amperes.",
        "Sección: 95 mm² de aluminio preensamblado."
      ],
      mcOptions: [
        "266 A máxima admisible y 290 A en condición de emergencia.",
        "100 A máxima y 120 A en emergencia.",
        "500 A máxima y 650 A en emergencia.",
        "50 A fija para cualquier condición climática."
      ],
      correctIndex: 0,
      explanation: "El conductor de aluminio preensamblado de 95 mm² soporta 266 A en servicio continuo y hasta 290 A en contingencias/emergencias térmicas."
    },
    {
      id: 21,
      category: "mediciones",
      number: 21,
      title: "¿Con qué instrumento se realizan las comprobaciones de tensión en una toma BT?",
      summary: "Detector de tensión homologado o Voltímetro incorporado en pinza voltamperométrica",
      fullAnswer: "Se verifica con un DETECTOR DE TENSIÓN HOMOLOGADO o con el VOLTÍMETRO INCORPORADO EN LA PINZA VOLTAMPEROMÉTRICA.",
      keyPoints: [
        "Detector de tensión bipolar homologado.",
        "Voltímetro digital / función voltímetro de la pinza voltamperométrica.",
        "Siempre debe verificarse previamente el buen funcionamiento del instrumento antes de medir."
      ],
      mcOptions: [
        "Detector de tensión homologado o voltímetro incorporado en la pinza voltamperométrica.",
        "Un buscapolo común tipo destornillador doméstico.",
        "Tocando suavemente el cable con el dorso de la mano.",
        "Un termómetro infrarrojo de temperatura ambiental."
      ],
      correctIndex: 0,
      explanation: "En redes de distribución se utilizan detectores homologados de dos polos o la función voltímetro de la pinza voltamperométrica."
    },
    {
      id: 22,
      category: "mediciones",
      number: 22,
      title: "Valores de Tensión en comprobaciones de una Toma BT (Figuras A, B y C)",
      summary: "Fase-Neutro: 220V (Fig A) | Fases distinto potencial: 380V (Fig B) | Fases igual potencial (ligadas): 0V (Fig C)",
      fullAnswer: "• MEDICIÓN ENTRE FASE Y NEUTRO: 220 V (Figura A - Tensión simple/monofásica)\n• MEDICIÓN ENTRE FASES DE DIFERENTE POTENCIAL: 380 V (Figura B - Tensión compuesta/trifásica)\n• MEDICIÓN ENTRE FASES DE IGUAL POTENCIAL: 0 V (Figura C - Indica que la fase es la misma o está ligada en paralelo).",
      keyPoints: [
        "Figura A (Fase y Neutro) = 220 Volts.",
        "Figura B (Fase R y Fase S / distinto potencial) = 380 Volts.",
        "Figura C (Fase y Fase igual potencial / ligada) = 0 Volts (comprobación de paralelo)."
      ],
      mcOptions: [
        "Figura A: 220 V (Fase-Neutro) | Figura B: 380 V (Fase-Fase distinta) | Figura C: 0 V (Fase igual potencial / ligada).",
        "Figura A: 380 V | Figura B: 220 V | Figura C: 110 V.",
        "Figura A: 12 V | Figura B: 24 V | Figura C: 220 V.",
        "Todas las figuras deben medir 0 V si la línea está en servicio."
      ],
      correctIndex: 0,
      explanation: "Fase contra Neutro da 220V. Dos fases distintas entre sí dan 380V. Dos bornes de la misma fase (o fase ligada) dan 0V de diferencia de potencial."
    },
    {
      id: 23,
      category: "postacion",
      number: 23,
      title: "¿Cuándo se coloca Poste Tutor y cómo se accede a él?",
      summary: "Se coloca si no se puede consignar MT ni cortar suministro. NUNCA subir con escalera, SOLO hidroelevador",
      fullAnswer: "• ¿EN QUÉ CASO SE COLOCA? Se debe colocar un poste tutor en el caso que NO existan los recursos para consignar la línea de Media Tensión (MT) y no se pueda retirar el poste dañado por razones de continuidad del suministro.\n• ¿SE PUEDE SUBIR CON ESCALERA? NO se debe subir a un poste con tutor utilizando escalera bajo ninguna circunstancia. El acceso se realiza ÚNICAMENTE mediante camión hidroelevador.",
      keyPoints: [
        "Motivo de tutor: Imposibilidad temporal de corte en MT y necesidad de mantener el servicio con poste comprometido.",
        "Prohibición absoluta: Prohibido apoyar escaleras o trepar postes con tutor.",
        "Método de acceso autorizado: Exclusivamente con hidroelevador."
      ],
      mcOptions: [
        "Se coloca cuando no se puede consignar MT ni cortar suministro. Solo se puede acceder con hidroelevador (NUNCA con escalera).",
        "Se coloca para decorar el poste y se puede subir con cualquier escalera común.",
        "Se coloca cuando llueve y se puede trepar con lazos de soga.",
        "Se coloca en postes nuevos de hormigón y se accede saltando desde el camión."
      ],
      correctIndex: 0,
      explanation: "Un poste con tutor es estructuralmente inestable; apoyar una escalera genera esfuerzo de vuelco. Por ello solo se interviene desde hidroelevador."
    },
    {
      id: 24,
      category: "postacion",
      number: 24,
      title: "Precauciones al cortar y retirar un conductor en poste de sostén o cruce de calle",
      summary: "1. Señalizar y delimitar la zona. 2. Amarrar la línea para evitar caídas fuera de la zona de trabajo",
      fullAnswer: "• SEÑALIZAR Y DELIMITAR la zona de trabajo tanto peatonal como vehicular.\n• AMARRAR LA LÍNEA antes de cortar, evitando caídas imprevistas de conductores fuera de la zona de trabajo o sobre calzadas/personas.",
      keyPoints: [
        "Señalización y vallado de la zona de caída potencial.",
        "Retención mecánica previa: Amarrar los cables con tirfors/cabos antes de efectuar el corte.",
        "Evitar que el cable suelto azote contra líneas energizadas inferiores o caiga sobre peatones/tránsito."
      ],
      mcOptions: [
        "Señalizar y delimitar la zona de trabajo, y amarrar la línea para evitar caídas fuera de la zona segura.",
        "Cortar el cable sin avisar y dejar que caiga al suelo para levantarlo después.",
        "Tirar del cable con la camioneta hasta que se corte solo.",
        "Pedirle a un transeúnte que sostenga el cable mientras se corta."
      ],
      correctIndex: 0,
      explanation: "El corte de un conductor bajo tensión mecánica requiere anclaje y amarre previo para controlar su descenso sin riesgo a terceros."
    },
    {
      id: 25,
      category: "reglas-maniobras",
      number: 25,
      title: "Paso a paso de la reparación de un Puente al Vuelo en LABT convencional",
      summary: "Desafectar de tensión, verificar ausencia, sección correcta del cable y trabajar como si estuviera a tierra y CC",
      fullAnswer: "Se desafecta la línea de toda fuente de tensión, se verifica fehacientemente la ausencia de tensión, se realiza el puente con el conductor de la sección correcta y se trabaja como si estuviera puesta a tierra y en cortocircuito.",
      keyPoints: [
        "1. Desafectar línea de toda fuente de alimentación.",
        "2. Comprobar ausencia de tensión con instrumento.",
        "3. Emplear cable de puente con la sección reglamentaria adecuada a la carga.",
        "4. Trabajar bajo condiciones de puesta a tierra y cortocircuito."
      ],
      mcOptions: [
        "Desafectar de toda fuente de tensión, verificar ausencia, realizar el puente con sección correcta y trabajar como aterrado y en CC.",
        "Empalmar el cable con tensión usando alambre común de fardo.",
        "Unir los cables retorciéndolos con pinza universal sin cortar el suministro.",
        "Poner cinta adhesiva sobre el corte sin verificar la sección."
      ],
      correctIndex: 0,
      explanation: "El puente al vuelo en LABT convencional requiere corte de tensión previo, prueba con detector y cable de sección adecuada."
    },
    {
      id: 26,
      category: "reglas-maniobras",
      number: 26,
      title: "EPP y EPC para la reparación de un Puente al Vuelo en LABT convencional",
      summary: "EPP: Guantines, guantes dieléctricos, mecánicos largos, ropa ignífuga, casco, calzado dieléctrico, hidroelevador. EPC: Delimitación",
      fullAnswer: "• EPP: Guantines de algodón, guantes dieléctricos acordes, guantes de protección mecánica largos, ropa ignífuga certificada, casco de seguridad con barbijoque, calzado de seguridad dieléctrico y utilización de camión hidroelevador.\n• EPC: Delimitación y señalización perimetral de la zona de trabajo (conos, vallas, carteles).",
      keyPoints: [
        "EPP: Guantines + Dieléctricos + Mecánicos largos de cuero + Ropa ignífuga + Casco + Calzado dieléctrico.",
        "Elevación: Trabajo posicionado desde canasta de hidroelevador.",
        "EPC: Conos, cintas, carteles y vallas para delimitar el radio de trabajo."
      ],
      mcOptions: [
        "EPP: Guantines, dieléctricos, mecánicos largos, ropa ignífuga, casco, calzado dieléctrico, hidroelevador. EPC: Señalización y delimitación.",
        "EPP: Solo antiparras y zapatillas deportivas. EPC: Ninguno.",
        "EPP: Guantes de látex domésticos y remera de algodón común. EPC: Una baliza.",
        "EPP: Ropa impermeable de lluvia únicamente."
      ],
      correctIndex: 0,
      explanation: "El puente en altura exige protección contra arco (ignífuga), dieléctrica completa (guantes triples con mecánicos largos) y delimitación perimetral."
    },
    {
      id: 27,
      category: "mediciones",
      number: 27,
      title: "Magnitudes Eléctricas y sus Unidades de Medida",
      summary: "Tensión: Volts (V) | Corriente: Amper (A) | Resistencia: Ohm (Ω) | Potencia: Watts (W)",
      fullAnswer: "• TENSIÓN ELÉCTRICA (Voltaje / FEM) ------> VOLTS (V)\n• CORRIENTE ELÉCTRICA (Intensidad) --------> AMPER (A)\n• RESISTENCIA ELÉCTRICA ------------------> OHM (Ω)\n• POTENCIA ELÉCTRICA ---------------------> WATTS (W)",
      keyPoints: [
        "Tensión (U / V) = Volts [V]",
        "Corriente / Intensidad (I) = Amperes [A]",
        "Resistencia (R) = Ohms [Ω]",
        "Potencia (P) = Watts / Vatios [W]"
      ],
      mcOptions: [
        "Tensión: Volts | Corriente: Amper | Resistencia: Ohm | Potencia: Watts",
        "Tensión: Amper | Corriente: Volts | Resistencia: Watts | Potencia: Ohm",
        "Tensión: Watts | Corriente: Ohm | Resistencia: Volts | Potencia: Amper",
        "Tensión: Hertz | Corriente: Joules | Resistencia: Faradios | Potencia: Lux"
      ],
      correctIndex: 0,
      explanation: "Las cuatro magnitudes básicas: Tensión en Volts, Corriente en Amper, Resistencia en Ohm y Potencia en Watts."
    },
    {
      id: 28,
      category: "reglas-maniobras",
      number: 28,
      title: "¿En llaves seccionadoras en tableros de BT se puede operar bajo carga?",
      summary: "NO (No tienen poder de extinción de arco)",
      fullAnswer: "NO. Las llaves seccionadoras no están diseñadas para interrumpir corriente de carga; operarlas bajo carga genera un arco eléctrico violento y deflagración con riesgo de muerte.",
      keyPoints: [
        "Respuesta rotunda: NO.",
        "Un seccionador no posee cámara apaga-llamas ni poder de corte bajo carga.",
        "Primero se deben abrir los interruptores de carga antes de accionar el seccionador."
      ],
      mcOptions: [
        "NO, nunca se debe operar una llave seccionadora bajo carga.",
        "SÍ, siempre que se abra con movimiento muy rápido.",
        "SÍ, en cualquier momento sin necesidad de cortar las cargas.",
        "Solo si hay más de 3 operarios en el tablero."
      ],
      correctIndex: 0,
      explanation: "Las seccionadoras solo abren circuitos SIN CARGA (corriente cero). Abrirlas con carga produce un arco eléctrico destructivo."
    },
    {
      id: 29,
      category: "seguridad",
      number: 29,
      title: "¿Qué es un CONTACTO DIRECTO en electricidad?",
      summary: "Entrar en contacto con partes activas (conductores con tensión) no aisladas",
      fullAnswer: "Es el contacto de personas con partes activas (cables o elementos conductores habitualmente con tensión) no aisladas.",
      keyPoints: [
        "Contacto directo: Tocar un conductor o borne activo que normalmente está energizado.",
        "(Diferencia con indirecto: El indirecto es tocar una masa metálica que accidentalmente quedó con tensión por falla de aislación)."
      ],
      mcOptions: [
        "Entrar en contacto físico con partes activas (conductores con tensión) normalmente no aisladas.",
        "Tocar la carcasa metálica de una máquina que tiene fuga eléctrica.",
        "Mirar un transformador a 10 metros de distancia.",
        "Tocar una herramienta de plástico apagada."
      ],
      correctIndex: 0,
      explanation: "Contacto directo es el contacto humano con conductores o partes activas bajo tensión de la instalación."
    },
    {
      id: 30,
      category: "mediciones",
      number: 30,
      title: "¿A qué se llama Intensidad de Corriente Eléctrica?",
      summary: "Es el flujo de carga / corriente eléctrica que circula por un circuito cerrado",
      fullAnswer: "Es la corriente eléctrica (flujo de electrones) que circula a través de un circuito eléctrico cerrado.",
      keyPoints: [
        "Flujo o caudal de electrones que atraviesa la sección de un conductor por unidad de tiempo.",
        "Se mide en Amperes (A) con amperímetro o pinza voltamperométrica."
      ],
      mcOptions: [
        "Es la corriente eléctrica (flujo de electrones) que circula por un circuito.",
        "Es la fuerza que retiene a los electrones en reposo.",
        "Es la pintura protectora que recubre los cables subterráneos.",
        "Es el peso físico de los transformadores en el poste."
      ],
      correctIndex: 0,
      explanation: "La intensidad de corriente representa la cantidad de carga eléctrica que fluye por un circuito por segundo."
    },
    {
      id: 31,
      category: "mediciones",
      number: 31,
      title: "¿Para qué sirve una Diferencia de Potencial (D.D.P. o F.E.M.) en un circuito eléctrico?",
      summary: "Sirve para originar la circulación de corriente eléctrica por el circuito",
      fullAnswer: "Sirve para ORIGINAR Y MANTENER LA CIRCULACIÓN DE CORRIENTE ELÉCTRICA a través de los conductores del circuito.",
      keyPoints: [
        "F.E.M. = Fuerza Electromotriz / Tensión.",
        "Es la 'presión' o diferencia energética que empuja a los electrones a moverse a través de la resistencia del circuito.",
        "Sin diferencia de potencial no hay flujo de corriente (I = V/R)."
      ],
      mcOptions: [
        "Sirve para originar e impulsar la circulación de corriente eléctrica por un circuito.",
        "Para enfriar los cables en verano.",
        "Para transformar la corriente continua en madera.",
        "Para medir la altura de las columnas de hormigón."
      ],
      correctIndex: 0,
      explanation: "La diferencia de potencial (voltaje) es la fuerza motriz indispensable que produce el movimiento de cargas eléctricas en el circuito."
    },
    {
      id: 32,
      category: "reglas-maniobras",
      number: 32,
      title: "Paso a paso ordenado para Reemplazar de Manera Segura un Fusible de BT tipo NH",
      summary: "1. Delimitar -> 2. EPP/EPC/ARPO/5min -> 3. Tensión -> 4. Abrir buzón de costado -> 5. Manopla/paralelo -> 6. Fusible menor Amp -> 7. Fusible final",
      fullAnswer: "1. DELIMITAR el área de trabajo.\n2. CHEQUEO de EPP y EPC, ARPO y charla de 5 minutos.\n3. VERIFICAR TENSIÓN del fusible quemado.\n4. Con los EPP y la alfombra dieléctrica, PREFERENTEMENTE DE COSTADO, se abre la tapa del buzón para evitar quedar expuesto a una posible deflagración.\n5. Proceder a RETIRAR EL FUSIBLE CON MANOPLA. Comprobar paralelo, verificando que las fases no estén ligadas.\n6. Si da bien, COLOCAR FUSIBLE DE MENOR AMPERAJE de costado al buzón (fusible de prueba).\n7. Si está todo bien, se retira el fusible de prueba con manopla, SE COLOCA EL FUSIBLE CORRESPONDIENTE definitivo y se cierra el buzón.",
      keyPoints: [
        "1. Delimitación del área.",
        "2. EPP, EPC, ARPO y charla de 5 min.",
        "3. Medición de tensión previa.",
        "4. Apertura del buzón posicionado de costado (evitar deflagración frontal).",
        "5. Extracción con manopla de seguridad y comprobación de paralelo (fases ligadas).",
        "6. Inserción de fusible testigo de menor calibre de costado.",
        "7. Colocación de fusible definitivo reglamentario y cierre del buzón."
      ],
      mcOptions: [
        "1. Delimitar | 2. EPP/ARPO/5min | 3. Verificar tensión | 4. Abrir buzón de costado | 5. Retirar con manopla y comprobar paralelo | 6. Probar con menor amperaje | 7. Poner definitivo.",
        "1. Abrir buzón con la mano | 2. Sacar fusible quemado con pinza común | 3. Poner fusible más grande | 4. Cerrar de golpe.",
        "1. Tirar agua adentro del buzón | 2. Poner alambre de cobre | 3. Cerrar | 4. Delimitar después.",
        "1. Poner fusible definitivo | 2. Retirar con manopla | 3. Abrir buzón | 4. Verificar tensión al final."
      ],
      correctIndex: 0,
      explanation: "El protocolo de reemplazo de fusibles NH exige posición lateral de seguridad, manopla aislante homologada, verificación de paralelo y prueba con calibre menor previo al definitivo."
    }
  ],

  // Secuencias interactivas de ordenamiento
  sequences: [
    {
      id: "reglas-oro",
      title: "🥇 Las 5 Reglas de Oro de la Electricidad",
      description: "Arrastra u ordena los 5 pasos en la secuencia técnica correcta y estricta:",
      rationale: "🛡️ <strong>¿Por qué este orden salva vidas?</strong><br>• <strong>1° Corte visible:</strong> Desconecta físicamente la fuente de energía.<br>• <strong>2° Bloqueo y señalización:</strong> Impide que otra persona reconecte por error.<br>• <strong>3° Ausencia de tensión:</strong> Comprueba con tester que no haya energía residual.<br>• <strong>4° Puesta a tierra y CC:</strong> Drena tensiones inducidas y genera disparo instantáneo si hay retorno.<br>• <strong>5° Delimitación:</strong> Protege a terceros y asegura el radio de trabajo.",
      steps: [
        { id: 1, text: "Corte efectivo y visible de toda posible fuente de tensión" },
        { id: 2, text: "Bloqueo y señalización de los aparatos de corte" },
        { id: 3, text: "Verificar ausencia de tensión con instrumento homologado" },
        { id: 4, text: "Puesta a tierra y en cortocircuito (PAT y CC)" },
        { id: 5, text: "Delimitar y señalizar el área de trabajo" }
      ]
    },
    {
      id: "fusible-nh",
      title: "🔌 Paso a Paso: Reemplazo Seguro de Fusible NH en BT",
      description: "Ordena la maniobra completa para cambiar un fusible tipo NH sin riesgo de deflagración:",
      rationale: "🛡️ <strong>¿Por qué este orden salva vidas?</strong><br>• <strong>Delimitación y EPP (Pasos 1-2):</strong> Barrera física previa contra arcos.<br>• <strong>De costado (Paso 4):</strong> Evita que la onda expansiva o deflagración dé de lleno en el rostro o pecho.<br>• <strong>Manopla y Paralelo (Paso 5):</strong> Garantiza aislación manual y descarta fases ligadas.<br>• <strong>Fusible menor (Paso 6):</strong> Si hay un cortocircuito en la red, salta con mínima energía antes de colocar el definitivo.",
      steps: [
        { id: 1, text: "Delimitar el área de trabajo con conos, cintas y vallas" },
        { id: 2, text: "Chequeo de EPP y EPC, confección de ARPO y Charla de 5 minutos" },
        { id: 3, text: "Verificar la tensión del fusible quemado" },
        { id: 4, text: "Con EPP y alfombra, abrir la tapa del buzón preferentemente de costado" },
        { id: 5, text: "Retirar el fusible con manopla y comprobar paralelo (que las fases no estén ligadas)" },
        { id: 6, text: "Colocar fusible de menor amperaje de prueba posicionado de costado al buzón" },
        { id: 7, text: "Si está todo bien, retirar fusible de prueba con manopla, colocar el definitivo y cerrar buzón" }
      ]
    },
    {
      id: "ramal-trafo",
      title: "⚡ Medidas Previas al Cambio de Ramal (Trafo Mochilero)",
      description: "Ordena los pasos de seguridad requeridos antes de efectuar el cambio de ramal:",
      rationale: "🛡️ <strong>¿Por qué este orden salva vidas?</strong><br>• <strong>1° Consignar MT:</strong> Elimina la fuente principal de alta potencia.<br>• <strong>2° Apertura de retornos:</strong> Evita que un generador domiciliario electrifique la línea de espaldas.<br>• <strong>3° Desconectar y 4° Aislar puntas:</strong> Previene contactos accidentales con conductores sueltos.",
      steps: [
        { id: 1, text: "Realizar las operaciones necesarias para la consignación de la instalación de MT" },
        { id: 2, text: "Pasos previos (vallado, prueba de poste) y abrir elementos a distinto potencial (evitar retornos)" },
        { id: 3, text: "Abrir la caja de distribución y desconectar todas las conexiones de salida" },
        { id: 4, text: "Aislar la punta de los cables que se desinstalaron" },
        { id: 5, text: "Proceder a hacer el cambio de ramal y reconectar todos los cables ordenadamente" }
      ]
    },
    {
      id: "rcp-pasos",
      title: "❤️ Maniobra de RCP (Reanimación Cardiopulmonar)",
      description: "Ordena el protocolo correcto de atención ante una parada cardiorrespiratoria:",
      rationale: "🛡️ <strong>¿Por qué este orden salva vidas?</strong><br>• <strong>1° Vía aérea:</strong> Despeja la lengua de la tráquea.<br>• <strong>2° 30 compresiones a 100/min:</strong> Mantiene el flujo de sangre al cerebro sin interrupciones.<br>• <strong>3° No parar:</strong> Detener el masaje hace que la presión arterial caiga a cero inmediatamente.",
      steps: [
        { id: 1, text: "Abrir la vía aérea tirando la cabeza hacia atrás y el mentón hacia arriba (frente-mentón)" },
        { id: 2, text: "Iniciar 30 compresiones ininterrumpidas en el centro del pecho a ritmo de 100/min sin insuflaciones" },
        { id: 3, text: "Continuar las maniobras sin parar hasta que llegue el servicio de emergencias médicas o la persona reaccione" }
      ]
    }
  ],

  // Emparejamiento de conceptos
  matchGames: [
    {
      id: "magnitudes",
      title: "⚡ Match de Magnitudes y Unidades Eléctricas",
      pairs: [
        { left: "Tensión Eléctrica (Voltaje / FEM)", right: "Volts (V)" },
        { left: "Corriente Eléctrica (Intensidad)", right: "Amper (A)" },
        { left: "Resistencia Eléctrica", right: "Ohm (Ω)" },
        { left: "Potencia Eléctrica", right: "Watts (W)" }
      ]
    },
    {
      id: "distancias",
      title: "📏 Match de Distancias de Seguridad",
      pairs: [
        { left: "Personas en Proximidad BT y MT", right: "0.80 metros" },
        { left: "Personas en Proximidad AT", right: "1.50 metros" },
        { left: "Grúas e Hidroelevadores en BT y MT", right: "3.00 metros" },
        { left: "Grúas e Hidroelevadores en AT", right: "5.00 metros" },
        { left: "Senda Peatonal en Calzada", right: "90 cm (0.90 m)" }
      ]
    },
    {
      id: "conceptos-clave",
      title: "🛡️ Match de Definiciones y Siglas",
      pairs: [
        { left: "SIT / ATS / PTS", right: "Documento de Seguridad Integrada a la Tarea" },
        { left: "ARPO", right: "Análisis de Riesgo Pre Operacional" },
        { left: "Aseguradora de Riesgos de Trabajo", right: "Berkley ART" },
        { left: "Contacto Directo", right: "Tocar partes activas habitualmente con tensión" },
        { left: "Stop Work", right: "Derecho/deber de parar una tarea insegura (ej: sin T4)" }
      ]
    }
  ],

  // Desafíos de Verdadero o Falso
  trueFalseQuestions: [
    {
      q: "¿En llaves seccionadoras de tableros de Baja Tensión se puede operar bajo carga?",
      correct: false,
      explanation: "FALSO. Las seccionadoras NUNCA se operan bajo carga porque carecen de cámaras de extinción de arco y provocarían una deflagración letal."
    },
    {
      q: "¿Se puede subir con escalera a un poste con tutor?",
      correct: false,
      explanation: "FALSO. NUNCA se debe apoyar una escalera en un poste tutor; el acceso es EXCLUSIVAMENTE con camión hidroelevador."
    },
    {
      q: "¿La profundidad de empotramiento de un poste de LABT es 10% del largo más 60 cm?",
      correct: true,
      explanation: "VERDADERO. La fórmula técnica exacta es Profundidad = (Largo × 0.10) + 0.60 metros."
    },
    {
      q: "¿Un poste de madera simple puede retener el esfuerzo de tiro de varias líneas amarradas?",
      correct: false,
      explanation: "FALSO. Los postes de madera simple, de PRFV y columnas sin base de hormigón son de simple apoyo y NO soportan tiro de líneas."
    },
    {
      q: "¿Los guantes dieléctricos se deben verificar inflándolos antes de cada tarea?",
      correct: true,
      explanation: "VERDADERO. La prueba neumática manual de inflado detecta pinchaduras y porosidades que no se ven a simple vista."
    },
    {
      q: "¿La doble aislación en altura consiste en guantes dieléctricos y escalera dieléctrica?",
      correct: true,
      explanation: "VERDADERO. Aísla de la parte con tensión (guantes) y del potencial de tierra/masa (escalera dieléctrica o alfombra a nivel)."
    },
    {
      q: "¿En la maniobra de RCP se debe detener el masaje cardíaco a los 2 minutos para descansar?",
      correct: false,
      explanation: "FALSO. Las compresiones deben ser ininterrumpidas (a ritmo de 100-120/min) hasta la llegada de emergencias o respuesta del paciente."
    },
    {
      q: "¿La corriente máxima admisible por un cable preensamblado de 95 mm² en servicio normal es 266 A?",
      correct: true,
      explanation: "VERDADERO. 266 A en régimen continuo y 290 A en condición de emergencia."
    }
  ],

  // Diccionario / Glosario de Siglas y Términos Técnicos
  glossaryTerms: [
    { term: "SIT", def: "Seguridad Integrada a la Tarea. Documento impreso con la secuencia de pasos, riesgos, EPP y recomendaciones que se solicita en papel al encargado." },
    { term: "ATS / PTS", def: "Análisis de Trabajo Seguro / Permiso de Trabajo Seguro (sinónimos o variantes empresariales del SIT)." },
    { term: "ARPO", def: "Análisis de Riesgo Pre Operacional. Evaluación de riesgos que se realiza en el lugar de trabajo antes de iniciar las maniobras." },
    { term: "T4", def: "Dispositivo de seguridad salva-caídas o arrestador para trabajos en altura sobre postes y escaleras." },
    { term: "EPP", def: "Elementos de Protección Personal (guantes dieléctricos, casco, gafas, calzado aislante, ropa ignífuga, etc.)." },
    { term: "EPC", def: "Elementos de Protección Colectiva (vallas, conos reflectivos, cintas de peligro, alfombras dieléctricas)." },
    { term: "TCT BT", def: "Trabajo Con Tensión en Baja Tensión (hasta 1000V). Método al contacto normado por Resolución SRT 3068/14." },
    { term: "Res. SRT 3068/14", def: "Reglamento para la Ejecución de Trabajos con Tensión en Instalaciones de Baja Tensión en la República Argentina." },
    { term: "F.E.M. / Tensión", def: "Fuerza Electromotriz o Tensión (Voltaje). Diferencia de potencial eléctrico medida en Volts (V)." },
    { term: "Berkley ART", def: "Aseguradora de Riesgos del Trabajo que cubre accidentes laborales y contingencias del personal." },
    { term: "LABT", def: "Líneas Aéreas de Baja Tensión." },
    { term: "PAT y CC", def: "Puesta a Tierra y en Cortocircuito (4ª Regla de Oro). Drena tensiones residuales o inducidas." },
    { term: "Fusible NH", def: "Fusible de alta capacidad de ruptura (Niederspannungs-Hochleistungs) utilizado para protección de redes de distribución BT." },
    { term: "Stop Work", def: "Política de seguridad que otorga el derecho y la obligación a cualquier operario de detener una tarea insegura." }
  ]
};
