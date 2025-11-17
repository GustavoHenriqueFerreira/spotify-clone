import type { Track } from './track';
import type { Device } from './devices';

export interface SpotifyPlaybackState {
  /**
   * @description O dispositivo que está atualmente ativo.
   */
  device: Device;

  /**
   * @description Indica se o modo aleatório (shuffle) está ativado ou desativado.
   */
  shuffle_state: boolean;

  /**
   * @description Indica se o Smart Shuffle está ativado.
   */
  smart_shuffle: boolean;

  /**
   * @description O estado de repetição.
   */
  repeat_state: 'context' | 'off' | 'track';

  /**
   * @description Timestamp Unix em milissegundos indicando quando o estado de reprodução foi alterado pela última vez (play, pause, pular, scrub, nova música, etc.).
   */
  timestamp: number;

  /**
   * @description Um objeto de contexto. Pode ser null.
   */
  context: {
    /**
     * @description URLs externas conhecidas para este contexto.
     */
    external_urls: {
      spotify: string;
    };

    /**
     * @description Link para o endpoint da Web API com detalhes completos do contexto.
     */
    href: string;

    /**
     * @description O tipo do objeto, por exemplo: "artist", "playlist", "album", "show".
     */
    type: 'playlist' | 'album' | 'artist' | 'show';

    /**
     * @description O URI do Spotify para este contexto.
     */
    uri: string;
  } | null;

  /**
   * @description Progresso (em ms) da faixa ou episódio que está tocando. Pode ser null.
   */
  progress_ms: number | null;

  /**
   * @description A faixa ou episódio que está atualmente tocando. Pode ser null.
   */
  item: Track | null;

  /**
   * @description Indica se algo está sendo reproduzido no momento.
   */
  is_playing: boolean;
}
