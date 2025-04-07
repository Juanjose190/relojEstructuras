import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { AnalogClock } from './components/AnalogClock';
import { translations } from './translations';

const timezones = {
  colombia: 'America/Bogota',
  london: 'Europe/London',
  tokyo: 'Asia/Tokyo',
  newYork: 'America/New_York',
  paris: 'Europe/Paris',
};

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState('colombia');
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeInTimezone = () => {
    return new Date(currentTime.toLocaleString('en-US', { timeZone: timezones[selectedTimezone as keyof typeof timezones] }));
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-purple-600">{t.title}</h1>
          </div>
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {t.switchLanguage}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
          <div className="flex flex-col items-center">
            <AnalogClock time={getTimeInTimezone()} />
            <div className="mt-8 text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {t.currentTime}
              </h2>
              <div className="text-3xl font-bold text-purple-600">
                {getTimeInTimezone().toLocaleTimeString(language === 'en' ? 'en-US' : 'es-ES')}
              </div>
            </div>
          </div>

          <div className="w-full md:w-64">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{t.selectTimezone}</h3>
            <div className="space-y-2">
              {Object.keys(timezones).map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedTimezone(zone)}
                  className={`w-full px-4 py-3 rounded-lg transition-colors ${
                    selectedTimezone === zone
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  {t[zone as keyof typeof t]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;