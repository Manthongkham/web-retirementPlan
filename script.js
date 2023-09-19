document.addEventListener('DOMContentLoaded', function () {
    let currentAge, startingBalance, targetAge, targetBalance, annualContribution, interestRate;
    
    function validateInput(input, minValue = 0, errorMessage) {
      let value = parseFloat(input.value);
      while (isNaN(value) || value < minValue) {
        input.value = '';
        value = parseFloat(prompt(errorMessage));
      }
      return value;
    }
  
    function calculateGrowth() {
      const outputGrowth = document.getElementById('output-growth');
      outputGrowth.innerHTML = '<h2>Projected Growth:</h2><pre>Age\tYear Start\tGrowth\t\tExtra\t\tYear End</pre>';
  
      let yearStart = startingBalance;
      let stopYear = targetAge;
  
      for (let x = currentAge; x <= targetAge; x++) {
        let yearStart2 = yearStart;
  
        for (let y = x; y < targetAge; y++) {
          const growth2 = yearStart2 * interestRate;
          const yearEnd2 = yearStart2 + growth2;
  
          if (yearEnd2 >= targetBalance) {
            stopYear = x;
          } else {
            yearStart2 = yearEnd2;
          }
        }
  
        const growth = yearStart * interestRate;
  
        if (x >= stopYear) {
          annualContribution = 0;
        }
  
        const yearEnd = yearStart + growth + annualContribution;
  
        outputGrowth.innerHTML += `<pre>${x}\t$${yearStart.toFixed(2)}\t$${growth.toFixed(2)}\t$${annualContribution.toFixed(2)}\t$${yearEnd.toFixed(2)}</pre>`;
  
        if (x >= targetAge) {
          if (yearEnd < targetBalance) {
            outputGrowth.innerHTML += "<p>Sorry, that target is unreachable :(</p>";
          }
          break;
        } else {
          yearStart = yearEnd;
        }
      }
  
      if (yearEnd >= targetBalance) {
        outputGrowth.innerHTML += `<p>Yay! You can reach that goal by contributing your annual amount for ${x} year(s) until age ${currentAge + x}, then coasting the rest of the way to ${targetAge}.</p>`;
      }
    }
  
    document.getElementById('calculate-button').addEventListener('click', function () {
      currentAge = validateInput(document.getElementById('current-age'), 0, 'Current age cannot be negative, try again:');
      startingBalance = validateInput(document.getElementById('starting-balance'), 0, 'Starting balance cannot be negative, try again:');
      targetAge = validateInput(document.getElementById('target-age'), currentAge, 'Target retirement age cannot be less than current age, try again:');
      targetBalance = validateInput(document.getElementById('target-balance'), startingBalance, 'Target balance at retirement cannot be less than starting balance, try again:');
      annualContribution = validateInput(document.getElementById('annual-contribution'), 0, 'Annual contribution amount cannot be negative, try again:');
      interestRate = validateInput(document.getElementById('interest-rate'), 0, 'Projected annual growth rate (percent) cannot be negative, try again:') / 100;
  
      calculateGrowth();
    });
  });
  