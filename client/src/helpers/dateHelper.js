const dateToday = Date.prototype.toDateInputValue = (function () {
  const local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
});

export default dateToday;
