export const ORACIONES = {
  senialCruz: {
    id: 'senial_cruz',
    nombre: 'Señal de la Cruz',
    texto: 'En el nombre del Padre,\ny del Hijo,\ny del Espíritu Santo.\nAmén.',
    tip: 'Persígnate mientras rezas',
  },
  credo: {
    id: 'credo',
    nombre: 'Credo Apostólico',
    texto:
      'Creo en Dios, Padre todopoderoso,\nCreador del cielo y de la tierra.\nCreo en Jesucristo, su único Hijo, nuestro Señor,\nque fue concebido por obra y gracia\ndel Espíritu Santo,\nnació de Santa María Virgen,\npadeció bajo el poder de Poncio Pilato,\nfue crucificado, muerto y sepultado,\ndescendió a los infiernos,\nal tercer día resucitó de entre los muertos,\nsubió a los cielos\ny está sentado a la derecha de Dios,\nPadre todopoderoso.\nDesde allí ha de venir a juzgar\na vivos y muertos.\nCreo en el Espíritu Santo,\nla santa Iglesia católica,\nla comunión de los santos,\nel perdón de los pecados,\nla resurrección de la carne\ny la vida eterna.\nAmén.',
  },
  padrenuestro: {
    id: 'padrenuestro',
    nombre: 'Padre Nuestro',
    texto:
      'Padre nuestro, que estás en el cielo,\nsantificado sea tu nombre;\nvenga a nosotros tu reino;\nhágase tu voluntad\nen la tierra como en el cielo.\nDanos hoy nuestro pan de cada día;\nperdona nuestras ofensas,\ncomo también nosotros perdonamos\na los que nos ofenden;\nno nos dejes caer en la tentación,\ny líbranos del mal.\nAmén.',
  },
  avemaria: {
    id: 'avemaria',
    nombre: 'Ave María',
    lider: 'Dios te salve, María,\nllena eres de gracia,\nel Señor es contigo;\nbendita tú eres\nentre todas las mujeres,\ny bendito es el fruto\nde tu vientre, Jesús.',
    grupo: 'Santa María, Madre de Dios,\nruega por nosotros, pecadores,\nahora y en la hora\nde nuestra muerte.\nAmén.',
    texto:
      'Dios te salve, María,\nllena eres de gracia,\nel Señor es contigo;\nbendita tú eres\nentre todas las mujeres,\ny bendito es el fruto\nde tu vientre, Jesús.\nSanta María, Madre de Dios,\nruega por nosotros, pecadores,\nahora y en la hora\nde nuestra muerte.\nAmén.',
  },
  gloria: {
    id: 'gloria',
    nombre: 'Gloria',
    texto:
      'Gloria al Padre,\ny al Hijo,\ny al Espíritu Santo.\nComo era en el principio,\nahora y siempre,\ny por los siglos de los siglos.\nAmén.',
  },
  fatima: {
    id: 'fatima',
    nombre: 'Oración de Fátima',
    texto:
      'Oh Jesús mío,\nperdona nuestros pecados,\nlíbranos del fuego del infierno,\nlleva al cielo a todas las almas,\nespecialmente a las más necesitadas\nde tu misericordia.\nAmén.',
  },
  salve: {
    id: 'salve',
    nombre: 'Salve Regina',
    texto:
      'Dios te salve, Reina y Madre\nde misericordia,\nvida, dulzura y esperanza nuestra,\nDios te salve.\nA ti llamamos los desterrados hijos de Eva.\nA ti suspiramos gimiendo y llorando\nen este valle de lágrimas.\nEa, pues, Señora, abogada nuestra,\nvuelve a nosotros esos tus ojos misericordiosos.\nY después de este destierro,\muéstranos a Jesús,\nfruto bendito de tu vientre.\nOh clementísima, oh piadosa,\noh dulce Virgen María.\nAmén.',
  },
};

