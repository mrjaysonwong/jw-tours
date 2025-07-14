// third-party imports
import React, { useState, useEffect, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import { Select, MenuItem } from '@mui/material';
import { useLocale } from 'next-intl';

// internal imports
import { useRouter, usePathname } from '@/navigation';
import { LOCALE_MAP } from '@/constants/localeMap';

const LocaleSwitcher = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [defaultLocale, setDefaultLocale] = useState(locale);

  const [isPending, startTransition] = useTransition();

  const [cookies] = useCookies();
  const userLangCode = session?.user?.langCode;

  const handleChange = (e) => {
    const langCode = e.target.value;
    router.replace(pathname, { locale: langCode });
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setDefaultLocale(cookies['NEXT_LOCALE']);

      if (userLangCode !== locale) {
        router.replace(pathname, { locale: userLangCode });
      }
    }
  }, [locale, status, pathname, cookies, userLangCode, router]);

  return (
    <>
      {!session ? (
        <Select
          disabled={isPending}
          value={defaultLocale}
          onChange={handleChange}
          inputProps={{
            'aria-label': 'select-language',
            name: 'select-language',
          }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
          <MenuItem value="it">Italiano</MenuItem>
          <MenuItem value="ja">日本語</MenuItem>
          <MenuItem value="ko">한국인</MenuItem>
          <MenuItem value="zh">中国人</MenuItem>
        </Select>
      ) : (
        <Link href="/mysettings/preferences">
          <Select
            value={defaultLocale}
            inputProps={{
              'aria-label': 'session language',
              name: 'session-language',
            }}
            sx={{
              pointerEvents: 'none',
              cursor: 'pointer',
            }}
          >
            <MenuItem value={defaultLocale}>
              {LOCALE_MAP[defaultLocale]}
            </MenuItem>
          </Select>
        </Link>
      )}
    </>
  );
};

export default LocaleSwitcher;
