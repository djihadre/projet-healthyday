function calculateCalories() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const activity = document.getElementById("activity").value;
  const goal = document.getElementById("goal").value;

  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityFactor =
    activity === "low" ? 1.2 : activity === "medium" ? 1.55 : 1.725;

  let totalCalories = Math.round(bmr * activityFactor);

  // Adjust calories based on goal
  if (goal === "loss") totalCalories -= 400;
  else if (goal === "gain") totalCalories += 400;

  document.getElementById("result").innerHTML =
    `You need approximately <strong>${totalCalories}</strong> kcal per day 🌿`;

  // Suggested meals
  const meals = {
    loss: [
      "🥣 Breakfast: Oatmeal with milk & fruits",
      "🥗 Lunch: Tuna salad with brown bread",
      "🍵 Dinner: Vegetable soup + Apple"
    ],
    maintain: [
      "🍳 Breakfast: Eggs + Whole bread + Milk",
      "🥙 Lunch: Grilled chicken + Rice + Veggies",
      "🍓 Dinner: Yogurt + Fruits"
    ],
    gain: [
      "🥞 Breakfast: Peanut butter + Banana + Milk",
      "🍝 Lunch: Pasta with chicken & olive oil",
      "🍫 Dinner: Nuts + Dark chocolate"
    ]
  };

  const mealsList = meals[goal].map(m => `<li>${m}</li>`).join("");
  document.getElementById("result").innerHTML += `<ul>${mealsList}</ul>`;

  showNutritionChart();
}

function showNutritionChart() {
  const ctx = document.getElementById("nutritionChart").getContext("2d");

  if (window.nutritionChart) {
    window.nutritionChart.destroy();
  }

  const data = {
    labels: ["Carbs 🍚", "Protein 🥩", "Fats 🥑"],
    datasets: [
      {
        data: [50, 25, 25],
        backgroundColor: ["#f4a261", "#2a9d8f", "#e76f51"]
      }
    ]
  };

  const options = {
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Macronutrient Distribution"
      }
    }
  };

  window.nutritionChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: options
  });
}