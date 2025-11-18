/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, FC, memo, useCallback } from 'react';
import { useAppDispatch } from '../../store/store';
import { spotifyActions } from '../../store/slices/spotify';
import { playerService } from '../../services/player';

export interface WebPlaybackProps {
  onPlayerError: (message: string) => void;
  onPlayerRequestAccessToken: () => Promise<string>;
  onPlayerLoading: () => void;
  onPlayerWaitingForDevice: (data: any) => void;
  onPlayerDeviceSelected: () => void;
  playerName: string;
  playerInitialVolume: number;
  playerRefreshRateMs?: number;
  playerAutoConnect?: boolean;
  children?: any;
}

const WebPlayback: FC<WebPlaybackProps> = memo((props) => {
  const dispatch = useAppDispatch();

  const { playerName, playerInitialVolume } = props;
  const { playerRefreshRateMs, playerAutoConnect, children } = props;
  const { onPlayerWaitingForDevice, onPlayerDeviceSelected } = props;
  const { onPlayerError, onPlayerLoading, onPlayerRequestAccessToken } = props;

  const webPlaybackInstance = useRef<Spotify.Player | null>(null);
  const statePollingInterval = useRef<NodeJS.Timeout | null>(null);
  const deviceSelectedInterval = useRef<NodeJS.Timeout | null>(null);

  const handleState = async (state: any | null) => {
    if (state) {
      dispatch(spotifyActions.setState({ state }));
    }
  };

  const waitForSpotify = useCallback(() => {
    return new Promise<void>((resolve) => {
      if ('Spotify' in window) resolve();
      else {
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => resolve();
      }
    });
  }, []);

  const waitForDeviceToBeSelectedOnce = () => {
    return new Promise((resolve) => {
      deviceSelectedInterval.current = setInterval(() => {
        if (webPlaybackInstance.current) {
          webPlaybackInstance.current.getCurrentState().then((state) => {
            if (state !== null) {
              clearInterval(deviceSelectedInterval.current!);
              resolve(state);
            }
          });
        }
      }, 300);
    });
  };

  const startStatePolling = useCallback(() => {
    statePollingInterval.current = setInterval(async () => {
      const state = await webPlaybackInstance.current!.getCurrentState();
      await handleState(state);
    }, playerRefreshRateMs || 1000);
  }, [playerRefreshRateMs]);

  const clearStatePolling = useCallback(() => {
    if (statePollingInterval.current)
      clearInterval(statePollingInterval.current);
  }, []);

  const setupWebPlaybackEvents = useCallback(async () => {
    let { Player } = window.Spotify;

    webPlaybackInstance.current = new Player({
      name: playerName,
      enableMediaSession: true,
      volume: playerInitialVolume,
      getOAuthToken: async (callback) => {
        const userAccessToken = await onPlayerRequestAccessToken();
        callback(userAccessToken);
      },
    });

    webPlaybackInstance.current.on('initialization_error', (e) => {
      onPlayerError(e.message);
    });

    webPlaybackInstance.current.on('authentication_error', (e) => {
      onPlayerError(e.message);
    });

    webPlaybackInstance.current.on('account_error', (e) => {
      onPlayerError(e.message);
    });

    webPlaybackInstance.current.on('playback_error', (e) => {
      onPlayerError(e.message);
    });

    webPlaybackInstance.current.on('player_state_changed', async (state) => {
      await handleState(state);
    });

    webPlaybackInstance.current.on('ready', async (data) => {
      dispatch(spotifyActions.setDeviceId({ deviceId: data.device_id }));
      dispatch(spotifyActions.setActiveDevice({ activeDevice: data.device_id }));
      await playerService.transferPlayback(data.device_id);
    });

    if (playerAutoConnect) {
      webPlaybackInstance.current.connect();
      dispatch(spotifyActions.setPlayer({ player: webPlaybackInstance.current }));
    }
  }, [
    playerName,
    playerInitialVolume,
    playerAutoConnect,
    onPlayerRequestAccessToken,
    onPlayerError,
    dispatch,
  ]);

  const setupWaitingForDevice = useCallback(() => {
    return new Promise((resolve) => {
      webPlaybackInstance.current!.on('ready', (data) => {
        resolve(data);
      });
    });
  }, []);

  useEffect(() => {
    const initializePlayer = async () => {
      onPlayerLoading();
      await waitForSpotify();
      await setupWebPlaybackEvents();

      const deviceData = await setupWaitingForDevice();
      onPlayerWaitingForDevice(deviceData);

      await waitForDeviceToBeSelectedOnce();
      onPlayerDeviceSelected();

      startStatePolling();
    };

    initializePlayer();

    return () => {
      clearStatePolling();
      if (deviceSelectedInterval.current)
        clearInterval(deviceSelectedInterval.current);
      webPlaybackInstance.current?.disconnect();
    };
  }, []);

  return <>{children}</>;
});

export default WebPlayback;