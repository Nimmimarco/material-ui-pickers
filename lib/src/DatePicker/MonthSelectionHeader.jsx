import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton, Typography } from 'material-ui';
import * as defaultUtils from '../utils/utils';

export const MonthSelectionHeader = (props) => {
  const {
    classes,
    theme,
    currentYear,
    onYearChange,
    leftArrowIcon,
    rightArrowIcon,
    utils,
  } = props;

  const rtl = theme.direction === 'rtl';

  const selectNextYear = () => onYearChange(utils.getNextYear(currentYear));
  const selectPreviousYear = () => onYearChange(utils.getPreviousYear(currentYear));

  return (
    <div>
      <div className={classes.switchHeader}>
        <IconButton onClick={selectPreviousYear}>
          {rtl ? rightArrowIcon : leftArrowIcon}
        </IconButton>

        <Typography type="body1">
          {utils.getMonthSelectionHeaderText(currentYear)}
        </Typography>

        <IconButton onClick={selectNextYear}>
          {rtl ? leftArrowIcon : rightArrowIcon}
        </IconButton>
      </div>

     
    </div>
  );
};

MonthSelectionHeader.propTypes = {
  currentMonth: PropTypes.object.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  utils: PropTypes.object,
};

MonthSelectionHeader.defaultProps = {
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  utils: defaultUtils,
};

const styles = theme => ({
  switchHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginBottom: theme.spacing.unit,
  },
  daysHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayLabel: {
    width: 36,
    margin: '0 2px',
    textAlign: 'center',
    color: theme.palette.text.hint,
  },
});

export default withStyles(
  styles,
  { withTheme: true, name: 'MuiPickersMonthSelectionHeader' },
)(MonthSelectionHeader);
