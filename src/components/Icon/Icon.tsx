import React from 'react';
import classNames from 'classnames';

interface IconProps {
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({ component: IconComponent, ...props }) => {
  const {
    className,
    tabIndex,
    onClick,
    displayName,

    ...restProps
  } = props;

  const prefixCls = 'apgicon';

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-${displayName}`]: !!displayName
    },
    className,
  );

  let iconTabIndex = tabIndex;
  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }

  return (
    <span
      role="img"
      aria-label={displayName}
      {...restProps}
      tabIndex={iconTabIndex}
      onClick={onClick}
      className={classString}
    >
      <IconComponent />
    </span>
  )
};

export default Icon;
