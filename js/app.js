
//http://api.openweathermap.org/data/2.5/forecast?q=panauti&appid=f4846e0c6ff5ec86979e8ae140d91b73&units=metric





window.addEventListener('DOMContentLoaded', (e) => {
    getWeather(e);


});

var address = document.querySelector('.address')
var icon = document.querySelector('.icon')
var mainTemp = document.querySelector('.mainTemp')
var unit = document.querySelector('#togBtn')
var description = document.querySelector('.description')
var minTemp = document.querySelector('.minTemp')
var maxTemp = document.querySelector('.maxTemp')
var pressure = document.querySelector('.pressure')
var humidity = document.querySelector('.humidity')


var date2 = document.querySelector('.date2')
var date3 = document.querySelector('.date3')
var date4 = document.querySelector('.date4')
var date5 = document.querySelector('.date5')


var sunriseTime = document.querySelector('.sunriseTime')
var sunsetTime = document.querySelector('.sunsetTime')
var cloudPercentage = document.querySelector('.cloudPercentage')
var cloudDetails = document.querySelector('.cloud-details')
var windSpeed = document.querySelector('.windSpeed')
var windDegree = document.querySelector('.windDegree')
var windDetails = document.querySelector('.windDetails')
var rain = document.querySelector('.rain')
var rainDetails = document.querySelector('.rainDetails')
var avgMaxTemp = document.querySelector('.avgMaxTemp')
var avgMinTemp = document.querySelector('.avgMinTemp')

var long = document.querySelector('.long')
var lat = document.querySelector('.lat')
var population=document.querySelector('.population')



document.querySelector('.search').addEventListener('submit', getWeather)
var cityName = 'kathmandu'

function getDay(number){
    if(number===0){
        return 'Sunday'
    }else if(number===1){
        return 'Monday'
    }else if(number===2){
        return 'Tuesday'
    }else if(number===3){
        return 'Wednesday'
    }else if(number===4){
        return 'Thrusday'
    }else if(number===5){
        return 'Friday'
    }else if(number===6){
        return 'Saturday'
    }
}

function getIcon(string){
    if(string==='Rain'){
        return '/img/rain.png'
    }else if(string==='Clear'){
        return '/img/sun1.png'
    } else{
        return '/img/clouds.png'
    }
}

function getTime(time){
    var time = new Date(time *1000)

    var hours=time.getHours()
    var minutes =time.getMinutes();
    var seconds =time.getSeconds();

    if(hours.toString().length==1){
        hours="0"+hours
    }
    if(minutes.toString().length==1){
        minutes="0"+minutes
    }
    if(hours<10){
        
        return (hours+' : '+ minutes +' AM ')
    }else{
        hours=hours-12
        if(hours.toString().length==1){
            hours="0"+hours
        }
        
        return (hours+' : '+ minutes +' PM ')
    }
}
function getCloudText(number){
    if(number<=33&&number>=0){
        return 'Few parts of the sky are covered with Clouds.'
    }else if(number>33&&number<=66){
        return 'Around Half part of the sky is filled with clouds.'
    }else{
        return 'Most part of the sky is filled with clouds'
    }
}
function getWeather(e) {
    var searchBox = document.querySelector('.searchBox');
    var day = new Date().getDay()

    if (searchBox.value == '') {
        cityName = 'kathmandu'
    } else {
        cityName = searchBox.value
    }

    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f4846e0c6ff5ec86979e8ae140d91b73&units=metric`).then(
        (res) => {
            if (!res.ok) {
                throw Error("Sorry The given address is not found.");
            } else {
                return res.json();
            }
        }
    ).then(
        (data) => {

             //Main Weather part........##############################################

            address.innerHTML=data.city.name
            icon.src=getIcon(data.list[0].weather.main)
            mainTemp.innerHTML=`${Math.floor(data.list[0].main.temp)}&#730;`
            description.innerHTML=data.list[0].weather[0].description
            minTemp.innerHTML=`Min Temperature &darr; ${data.list[0].main.temp_min}&#730;`
            maxTemp.innerHTML=`Max Temperature &uarr; ${data.list[0].main.temp_max}&#730;`
            pressure.innerHTML=`Pressure ${data.list[0].main.pressure} hPa`
            humidity.innerHTML=`Humidity ${data.list[0].main.humidity} %`

            //Day5 Weather part........##############################################

            date2.innerHTML=getDay((day+1))
            date3.innerHTML=getDay((day+2))
            date4.innerHTML=getDay((day+3))
            date5.innerHTML=getDay((day+4))

            sunriseTime.innerHTML=getTime(data.city.sunrise)
            sunsetTime.innerHTML=getTime(data.city.sunset)

            cloudPercentage.innerHTML=`${data.list[0].clouds.all}%`
            cloudDetails.innerHTML=getCloudText(data.list[0].clouds.all)

            windSpeed.innerHTML=`${data.list[0].wind.speed}m/s`
            windDegree.innerHTML=`${data.list[0].wind.deg}&#730;`
            windDetails.innerHTML=`The Velocity of Wind will be ${data.list[0].wind.speed}m/s with an angle of ${data.list[0].wind.deg}&#730; to the North. `
        
            rain.innerHTML=`${data.list[0].rain["3h"]}`;
            rainDetails.innerHTML=`Rain Volume for the last 3 hours is ${data.list[0].rain["3h"]} mm.`

            avgMaxTemp.innerHTML=`${data.list[0].main.temp_max}&#730; `
            avgMinTemp.innerHTML=`${data.list[0].main.temp_min}&#730; `

            long.innerHTML=`Longitude : ${data.city.coord.lon}`
            lat.innerHTML=`Latitude : ${data.city.coord.lat}`
            population.innerHTML=data.city.population

        }
    ).catch(
        (err) => {
            console.log(err)
        }
    )
    searchBox.value = ''
    console.log(unit.value)
    e.preventDefault()
}