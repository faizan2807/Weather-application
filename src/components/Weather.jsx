
import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import clear_icon from '../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import cloud_icon from '../assets/cloud.png'
import sun_icon from '../assets/sun.png'
import raining_icon from '../assets/raining.png'
import wind_icon from '../assets/wind.png'


const Weather = ()=> {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n" : clear_icon,
        "02d" :drizzle_icon,
        "02n" : drizzle_icon,
        "03d" : cloud_icon,
        "03n": cloud_icon,
        "04d" : sun_icon,
        "04n" : sun_icon,
        "05d": raining_icon,
        "05n": raining_icon,
        "06d" : wind_icon,
        "06d" : wind_icon,
        "07d" : humidity_icon,
        "07d" : humidity_icon
    }

    const search = async (city) => {
        if (!city || city.trim() === "") {
            alert("Please enter a city name.");
            return;
        }
    
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6fdcb19e48523df7bec3e551e22c1cfc`;
            const response = await fetch(url);
            const data = await response.json();
    
            if (data.cod === 200) {
                const icon = allIcons[data.weather[0].icon] || clear_icon;
    
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    tempreture: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon,
                });
            } else {
                alert("City not found. Please try again.");
            }
        } catch (error) {
            setWeatherData(false);
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data. Please try again later.");
        }
    };
    

    useEffect(() => {
        search("Hyderabad")
    }, [])


    return (
        <div className='weather container-fluid'>

            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder='search' />
                <img src={search_icon} alt="search" onClick={()=>search(inputRef.current.value)}/>
            </div>
            {weatherData?<>
                <img src={drizzle_icon} alt="" className='weather-icon' />
            <p className='temperature'>{weatherData.tempreture }°C</p>
            <p className='location'>{weatherData?.location}</p>
            <div className='weather-data'>
                <div className='col'>
                    <img src={humidity_icon} alt="humidity Icon" />
                    <div>
                        <p>{weatherData.humidity }%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={wind_icon} alt="Wind Icon" />
                    <div>
                        <p> {weatherData?.windSpeed } km/h </p>
                        <span>wind speed</span>
                    </div>
                </div>
            </div>
            </>:<></>}
        </div>

    )
}

export default Weather 