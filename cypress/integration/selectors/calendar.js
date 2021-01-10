const CALENDAR = {
  ADD_TIME_ENTRY: '.react-draggable:contains("Add time entry"):visible',
  SEARCH_PROJECT_INPUT: '.Popover .Select__input input[type=text]',
  SELECT_PROJECT_OPTION: '.Popover .TBXSelect.Select--focused .Select__option__text > div > span',
  TIME_ENTRY_DESCRIPTION: '.Popover textarea[name=description]',
  TIME_ENTRY_HOURS_BUTTONS: '.Popover .form-group:nth-child(3) div[role="button"]',
  BUTTONS: '.pinag button'
}


module.exports.CALENDAR = CALENDAR
