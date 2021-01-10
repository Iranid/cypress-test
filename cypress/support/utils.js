/**
 * Utilities
 */

const generate_random_hour = (min_hours, max_hours, min_mints, max_mints) => {
  let hour   = generate_random_integer(min_hours, max_hours)
  let minute = generate_random_integer(min_mints, max_mints)

  minute = hour == max_hours ? 0 : minute
  minute = minute > 9 ? minute : `0${minute}`
  hour   = hour > 9 ? hour : `0${hour}`

  return `${hour}${minute}`
}

const new_project = (name, length = 6) => {
  const random_suffix = generate_random_string(length)
  return `Prueba QA ${name} ${random_suffix}`
}

const generate_random_string = function(length = 6){
  return Math.random().toString(20).substr(2, length)
}

const generate_random_integer = (min, max) => {

  // Adjust if needed
  if (min > max) {
    let temp = max;
    max = min;
    min = temp;
  }

  if (min <= 0) {
    return Math.floor(Math.random() * (max + Math.abs(min) + 1)) + min;
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}


export {new_project, generate_random_hour}
