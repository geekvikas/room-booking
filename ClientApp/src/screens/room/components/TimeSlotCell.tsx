import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { format, isEqual } from 'date-fns';
import { constructDate } from '../../../helpers';

interface ITimeSlotProps{
  readonly timeSlot: string;
  readonly day: string;
  readonly reservations
}

class TimeSlotCell extends React.PureComponent<ITimeSlotProps, {}>{

  public checkIfReserved = () => {
    const { timeSlot, day } = this.props;
    let reserved = false;
    for(const reservation of this.props.reservations){
      const checkDate = (reservation.startTime.getHours() === new Date(timeSlot).getHours())
        && (new Date(day).getDay() === reservation.startTime.getDay())
      if(checkDate){
        reserved = true;
        break;
      }
    }
    return reserved;
  }

  public selectDate = () => {
    const date = constructDate(this.props.timeSlot, this.props.day);
    this.props.selectDate(date);
  }

  public render() {
    const { timeSlot, day } = this.props;
    const reserved = this.checkIfReserved();
    const selected = isEqual(constructDate(timeSlot, day), new Date(this.props.selected));
    return (
      <Table.Cell
        style={{ padding: '.5em .7em', cursor: 'pointer' }}
        selectable={!reserved}
        key={format(day, 'YYYY-MM-DD')}
        negative={reserved}
        positive={selected}
        onClick={this.selectDate}
      >

        {format(timeSlot, 'HH:mm')}

      </Table.Cell>
  }
}