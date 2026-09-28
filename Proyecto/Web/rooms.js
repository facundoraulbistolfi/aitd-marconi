(() => {
  "use strict";

  window.createMarconiScenes = function createMarconiScenes(game) {
    const S = game.getState;
    const h = game.hotspot;
    const go = (scene) => () => game.changeScene(scene);
    const msg = (messages) => () => game.respond(messages);
    const available = (item) => !S().taken.includes(item);
    const sprite = (name) => ({ image: name });
    const media = (path) => ({ imagePath: path });
    const exit = (scene, x, y, image = "FlechaAbajo1.bmp", label = "Salir") =>
      h(`exit-${scene}`, label, x, y, image.includes("Der") || image.includes("Izq") ? 52 : 44,
        image.includes("Der") || image.includes("Izq") ? 44 : 52, go(scene), sprite(image));

    const door = (scene, item, flag, labels = {}) => () => {
      const state = S();
      if (state.flags[flag]) {
        if (state.action === "interact") game.changeScene(scene);
        else game.respond({
          look: labels.openLook || "La puerta está abierta.",
          take: "No puedo llevarla.",
          use: state.selectedItem === item ? "Ya está abierta." : "No puedo usar eso ahí.",
        });
        return;
      }
      if (state.action === "use" && state.selectedItem === item) {
        state.flags[flag] = true;
        game.say(labels.opened || "Uso la llave para abrir la puerta.");
        game.render();
        return;
      }
      game.respond({
        interact: labels.closed || "Está cerrada; necesito la llave.",
        look: "Es una puerta.",
        take: "No puedo llevarla.",
        use: "No puedo usar eso ahí.",
      });
    };

    const roomDoor = (scene) => () => {
      if (S().action === "interact") game.changeScene(scene);
      else game.respond({
        look: "Lleva a una habitación.",
        take: "¿Dónde querés que guarde una puerta?",
        use: "No puedo.",
      });
    };

    const pickup = (item, messages) => () => game.pickup(item, messages);

    const placeholder = (id, name, background, backTo, note) => ({
      name,
      background,
      entryMessage: note,
      getHotspots: () => [
        exit(backTo, 952, 560, "FlechaAbajo1.bmp", "Volver"),
        h(`${id}-view`, name, 40, 60, 880, 430, msg({
          interact: note,
          look: note,
          take: "Esta parte nunca llegó a implementarse en el original.",
          use: "No puedo hacer eso.",
        })),
      ],
    });

    return {
      BS: {
        name: "Baño superior",
        background: "BS.bmp",
        getHotspots: () => [
          exit("PS", 944, 571, "FlechaAbajo1.bmp", "Salir al pasillo"),
          h("bs-mirror", "Espejo roto", 688, 67, 169, 185, msg({
            interact: "No, podría cortarme con los vidrios.",
            look: "Es un espejo con sangre, roto de un golpe.",
            take: "No puedo llevarlo.", use: "No puedo hacer eso.",
          })),
          h("bs-sink", "Lavamanos", 648, 267, 265, 33, msg({
            interact: "No, podría cortarme con los vidrios.",
            look: "Es un lavamanos lleno de vidrios y sangre.",
            take: "No necesito ni el lavamanos ni los vidrios.", use: "No puedo hacer eso.",
          })),
          h("bs-vase", "Jarrón de mimbre", 640, 339, 97, 121, () => {
            if (S().action === "interact") game.changeScene("JAR");
            else game.respond({ look: "Es un jarrón de mimbre.", take: "No necesito llevarlo.", use: "No puedo hacer eso." });
          }),
          h("bs-drain", "Desagüe de la ducha", 192, 427, 41, 25, msg({
            interact: "¿Sabías que su enemigo es el montículo?", look: "Es el desagüe de la ducha.",
            take: "No puedo llevarlo.", use: "No puedo hacer eso.",
          })),
          h("bs-faucet", "Canilla", 82, 291, 85, 47, game.useFaucet,
            sprite(S().flags.faucetHasHandle ? "CanillaCM.bmp" : "CanillaSM.bmp")),
          ...(S().flags.keyReleased && !S().flags.lowerBathroomKeyTaken
            ? [h("bs-key", "Llave del baño inferior", 168, 432, 65, 30, game.takeLowerBathroomKey, sprite("LlaveBI.bmp"))]
            : []),
        ],
      },

      PS: {
        name: "Pasillo superior",
        background: "PS.bmp",
        getHotspots: () => [
          exit("BS", 448, 566, "FlechaAbajo2.bmp", "Volver al baño"),
          h("ps-pg1", "Puerta de la pieza de Guille", 344, 38, 65, 361, roomDoor("PG1")),
          h("ps-pp", "Puerta de la pieza de los padres", 416, 94, 169, 233, roomDoor("PP")),
          h("ps-mat", "Felpudo", 416, 350, 89, 57, msg({
            interact: "Absorbe todo lo que toca, como el corazón de Marge.",
            look: "Es un felpudo muy sucio y pegajoso.", take: "Preferiría no tocarlo, menos llevarlo.", use: "No puedo.",
          })),
          h("ps-window", "Ventana", 0, 38, 265, 593, msg({
            interact: "No puedo entrar por ahí; está cerrada por dentro.", look: "Es una ventana.",
            take: "Eso es ilógico.", use: "No puedo.",
          })),
          exit("ES", 952, 582, "FlechaDer1.bmp", "Ir a las escaleras"),
        ],
      },

      PG1: {
        name: "Pieza de Guille I",
        background: "PG1.bmp",
        getHotspots: () => [
          exit("PS", 936, 566, "FlechaAbajo1.bmp", "Volver al pasillo"),
          h("pg1-blood", "Mancha de sangre", 104, 462, 241, 89, msg({
            interact: "Veo que hay mucha sangre por todos lados.", look: "Es una mancha de sangre.",
            take: "Ya tengo suficiente dentro mío.", use: "No puedo hacer eso.",
          })),
          h("pg1-shelf", "Estantería", 0, 41, 105, 413, msg({
            interact: "Está llena de cosas otakus.", look: "Es una estantería.",
            take: "Se me caería encima y me aplastaría.", use: "No puedo.",
          })),
          h("pg1-printer", "Impresora", 256, 174, 129, 65, msg({
            interact: "La hoja impresa dice: ‘PUTO EL QUE LEE’.", look: "Es una impresora.",
            take: "No la necesito.", use: "No puedo hacer eso.",
          })),
          h("pg1-keyboard", "Teclado", 384, 291, 25, 89, msg({
            interact: "No sé por qué está colgando.", look: "Es un teclado.",
            take: "Me sirve mejor enchufado.", use: "No puedo hacer eso.",
          })),
          h("pg1-case", "Gabinete", 608, 350, 81, 121, () => {
            if (S().action === "interact") game.changeScene("GAB");
            else game.respond({ look: "Es el gabinete de la computadora.", take: "Podría llevarlo, pero ni da.", use: "No puedo hacer eso." });
          }),
          h("pg1-tv", "Televisor", 656, 50, 260, 160, () => {
            if (S().action === "interact") {
              S().flags.guilleTvOn = !S().flags.guilleTvOn;
              game.say(S().flags.guilleTvOn ? "Encendí el televisor." : "Apagué el televisor.");
              game.render();
            } else game.respond({ look: "Es una TV.", take: "Es innecesaria.", use: "No puedo." });
          }, sprite(S().flags.guilleTvOn ? "TV2on.bmp" : "TV2off.bmp")),
          exit("PG2", 8, 515, "FlechaIzq1.bmp", "Ir a la segunda parte"),
          h("pg1-monitor", "Monitor", 424, 70, 129, 137, () => {
            if (S().action === "interact") {
              if (!S().flags.computerOn) game.say("La computadora está apagada; no puedo usar el monitor.");
              else if (S().flags.monitorSolved) game.say("Dice: ‘Cod CF = 1167F (HEX)’.");
              else game.openMonitor();
            } else game.respond({
              look: S().flags.computerOn ? "Es el monitor de la computadora." : "Es el monitor; está apagado igual que la PC.",
              take: "Es más útil donde está.", use: "No puedo hacer eso.",
            });
          }, sprite(!S().flags.computerOn ? "MonitorOff.bmp" : S().flags.monitorSolved ? "MonitorCod.bmp" : "MonitorJuego.bmp")),
          h("pg1-crowbar", "Barreta", 648, 224, 81, 49, msg({
            interact: "¿Quién podría necesitar esto?", look: "Es una barreta bastante precaria.",
            take: "Parece una estupidez creer que sirve.", use: "No se puede.",
          })),
        ],
      },

      PG2: {
        name: "Pieza de Guille II",
        background: "PG2.bmp",
        getHotspots: () => [
          exit("PG1", 952, 574, "FlechaAbajo1.bmp", "Volver"),
          h("pg2-gun", "Pistola", 624, 376, 57, 41, msg({ interact: "Las armas son innecesarias en las aventuras gráficas.", look: "Es un intento de Beretta.", take: "No veo cómo podría servirme.", use: "No puedo." })),
          h("pg2-spear", "Lanza", 552, 200, 65, 161, msg({ interact: "Esto ya se pone raro.", look: "Es una lanza africana.", take: "Ni siquiera podría usarla bien.", use: "No puedo." })),
          h("pg2-hook", "Gancho", 632, 200, 65, 89, () => {
            if (available("hook")) {
              game.pickup("hook", {
                interact: "El papel del jarrón decía ‘HOOK’. Quizás debería llevármelo.",
                look: "Es un gancho de carnicero.",
                success: "Me guardé el gancho de carnicero.",
                use: "No puedo usarlo acá.",
              });
            } else {
              game.respond({ interact: "Ya me llevé el gancho.", look: "Acá estaba el gancho.", take: "Ya lo tengo.", use: "No puedo." });
            }
          }),
          h("pg2-mark", "Marca en el placard", 784, 224, 153, 89, msg({ interact: "Todo muy turbio.", look: "No tengo idea de qué pasó acá.", take: "No veo cómo podría hacerlo.", use: "No puedo." })),
          h("pg2-notes", "Apuntes", 128, 424, 121, 73, () => {
            if (S().action === "interact") game.changeScene("APU");
            else game.respond({ look: "Son unos apuntes de álgebra.", take: "No quiero llevarlos.", use: "No puedo." });
          }),
        ],
      },

      PP: {
        name: "Pieza de los padres",
        background: "PP.bmp",
        getHotspots: () => [
          h("pp-wardrobe", "Armario", 0, 48, 201, 473, msg({ interact: "No quiero abrir el armario.", look: "Sale un olor putrefacto de adentro.", take: "No puedo llevarme el armario.", use: "No se puede." })),
          h("pp-tv", "Televisor", 728, 80, 267, 209, () => {
            if (S().action === "interact") {
              if (S().flags.parentsTvOn && S().flags.remotePowered) {
                game.openRemote();
              } else {
                S().flags.parentsTvOn = !S().flags.parentsTvOn;
                game.say(S().flags.parentsTvOn ? "Encendí el televisor." : "Apagué el televisor."); game.render();
              }
            } else if (S().action === "use" && S().selectedItem === "battery") {
              if (!S().flags.parentsTvOn) {
                game.say("Primero debería prender el televisor.");
              } else if (!S().flags.remotePowered) {
                game.consumeItem("battery");
                S().flags.remotePowered = true;
                game.say("Puse la pila en el control remoto. Ahora funciona.");
                game.render();
                game.openRemote();
              } else {
                game.openRemote();
              }
            } else game.respond({
              look: S().flags.parentsTvOn ? game.parentTvMessage() : "Sólo funciona el botón de encendido.",
              take: "No podría cargarlo.",
              use: S().flags.remotePowered ? "El control ya tiene una pila; puedo abrirlo interactuando con el televisor." : "El control remoto no tiene pila.",
            });
          }, S().flags.parentsTvOn ? media(game.parentTvImage()) : sprite("TVoff.bmp")),
          h("pp-speaker", "Parlante", 656, 344, 57, 73, msg({ interact: "No enciende.", look: "Es un parlante.", take: "No lo necesito.", use: "No se puede." })),
          h("pp-case", S().flags.briefcaseOpen ? "Maletín abierto" : "Maletín cerrado",
            S().flags.briefcaseOpen ? 198 : 216, S().flags.briefcaseOpen ? 384 : 456,
            S().flags.briefcaseOpen ? 267 : 238, S().flags.briefcaseOpen ? 239 : 167,
            () => {
              if (!S().flags.briefcaseOpen && S().action === "interact") game.requestCode("Maletín", "855", "briefcaseOpen");
              else game.respond({ interact: "Logré abrirlo.", look: S().flags.briefcaseOpen ? "Es un maletín abierto." : "Es un maletín cerrado con un código.", take: "No necesito llevarlo.", use: "No se puede." });
            }, sprite(S().flags.briefcaseOpen ? "MaletinAbierto.bmp" : "MaletinCerrado.bmp")),
          exit("PS", 952, 576, "FlechaAbajo1.bmp", "Volver al pasillo"),
          h("pp-window", "Ventana tapiada", 240, 41, 593, 168, msg({ interact: "Parece que alguien quiso tapiar las ventanas.", look: "Es la ventana.", take: "No necesito llevarla.", use: "No se puede." })),
          ...(S().flags.briefcaseOpen && available("vanKey")
            ? [h("pp-van-key", "Llave de la camioneta", 320, 500, 107, 90,
              pickup("vanKey", { interact: "Por lo menos no abrí el maletín al pedo.", look: "Es la llave de un vehículo.", use: "No se puede." }), sprite("LlaveCamioneta.bmp"))]
            : []),
        ],
      },

      ES: {
        name: "Escalera superior",
        background: "ES.bmp",
        getHotspots: () => [
          exit("PS", 664, 579, "FlechaAbajo1.bmp", "Volver al pasillo superior"),
          exit("EI", 384, 587, "FlechaIzq1.bmp", "Bajar"),
          ...(available("battery") ? [h("es-battery", "Pila", 400, 251, 31, 13,
            pickup("battery", { interact: "¿Cómo llegó hasta acá?", look: "Es una pila doble A.", use: "No se puede." }), sprite("Pila.bmp"))] : []),
          h("es-fireplace", "Chimenea", 496, 147, 33, 33, msg({ interact: "Está caliente.", look: "Es una chimenea.", take: "Tendría que sacarla de la pared.", use: "No puedo hacer eso." })),
        ],
      },

      EI: {
        name: "Escalera inferior",
        background: "EI.bmp",
        getHotspots: () => [
          exit("ES", 640, 280, "FlechaArriba2.bmp", "Subir"),
          exit("PI", 696, 72, "FlechaIzq1.bmp", "Ir al pasillo inferior"),
          exit("GA", 8, 520, "FlechaIzq1.bmp", "Ir al garaje"),
          h("ei-symbol", "Símbolo de sangre", 320, 232, 129, 129, msg({ interact: "Al parecer este símbolo significa ‘ZWÖLF’.", look: "Es un extraño símbolo pintado con sangre.", take: "No veo cómo podría llevarlo.", use: "No puedo hacer eso." })),
          h("ei-dining-door", "Puerta del comedor", 912, 41, 81, 208, door("C1", "diningKey", "diningDoorOpen")),
        ],
      },

      PI: {
        name: "Pasillo inferior",
        background: "PI.bmp",
        getHotspots: () => [
          exit("EI", 368, 584, "FlechaAbajo2.bmp", "Volver a la escalera"),
          h("pi-hole", "Hueco bajo la escalera", 192, 41, 153, 488, go("HUE")),
          h("pi-bath-door", "Puerta del baño", 376, 41, 73, 360, door("BI", "lowerBathroomKey", "lowerBathroomDoorOpen")),
          h("pi-heater", "Termotanque", 504, 41, 97, 216, msg({ interact: "La chapa está caliente, pero no lo oigo funcionar.", look: "Es un termotanque.", take: "Es demasiado pesado.", use: "No puedo hacer eso." })),
          h("pi-washer", "Lavarropas", 640, 160, 129, 169, msg({ interact: "No tiene nada en su interior.", look: "Es un lavarropas.", take: "No veo para qué me lo llevaría.", use: "No puedo hacer eso." })),
        ],
      },

      BI: {
        name: "Baño inferior",
        background: "BI.bmp",
        getHotspots: () => [
          h("bi-mirror", "Lugar del espejo", 104, 112, 41, 129, msg({ interact: "Parece que alguien quitó el espejo.", look: "¿No debería haber un espejo acá?", take: "Ya se lo llevaron.", use: "No puedo hacer eso." })),
          h("bi-cabinet", "Botiquín", 192, 104, 41, 129, msg({ interact: "Está vacío.", look: "No tiene nada importante.", take: "No le veo utilidad.", use: "No puedo hacer nada." })),
          h("bi-drain", "Desagüe", 344, 304, 41, 25, () => S().action === "interact" ? game.changeScene("DES") : game.respond({ look: "Es un desagüe.", take: "No veo cómo llevarlo.", use: "No puedo hacer eso." })),
          h("bi-toilet", "Lugar del inodoro y bidet", 624, 368, 377, 249, msg({ interact: "Alguien se llevó el inodoro y el bidet.", look: "¿Qué carajos pasó acá?", take: "Ya se los llevaron; no sé cómo.", use: "No puedo hacer nada." })),
          exit("PI", 528, 552, "FlechaAbajo1.bmp", "Volver al pasillo"),
          h("bi-sink", "Lavadero", 144, 248, 113, 57, msg({ interact: "Está lleno de sangre; parece tapado.", look: "Es un lavadero.", take: "¿Qué podría llevarme?", use: "No puedo hacer eso." })),
        ],
      },

      C1: {
        name: "Comedor I",
        background: "C1.bmp",
        getHotspots: () => [
          exit("EI", 472, 552, "FlechaAbajo1.bmp", "Volver a la escalera"),
          exit("C2", 16, 496, "FlechaIzq1.bmp", "Ir al segundo comedor"),
          exit("CO", 880, 496, "FlechaDer1.bmp", "Ir a la cocina"),
          h("c1-painting", "Cuadro del leñador", S().flags.paintingMoved ? 8 : 312, S().flags.paintingMoved ? 96 : 56, 243, 279, () => {
            if (S().action === "take" && !S().flags.paintingMoved) {
              S().flags.paintingMoved = true; game.say("Bajo el cuadro hay una caja fuerte."); game.render();
            } else game.respond({ interact: "Este cuadro me da un mal presentimiento.", look: "Es un cuadro de un leñador.", take: "No puedo llevármelo; bastante que lo corrí.", use: "No puedo hacer eso." });
          }, sprite("Cuadro.bmp")),
          ...(S().flags.paintingMoved ? [
            h("c1-safe", S().flags.safeOpen ? "Caja fuerte abierta" : "Caja fuerte cerrada",
              S().flags.safeOpen ? 176 : 312, S().flags.safeOpen ? 48 : 56,
              S().flags.safeOpen ? 145 : 233, S().flags.safeOpen ? 352 : 281,
              () => {
                if (!S().flags.safeOpen && S().action === "interact") game.requestCode("Caja fuerte", "71295", "safeOpen");
                else game.respond({ interact: "Ya abrí la caja fuerte.", look: S().flags.safeOpen ? "Es la puerta de la caja fuerte." : "Es una caja fuerte cerrada.", take: "No sé cuánto debe pesar.", use: "No puedo." });
              }, sprite(S().flags.safeOpen ? "CFAb.bmp" : "CFCe.bmp")),
            ...(S().flags.safeOpen ? [h("c1-small-box", S().flags.smallBoxOpen ? "Caja pequeña abierta" : "Caja pequeña cerrada",
              328, S().flags.smallBoxOpen ? 176 : 200, S().flags.smallBoxOpen ? 184 : 162, S().flags.smallBoxOpen ? 152 : 124,
              () => {
                if (!S().flags.smallBoxOpen && S().action === "interact") game.requestCode("Caja pequeña", "997", "smallBoxOpen");
                else if (S().flags.smallBoxOpen && S().action === "look") game.changeScene("CJP");
                else game.respond({ interact: "Ya abrí la caja pequeña.", look: "Es una caja dentro de la caja fuerte.", take: "No la necesito.", use: "No puedo." });
              }, sprite(S().flags.smallBoxOpen ? "CPAb.bmp" : "CPCe.bmp"))] : []),
          ] : []),
        ],
      },

      C2: {
        name: "Comedor II",
        background: () => S().flags.safeOpen && !S().flags.smallBoxOpen ? "C2B.bmp" : "C2A.bmp",
        getHotspots: () => [
          exit("C1", 40, 568, "FlechaAbajo2.bmp", "Volver al primer comedor"),
          h("c2-paper", "Hoja", 16, 176, 81, 129, () => {
            if (S().action === "look") game.changeScene("HOJ");
            else game.respond({ interact: "Parece que alguien dejó algo anotado.", take: "No la voy a agarrar; tengo buena memoria.", use: "No puedo hacer eso." });
          }),
          h("c2-shrine", "Santuario", 136, 96, 745, 377, msg({
            interact: S().flags.safeOpen && !S().flags.smallBoxOpen ? "Ahora sí que no entiendo nada." : "Es raro; no le veo utilidad.",
            look: "Parece una especie de santuario aborigen.", take: "Está encastrado en la pared.", use: "No puedo hacer eso.",
          })),
          ...(S().flags.safeOpen && !S().flags.smallBoxOpen ? [
            h("c2-text", "Texto en sangre", 416, 128, 177, 169, msg({ interact: "MAXIMA PRIMUS APERTUM PARVA ARCA... debe ser chino.", look: "Es un texto en una lengua muerta.", take: "¿Cómo podría llevarlo?", use: "No puedo hacer eso." })),
            h("c2-hexagram", "Sextagrama", 344, 472, 337, 161, msg({ interact: "¿De dónde salió esto?", look: "Es peor que un pentagrama: es un sextagrama.", take: "No lo pienso tocar.", use: "No puedo hacer eso." })),
          ] : []),
        ],
      },

      CO: {
        name: "Cocina",
        background: "CO.bmp",
        getHotspots: () => [
          h("co-window", "Ventana", 568, 41, 449, 272, msg({ interact: "Parece que alguien quiso tapiar las ventanas.", look: "Es la ventana.", take: "No necesito llevarla.", use: "No se puede." })),
          h("co-netbook", "Netbook", 648, 248, 170, 142, () => {
            if (S().action === "interact") game.openNotebook();
            else game.respond({ look: "Es una netbook del gobierno.", take: "La verdad es que no la quiero.", use: "No puedo." });
          }, sprite(`net${Math.min(S().minigames.notebookStep + 1, 5)}.bmp`)),
          h("co-cabinet", "Mueble", 424, 400, 337, 113, () => {
            if (S().action === "look") game.changeScene("MUE");
            else game.respond({ interact: "Podría meter la cabeza a ver si encuentro algo.", take: "No puedo hacer eso.", use: "No puedo." });
          }),
          ...(S().flags.woodRemoved && available("knife")
            ? [h("co-knife", "Cuchillo", 376, 368, 44, 20,
              pickup("knife", { interact: "Así que esto estaba escondido.", look: "Es un cuchillo para untar manteca.", use: "No puedo hacerlo." }), sprite("Cuchillo.bmp"))]
            : !S().flags.woodRemoved ? [h("co-board", "Madera", 352, 344, 75, 60, () => {
              if (S().action === "use" && S().selectedItem === "hammer") {
                S().flags.woodRemoved = true; game.say("El martillo arrancó la madera."); game.render();
              } else game.respond({ interact: "¿Quién tapiaría esto? Debe tener algo atrás.", look: "Es una madera.", take: "No puedo sacarla con las manos.", use: "No sirve." });
            }, sprite("Madera.bmp"))] : []),
          exit("C1", 32, 560, "FlechaIzq1.bmp", "Volver al comedor"),
          h("co-oven", "Horno", 0, 216, 345, 393, msg({ interact: "Está caliente.", look: "Es un horno.", take: "No puedo llevar un horno.", use: "No puedo." })),
        ],
      },

      GA: {
        name: "Garaje",
        background: "GA.bmp",
        getHotspots: () => [
          exit("EI", 944, 560, "FlechaDer1.bmp", "Volver a la escalera"),
          exit("TA", 792, 272, "FlechaArriba1.bmp", "Ir al taller"),
          exit("REJ", 40, 568, "FlechaAbajo2.bmp", "Ir a la reja"),
          h("ga-bench", "Banco", 0, 216, 225, 201, msg({ interact: "No puedo descansar; quiero salir de este lugar.", look: "Es un banco de madera.", take: "Se ve bastante pesado.", use: "No puedo hacer eso." })),
          h("ga-oil", "Mancha de aceite", 352, 352, 337, 113, msg({ interact: "Acá hubo un vehículo estacionado mucho tiempo.", look: "Es una mancha de aceite bastante grande.", take: "No veo cómo llevarla.", use: "No puedo." })),
          h("ga-speaker", "Parlante vacío", 648, 216, 89, 129, msg({ interact: "Está vacío por dentro.", look: "Es un parlante.", take: "Es inútil.", use: "No puedo." })),
          h("ga-projector", "Proyector", 696, 64, 49, 33, msg({ interact: "Este lugar está vacío y lo poco que hay son porquerías.", look: "Parece una luz o algo así.", take: "¿Para qué quiero eso?", use: "No puedo hacer eso." })),
        ],
      },

      TA: {
        name: "Taller",
        background: "TA.bmp",
        getHotspots: () => [
          exit("GA", 8, 544, "FlechaIzq1.bmp", "Volver al garaje"),
          ...(available("hammer") ? [h("ta-hammer", "Martillo", 800, 144, 52, 106, () => {
            if (S().action === "use" && S().selectedItem === "screwdriver") game.pickup("hammer", { force: true, success: "Desatornillé el martillo y me lo guardé." });
            else game.respond({ interact: "Esto podría serme muy útil.", look: "Es un martillo.", take: "Está atornillado a la pared.", use: "No puedo hacer eso." });
          }, sprite("Martillo.bmp"))] : []),
          ...(available("handle") ? [h("ta-handle", "Manija", 144, 320, 64, 54,
            pickup("handle", { interact: "Voy a necesitar esto.", look: "Es la manija de una canilla.", use: "No veo por qué hacer eso." }), sprite("Manija.bmp"))] : []),
          h("ta-saint", "Cuadro del Gauchito Gil", 200, 216, 145, 145, msg({ interact: "¡JESÚS DEL CAMPO!", look: "Es un cuadro de Jesús con poncho.", take: "Está bueno, pero no tengo ganas de llevarlo.", use: "No puedo hacer eso." })),
          h("ta-rabbits", "Conejos", 584, 41, 209, 256, msg({ interact: "Están durmiendo... colgados y despellejados.", look: "Son unos conejos ‘durmiendo’.", take: "Realmente no quiero tocarlos.", use: "No puedo." })),
          h("ta-corn", "Bolsa de maíz", 472, 320, 89, 97, msg({ interact: "Cuánto maíz; el dueño debe tener muchos animales.", look: "Es una bolsa grande de maíz.", take: "Está bastante pesada.", use: "No puedo." })),
          h("ta-lime", "Marcas de cal", 392, 400, 321, 193, msg({ interact: "Este dibujo es perturbador.", look: "Son dos marcas de cal.", take: "No puedo llevarlas.", use: "No puedo." })),
        ],
      },

      REJ: {
        name: "Reja",
        background: () => S().flags.gateOpen ? "REJB.bmp" : "REJA.bmp",
        getHotspots: () => [
          exit("GA", 496, 552, "FlechaAbajo1.bmp", "Volver al garaje"),
          h("rej-lock", "Cerradura", S().flags.gateOpen ? 520 : 968, 280, 33, 57, door("PA", "gateKey", "gateOpen", {
            closed: "La reja está cerrada; debo encontrar la llave.",
            opened: "Uso la llave para abrir la reja.", openLook: "Pude abrir la reja.",
          })),
          ...(S().flags.gateOpen ? [exit("PA", 680, 408, "FlechaArriba2.bmp", "Salir al patio")] : []),
          ...(!S().flags.gateOpen && available("magnetThread") ? [
            h("rej-magnet", S().flags.threadUsedOnMagnet ? "Imán con hilo" : "Imán", 345, 272,
              S().flags.threadUsedOnMagnet ? 38 : 38, S().flags.threadUsedOnMagnet ? 98 : 37,
              () => {
                if (!S().flags.threadUsedOnMagnet && S().action === "use" && S().selectedItem === "thread") {
                  game.consumeItem("thread"); S().flags.threadUsedOnMagnet = true;
                  game.say("Até el hilo al imán."); game.render();
                } else if (S().flags.threadUsedOnMagnet && S().action === "take") {
                  game.pickup("magnetThread", { force: true, success: "Me guardé el imán con hilo." });
                } else game.respond({
                  interact: S().flags.threadUsedOnMagnet ? "Es como una caña de pescar magnética." : "Qué buen lugar para perder un imán.",
                  look: S().flags.threadUsedOnMagnet ? "Ahora el imán tiene un hilo atado." : "Es un imán.",
                  take: "Tengo el presentimiento de que así no me sirve.", use: "No puedo hacer eso.",
                });
              }, sprite(S().flags.threadUsedOnMagnet ? "ImanConHilo.bmp" : "Iman.bmp")),
          ] : []),
        ],
      },

      PA: {
        name: "Patio",
        background: "PA.bmp",
        getHotspots: () => [
          h("pa-grill", "Parrilla", 120, 184, 233, 201, () => S().action === "interact" ? game.changeScene("PR") : game.respond({ look: "Es una parrilla.", take: "No puedo llevarla.", use: "No puedo." })),
          h("pa-cage", "Jaula", 456, 288, 97, 57, () => {
            if (!S().flags.cageOpen && S().action === "use" && S().selectedItem === "cageKey") {
              S().flags.cageOpen = true;
              game.say("La llave encaja. Abrí la jaula.");
              game.render();
            } else game.respond({
              interact: S().flags.cageOpen ? "La jaula está abierta." : "La jaula está cerrada con llave.",
              look: S().flags.cageOpen ? "Dentro hay una llave dorada." : "Hay algo brillante dentro, pero no llego a alcanzarlo.",
              take: "No puedo llevarme la jaula.",
              use: S().flags.cageOpen ? "Ya está abierta." : "Necesito la llave correcta.",
            });
          }),
          ...(S().flags.cageOpen && available("goldenKey") ? [
            h("pa-golden-key", "Llave dorada", 477, 303, 55, 35,
              pickup("goldenKey", { interact: "La llave estaba escondida dentro de la jaula.", look: "Es una llave dorada.", use: "Primero debo recogerla." }))
          ] : []),
          h("pa-van", "Camioneta", 568, 248, 225, 89, () => {
            if (!S().flags.vanUnlocked && S().action === "use" && S().selectedItem === "vanKey") {
              S().flags.vanUnlocked = true;
              game.say("Abrí la camioneta con la llave del maletín.");
              game.render();
            } else if (S().flags.vanUnlocked && !S().flags.vanLiningCut && S().action === "use" && S().selectedItem === "knife") {
              S().flags.vanLiningCut = true;
              game.say("Corté el tapizado. Debajo apareció un compartimiento con teclado.");
              game.render();
            } else if (S().flags.vanLiningCut && !S().flags.vanCompartmentOpen && S().action === "interact") {
              game.requestCode("Compartimiento de la camioneta", "16180", "vanCompartmentOpen");
            } else game.respond({
              interact: !S().flags.vanUnlocked
                ? "La puerta está cerrada con llave."
                : S().flags.vanCompartmentOpen
                  ? "El compartimiento está abierto."
                  : S().flags.vanLiningCut
                    ? "El compartimiento pide un código de cinco cifras."
                    : "El tapizado parece ocultar algo.",
              look: !S().flags.vanUnlocked
                ? "La camioneta está volcada y cerrada."
                : S().flags.vanCompartmentOpen
                  ? "Dentro del compartimiento hay una llave."
                  : S().flags.vanLiningCut
                    ? "Encontré un teclado detrás del tapizado."
                    : "Hay una costura extraña en el tapizado.",
              take: "No puedo llevarme la camioneta.",
              use: !S().flags.vanUnlocked ? "Necesito la llave de la camioneta." : "Eso no sirve acá.",
            });
          }),
          ...(S().flags.vanCompartmentOpen && available("cageKey") ? [
            h("pa-cage-key", "Llave de la jaula", 658, 269, 54, 38,
              pickup("cageKey", { interact: "La llave estaba guardada en el compartimiento.", look: "Debe abrir alguna cerradura del patio.", use: "Primero debo recogerla." }))
          ] : []),
          h("pa-gate", "Portón", 816, 240, 113, 73, () => {
            if (S().action === "use" && S().selectedItem === "goldenKey") game.finishGame();
            else game.respond({
              interact: "Está cerrado con una antigua cerradura dorada.",
              look: "Es el portón de salida. Si lo abro, podré escapar.",
              take: "No puedo llevarme el portón.",
              use: "Necesito una llave que encaje en esta cerradura.",
            });
          }),
          h("pa-moon", "Luna", 784, 64, 41, 41, msg({ interact: "No hay luna llena ni nada raro.", look: "Es la Luna.", take: "Imposible.", use: "No puedo." })),
          exit("REJ", 680, 560, "FlechaAbajo1.bmp", "Volver a la reja"),
        ],
      },

      CA: placeholder("CA", "Camioneta", "PA.bmp", "PA", "La vista de la camioneta estaba declarada, pero quedó vacía en el código Delphi."),
      PR: {
        name: "Interior de la parrilla",
        background: "PR.bmp",
        getHotspots: () => [
          exit("PA", 944, 552, "FlechaAbajo1.bmp", "Volver al patio"),
          ...(!S().flags.screwdriverRecovered && available("screwdriver") ? [
            h("pr-screwdriver", "Destornillador atrapado", 382, 168, 275, 274, () => {
              if (S().action === "use" && S().selectedItem === "hook") {
                S().flags.screwdriverRecovered = true;
                game.pickup("screwdriver", { force: true, success: "Usé el gancho para sacar el destornillador de la parrilla." });
              } else game.respond({
                interact: "El destornillador cayó demasiado adentro.",
                look: "Hay un destornillador entre los hierros y las cenizas.",
                take: "No llego con la mano; necesito algo largo y curvo.",
                use: "Ese objeto no me permite alcanzarlo.",
              });
            })
          ] : [
            h("pr-empty", "Parrilla vacía", 382, 168, 275, 274,
              msg({ interact: "Ya saqué lo que había aquí.", look: "Sólo quedan cenizas.", take: "No hay nada más para recoger.", use: "No necesito hacer nada acá." }))
          ]),
        ],
      },
      PO: placeholder("PO", "Portón", "PA.bmp", "PA", "La vista del portón estaba declarada, pero quedó vacía en el código Delphi."),

      APU: {
        name: "Apuntes",
        background: "APU.bmp",
        getHotspots: () => [exit("PG2", 952, 560, "FlechaAbajo2.bmp", "Cerrar los apuntes")],
      },

      GAB: {
        name: "Gabinete de PC",
        background: "GAB.bmp",
        getHotspots: () => [
          h("gab-power", "Botón de encendido", 336, 424, 41, 49, () => {
            if (S().action === "interact") {
              S().flags.computerOn = !S().flags.computerOn;
              game.say(S().flags.computerOn ? "La computadora está encendida." : "La computadora está apagada.");
              game.render();
            } else game.respond({ look: S().flags.computerOn ? "La computadora está encendida." : "La computadora está apagada.", take: "No puedo llevarlo.", use: "No puedo." });
          }),
          h("gab-drive", "Botón de la lectora", 448, 96, 57, 17, msg({ interact: "No veo que la lectora se abra.", look: "Es el botón de la lectora.", take: "No voy a arrancarlo.", use: "No se puede." })),
          exit("PG1", 952, 560, "FlechaAbajo1.bmp", "Volver a la habitación"),
        ],
      },

      JAR: {
        name: "Interior del jarrón",
        background: "JAR.bmp",
        getHotspots: () => [
          exit("BS", 952, 560, "FlechaAbajo1.bmp", "Volver al baño"),
          h("jar-paper", "Papel con un código", 376, 272, 241, 161, msg({ interact: "Es un código binario, aunque esa R debe indicar algo más.", look: "Es un código; más vale descifrarlo.", take: "No lo voy a llevar; tengo buena memoria.", use: "No puedo hacer eso." })),
        ],
      },

      HUE: {
        name: "Hueco bajo la escalera",
        background: "HUE.bmp",
        getHotspots: () => [
          h("hue-symbol", "Símbolo de sangre", 160, 264, 473, 345, msg({ interact: "Al parecer este símbolo significa ‘QUATTORDICI’.", look: "Es un extraño símbolo pintado con sangre.", take: "No veo cómo podría llevarlo.", use: "No puedo hacer eso." })),
          exit("PI", 768, 568, "FlechaAbajo2.bmp", "Volver al pasillo"),
          ...(available("thread") ? [h("hue-thread", "Hilo", 776, 280, 95, 109,
            pickup("thread", { interact: "No es muy largo, pero debe servir para algo.", look: "Es un hilo.", use: "No puedo hacer eso." }), sprite("Hilo.bmp"))] : []),
        ],
      },

      DES: {
        name: "Interior del desagüe",
        background: "DES.bmp",
        getHotspots: () => [
          exit("BI", 880, 552, "FlechaAbajo1.bmp", "Volver al baño"),
          ...(available("diningKey") ? [h("des-key", "Llave del comedor", 528, 152, 77, 105, () => {
            if (S().action === "use" && S().selectedItem === "magnetThread") {
              game.pickup("diningKey", { force: true, success: "Saqué la llave usando el imán con hilo." });
            } else game.respond({ interact: "No llego a tocarla; mi mano no entra.", look: "Es una llave.", take: "No llego a alcanzarla.", use: "No puedo hacer eso." });
          }, sprite("LlaveComedor.bmp"))] : []),
        ],
      },

      HOJ: {
        name: "Hoja del comedor",
        background: () => S().flags.safeOpen && !S().flags.smallBoxOpen ? "HOJB.bmp" : "HOJa.bmp",
        getHotspots: () => [exit("C2", 952, 560, "FlechaAbajo1.bmp", "Volver al comedor")],
      },

      CJP: {
        name: "Interior de la caja pequeña",
        background: "CJP.bmp",
        getHotspots: () => [
          exit("C1", 880, 552, "FlechaAbajo1.bmp", "Volver al comedor"),
          ...(available("gateKey") ? [h("cjp-key", "Llave de la reja", 440, 272, 259, 96,
            pickup("gateKey", { interact: "Por fin sé qué guardaban con tanta seguridad.", look: "Es una llave.", use: "No puedo hacer eso." }), sprite("LlaveReja.bmp"))] : []),
        ],
      },

      MUE: {
        name: "Interior del mueble",
        background: "MUE.bmp",
        getHotspots: () => [
          exit("CO", 880, 552, "FlechaAbajo1.bmp", "Volver a la cocina"),
          h("mue-clock", "Reloj", 296, 304, 190, 189, msg({ interact: "No funciona; se detuvo a las tres y cuarto.", look: "Es un reloj de pared.", take: "No creo que vaya a necesitarlo.", use: "No necesita pilas; está parado nomás." }), sprite("Reloj.bmp")),
        ],
      },

      JAU: placeholder("JAU", "Interior de la jaula", "PA.bmp", "PA", "La vista de la jaula fue declarada, pero su procedimiento quedó completamente vacío."),
    };
  };
})();
