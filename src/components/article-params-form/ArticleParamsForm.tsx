import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
  type OptionType,
} from '@/constants/articleProps';
import { selectNames } from '@/constants/selectName';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
  onConfirm,
  onReset,
}: {
  onReset: () => void;
  onConfirm: (formData: ArticleStateType) => void;
}): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<ArticleStateType>(defaultArticleState);
  const asideRef = useRef<HTMLElement>(null);
  useOutsideClick(asideRef, () => setIsOpen(false));

  const handleChange =
    (key: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormData((prev) => ({ ...prev, [key]: option }));
    };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onConfirm(formData);
    setIsOpen(false);
  };

  const handleReset = (): void => {
    onReset();
    setFormData(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />

      <aside
        ref={asideRef}
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <Text size={31} weight={800} as="h2">
            Задайте параметры
          </Text>

          <Select
            onChange={handleChange('fontFamilyOption')}
            title={selectNames.font}
            selected={formData.fontFamilyOption}
            options={fontFamilyOptions}
          />
          <RadioGroup
            name="fontSizeGroup"
            onChange={handleChange('fontSizeOption')}
            selected={formData.fontSizeOption}
            title={selectNames.fontSize}
            options={fontSizeOptions}
          />
          <Select
            onChange={handleChange('fontColor')}
            title={selectNames.fontColor}
            selected={formData.fontColor}
            options={fontColors}
          />
          <Separator />
          <Select
            onChange={handleChange('backgroundColor')}
            title={selectNames.backgroundColor}
            selected={formData.backgroundColor}
            options={backgroundColors}
          />
          <Select
            onChange={handleChange('contentWidth')}
            title={selectNames.contentWidth}
            selected={formData.contentWidth}
            options={contentWidthArr}
          />

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="reset"
              type="clear"
              onClick={handleReset}
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
