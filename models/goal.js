import moment from 'moment';

class Goal {
  constructor(id, ownerId, date, title, text, isDone) {
    this.id = id;
    this.ownerId = ownerId;
    this.date = date;
    this.title = title;
    this.text = text;
    this.isDone = isDone;
  }
  get readableDate() {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default Goal;
