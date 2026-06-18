/**
 * LÓGICA DE ALTERNANCIA DEL ROSARIO EN GRUPO
 *
 * Define cómo se divide cada oración entre el líder y el grupo.
 * Tipos de participación:
 *   'todos'  → todos rezan juntos (líder guía, todos repiten)
 *   'lider'  → solo habla el líder
 *   'grupo'  → solo responde el grupo
 *   'silencio' → pausa meditativa (para misterios)
 */

export const PARTICIPACION = {
  TODOS: 'todos',
  LIDER: 'lider',
  GRUPO: 'grupo',
  SILENCIO: 'silencio',
};

/**
 * Para cada tipo de paso del rosario, devuelve la configuración grupal:
 *  - participacion: quién habla
 *  - textoLider: texto que dice el líder (puede ser null)
 *  - textoGrupo: texto que responde el grupo (puede ser null)
 *  - etiquetaLider: etiqueta de UI para el líder
 *  - etiquetaGrupo: etiqueta de UI para el grupo
 */
export function getConfigGrupo(step) {
  switch (step.type) {
    case 'senial_cruz':
      return {
        participacion: PARTICIPACION.TODOS,
        textoLider: step.oracion.texto,
        textoGrupo: null,
        etiquetaLider: 'TODOS REZAN JUNTOS',
        etiquetaGrupo: null,
        descripcion: 'El líder guía. Todos rezan a la vez.',
      };

    case 'credo':
      return {
        participacion: PARTICIPACION.TODOS,
        textoLider: step.oracion.texto,
        textoGrupo: null,
        etiquetaLider: 'TODOS REZAN JUNTOS',
        etiquetaGrupo: null,
        descripcion: 'El líder guía. Todos rezan a la vez.',
      };

    case 'padrenuestro':
      return {
        participacion: PARTICIPACION.TODOS,
        textoLider: step.oracion.texto,
        textoGrupo: null,
        etiquetaLider: 'TODOS REZAN JUNTOS',
        etiquetaGrupo: null,
        descripcion: 'El líder guía. Todos rezan a la vez.',
      };

    case 'avemaria':
      return {
        participacion: PARTICIPACION.LIDER, // líder inicia, grupo responde
        textoLider: step.oracion.lider,
        textoGrupo: step.oracion.grupo,
        etiquetaLider: 'TÚ DICES',
        etiquetaGrupo: 'EL GRUPO RESPONDE',
        descripcion: 'Tú dices la primera parte. El grupo responde.',
        // Para participantes:
        etiquetaParticipanteLider: 'EL LÍDER DICE',
        etiquetaParticipanteGrupo: 'TÚ RESPONDES',
      };

    case 'gloria':
      return {
        participacion: PARTICIPACION.TODOS,
        textoLider: step.oracion.texto,
        textoGrupo: null,
        etiquetaLider: 'TODOS REZAN JUNTOS',
        etiquetaGrupo: null,
        descripcion: 'Todos rezan el Gloria juntos.',
      };

    case 'fatima':
      return {
        participacion: PARTICIPACION.TODOS,
        textoLider: step.oracion.texto,
        textoGrupo: null,
        etiquetaLider: 'TODOS REZAN JUNTOS',
        etiquetaGrupo: null,
        descripcion: 'Todos rezan la oración de Fátima juntos.',
      };

    case 'salve':
      return {
        participacion: PARTICIPACION.TODOS,
        textoLider: step.oracion.texto,
        textoGrupo: null,
        etiquetaLider: 'TODOS REZAN JUNTOS',
        etiquetaGrupo: null,
        descripcion: 'Todos rezan la Salve juntos para cerrar.',
      };

    case 'misterio_anuncio':
      return {
        participacion: PARTICIPACION.SILENCIO,
        textoLider: null,
        textoGrupo: null,
        etiquetaLider: null,
        etiquetaGrupo: null,
        descripcion: 'El líder anuncia el misterio. Todos meditan.',
      };

    default:
      return {
        participacion: PARTICIPACION.TODOS,
        textoLider: step.oracion?.texto || '',
        textoGrupo: null,
        etiquetaLider: 'TODOS',
        etiquetaGrupo: null,
        descripcion: '',
      };
  }
}

/**
 * Genera un código de sala de 4 dígitos para sincronización (V2)
 */
export function generarCodigoSala() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
