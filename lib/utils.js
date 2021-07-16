export
function ts2date(timestamp, options) {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en", options).format(date);
}
