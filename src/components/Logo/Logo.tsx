import React, { FC } from 'react';
import { Icon } from '../Icon/Icon';
import './Logo.css';
interface LogoProps {
  size?: 'large' | 'default';
}

const Logo: FC<LogoProps> = ({ size = 'default' }) => {
  return (
    <div className={`logo logo-${size}`}>
      <Icon icon={'icon-bookkeeping'} />
      <span>AccountBook</span>
    </div>
  );
};

export default Logo;
