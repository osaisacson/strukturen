import moment from 'moment';

class MonthGoal {
  constructor(id, ownerId, year, month, title, text, isDone) {
    this.id = id;
    this.ownerId = ownerId;
    this.year = year;
    this.month = month;
    this.title = title;
    this.text = text;
    this.isDone = isDone;
  }
  get readableDate() {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default MonthGoal;
