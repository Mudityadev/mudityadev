'use client';
import { useEffect, useState } from 'react';
import { Cloud, MapPin, Loader2 } from 'lucide-react';

export default function UserWeatherBadge() {
  const [ip, setIp] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [weather, setWeather] = useState<{ temp: number; desc: string; humidity?: number; wind?: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setIp(data.ip);
        setCity(data.city);
        if (data.city) {
          const apiKey = process.env.NEXT_PUBLIC_API_WEATHER;
          if (!apiKey) {
            setError('No weather API key');
            setLoading(false);
            return;
          }
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&units=metric&appid=${apiKey}`)
            .then(res => res.json())
            .then(w => {
              console.log('Weather API response:', w);
              if (w && w.main && w.weather && w.weather[0]) {
                setWeather({
                  temp: w.main?.temp,
                  desc: w.weather?.[0]?.description,
                  humidity: w.main?.humidity,
                  wind: w.wind?.speed,
                });
              } else {
                setError('Weather unavailable');
              }
              setLoading(false);
            })
            .catch(() => {
              setError('Weather fetch failed');
              setLoading(false);
            });
        } else {
          setError('City unavailable');
          setLoading(false);
        }
      })
      .catch(() => {
        setError('IP/city fetch failed');
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 text-blue-700 border-blue-200/50 rounded-full text-xs font-medium min-w-0">
      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
      {city && <span className="font-semibold truncate max-w-[100px] sm:max-w-[140px] md:max-w-[180px]">{city}</span>}
      <div className="flex flex-col items-start gap-0.5 min-w-0">
        {loading && <span className="flex items-center gap-1"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading...</span>}
        {error && !loading && <span className="text-red-500">{error}</span>}
        {weather && !loading && (
          <>
            <span className="flex items-center gap-1 whitespace-nowrap"><Cloud className="w-3.5 h-3.5" /> {weather.temp}°C {weather.desc}</span>
          </>
        )}
      </div>
    </div>
  );
} 