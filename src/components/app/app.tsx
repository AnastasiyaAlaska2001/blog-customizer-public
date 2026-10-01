import { defaultArticleState, type ArticleStateType } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [confirmedData, setConfirmed] = useState<ArticleStateType>(defaultArticleState);

  const handleConfirm = (formData: ArticleStateType): void => {
    setConfirmed(formData);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': confirmedData.fontFamilyOption.value,
          '--font-size': confirmedData.fontSizeOption.value,
          '--font-color': confirmedData.fontColor.value,
          '--container-width': confirmedData.contentWidth.value,
          '--bg-color': confirmedData.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        onReset={() => setConfirmed(defaultArticleState)}
        onConfirm={handleConfirm}
      />
      <Article />
    </main>
  );
};
