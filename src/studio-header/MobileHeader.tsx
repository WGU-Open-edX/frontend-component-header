import React, { useState } from 'react';
import { useToggle, ModalPopup } from '@openedx/paragon';
import HeaderBody from './HeaderBody';
import MobileMenu from './MobileMenu';
import type { HeaderBodyProps } from './types';

/**
 * MobileHeader takes everything HeaderBody does except the mobile/popup controls,
 * which it owns itself: it always renders HeaderBody with `isMobile` and wires the
 * menu button to its own ModalPopup.
 */
type MobileHeaderProps = Omit<
HeaderBodyProps,
'isMobile' | 'setModalPopupTarget' | 'toggleModalPopup' | 'isModalPopupOpen'
>;

const MobileHeader = ({
  mainMenuDropdowns = [],
  ...props
}: MobileHeaderProps) => {
  const [isOpen, , close, toggle] = useToggle(false);
  const [target, setTarget] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <HeaderBody
        {...props}
        isMobile
        setModalPopupTarget={setTarget}
        toggleModalPopup={toggle}
        isModalPopupOpen={isOpen}
      />
      <ModalPopup
        hasArrow
        placement="bottom"
        positionRef={target}
        isOpen={isOpen}
        onClose={close}
        onEscapeKey={close}
        className="mobile-menu-container"
      >
        <MobileMenu {...{ mainMenuDropdowns }} />
      </ModalPopup>
    </>
  );
};

export default MobileHeader;
