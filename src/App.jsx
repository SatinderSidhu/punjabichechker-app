import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('setup') // setup, playing, finished
  const [numPlayers, setNumPlayers] = useState(2)
  const [playerNames, setPlayerNames] = useState(['', ''])
  const [players, setPlayers] = useState([])
  const [timer, setTimer] = useState(0)
  const [winner, setWinner] = useState(null)

  const timerIntervalRef = useRef(null)
  const doorbellSoundRef = useRef(null)
  const celebrationSoundRef = useRef(null)

  // Update player names array when number of players changes
  useEffect(() => {
    setPlayerNames(prev => {
      const newNames = [...prev]
      while (newNames.length < numPlayers) {
        newNames.push('')
      }
      return newNames.slice(0, numPlayers)
    })
  }, [numPlayers])

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing') {
      timerIntervalRef.current = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [gameState])

  const handleNumPlayersChange = (e) => {
    const value = parseInt(e.target.value)
    if (value >= 2 && value <= 10) {
      setNumPlayers(value)
    }
  }

  const handlePlayerNameChange = (index, value) => {
    const newNames = [...playerNames]
    newNames[index] = value
    setPlayerNames(newNames)
  }

  const startGame = () => {
    // Validate all names are entered
    if (playerNames.some(name => name.trim() === '')) {
      alert('Please enter names for all players!')
      return
    }

    // Initialize players with scores
    const initialPlayers = playerNames.map(name => ({
      name: name.trim(),
      score: 0
    }))

    setPlayers(initialPlayers)
    setTimer(0)
    setGameState('playing')
  }

  const handlePlayerButtonClick = (index) => {
    // Play doorbell sound
    playDoorbellSound()

    // Increment player's score
    const newPlayers = [...players]
    newPlayers[index].score += 1
    setPlayers(newPlayers)
  }

  const endGame = () => {
    // Find winner (lowest score)
    const minScore = Math.min(...players.map(p => p.score))
    const winners = players.filter(p => p.score === minScore)

    setWinner(winners)
    setGameState('finished')

    // Play celebration sound
    playCelebrationSound()
  }

  const resetGame = () => {
    setGameState('setup')
    setPlayers([])
    setTimer(0)
    setWinner(null)
    setPlayerNames(Array(numPlayers).fill(''))
  }

  const playDoorbellSound = () => {
    // Create doorbell sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)

    // Second ding
    setTimeout(() => {
      const oscillator2 = audioContext.createOscillator()
      const gainNode2 = audioContext.createGain()

      oscillator2.connect(gainNode2)
      gainNode2.connect(audioContext.destination)

      oscillator2.frequency.value = 600
      oscillator2.type = 'sine'

      gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

      oscillator2.start(audioContext.currentTime)
      oscillator2.stop(audioContext.currentTime + 0.2)
    }, 100)
  }

  const playCelebrationSound = () => {
    // Create celebration sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [523.25, 659.25, 783.99, 1046.50] // C, E, G, C (major chord)

    notes.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = freq
        oscillator.type = 'sine'

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
      }, index * 150)
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Setup Screen
  if (gameState === 'setup') {
    return (
      <div className="container">
        <h1 className="title">🎮 ਪੰਜਾਬੀ ਚੈਕਰ 🎮</h1>
        <div className="setup-screen">
          <div className="input-group">
            <label htmlFor="numPlayers">Number of Players:</label>
            <input
              id="numPlayers"
              type="number"
              min="2"
              max="10"
              value={numPlayers}
              onChange={handleNumPlayersChange}
            />
          </div>

          <div className="player-names">
            <h2>Enter Player Names:</h2>
            {playerNames.map((name, index) => (
              <div key={index} className="input-group">
                <label>Player {index + 1}:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                  placeholder={`Enter name for Player ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <button className="start-button" onClick={startGame}>
            Start Game 🚀
          </button>
        </div>
      </div>
    )
  }

  // Playing Screen
  if (gameState === 'playing') {
    return (
      <div className="container">
        <h1 className="title">🎮 ਪੰਜਾਬੀ ਚੈਕਰ 🎮</h1>
        <div className="timer">
          ⏱️ Time: {formatTime(timer)}
        </div>

        <div className="game-screen">
          <div className="players-grid">
            {players.map((player, index) => (
              <div key={index} className="player-card">
                <button
                  className="player-button"
                  onClick={() => handlePlayerButtonClick(index)}
                >
                  {player.name}
                </button>
                <div className="score">Points: {player.score}</div>
              </div>
            ))}
          </div>

          <button className="end-button" onClick={endGame}>
            End Game 🏁
          </button>
        </div>
      </div>
    )
  }

  // Finished Screen
  if (gameState === 'finished') {
    return (
      <div className="container">
        <h1 className="title">🎮 ਪੰਜਾਬੀ ਚੈਕਰ 🎮</h1>
        <div className="finished-screen">
          <div className="winner-announcement">
            <h2>🎉 Winner{winner.length > 1 ? 's' : ''} 🎉</h2>
            {winner.map((w, index) => (
              <div key={index} className="winner-name">
                {w.name}
              </div>
            ))}
            <div className="winner-score">
              with {winner[0].score} point{winner[0].score !== 1 ? 's' : ''}!
            </div>
          </div>

          <div className="final-scores">
            <h3>Final Scores:</h3>
            {players
              .sort((a, b) => a.score - b.score)
              .map((player, index) => (
                <div key={index} className="score-row">
                  <span className="score-name">{player.name}</span>
                  <span className="score-points">{player.score} points</span>
                </div>
              ))}
          </div>

          <div className="game-stats">
            Total Time: {formatTime(timer)}
          </div>

          <button className="restart-button" onClick={resetGame}>
            Play Again 🔄
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default App