export const MISTERIOS = {
  gozosos: {
    id: 'gozosos',
    nombre: 'Gozosos',
    color: '#4A7C8E',
    emoji: '✨',
    descripcion: 'Meditamos la alegría de la Encarnación y la infancia de Jesús',
    lista: [
      { numero: 1, nombre: 'La Anunciación', meditacion: 'El Ángel Gabriel anuncia a María que será Madre de Dios.' },
      { numero: 2, nombre: 'La Visitación', meditacion: 'María visita a su prima Isabel, quien lleva a Juan Bautista en su vientre.' },
      { numero: 3, nombre: 'El Nacimiento de Jesús', meditacion: 'Jesús nace en Belén, en un pesebre humilde.' },
      { numero: 4, nombre: 'La Presentación en el Templo', meditacion: 'María y José presentan al Niño Jesús en el Templo de Jerusalén.' },
      { numero: 5, nombre: 'El Niño Jesús en el Templo', meditacion: 'El Niño Jesús es encontrado en el Templo enseñando a los doctores.' },
    ],
  },
  luminosos: {
    id: 'luminosos',
    nombre: 'Luminosos',
    color: '#8E7A4A',
    emoji: '☀️',
    descripcion: 'Meditamos la vida pública de Jesús, luz del mundo',
    lista: [
      { numero: 1, nombre: 'El Bautismo de Jesús', meditacion: 'Jesús es bautizado en el Jordán y el Padre lo proclama su Hijo amado.' },
      { numero: 2, nombre: 'Las Bodas de Caná', meditacion: 'Jesús realiza su primer milagro convirtiendo el agua en vino.' },
      { numero: 3, nombre: 'El Anuncio del Reino', meditacion: 'Jesús proclama el Reino de Dios y llama a la conversión.' },
      { numero: 4, nombre: 'La Transfiguración', meditacion: 'Jesús se transfigura en el monte Tabor ante Pedro, Santiago y Juan.' },
      { numero: 5, nombre: 'La Institución de la Eucaristía', meditacion: 'En la Última Cena, Jesús instituye la Eucaristía.' },
    ],
  },
  dolorosos: {
    id: 'dolorosos',
    nombre: 'Dolorosos',
    color: '#6E3A3A',
    emoji: '🙏',
    descripcion: 'Meditamos la Pasión y muerte de Jesús por nuestra salvación',
    lista: [
      { numero: 1, nombre: 'La Oración en el Huerto', meditacion: 'Jesús ora en el Huerto de Getsemaní y acepta la voluntad del Padre.' },
      { numero: 2, nombre: 'La Flagelación', meditacion: 'Jesús es azotado cruelmente por los soldados romanos.' },
      { numero: 3, nombre: 'La Coronación de Espinas', meditacion: 'Los soldados coronan a Jesús con espinas burlándose de Él.' },
      { numero: 4, nombre: 'Camino al Calvario', meditacion: 'Jesús carga la Cruz hacia el Calvario entre el dolor y el desprecio.' },
      { numero: 5, nombre: 'La Crucifixión', meditacion: 'Jesús muere crucificado en el Calvario por amor a nosotros.' },
    ],
  },
  gloriosos: {
    id: 'gloriosos',
    nombre: 'Gloriosos',
    color: '#4A6E4A',
    emoji: '👑',
    descripcion: 'Meditamos la victoria de Jesús y la gloria de María',
    lista: [
      { numero: 1, nombre: 'La Resurrección', meditacion: 'Jesús resucita al tercer día, venciendo la muerte.' },
      { numero: 2, nombre: 'La Ascensión', meditacion: 'Jesús sube al cielo ante sus discípulos.' },
      { numero: 3, nombre: 'Pentecostés', meditacion: 'El Espíritu Santo desciende sobre María y los apóstoles.' },
      { numero: 4, nombre: 'La Asunción de María', meditacion: 'María es llevada en cuerpo y alma al cielo.' },
      { numero: 5, nombre: 'La Coronación de María', meditacion: 'María es coronada Reina del cielo y de la tierra.' },
    ],
  },
};

const DIA_A_MISTERIO = {
  0: 'gloriosos',   // Domingo
  1: 'gozosos',     // Lunes
  2: 'dolorosos',   // Martes
  3: 'gloriosos',   // Miércoles
  4: 'luminosos',   // Jueves
  5: 'dolorosos',   // Viernes
  6: 'gozosos',     // Sábado
};

export function getMisterioDelDia() {
  const dia = new Date().getDay();
  return MISTERIOS[DIA_A_MISTERIO[dia]];
}

export function getDiaNombre() {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return dias[new Date().getDay()];
}

// Construye la secuencia completa de pasos del rosario
export function buildRosarioSteps(misterio) {
  const steps = [];

  // Apertura
  steps.push({ type: 'senial_cruz', oracion: ORACIONES.senialCruz });
  steps.push({ type: 'credo', oracion: ORACIONES.credo });
  steps.push({ type: 'padrenuestro', oracion: ORACIONES.padrenuestro, context: 'Introducción' });
  steps.push({ type: 'avemaria', oracion: ORACIONES.avemaria, repeticion: 1, de: 3, context: 'Por la Fe' });
  steps.push({ type: 'avemaria', oracion: ORACIONES.avemaria, repeticion: 2, de: 3, context: 'Por la Esperanza' });
  steps.push({ type: 'avemaria', oracion: ORACIONES.avemaria, repeticion: 3, de: 3, context: 'Por la Caridad' });
  steps.push({ type: 'gloria', oracion: ORACIONES.gloria });

  // 5 décadas
  misterio.lista.forEach((misterioItem, idx) => {
    steps.push({
      type: 'misterio_anuncio',
      numero: idx + 1,
      misterio: misterioItem,
      tipoMisterio: misterio.nombre,
    });
    steps.push({
      type: 'padrenuestro',
      oracion: ORACIONES.padrenuestro,
      context: `Misterio ${idx + 1}: ${misterioItem.nombre}`,
    });
    for (let i = 1; i <= 10; i++) {
      steps.push({
        type: 'avemaria',
        oracion: ORACIONES.avemaria,
        repeticion: i,
        de: 10,
        misterio: misterioItem,
        decada: idx + 1,
      });
    }
    steps.push({ type: 'gloria', oracion: ORACIONES.gloria });
    steps.push({ type: 'fatima', oracion: ORACIONES.fatima });
  });

  // Cierre
  steps.push({ type: 'salve', oracion: ORACIONES.salve });
  steps.push({ type: 'fin' });

  return steps;
}
