const config = {
  data: {
    title: "Даша & Данил",
    description: "Свадебное приглашение Даши и Данила",
    coupleNames: "Даша & Данил",
    groomName: "Данил",
    brideName: "Даша",
    weddingDate: new Date(2026, 8, 12, 15, 30, 0),
    weddingDay: 12,
    weddingMonth: "Сентябрь",
    calendarFirstDay: 1,
    calendarDaysInMonth: 30,
    greeting:
      "Совсем скоро наступит очень важный и особенный для нас день. Мы приглашаем вас разделить эту радость вместе с нами.",
    location: {
      name: "Название ресторана",
      address: "Город, ул. Примерная, д. 1",
      mapsUrl: "https://maps.google.com",
    },
    schedule: [
      { time: "11:00", name: "Венчание", place: "ул. Осенняя, 24" },
      { time: "15:00", name: "Велком", place: "на турбазе" },
      { time: "16:00", name: "Банкет", place: "" },
    ],
    dressCode: {
      text: "Мы очень старались сделать праздник особенным и будем рады, если в своих нарядах Вы поддержите стиль нашей свадьбы данными оттенками:",
      colors: ["#F0C4CB", "#C87D87", "#FBEAD6", "#6B7556", "#E5BCA9"],
    },
    gifts: {
      money:
        "Мы будем благодарны любому знаку внимания! Но самый удобный и практичный вариант для нас — это конверт.",
      flowers:
        "Задумываетесь о цветах? Мы будем рады, если вместо традиционного букета вы перечислите любую сумму для декора. Эти цветы украсят столы прямо на празднике, а нам не придётся заботиться об их хранении после торжества.",
    },
    audio: {
      src: "/audio/fulfilling-humming.mp3",
      title: "Fulfilling Humming",
      autoplay: true,
      loop: true,
    },
    ogImage: "/images/og-image.jpg",
    favicon: "/images/favicon.ico",
  },
};

export default config;
