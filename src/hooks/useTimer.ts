import { useState, useEffect } from 'react'

export const useTimer = (initialTime: number = 0) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft <= 0) {
        setIsActive(false)
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, timeLeft])

  const start = (duration: number) => {
    setTimeLeft(duration)
    setIsActive(true)
  }

  const stop = () => {
    setIsActive(false)
    setTimeLeft(0)
  }

  const formatTime = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0')
    const sec = String(seconds % 60).padStart(2, '0')
    return `${min}:${sec}`
  }

  return {
    timeLeft,
    isActive,
    start,
    stop,
    formatTime: () => formatTime(timeLeft),
  }
}
