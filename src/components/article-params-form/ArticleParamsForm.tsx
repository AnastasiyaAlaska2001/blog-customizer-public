import {
  backgroundColors,
  contentWidthArr,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
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
}: {
  onConfirm: (formData: Record<string, OptionType> | null) => void;
}): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, OptionType> | null>(null);
  const formRef = useRef(null);
  useOutsideClick(formRef, () => setIsOpen(false));

  const handleChangeOptions = (value: OptionType, optionKey: string): void => {
    setFormData((prev) => ({
      ...prev,
      [optionKey]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onConfirm(formData);
    setIsOpen(false);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />

      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form onSubmit={handleSubmit} ref={formRef} className={styles.form}>
          <Text size={31} weight={800} as="h1">
            Задайте параметры
          </Text>

          <Select
            onChange={(val) => handleChangeOptions(val, selectNames.font)}
            title={selectNames.font}
            selected={formData?.[selectNames.font] ?? null}
            options={fontFamilyOptions}
          />
          <RadioGroup
            name="fontSizeGroup"
            onChange={(val) => handleChangeOptions(val, selectNames.fontSize)}
            selected={formData?.[selectNames.fontSize] ?? ''}
            title={selectNames.fontSize}
            options={fontSizeOptions}
          />
          <Select
            onChange={(val) => handleChangeOptions(val, selectNames.fontColor)}
            title={selectNames.fontColor}
            selected={formData?.[selectNames.fontColor] ?? null}
            options={fontColors}
          />
          <Separator />
          <Select
            onChange={(val) => handleChangeOptions(val, selectNames.backgroundColor)}
            title={selectNames.backgroundColor}
            selected={formData?.[selectNames.backgroundColor] ?? null}
            options={backgroundColors}
          />
          <Select
            onChange={(val) => handleChangeOptions(val, selectNames.contentWidth)}
            title={selectNames.contentWidth}
            selected={formData?.[selectNames.contentWidth] ?? null}
            options={contentWidthArr}
          />

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="reset"
              type="clear"
              onClick={() => setFormData(null)}
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
