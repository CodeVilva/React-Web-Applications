import { useEffect, useState } from 'react'

function App() {
  const [is12HourFormat, setIs12HourFormat] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: is12HourFormat,
  })

  const parts = formatter.formatToParts(currentTime)
  const hours = parts.find((part) => part.type === 'hour')?.value ?? '00'
  const minutes = parts.find((part) => part.type === 'minute')?.value ?? '00'
  const seconds = parts.find((part) => part.type === 'second')?.value ?? '00'

  const dayPeriod = is12HourFormat
    ? parts.find((part) => part.type === 'dayPeriod')?.value ?? 'AM'
    : Number(hours) >= 12
      ? 'PM'
      : 'AM'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Pixelify+Sans:wght@400..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Doto', sans-serif;
          background-color: #00143E;
        }

        main {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .clock-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .details {
          font-size: 14px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        table {
          color: #DFEBFF;
          background-color: #0050C3;
          text-align: center;
          border: 1.5px solid #1772FF;
          border-radius: 12px;
          font-size: 24px;
          font-weight: 800;
          box-shadow: 0px 4px 10px #191B1C;
          border-collapse: separate;
          border-spacing: 0;
          overflow: hidden;
        }

        td {
          border: 1.5px solid #1772FF;
          background-color: #191B1C;
          border-radius: 12px;
          padding: 18px 24px;
        }

        .head {
          padding: 18px 24px;
        }

        .head h1 {
          margin: 0 0 10px;
          font-size: clamp(2rem, 3vw, 2.5rem);
        }

        button {
          height: 100%;
          width: 100%;
          padding: 14px;
          background-color: #0050C3;
          border: 2.5px solid #1772FF;
          border-radius: 12px;
          font-size: 18px;
          color: #DFEBFF;
          font-family: 'Doto', sans-serif;
          font-weight: 900;
          margin: 15px 0px;
          transition: background-color 0.2s ease;
        }

        button:hover {
          background-color: #191B1C;
          cursor: pointer;
        }
      `}</style>

      <main>
        <div className="clock-wrapper">
          <table cellPadding="24px">
            <tbody>
              <tr>
                <td colSpan="3" className="head">
                  <h1>DIGITAL CLOCK</h1>
                  <div className="details">
                    <div>
                      Time Format: <span>{is12HourFormat ? '12' : '24'}</span> Hours
                    </div>
                    <div>
                      Day Period: <span>{dayPeriod}</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>{hours}</td>
                <td>{minutes}</td>
                <td>{seconds}</td>
              </tr>
            </tbody>
          </table>

          <button type="button" onClick={() => setIs12HourFormat((prev) => !prev)}>
            Change Format
          </button>
        </div>
      </main>
    </>
  )
}

export default App
