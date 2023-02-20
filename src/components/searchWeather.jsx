import React, { useEffect, useState } from 'react'

const Searchwether = () => {
  const [search, setSearch] = useState('London')
  const [data, setData] = useState({})
  const [input, setInput] = useState('')
  let d = new Date()

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}
      &APPID=35fa43d12017948196e9f40aa0016988`)
      setData(await response.json())
    }
    fetchWeather()
  }, [search])

  //   =========================================================
  let emoji = null
  if (typeof data.main !== 'undefined') {
    if (data.weather[0].main === 'Fog') {
      emoji = 'fa-solid fa-snowflake'
    } else if (data.weather[0].main === 'Clouds') {
      emoji = 'fa-solid fa-smog'
    } else if (data.weather[0].main === 'Clear') {
      emoji = 'fa-solid fa-sun'
    } else if (data.weather[0].main === 'thunderstorm') {
      emoji = 'fa-solid fa-cloud-bolt'
    } else if (data.weather[0].main === 'Drizzle') {
      emoji = 'fa-cloud-rain'
    } else if (data.weather[0].main === 'Rain') {
      emoji = 'fa-solid fa-cloud-rain'
    } else if (data.weather[0].main === 'Snow') {
      emoji = 'fa-snow-flake'
    } else {
      emoji = 'fa-solid fa-cloud-moon-rain'
    }
    console.log(data.weather[0].main)
    console.log(typeof data.main)
  } else {
    return <div>not found</div>
  }
  //   ===========================================================
  let temp = (data.main.temp - 273.15).toFixed(2)
  let temp_min = (data.main['temp_min'] - 273.15).toFixed(2)
  let temp_max = (data.main['temp_max'] - 273.15).toFixed(2)
  let year = d.getFullYear()
  let month = d.toLocaleDateString('default', { month: 'long' })
  let day = d.toLocaleDateString('default', { day: '2-digit' })

  let time = d.toTimeString()
  const handleSubmit = (event) => {
    event.preventDefault()
    setSearch(input)
  }
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-white text-center border-0">
              <img
                src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                className="card-img"
                alt="..."
              />
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="search city"
                      aria-label="search city"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h2 className="card-title">{data.name}</h2>
                  <p className="card-text lead">
                    {day}, {month} , {year} <br />
                    {time.slice(0, 12)}
                  </p>

                  <hr />
                  <h1 className="fw-bolder mb-3">{temp} &deg;c</h1>
                  <i className={` ${emoji} fa-4x mb-2`}></i>
                  <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                  <p className="lead">
                    {temp_min}&deg;c | {temp_max}&deg;c
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Searchwether
