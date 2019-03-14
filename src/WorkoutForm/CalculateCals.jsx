function Calculate (workout, avgHR, duration) {
  const calsPerMin = 2200/(24*60);
  let calories;
  let factorHR = avgHR;

  if (avgHR <= 70 && avgHR > 0) {
    factorHR = 1.2;
  } else if (avgHR > 70 && avgHR <= 110) {
    factorHR = 1.4;
  } else if (avgHR > 110 && avgHR <= 140) {
    factorHR = 1.6;
  } else if (avgHR > 140 && avgHR <= 170) {
    factorHR = 1.8;
  } else if (avgHR > 170) {
    factorHR = 2;
  } else {
    factorHR = 0;
  }
  //HR zones 50-70 -> 1.2,70-110 -> 1.4, 110-140 -> 1.6, 140-170 -> 1.8 180+ -> 2
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
