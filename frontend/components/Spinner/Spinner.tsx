import React from 'react';

import SpinnerStyles from './SpinnerStyles';

interface ISpinner {
  spacing?: string;
  hide?: boolean;
}

const Spinner = ({ spacing, hide }: ISpinner) => {

  return (
    <SpinnerStyles
      //@ts-ignore
      spacing={spacing} hide={hide}
    >
      <div className="spinner"></div>
    </SpinnerStyles>
  )
}

export default Spinner;
