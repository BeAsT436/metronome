// Глобальні змінні
let isMetronomeRunning = false;
let interval;
const audioClick = new Audio("stick.wav"); // Заміни шлях на ваш файл для першого звуку
const audioSecond = new Audio("click.wav"); // Заміни шлях на ваш файл для другого звуку
let savedSettingsArray = [];

// Функція для запуску / зупинки метроному
function startStopMetronome() {
  tempoInput = document.querySelector("#tempoInput");
  secondNumberInput = document.querySelector("#secondNumberInput");
  tempo = Math.floor(tempoInput.value);
  secondNumber = Math.floor(secondNumberInput.value) || 0; // За замовчуванням 0, якщо порожнє

  if (isNaN(tempo) || isNaN(secondNumber) || tempo <= 0 || secondNumber < 0) {
    alert("Будь ласка, введіть дійсні числа для темпу та другого числа.");
    return;
  }
  if (isMetronomeRunning) {
    clearInterval(interval);
    isMetronomeRunning = false;
    document.querySelector("button").innerText = "Старт";
  } else {
    let count = 0; // Лічильник для другого звуку
    const totalSounds = secondNumber - 1; // Обчислити загальну кількість звуків

    interval = setInterval(() => {
      if (count < totalSounds) {
        // Грати перший звук до досягнення вказаного лічильника
        audioClick.play();
      } else {
        // Грати другий звук один раз
        audioSecond.play();
      }
      // Ви також можете додати візуальний сигнал, наприклад, змінюючи колір фону або додавання анімації
      document.body.style.backgroundColor =
        count < totalSounds ? "lightgreen" : "lightblue";

      count = (count + 1) % (totalSounds + 1); // Повторити шаблон після гри обох звуків

      setTimeout(() => {
        // Скидання візуального сигналу після короткої затримки
        document.body.style.backgroundColor = "";
      }, 100); // Налаштуйте затримку за потреби
    }, 60000 / tempo);
    isMetronomeRunning = true;
    document.querySelector("button").innerText = "Стоп";
  }
}
// Функція для збереження налаштувань
function saveSettings() {
  const tempoInput = document.querySelector("#tempoInput");
  const secondNumberInput = document.querySelector("#secondNumberInput");
  const tempo = tempoInput.value;
  const secondNumber = secondNumberInput.value || 0; // За замовчуванням 0, якщо порожнє

  const settingsName = prompt("Введіть назву для ваших налаштувань:");
  if (settingsName) {
    const userSettings = {
      name: settingsName,
      tempo: tempo,
      secondNumber: secondNumber,
    };

    // Додати збережені налаштування до масиву
    savedSettingsArray.push(userSettings);

    // Зберегти оновлений масив в локальному сховищі
    localStorage.setItem(
      "savedSettingsArray",
      JSON.stringify(savedSettingsArray)
    );

    alert("Налаштування успішно збережено!");

    // Перезавантажити список збережених налаштувань
    loadSavedSettings();
  }
}
// Функція для завантаження налаштувань
function loadSettings(settingsName) {
  // Знайти налаштування в масиві
  userSettings = savedSettingsArray.find(
    (settings) => settings.name === settingsName
  );

  if (userSettings) {
    // Завантажити налаштування
    document.querySelector("#tempoInput").value = userSettings.tempo;
    document.querySelector("#secondNumberInput").value =
      userSettings.secondNumber || 0;
  } else {
    alert("Налаштування не знайдено.");
  }
}

// Функція для завантаження збережених налаштувань
function loadSavedSettings() {
  const savedSettingsContainer = document.querySelector("#savedSettings");
  savedSettingsContainer.innerHTML = "";

  // Перебрати масив збережених налаштувань
  savedSettingsArray.forEach((settings) => {
    const loadButton = document.createElement("button");
    loadButton.innerText = `Завантажити ${settings.name}`;
    loadButton.addEventListener("click", () => loadSettings(settings.name));

    savedSettingsContainer.appendChild(loadButton);
  });
}

// Завантажити масив збережених налаштувань при завантаженні сторінки
document.querySelector("#DOMContentLoaded", () => {
  // Отримати масив збережених налаштувань з локального сховища
  const storedSettingsArray = localStorage.getItem("savedSettingsArray");
  console.log(storedSettingsArray);
  savedSettingsArray = storedSettingsArray
    ? JSON.parse(storedSettingsArray)
    : [];

  // Відобразити збережені налаштування
  loadSavedSettings();
});
