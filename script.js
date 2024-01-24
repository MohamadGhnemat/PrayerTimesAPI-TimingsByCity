
let cities = [
  {
    arabicName :  "رام الله" ,
    name : "Ramallah"
  },
  {
    arabicName :  "طولكرم" ,
    name : "Tulkarm"
  },
  {
    arabicName :     "الخليل"  ,
    name : "Hebron"
  },
  {
    arabicName :     "قلقيلية"  ,
    name : "Qalqilya"
  },
  {
    arabicName :     "القدس"  ,
    name : "Jerusalem"
  },
  {
    arabicName :     "نابلس"  ,
    name : "Nablus"
  },
  {
    arabicName :  "أريحا" ,
    name : "Jerico"
  }];
let content = ""
for (let city of cities) {
  content += `
  <option >${city.arabicName}</option>
  `
}

document.getElementById("cities-select").innerHTML =content
document.getElementById("cities-select").addEventListener("change" , function ()  {
  document.getElementById("city-name").innerHTML = this.value

let cityName = ""
for(let city of cities){
  if(city.arabicName == this.value){
    cityName = city.name
  }

}
getPrayersTimingsOfCity(cityName)

  
})

function getPrayersTimingsOfCity(cityName){
  let params = {
    city: cityName,
    country:"PS"
  }
  axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params: params
  })
  .then(function (response) {
    const timings = response.data.data.timings;
  
    FillTimeForPrayer("fajr-time",timings.Fajr);
    FillTimeForPrayer("sunrise-time",timings.Sunrise);
    FillTimeForPrayer("dhuhr-time",timings.Dhuhr);
    FillTimeForPrayer("asr-time",timings.Asr);
    FillTimeForPrayer("sunset-time",timings.Sunset);
    FillTimeForPrayer("isha-time",timings.Isha);
    
    const readableDate = response.data.data.date.readable;
    const weekDay = response.data.data.date.hijri.weekday.ar;
    document.getElementById("date").innerHTML = `${weekDay} - ${readableDate} `
  })
  .catch(function (error) {
    console.log(error);
  })
}

getPrayersTimingsOfCity("Ramallah")

  
function FillTimeForPrayer(id,time){
  document.getElementById(id).innerHTML = time
}


