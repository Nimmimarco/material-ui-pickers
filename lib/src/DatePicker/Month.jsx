import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Button, withStyles } from 'material-ui';
import classnames from 'classnames';

class Month extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    current: PropTypes.bool,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
    current: false,
    selected: false,
  }

  render() {
    const {
      children, classes, handleClick, disabled, current, selected, ...other
    } = this.props;

    const className = classnames(classes.month, {
      [classes.current]: current,
      [classes.selected]: selected,
      [classes.disabled]: disabled,
    });

    return (
      <Button
        className={className}
        tabIndex={disabled ? -1 : 0}
        onClick={!disabled ? handleClick : undefined}
        onKeyPress={!disabled ? handleClick : undefined}
        {...other}
      >
        <span> {children} </span>
      </Button>
    );
  }
}

const styles = theme => ({
  month: {
    width: '100%',
  },
  current: {
    color: theme.palette.primary[500],
  },
  selected: {
    backgroundColor: theme.palette.background.appBar,
    fontWeight: theme.typography.fontWeightMedium,
  },
  disabled: {
    pointerEvents: 'none',
    color: theme.palette.text.hint,
  },
});

export default withStyles(styles)(Month);
