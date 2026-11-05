import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import {
  ActionRow,
  Button,
  Container,
  Icon,
  IconButton,
  Nav,
  Row,
} from '@openedx/paragon';
import { Close, MenuIcon, Search } from '@openedx/paragon/icons';

import CourseLockUp from './CourseLockUp';
import UserMenu from './UserMenu';
import BrandNav from './BrandNav';
import NavDropdownMenu from './NavDropdownMenu';
import messages from './messages';
import type { HeaderBodyProps } from './types';

const HeaderBody = ({
  logo,
  logoAltText,
  number = '',
  org = '',
  title = '',
  username,
  isAdmin = false,
  studioBaseUrl,
  logoutUrl,
  authenticatedUserAvatar,
  isMobile = false,
  setModalPopupTarget,
  toggleModalPopup,
  isModalPopupOpen = false,
  isHiddenMainMenu = false,
  mainMenuDropdowns = [],
  outlineLink,
  searchButtonAction,
  containerProps = {},
}: HeaderBodyProps) => {
  const intl = useIntl();

  const renderBrandNav = (
    <BrandNav
      {...{
        studioBaseUrl,
        logo,
        logoAltText,
      }}
    />
  );

  const { className: containerClassName, ...restContainerProps } = containerProps;

  return (
    <Container
      size="xl"
      className={classNames('px-2.5', containerClassName)}
      {...restContainerProps}
    >
      <ActionRow as="header">
        {isHiddenMainMenu ? (
          <Row className="flex-nowrap ml-4">
            {renderBrandNav}
          </Row>
        ) : (
          <>
            {isMobile ? (
              <Button
                ref={setModalPopupTarget}
                className="d-inline-flex align-items-center"
                variant="tertiary"
                onClick={toggleModalPopup}
                iconBefore={isModalPopupOpen ? Close : MenuIcon}
                data-testid="mobile-menu-button"
              >
                Menu
              </Button>
            ) : (
              <div className="w-25">
                <Row className="m-0 flex-nowrap">
                  {renderBrandNav}
                  <CourseLockUp
                    {...{
                      outlineLink,
                      number,
                      org,
                      title,
                    }}
                  />
                </Row>
              </div>
            )}
            {isMobile ? (
              <>
                <ActionRow.Spacer />
                {renderBrandNav}
              </>
            ) : (
              <Nav data-testid="desktop-menu" className="ml-2">
                {mainMenuDropdowns.map(dropdown => {
                  const { id, buttonTitle, items } = dropdown;
                  return (
                    <NavDropdownMenu
                      key={id}
                      {...{
                        id, buttonTitle, items,
                      }}
                    />
                  );
                })}
              </Nav>
            )}
          </>
        )}
        <ActionRow.Spacer />
        {searchButtonAction && (
          <Nav>
            <IconButton
              src={Search}
              iconAs={Icon}
              onClick={searchButtonAction}
              aria-label={intl.formatMessage(messages['header.label.search.nav'])}
              alt={intl.formatMessage(messages['header.label.search.nav'])}
            />
          </Nav>
        )}
        <Nav>
          <UserMenu
            {...{
              username,
              studioBaseUrl,
              logoutUrl,
              authenticatedUserAvatar,
              isAdmin,
              isMobile,
            }}
          />
        </Nav>
      </ActionRow>
    </Container>
  );
};

export default HeaderBody;
