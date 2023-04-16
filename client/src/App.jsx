import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isVerfied, setIsVerfied] = useState(false)
  const [sentEmail, setSentEmail] = useState(false)
  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8080/otp/sendOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        subject: 'Email Verfication',
        message: 'Verify your email with the code below',
        duration: 1
      })
    })
    const data = await response.json()
    if(data.otp) {
      setSentEmail(true)
    } else {
      alert('Try again')
    }
  }

  const handleOTPSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8080/otp/verifyOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        otp: otp
      })
    })
    const data = await response.json()
    if(data.valid) setIsVerfied(true)
    else {
      alert('Wrong OTP. Do email verfication again')
      setIsVerfied(false)
    }
    setSentEmail(false)
  }

  return (
    <div className='absolute left-[25%] top-[25%]'>
      {
        !isVerfied &&
        <>
          {!sentEmail && <form onSubmit={handleEmailSubmit}>
            <div className='p-6'>
              <h4>Email</h4>
              <input type="email" name="email" id="email" className='rounded border-2 border-black' value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className='hover:bg-slate-500 p-3' type='submit'>Submit Email</button>
            </div>
          </form>}
          {
            sentEmail && <form onSubmit={handleOTPSubmit}>
              <div className='p-6'>
                <h4>OTP</h4>
                <input type="text" name="otp" id="otp" className='rounded border-2 border-black' value={otp} onChange={(e) => setOtp(e.target.value)} />
              </div>
              <button className='hover:bg-slate-500 p-3' type='submit'>Submit OTP</button>
            </form>
          }
        </>
      }
      {
        isVerfied && <div>
          Successfully logged in!
        </div>
      }
    </div>
  )
}

export default App
