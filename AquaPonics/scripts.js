// const firebaseConfig = {
//   apiKey: "AIzaSyDHlHS5EL-psNtbg7_nsJDtCkdVkk7JAjs",
//   authDomain: "aquaponics-eaac3.firebaseapp.com",
//   databaseURL: "https://aquaponics-eaac3-default-rtdb.firebaseio.com",
//   projectId: "aquaponics-eaac3",
//   storageBucket: "aquaponics-eaac3.appspot.com",
//   messagingSenderId: "462536866554",
//   appId: "1:462536866554:web:1b9c61b2ee141c0d096743",
//   measurementId: "G-1BMYY789WC"
// };
//
// var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
// starCountRef.on('value', (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });


const pollData = [
  {
    option: "Sunlight",
    votes: 11,
    color: "rgb(255, 99, 132)"
  },
  {
    option: "Temperature",
    votes: 8,
    color: "rgb(54, 162, 235)"
  },
  {
    option: "Humidity",
    votes: 11,
    color: "rgb(36, 36, 36)"
  },
  {
    option: "Water level",
    votes: 5,
    color: "rgb(255, 159, 64)"
  },
  {
    option: "Fish food",
    votes: 3,
    color: "rgb(75, 192, 192)"
  },
  {
    option: "Oxygen",
    votes: 8,
    color: "rgb(255, 206, 86)"
  },
  {
    option: "Carbon-dioxide",
    votes: 10,
    color: "rgb(153, 102, 255)"
  }
];

pollData2 = [
  {
    option: "Fish Tank",
    votes: 11,
    color: "rgb(84,166,187)"
  },
  {
    option: "Plant bed",
    votes: 11,
    color: "rgb(67,177,138)"
  },
];

pollData3 = [
  {
    option: "Humidity level",
    votes: 55,
    color: "rgb(222,212,170)"
  },
  {
  option: "Other",
  votes: 45,
  color: "rgb(255,255,255)"
  }
];

const pollForm = document.querySelector("#pollForm");

pollForm.addEventListener("submit", pollFormSubmit);

function pollFormSubmit(event) {
  event.preventDefault();
  const pollOptionInput = pollForm.querySelector("input[name='pollOptions']:checked");
  if(pollOptionInput) {
    const pollOptionValue = pollOptionInput.value;
    pollData.find(pollOption => pollOption.option === pollOptionValue).votes--;
    if(pollData.find(pollOption => pollOption.option === pollOptionValue).votes-- <= 6){
      swal({
        title: "AquaPonics system in danger!!",
        text: "Please check if supplies are alright",
        icon: "warning",
        button: "Ok",
      });
    }
    pollChart.data.datasets[0].data = pollData.map(pollOption => pollOption.votes);
    pollChart.update();
    pollForm.reset();
  }
}


function rgbToRgba(rgb, alpha=1) {
  return `rgba(${rgb.substring(rgb.indexOf('(')+1, rgb.length-1).split(',').join()}, ${alpha})`;
}

Chart.defaults.global.defaultFontFamily = '"Comic Sans MS", cursive, sans-serif';

const ctx = document.getElementById('chart').getContext('2d');
const pollChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: pollData.map(pollOption => pollOption.option),
    datasets: [{
      label: '# of Votes',
      data: pollData.map(pollOption => pollOption.votes),
      backgroundColor: pollData.map(pollOption => rgbToRgba(pollOption.color, 0.75)),
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    title: {
      display: true,
      text: 'Necessary Parameters',
      fontColor: "#333",
      fontSize: 20,
      padding: 20
    },
    legend: {
      display: false,
    }
  }
});

const ctx2 = document.getElementById('chart2').getContext('2d');
const pollChart2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: pollData2.map(pollOption => pollOption.option),
    datasets: [{
      label: '# of Votes',
      data: pollData2.map(pollOption => pollOption.votes),
      backgroundColor: pollData2.map(pollOption => rgbToRgba(pollOption.color, 0.75)),
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      xAxes: [{
            barPercentage: 0.4
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    title: {
      display: true,
      text: 'Water levels',
      fontColor: "#333",
      fontSize: 20,
      padding: 20
    },
    legend: {
      display: false,
    }
  }
});

const ctx3 = document.getElementById('chart3').getContext('2d');
const pollChart3 = new Chart(ctx3, {
  type: 'doughnut',
  data: {
    labels: pollData3.map(pollOption => pollOption.option),
    datasets: [{
      label: '# of Votes',
      data: pollData3.map(pollOption => pollOption.votes),
      backgroundColor: pollData3.map(pollOption => rgbToRgba(pollOption.color, 0.75)),
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    title: {
      display: true,
      text: 'Humidity',
      fontColor: "#333",
      fontSize: 20,
      padding: 20
    },
    legend: {
      display: false,
    }
  }
});
