import { defaultArticleState, type OptionType } from '@/constants/articleProps.ts';
import { selectNames } from '@/constants/selectName';
import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [confirmedData, setConfirmed] = useState<Record<string, OptionType> | null>(
    null
  );

  const handleConfirm = (formData: Record<string, OptionType> | null): void => {
    setConfirmed(formData);
  };

  const getStyles = (
    confirmedData: Record<string, OptionType> | null
  ): CSSProperties => {
    const getValue = (key: string): string =>
      confirmedData?.[key]?.value ??
      defaultArticleState[key as keyof typeof defaultArticleState]?.value;

    return {
      '--font-family': getValue(selectNames.font),
      '--font-size': getValue(selectNames.fontSize),
      '--font-color': getValue(selectNames.fontColor),
      '--container-width': getValue(selectNames.contentWidth),
      '--bg-color': getValue(selectNames.backgroundColor),
    } as React.CSSProperties;
  };

  return (
    <main className={clsx(styles.main)} style={getStyles(confirmedData)}>
      <ArticleParamsForm onConfirm={handleConfirm} />
      <Article />
    </main>
  );
};
