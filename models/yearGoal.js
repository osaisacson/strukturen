import moment from 'moment';

class YearGoal {
  constructor(id, ownerId, year, title, text, isDone) {
    this.id = id;
    this.ownerId = ownerId;
    this.year = year;
    this.title = title;
    this.text = text;
    this.isDone = isDone;
  }
  get readableDate() {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default YearGoal;
