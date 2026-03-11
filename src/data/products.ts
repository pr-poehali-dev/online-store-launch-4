export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  description: string;
  details: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  image: string;
  images: string[];
}

const placeholder = (seed: number, w = 600, h = 700) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const products: Product[] = [
  {
    id: 1,
    name: "Керамическая ваза Lune",
    price: 4900,
    category: "Декор",
    description: "Лаконичная ваза ручной работы из белой глины. Каждое изделие уникально — небольшие неровности поверхности подчёркивают живой характер материала.",
    details: ["Белая глина", "Высота 28 см", "Ручная работа", "Для сухих и живых цветов"],
    rating: 4.9,
    reviews: 38,
    inStock: true,
    isNew: true,
    image: placeholder(10),
    images: [placeholder(10), placeholder(20), placeholder(30)],
  },
  {
    id: 2,
    name: "Кожаный кошелёк Fold",
    price: 6200,
    oldPrice: 7800,
    category: "Аксессуары",
    description: "Тонкий бумажник из натуральной зернистой кожи с минималистичным дизайном. Вмещает до 8 карт и наличные.",
    details: ["Зернистая кожа", "12 × 9 см", "8 отсеков для карт", "Коробочная упаковка"],
    rating: 4.7,
    reviews: 52,
    inStock: true,
    isSale: true,
    image: placeholder(11),
    images: [placeholder(11), placeholder(21), placeholder(31)],
  },
  {
    id: 3,
    name: "Беспроводные наушники Arc",
    price: 12900,
    category: "Электроника",
    description: "Накладные наушники с активным шумоподавлением и 30 часами работы от батареи. Лёгкий алюминиевый обруч, мягкие амбушюры.",
    details: ["30 ч работы", "ANC", "Bluetooth 5.3", "Складная конструкция"],
    rating: 4.8,
    reviews: 91,
    inStock: true,
    image: placeholder(12),
    images: [placeholder(12), placeholder(22), placeholder(32)],
  },
  {
    id: 4,
    name: "Хлопковый плед Brume",
    price: 3400,
    category: "Текстиль",
    description: "Мягкий плед из органического хлопка с фактурным плетением. Идеален для осенних вечеров.",
    details: ["100% органический хлопок", "130 × 170 см", "Стирка при 30°C", "Сертификат GOTS"],
    rating: 4.6,
    reviews: 27,
    inStock: true,
    image: placeholder(13),
    images: [placeholder(13), placeholder(23), placeholder(33)],
  },
  {
    id: 5,
    name: "Ароматическая свеча Cedar",
    price: 1800,
    category: "Ароматы",
    description: "Свеча из соевого воска с эфирными маслами кедра и сандала. Время горения — 45 часов.",
    details: ["Соевый воск", "45 ч горения", "Эфирные масла", "Стеклянный стакан"],
    rating: 4.9,
    reviews: 64,
    inStock: true,
    isNew: true,
    image: placeholder(14),
    images: [placeholder(14), placeholder(24), placeholder(34)],
  },
  {
    id: 6,
    name: "Рюкзак Canvas Nord",
    price: 8900,
    oldPrice: 10500,
    category: "Аксессуары",
    description: "Вместительный рюкзак из плотного хлопкового холста с кожаными деталями. Отсек для ноутбука 15\".",
    details: ["Хлопок + кожа", "25 литров", "Ноутбук 15\"", "Водоотталкивающая пропитка"],
    rating: 4.7,
    reviews: 43,
    inStock: false,
    isSale: true,
    image: placeholder(15),
    images: [placeholder(15), placeholder(25), placeholder(35)],
  },
  {
    id: 7,
    name: "Деревянный органайзер Slot",
    price: 2900,
    category: "Декор",
    description: "Настольный органайзер из дуба для канцелярии и гаджетов. Сдержанная форма впишется в любой интерьер.",
    details: ["Дуб", "30 × 15 × 8 см", "3 отсека", "Натуральное масло"],
    rating: 4.5,
    reviews: 19,
    inStock: true,
    image: placeholder(16),
    images: [placeholder(16), placeholder(26), placeholder(36)],
  },
  {
    id: 8,
    name: "Стеклянная бутылка Dew",
    price: 1400,
    category: "Кухня",
    description: "Бутылка из боросиликатного стекла с бамбуковой крышкой. 750 мл. Выдерживает температуры от -20 до +120°C.",
    details: ["Боросиликатное стекло", "750 мл", "Бамбуковая крышка", "Термостойкость"],
    rating: 4.8,
    reviews: 77,
    inStock: true,
    image: placeholder(17),
    images: [placeholder(17), placeholder(27), placeholder(37)],
  },
];

export const categories = ["Все", "Декор", "Аксессуары", "Электроника", "Текстиль", "Ароматы", "Кухня"];

export const faqItems = [
  {
    question: "Как быстро приходит заказ?",
    answer: "Доставка по Москве — 1–2 рабочих дня. По России — 3–7 дней в зависимости от региона. Экспресс-доставка возможна в день заказа при оформлении до 12:00."
  },
  {
    question: "Как оплатить заказ?",
    answer: "Принимаем карты Visa, Mastercard, МИР, а также оплату через СБП, ЮKassa и наличными при получении."
  },
  {
    question: "Можно ли вернуть товар?",
    answer: "Да, в течение 14 дней с момента получения при условии сохранности товарного вида и упаковки. Для возврата свяжитесь с нами любым удобным способом."
  },
  {
    question: "Есть ли самовывоз?",
    answer: "Да, самовывоз из нашего шоурума по адресу: Москва, ул. Кузнецкий Мост, 9. Режим работы: пн–пт 10:00–20:00, сб–вс 11:00–19:00."
  },
  {
    question: "Можно ли заказать подарочную упаковку?",
    answer: "Конечно! При оформлении заказа выберите опцию «Подарочная упаковка». Стоимость — 290 рублей. Также можем добавить открытку с вашим текстом."
  },
  {
    question: "Работаете ли вы с юридическими лицами?",
    answer: "Да, работаем по договору с НДС и без. Для корпоративных закупок напишите на order@example.com — обсудим условия и скидки от объёма."
  },
];
