import type React from 'react';
import type { Container } from '@openedx/paragon';

/**
 * Shared prop types for the Studio header. StudioHeader, HeaderBody, MobileHeader and
 * NavDropdownMenu all pass these shapes down to each other, so they live in one place
 * to keep the components from drifting apart.
 */

/** A single link inside a header dropdown menu. */
export interface NavDropdownMenuItem {
  href: string;
  /** Non-null: NavDropdownMenu renders it as the link text and uses it in the React key. */
  title: NonNullable<React.ReactNode>;
}

/** A top-level dropdown in the header's main menu (desktop nav and mobile menu). */
export interface MainMenuDropdown {
  id: string;
  buttonTitle: NonNullable<React.ReactNode>;
  items: NavDropdownMenuItem[];
}

/** Props forwarded to the Paragon Container that wraps the header. */
export type ContainerProps = React.ComponentProps<typeof Container>;

export interface StudioHeaderProps {
  number?: string;
  org?: string;
  title: string;
  containerProps?: ContainerProps;
  isHiddenMainMenu?: boolean;
  mainMenuDropdowns?: MainMenuDropdown[];
  outlineLink?: string;
  /** `null` is accepted because it was the old defaultProps value and callers still pass it. */
  searchButtonAction?: (() => void) | null;
  isNewHomePage: boolean;
}

/**
 * HeaderBody renders both the desktop header and the top bar of the mobile header, so it
 * takes StudioHeader's display props plus the user/config values StudioHeader resolves
 * from AppContext, and the popup controls MobileHeader passes in.
 */
export interface HeaderBodyProps extends Omit<StudioHeaderProps, 'title' | 'isNewHomePage'> {
  title?: string;
  studioBaseUrl: string;
  logoutUrl: string;
  logo: string;
  logoAltText: string;
  authenticatedUserAvatar?: string;
  username?: string;
  isAdmin?: boolean;
  isMobile?: boolean;
  setModalPopupTarget?: React.Ref<HTMLButtonElement>;
  toggleModalPopup?: () => void;
  isModalPopupOpen?: boolean;
}
