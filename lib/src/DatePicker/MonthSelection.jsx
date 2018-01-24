import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from 'material-ui';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
import MonthSelectionHeader from './MonthSelectionHeader';
import DomainPropTypes from '../constants/prop-types';
import * as defaultUtils from '../utils/utils';
import DayWrapper from './DayWrapper';
import Month from './Month';

const moment = extendMoment(Moment);

export class MonthSelection extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    renderDay: PropTypes.func,
    utils: PropTypes.object,
    shouldDisableDate: PropTypes.func,
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disablePast: false,
    disableFuture: false,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    renderDay: undefined,
    utils: defaultUtils,
    shouldDisableDate: () => false,
  }

  state = {
    currentYear: this.props.utils.getStartOfYear(this.props.date),
  }

  onMonthSelect = (month) => () => {
    const { date } = this.props;
    const updatedDate = month.clone()
      .hours(date.hours())
      .minutes(date.minutes());

    this.props.onChange(updatedDate);
  }

  handleChangeYear = (currentYear) => {
    this.setState({ currentYear });
  }

  validateMinMaxDate = (month) => {
    const { minDate, maxDate } = this.props;
    const startOfDay = date => moment(date).startOf('month');

    return (
      (minDate && month.isBefore(startOfDay(minDate))) ||
      (maxDate && month.isAfter(startOfDay(maxDate)))
    );
  }

  shouldDisableDate = (month) => {
    const { disablePast, disableFuture, shouldDisableDate } = this.props;
    return (
      (disableFuture && month.isAfter(moment(), 'month')) ||
      (disablePast && month.isBefore(moment(), 'month')) ||
      this.validateMinMaxDate(month) ||
      shouldDisableDate(month)
    );
  }

  renderMonths = () => {
    const { utils } = this.props;
    const { currentYear } = this.state;
    const months = utils.getMonthArray(currentYear);

    return months.map(month => (
      <div key={`month-${month.toString()}`} className={this.props.classes.month}>
        {this.renderMonth(month)}
      </div>
    ));
  }

  renderMonth = (month) => {
    const {
      classes, date, renderMonth, utils,
    } = this.props;

    const selectedDate = date.clone().startOf('month');
    //const currentMonthNumber = utils.getMonthNumber(this.state.currentMonth);
    const now = moment();

    const disabled = this.shouldDisableDate(month);

    let monthComponent = (
      <Month
        current={month.isSame(now, 'month')}
        disabled={disabled}
        selected={selectedDate.isSame(month, 'month')}
        handleClick={this.onMonthSelect(month)}
      >
        {utils.getMonthText(month)}
      </Month>
      );

    return monthComponent;

  }

  render() {
    const { currentYear } = this.state;
    const { classes, utils } = this.props;

    return (
      <Fragment>
        <MonthSelectionHeader
          currentYear={currentYear}
          onYearChange={this.handleChangeYear}
          leftArrowIcon={this.props.leftArrowIcon}
          rightArrowIcon={this.props.rightArrowIcon}
          utils={utils}
        />

        <div className={classes.monthSelection}>
          {this.renderMonths()}
        </div>
      </Fragment>
    );
  }
}

const styles = theme => ({
  monthSelection: {
    display: 'flex',
    flexFlow: 'row wrap',
    height: 36 * 6,
    //marginTop: theme.spacing.unit * 1.5,
  },
  month: {
    width: '33.33%',
    display: 'flex',
    justifyContent: 'center',
  }
});

export default withStyles(styles, { name: 'MuiPickersMonthSelection' })(MonthSelection);
