export
function ts2date(timestamp, options) {
  if(timestamp){
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en", options).format(date);
  }
  return "No information"
}
