import { Children, cloneElement, ReactElement } from 'react';

type ElementWithName = ReactElement & {
  type: {
    displayName: string;
  };
};

export const getComponentChild = (children: ReactElement | ReactElement[], displayName: string) => {
  return Children.map(children, (child) => {
    switch ((child as ElementWithName).type.displayName) {
      case displayName:
        return cloneElement(child, child.props);
      default:
        null;
    }
  });
};
