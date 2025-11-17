export interface Device {
  /**
   * @description ID do dispositivo. Este ID é único e permanece estável até certo ponto.
   * No entanto, isso não é garantido, portanto qualquer device_id armazenado em cache
   * deve ser limpo periodicamente e obtido novamente quando necessário.
   */
  id: string;

  /**
   * @description Indica se este dispositivo é o dispositivo atualmente ativo.
   */
  is_active: boolean;

  /**
   * @description Indica se o dispositivo está atualmente em uma sessão privada.
   * @default false
   */
  is_private_session: boolean;

  /**
   * @description Indica se o controle deste dispositivo é restrito.
   * Se for “true”, nenhum comando da Web API será aceito por este dispositivo.
   * @default false
   */
  is_restricted: boolean;

  /**
   * @description Nome legível pelo usuário. Alguns dispositivos possuem nomes
   * configuráveis (ex.: "Caixa de som da sala") e outros possuem nomes genéricos
   * definidos pelo fabricante ou modelo do dispositivo.
   */
  name: string;

  /**
   * @description Tipo do dispositivo, como “Computer”, “Smartphone” ou “Speaker”.
   */
  type: 'Computer' | 'Smartphone' | 'Speaker';

  /**
   * @description Volume atual em porcentagem. Pode ser nulo.
   */
  volume_percent: number | null;

  /**
   * @description Indica se este dispositivo permite ajuste de volume.
   */
  supports_volume: boolean;
}
