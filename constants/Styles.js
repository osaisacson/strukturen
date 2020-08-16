const homeMargin = 15;
const goalHeight = 105;
const meHeight = goalHeight + goalHeight + homeMargin;

export default {
  defaultFontFamily: 'bowlby-bold',
  borderRadius: 5,
  leftRight: 15,
  homeMargin,
  goalHeight,
  meHeight,
  amTop: goalHeight + homeMargin,
  pmTop: meHeight + homeMargin + goalHeight + homeMargin,
};
