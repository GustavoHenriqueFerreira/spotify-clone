/* eslint-disable react-hooks/exhaustive-deps */
import './styles/App.scss';

// Utils
import i18next from 'i18next';
import { FC, Suspense, lazy, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { getFromLocalStorageWithExpiry } from './utils/localstorage';

// Components
import { ConfigProvider } from 'antd';
import { AppLayout } from './components/Layout';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import { uiActions } from './store/slices/ui';
import { PersistGate } from 'redux-persist/integration/react';
import { authActions, loginToSpotify } from './store/slices/auth';
import { persistor, store, useAppDispatch, useAppSelector } from './store/store';

// Spotify
import WebPlayback, { WebPlaybackProps } from './utils/spotify/webPlayback';

// Pages
import { playerService } from './services/player';
import { Spinner } from './components/spinner/spinner';

const Home = lazy(() => import('./pages/Home'));
const Page404 = lazy(() => import('./pages/404'));
const AlbumView = lazy(() => import('./pages/Album'));
const ArtistPage = lazy(() => import('./pages/Artist'));
const PlaylistView = lazy(() => import('./pages/Playlist'));

window.addEventListener('resize', () => {
  const vh = window.innerWidth;
  if (vh < 950) {
    store.dispatch(uiActions.collapseLibrary());
  }
});

const SpotifyContainer: FC<{ children: any }> = memo(({ children }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => !!state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const requesting = useAppSelector((state) => state.auth.requesting);

  useEffect(() => {
    const tokenInLocalStorage = getFromLocalStorageWithExpiry('access_token');
    dispatch(authActions.setToken({ token: tokenInLocalStorage }));

    if (tokenInLocalStorage) {
      dispatch(authActions.fetchUser());
    } else {
      dispatch(loginToSpotify(true));
    }
  }, [dispatch]);

  const webPlaybackSdkProps: WebPlaybackProps = useMemo(
    () => ({
      playerAutoConnect: true,
      playerInitialVolume: 1.0,
      playerRefreshRateMs: 1000,
      playerName: 'Spotify React Player',
      onPlayerRequestAccessToken: () => Promise.resolve(token!),
      onPlayerLoading: () => {},
      onPlayerWaitingForDevice: () => {
        dispatch(authActions.setPlayerLoaded({ playerLoaded: true }));
      },
      onPlayerError: (e) => {
        dispatch(loginToSpotify(false));
      },
      onPlayerDeviceSelected: () => {
        dispatch(authActions.setPlayerLoaded({ playerLoaded: true }));
      },
    }),
    [dispatch, token]
  );

  if (!user) return <Spinner loading={requesting}>{children}</Spinner>;

  return <WebPlayback {...webPlaybackSdkProps}>{children}</WebPlayback>;
});

const RoutesComponent = memo(() => {
  const location = useLocation();
  const container = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => !!state.auth.user);

  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = 0;
    }
  }, [location, container]);

  const routes = useMemo(
    () =>
      [
        { path: '', element: <Home container={container} />, public: true },
        {
          public: true,
          path: '/playlist/:playlistId',
          element: <PlaylistView container={container} />,
        },
        { path: '/album/:albumId', element: <AlbumView container={container} /> },
        { public: true, path: '/artist/:artistId', element: <ArtistPage container={container} /> },
        { path: '*', element: <Page404 /> },
      ].filter((r) => (user ? true : r.public)),
    [container, user]
  );

  return (
    <div
      className='Main-section'
      ref={container}
      style={{
        height: user ? undefined : `calc(100vh - 50px)`,
      }}
    >
      <div
        style={{
          minHeight: user ? 'calc(100vh - 230px)' : 'calc(100vh - 100px)',
          width: '100%',
        }}
      >
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<Suspense>{route.element}</Suspense>}
            >
              {/* {route?.children
                ? route.children.map((child) => (
                    <Route
                      key={child.path}
                      path={child.path}
                      element={<Suspense>{child.element}</Suspense>}
                    />
                  ))
                : undefined} */}
            </Route>
          ))}
        </Routes>
      </div>
    </div>
  );
});

const RootComponent = () => {
  const user = useAppSelector((state) => !!state.auth.user);
  const language = useAppSelector((state) => state.language.language);
  const playing = useAppSelector((state) => !state.spotify.state?.paused);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    i18next.changeLanguage(language);
  }, [language]);

  const handleSpaceBar = useCallback(
    (e: KeyboardEvent) => {
      // @ts-ignore
      if (e.target?.tagName?.toUpperCase() === 'INPUT') return;
      if (playing === undefined) return;
      e.stopPropagation();
      if (e.key === ' ' || e.code === 'Space' || e.keyCode === 32) {
        e.preventDefault();
        const request = !playing ? playerService.startPlayback() : playerService.pausePlayback();
        request.then().catch(() => {});
      }
    },
    [playing]
  );

  useEffect(() => {
    if (!user) return;
    document.addEventListener('keydown', handleSpaceBar);
    return () => {
      document.removeEventListener('keydown', handleSpaceBar);
    };
  }, [user, handleSpaceBar]);

  useEffect(() => {
    if (!user) return;
    const handleContextMenu = (e: any) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('keydown', handleContextMenu);
    };
  }, [user]);

  return (
    <Router>
      <AppLayout>
        <RoutesComponent />
      </AppLayout>
    </Router>
  );
};

function App() {
  return (
    <ConfigProvider theme={{ token: { fontFamily: 'SpotifyMixUI' } }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SpotifyContainer>
            <RootComponent />
          </SpotifyContainer>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
