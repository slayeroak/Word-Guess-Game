$(document).ready(function() {

    var gameTickerArry = ["aapl", "acb", "amzn", "amd", "ba", "baba", "bac", "bayry", "bynd", "cat", "cgc", "d", "dis",
                            "etsy", "f", "fb", "ge", "goog", "hpq", "hmy", "ibm", "irdm","jnj", "jpm", "k", "keys", "lmt",
                             "lulu", "msft", "mcd", "nflx", "nok", "qcom", "rad", "roku", "shop", "snap", "tlry", "tmus",
                             "tsg", "tsla", "uber", "ua", "vs", "vz", "wmt", "work", "yelp", "yten", "znga", "zm",]

    const maxGuess = 10
    var pauseGame = false


    // Game Variables

    var guessedLetters = []
    var guessingTicker = []
    var tickerMatch
    var numGuess
    var wins = 0


    resetGame()

    // Grabs key press and passes the event through the block
    document.onkeypress = function(event) {
        // makes sure the event is an alpha char
        if (isAlpha(event.key) && !pauseGame) {
            letterCheck(event.key.toUpperCase())
        }
    }

    // Game Functions

    function letterCheck(letter) {
        var foundLetter = false
        // var correctSound = document.createElement("audio")
        // var incorrectSound = document.createElement("audio")
        // correctSound.setAttribute("src", "")
        // incorrectSound.setAttribute("src", "")

        // search string for letter
        for ( var i = 0; i < tickerMatch.length; i++)  {
            if (letter === tickerMatch[i]) {
                guessingTicker[i] = letter
                foundLetter = true
                // correctSound.play

                // If guessing word matches random ticker
                if (guessingTicker.join("") === tickerMatch) {
                    // increment wins 
                    wins++
                    pauseGame = true
                    updateDisplay()
                    setTimeout(resetGame, 5000)
                }
            }
        }

        if (!foundLetter) {
            // incorrectSound.play()
            // check if incorrect guess is on the list
            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter)
                // subtract 1 from remaining guess
                numGuess--
            }
            if(numGuess ===0) {
                // display ticker before game reset
                guessingTicker = tickerMatch.split()
                pauseGame = true
                setTimeout(resetGame, 5000)
            }
        }
        updateDisplay()
    }

    // Checks if key pressed is A-Z a-z
    function isAlpha (ch) {
        return /^[A-Z]$/i.test(ch);
    }

    function resetGame() {
        numGuess = maxGuess
        pauseGame = false

        // Get a new word
        tickerMatch = gameTickerArry[Math.floor(Math.random() * gameTickerArry.length)].toUpperCase()
        console.log(tickerMatch)

        // Reset the guessing word
        for (var i = 0; i < tickerMatch.length; i++) {
            // space instead of underscore
            if (tickerMatch[i] === " ") {
                guessingTicker.push(" ")
            } else {
                guessingTicker.push("_")
            }
        }

        updateDisplay()
    }

    function updateDisplay () {
        document.getElementById("totalWins").innerText = wins
        document.getElementById("currentTicker").innerText = guessingTicker.join("")
        document.getElementById("guessesRemaining").innerText = numGuess
        document.getElementById("guessedLetters").innerText = guessedLetters.join(" ")
    }


})