import { FC } from 'react';
import { CheckBox, CheckBoxProps } from './CheckBox';
import { ListBox, ListBoxProps } from './ListBox';

interface CheckBoxCombo extends CheckBoxProps {
  type: 'checkbox';
}

interface ListBoxCombo extends ListBoxProps {
  type: 'listbox';
}

type ComboBoxProps = CheckBoxCombo | ListBoxCombo;

export const ComboBox: FC<ComboBoxProps> = ({ type, ...props }) => {
  if (type === 'checkbox') {
    return <CheckBox {...(props as CheckBoxProps)} />;
  } else if (type === 'listbox') {
    return <ListBox {...(props as ListBoxProps)} />;
  }

  return null;
};
