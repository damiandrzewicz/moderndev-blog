// Example of UML
@startuml
strict digraph meme {
  exists [color=blue]
  authenticate [color=blue]
  require
  create
  UserCreated
  destroy
  UserDestroyed
  get [color=blue]
  authenticate -> require
  create -> UserCreated
  destroy -> require
  destroy -> UserDestroyed
  get -> require
}
@enduml

// Example of LaTeX
$x^2 + x_2 = x^2 + x_2$

// Example of ChartJS
```chart
{
  "type": "bar",
  "data": {
    "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    "datasets": [{
      "label": "Salary",
      "data": [12, 19, 3, 5, 2, 3],
      "backgroundColor": [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ]
    }]
  },
  "options": {
    "scales": {
      "y": {
        "ticks": {
          "beginAtZero": true,
          "callback": "function(value){ return '￥' + value + 'k'; }"  // functions should be stringified before being passed through `callback`
        }
      }
    }
  }
}