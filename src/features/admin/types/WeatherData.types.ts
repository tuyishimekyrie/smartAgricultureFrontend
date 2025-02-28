// Weather data interfaces for Weatherbit API

export interface WeatherResponse {
    count: number;
    data: WeatherData[];
  }
  
  export interface WeatherData {
    app_temp: number;        // Apparent/"feels like" temperature (celsius)
    aqi: number;             // Air Quality Index
    city_name: string;       // City name
    clouds: number;          // Cloud coverage (%)
    country_code: string;    // Country code
    datetime: string;        // Current cycle hour (YYYY-MM-DD:HH)
    dewpt: number;           // Dew point (celsius)
    dhi: number;             // Diffuse horizontal solar irradiance (W/m^2)
    dni: number;             // Direct normal solar irradiance (W/m^2)
    elev_angle: number;      // Solar elevation angle (degrees)
    ghi: number;             // Global horizontal solar irradiance (W/m^2)
    gust?: number;           // Wind gust speed (m/s)
    h_angle: number;         // Solar hour angle (degrees)
    lat: number;             // Latitude
    lon: number;             // Longitude
    ob_time: string;         // Last observation time (YYYY-MM-DD HH:MM)
    pod: string;             // Part of day (d = day, n = night)
    precip: number;          // Precipitation (mm)
    pres: number;            // Pressure (mb)
    rh: number;              // Relative humidity (%)
    slp: number;             // Sea level pressure (mb)
    snow: number;            // Snowfall (mm/hr)
    solar_rad: number;       // Estimated solar radiation (W/m^2)
    sources: string[];       // Data sources
    state_code: string;      // State code
    station: string;         // Source station ID
    sunrise: string;         // Sunrise time (HH:MM)
    sunset: string;          // Sunset time (HH:MM)
    temp: number;            // Temperature (celsius)
    timezone: string;        // Local timezone
    ts: number;              // Last observation time (Unix timestamp)
    uv: number;              // UV Index (0-11+)
    vis: number;             // Visibility (km)
    weather: WeatherInfo;    // Weather description
    wind_cdir: string;       // Cardinal wind direction
    wind_cdir_full: string;  // Cardinal wind direction (full)
    wind_dir: number;        // Wind direction (degrees)
    wind_spd: number;        // Wind speed (m/s)
  }
  
  export interface WeatherInfo {
    description: string;     // Weather description
    code: number;            // Weather code
    icon: string;            // Weather icon code
  }