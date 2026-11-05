import React from 'react';
import { Link } from 'react-router-dom';

import type { HeaderBodyProps } from './types';

type BrandNavProps = Pick<HeaderBodyProps, 'studioBaseUrl' | 'logo' | 'logoAltText'>;

const BrandNav = ({
  studioBaseUrl,
  logo,
  logoAltText,
}: BrandNavProps) => (
  <Link to={studioBaseUrl}>
    <img
      src={logo}
      alt={logoAltText}
      className="d-block logo"
    />
  </Link>
);

export default BrandNav;
