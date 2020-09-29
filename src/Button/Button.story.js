import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button } from './Button'

storiesOf('Button', module)
  .addDecorator(storyFn => <div style={{ margin: '10px' }}>{storyFn()}</div>)
  .add('Full examples', () => (
    <div>
      <Button onClick={action('click')}>
        Save
      </Button>{' '}
      <br />
      <br />
      <Button onClick={action('click')} bg='GREEN_MED'>
        Save
      </Button>{' '}
      <br />
      <br />
      <Button onClick={action('click')} bg='BLUE_DARK' height='58px'>
        A bigger button
      </Button>{' '}
      <br />
      <br />
      <Button onClick={action('click')} bg='ORANGE' disabled>
        A disabled button
      </Button>{' '}
    </div>
  ))