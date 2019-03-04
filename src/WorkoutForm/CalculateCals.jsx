function Calculate (workout, avgHR, duration) {
  const calsPerMin = 2200/(24*60);
  let calories;
  let factorHR = avgHR;

  if (avgHR <= 90) {
    factorHR = 1.2;
  } else if (avgHR <= 150) {
    factorHR = 1.6;
  } else {
    factorHR = 2;
  }
  //HR zones 50-90 -> 1.2, 91-150 -> 1.6, 151+ -> 2
  switch(workout) {
    case 'Gym':
      calories = calsPerMin * duration * factorHR * 2.6;
      break;
    case 'Jogging':
      calories = calsPerMin * duration * factorHR * 3.4;
      break;
    case 'Cycling':
      calories = calsPerMin * duration * factorHR * 2.7;
      break;
    case 'Swimming':
      calories = calsPerMin * duration * factorHR * 3;
      break;
    case 'Hiking':
      calories = calsPerMin * duration * factorHR * 2.8;
      break;
    case 'Walking':
      calories = calsPerMin * duration * factorHR * 2.4;
      break;
    default:
      calories = calsPerMin * factorHR * 2;
    }
  return parseInt(calories);
}

export default Calculate;
