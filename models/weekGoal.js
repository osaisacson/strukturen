import moment from 'moment';

class WeekGoal {
  constructor(id, ownerId, year, month, week, title, text, isDone) {
    this.id = id;
    this.ownerId = ownerId;
    this.year = year;
    this.month = month;
    this.week = week;
    this.title = title;
    this.text = text;
    this.isDone = isDone;
  }
  get readableDate() {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default WeekGoal;
