import React, { ReactElement } from 'react';


const styles = {
  borderStyle: 'solid',
  borderColor: '#CCC',
  borderTopWidth: '1px',
  borderBottomWidth: '1px'
}

const Divider = (): ReactElement => {
  return <div data-testid='divider' style={styles}></div>
}

export default Divider