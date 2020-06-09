
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
//var address = document.querySelector('.address')
// var address = document.querySelector('.address')
// var address = document.querySelector('.address')
// var address = document.querySelector('.address')
// var address = document.querySelector('.address')
// var address = document.querySelector('.address')
// var address = document.querySelector('.address')
// var address = document.querySelector('.address')



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
            minTemp.innerHTML=`Min Temperature &darr; ${data.list[0].main.temp_min}`
            maxTemp.innerHTML=`Max Temperature &uarr; ${data.list[0].main.temp_max}`
            pressure.innerHTML=`Pressure ${data.list[0].main.pressure} hPa`
            humidity.innerHTML=`Humidity ${data.list[0].main.humidity} %`

            //Day5 Weather part........##############################################

            date2.innerHTML=getDay((day+1))
            date3.innerHTML=getDay((day+2))
            date4.innerHTML=getDay((day+3))
            date5.innerHTML=getDay((day+4))


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