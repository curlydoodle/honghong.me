import { useMantineTheme } from '@mantine/core';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

import Link from '@/components/Link';
import { NowPlayingSong } from '@/components/NowPlaying/types';

import useStyles from './NowPlaying.styles';

export default function NowPlaying() {
  const { classes } = useStyles();
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher);
  const { colorScheme } = useMantineTheme();
  const dark = colorScheme === 'dark';

  return (
    <div className={classes.wrapper}>
      <div className={classes.iconWrapper}>
        <svg
          stroke='currentColor'
          fill='#1ed760'
          strokeWidth='0'
          viewBox='0 0 496 512'
          height='20'
          width='20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z'></path>
        </svg>
      </div>
      <div className={classes.dataWrapper}>
        <p>
          {data?.isPlaying ? (
            <Link
              href={data.songUrl}
              sx={{
                fontSize: 12,
                color: dark ? 'white' : 'black',
              }}
              noIcon
            >
              {data.title}
            </Link>
          ) : (
            'Not Listening'
          )}
        </p>
        <span>{' - '}</span>
        <p>{data?.isPlaying ? data.artist : 'Spotify'}</p>
      </div>
    </div>
  );
}
