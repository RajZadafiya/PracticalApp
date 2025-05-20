/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * @format
 */
import React from 'react';
import { Platform } from 'react-native';

import Tts from 'react-native-tts';

Platform.OS == 'android' && Tts.setDefaultRate(1);

const useTtsPlayer = () => {
  const [playing, setPlaying] = React.useState<string>('');

  React.useEffect(() => {
    Tts.addListener('tts-start', utterenceId => {
      // console.log('utterenceId: ', utterenceId);
      if (utterenceId === -1) {
      }
    });
    Tts.addListener('tts-finish', () => {
      setPlaying('');
    });
    Tts.addListener('tts-cancel', () => {
      console.log('tts-cancel: ');
      setPlaying('');
    });
    // Tts.addListener('tts-progress', progress => {
    //   console.log('tts-progress: ', progress);
    // });

    // return () => {
    //   (!__DEV__ && Tts?.removeAllListeners?.()) ?? '';
    // };
  }, []);

  const tryPlayText = async (
    text: string,
    language_code: string,
  ) => {
    if (playing === text) {
      console.log('text: ==== ==== ==== ==== ====');
      tryStop();
      // Tts.stop();
    } else {
      setPlaying(text.trim())
      await Tts.stop();
      await Tts.voices()
        .then(async voices => {
          const availableLang = voices.reduce(
            (a, v) => {
              console.log('v: ', v);
              if (
                (v.language === language_code &&
                  language_code !== 'en-US') ||
                (v.language === language_code &&
                  language_code === 'en-US' &&
                  a.id !== 'com.apple.voice.compact.en-US.Samantha')
              ) {
                a = v;
              }
              return a;
            },
            {
              id: 'com.apple.voice.compact.en-US.Samantha',
              language: 'en-US',
              name: 'Samantha',
              quality: 300,
              latency: 1,
              networkConnectionRequired: false,
              notInstalled: false
            },
          );
          console.log('availableLang: ', availableLang);
          setPlaying(text.trim());

          await Tts.speak(text.trim(), {
            iosVoiceId: availableLang.id.toString(),
            rate: 0.5,
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 0.8,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          });
          setPlaying(text);
        })
        .catch(error => {
          console.log('error: ', error);
          setPlaying('');
        });
    }
  }

  const tryStop = () => {
    // console.log('stopping as playing same');
    Tts.stop();
    setPlaying('');
  };

  return {
    tryPlayText,
    tryStop,
  };
};

export { useTtsPlayer };
