(() => {
  const startGameBtn = document.querySelector('#player-vs-comp');
  const playCompVsCompBtn =document.querySelector('#comp-vs-comp');
  const introSection = document.querySelector('.intro');
  const gameSection = document.querySelector('.game');
  const choiceList = document.querySelectorAll('.choice-list img');
  const waitingSection =  document.querySelector('.choosing');
  const resultSection = document.querySelector('.result');

  const playAgainBtn = document.querySelector('#play-again-button');
  const changeModeButton = document.querySelector('#change-mode-button');

  let isPlayerVsComp = false;

  const startPlayerVsPlayerGame = (leftHandSelection, isPlayerVsComp = false) => {
    const playerHand = document.querySelector('.player-hand img');
    const computerHand = document.querySelector('.computer-hand img');
    const bothHands = document.querySelectorAll('.choosing img');

    bothHands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });

    const rightHandSelection = chooseRandomHand();

    console.log('Left Hand Selection: ', leftHandSelection);
    console.log('Right Hand Selection: ', rightHandSelection);

    // Set hands only after animation i.e., 3s
    setTimeout(() => {
      // Show the result actions
      resultSection.classList.remove('fade-out');
      resultSection.classList.add('fade-in');

      // Setting player hand selection
      playerHand.src = `./images/${leftHandSelection}.png`;
      computerHand.src = `./images/${rightHandSelection}.png`;
      computeWinner(leftHandSelection,rightHandSelection, isPlayerVsComp);
    }, 3000);
  };


  const chooseRandomHand = () => {
    const availableChoice = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);

    const randomSelection = availableChoice[randomNumber];
    return randomSelection;
  }


  const startComputerVsComputerGame = () => {
    // preserving user selection
    this.isPlayerVsComp = false;
    console.log('Game selection preserved (isPlayerVsComp)', this.isPlayerVsComp);

    const leftHandText = document.querySelector('.player-hand h2');
    const rightHandText= document.querySelector('.computer-hand h2');

    const leftPlayerHand = document.querySelector('.player-hand img');
    const rightPlayerHand = document.querySelector('.computer-hand img');

    // Hiding the intro section
    introSection.classList.add('fade-out');
    
    // Set Computer 1 and Computer 2 to the hands
    leftHandText.textContent = 'Computer 1';
    rightHandText.textContent = 'Computer 2';

    // Show Shaking Hands UI
    waitingSection.classList.remove('fade-out');
    waitingSection.classList.add('fade-in');

    // Add animation to the hands
    leftPlayerHand.style.animation = 'shakePlayerHand 3s ease';
    rightPlayerHand.style.animation = 'shakeComputerHand 3s ease';
    
    // Choose random values for both the players
    startPlayerVsPlayerGame(chooseRandomHand());
  }


  // A function to computer the winner and show the results
  const computeWinner = (playerChoice, ComputerChoice, isPlayerVsComp = false) => {
    const resultElement = document.querySelector('.result h2');
    const leftSideUser = isPlayerVsComp ? 'Player' : 'Computer 1';
    const rightSideUser = isPlayerVsComp ? 'Computer' : 'Computer 2';

    if(playerChoice === ComputerChoice) {
      resultElement.textContent = 'Match TIE!';
      console.log('Match TIE!');
      return;
    }

    // If the player choose rock
    if(playerChoice === 'rock') {
      if(ComputerChoice === 'scissors') {
        resultElement.textContent = `${leftSideUser} Wins`;
        console.log(`${leftSideUser} Wins`);
      } else {
        resultElement.textContent = `${rightSideUser} Wins`;
        console.log(`${rightSideUser} Wins`);
      }
      return;
    }

    // If the player choose paper
    if(playerChoice === 'paper') {
      if(ComputerChoice === 'rock') {
        resultElement.textContent = `${leftSideUser} Wins`;
        console.log(`${leftSideUser} Wins`);
      } else {
        resultElement.textContent = `${rightSideUser} Wins`;
        console.log(`${rightSideUser} Wins`);
      }
      return;
    }

    // If the player choose rock
    if(playerChoice === 'scissors') {
      if(ComputerChoice === 'paper') {
        resultElement.textContent = `${leftSideUser} Wins`;
        console.log(`${leftSideUser} Wins`);
      } else {
        resultElement.textContent = `${rightSideUser} Wins`;
        console.log(`${rightSideUser} Wins`);
      }
    }
  }


  // A function to Reset both hands
  const performCleanupWork = () => {
    const bothHands = document.querySelectorAll('.choosing img');
    bothHands.forEach(hand => hand.src = './images/rock.png' );
  }


  // Start Game Function
  startGameBtn.addEventListener('click', () => {
    // preserving user selection
    this.isPlayerVsComp = true;
    console.log('Game selection preserved (isPlayerVsComp)', this.isPlayerVsComp);

    // Hiding the intro section
    introSection.classList.remove('fade-in');
    introSection.classList.add('fade-out');
    
    // Showing the player's move choosing section
    gameSection.classList.remove('fade-out');    
    gameSection.classList.add('fade-in');
  });

  // Computer VS Computer Game
  playCompVsCompBtn.addEventListener('click', startComputerVsComputerGame);

  // Click action for all the buttons
  choiceList.forEach((option) => {
    option.addEventListener('click', function() {
      const leftHandText = document.querySelector('.player-hand h2');
      const rightHandText= document.querySelector('.computer-hand h2');

      const leftPlayerHand = document.querySelector('.player-hand img');
      const rightPlayerHand = document.querySelector('.computer-hand img');

      const playerChoice = this.alt;

      // Set Player and Computer to the hand names
      leftHandText.textContent = 'Player';
      rightHandText.textContent = 'Computer';

      startPlayerVsPlayerGame(playerChoice,true);

      // Hiding the player's move choosing section
      gameSection.classList.remove('fade-in');
      gameSection.classList.add('fade-out');

      // Showing the computer's move choosing section
      waitingSection.classList.remove('fade-out');
      waitingSection.classList.add('fade-in');

      // Add animation to the hands
      leftPlayerHand.style.animation = 'shakePlayerHand 3s ease';
      rightPlayerHand.style.animation = 'shakeComputerHand 3s ease';
    });
  });

  // Clean up for re-match
  playAgainBtn.addEventListener('click', () => {

    resultSection.classList.remove('fade-in');
    resultSection.classList.add('fade-out');

    // Reset Hands
    performCleanupWork();

    if (this.isPlayerVsComp) {
      waitingSection.classList.remove('fade-in');
      waitingSection.classList.add('fade-out');

      gameSection.classList.remove('fade-out');
      gameSection.classList.add('fade-in');
    } else {
      startComputerVsComputerGame();
    }
  });


  // Change mode section
  changeModeButton.addEventListener('click', () => {

    waitingSection.classList.remove('fade-in');
    waitingSection.classList.add('fade-out');

    resultSection.classList.remove('fade-in');
    resultSection.classList.add('fade-out');

    // Reset Hands
    performCleanupWork();

    introSection.classList.remove('fade-out');
    introSection.classList.add('fade-in');
  });
})();