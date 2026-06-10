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
      text: "Мы будем благодарны, если вы поддержите цветовую гамму нашего торжества.",
      colors: ["#F0C4CB", "#C87D87", "#FBEAD6", "#6B7556", "#E5BCA9"],
    },
    gifts: {
      text: "Чтобы не утруждать вас поиском подарков, мы будем рады принять ваши поздравления в конвертах. Приятным комплиментом для нас вместо цветов будет бутылочка любимого вина.",
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
