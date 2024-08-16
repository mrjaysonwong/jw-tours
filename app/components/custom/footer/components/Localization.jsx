import React, { useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from '@/navigation';
import { Select, MenuItem } from '@mui/material';
import { useLocale } from 'next-intl';
import { UserSessionContext } from '@/context/UserSessionWrapper';

export default function Localization() {
  const router = useRouter();
  const pathname = usePathname();

  const locale = useLocale();

  const [newLocale, setNewLocale] = useState(locale);

  const session = useContext(UserSessionContext);

  const handleChange = (e) => {
    const languageCountry = e.target.value;
    setNewLocale(languageCountry);
    router.replace(pathname, { locale: languageCountry });
  };

  useEffect(() => {
    if (session && !pathname.includes('preferences')) {
      if (session.user.lang !== locale) {
        router.replace(pathname, { locale: session.user.lang });
      }
    }
  }, [session, router, pathname, locale]);

  return (
    <>
      <Select
        disabled={!!session}
        value={newLocale}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'select-language' }}
        sx={{ height: '2rem' }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="fr">Français</MenuItem>
        <MenuItem value="it">Italiano</MenuItem>
        <MenuItem value="ja">日本語</MenuItem>
        <MenuItem value="ko">한국인</MenuItem>
        <MenuItem value="zh">中国人</MenuItem>
      </Select>
    </>
  );
}
