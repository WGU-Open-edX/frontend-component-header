import React from 'react';
import {
  Dropdown,
  DropdownButton,
} from '@openedx/paragon';
import { Link } from 'react-router-dom';

import type { MainMenuDropdown } from './types';
import { getItemLinkProps } from './utils';

/**
 * Same shape as MainMenuDropdown: HeaderBody passes each main-menu dropdown straight into
 * NavDropdownMenu, and UserMenu builds one the same way, so the two must not diverge.
 */
type NavDropdownMenuProps = MainMenuDropdown;

const NavDropdownMenu = ({
  id,
  buttonTitle,
  items,
}: NavDropdownMenuProps) => (
  <DropdownButton
    id={id}
    title={buttonTitle}
    variant="outline-primary"
    className="mr-2"
  >
    {items.map(item => (
      <Dropdown.Item
        as={Link}
        key={`${item.title}-dropdown-item`}
        to={item.href}
        {...getItemLinkProps(item)}
        className="small"
      >
        {item.title}
      </Dropdown.Item>
    ))}
  </DropdownButton>
);

export default NavDropdownMenu;
