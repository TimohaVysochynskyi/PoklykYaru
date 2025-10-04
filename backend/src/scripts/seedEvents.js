import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { EventsCollection } from '../models/event_management/events.js';

dotenv.config();

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_EVENTS_DB = process.env.MONGODB_EVENTS_DB;

const events = [
  {
    title: 'Літній табір',
    path: 'tabir',
    description: `Основний і наймасштабніший наш захід. Таборовий сезон дозволяє доторкнутися до нашої системи виховання молоді і в майбутньому продовжити рухатися разом з нами.

📌Табір наметового типу. Вихованці живуть в наметах по двоє. Намети надійні і захищені від дощу. Для певності варто сказати, що таборові виховники теж живуть в наметах поруч. Спимо на карематах (туристичний килимок) або матрацах і в спальних мішках. Наметами ми забезпечуємо, від вас треба спальник та каремат для дитини.
📌Харчування 3-разове. Кухар кваліфікований і працює з нами вже 4 роки. За цей час не було жодного випадку отруєння. Порції довільні і завжди можна отримати додаткову порцію. Раціон збалансований і меню складене згідно державних вимог.
📌На території є величезний навіс, де діти харчуються, проводять свій час і ховаються від негоди. Електрика і світло так само є. Зарядити телефони не проблема.
📌На час таборування телефони зберігаються в сейфі і видаються щодня на 1 годину для зв'язку з батьками.
📌Туалет і душ літнього типу. Доглянуті і охайні, адже з таких базових речей починається комфорт. Здоров'я вихованців для нас понад усе.
📌На таборі постійно присутня медсестра і охоронець. В разі серйозних травм або ускладнень є черговий автомобіль, яким швидко можна доїхати до лікарні.
📌Доїзд на табір входить у вартість путівки. Ми веземо вихованців автобусом з м.Черкаси і привозимо назад так само.
📌 Програма табору складається з активного відпочинку, отримання якісних знань під час гутірок(лекцій) з різних тем — історії, медіаграмотності, екосвідомості, ораторського мистецтва, практичних навичок з домедичної допомоги, базових навичок тактики та виживання в лісі, орієнтування і т.д.`,
    mainImage: 'https://via.placeholder.com/800x600?text=Tabir+Main+Image',
    galleryImages: [
      'https://via.placeholder.com/800x600?text=Tabir+Gallery+1',
      'https://via.placeholder.com/800x600?text=Tabir+Gallery+2',
      'https://via.placeholder.com/800x600?text=Tabir+Gallery+3',
      'https://via.placeholder.com/800x600?text=Tabir+Gallery+4',
      'https://via.placeholder.com/800x600?text=Tabir+Gallery+5',
      'https://via.placeholder.com/800x600?text=Tabir+Gallery+6',
    ],
    buttonText: '',
    buttonLink: '',
    order: 1,
  },
  {
    title: 'Зимовий похід ім. Ю. Горліс-Горського',
    path: 'pohid',
    description: `Наша команда, надихнувшись романом «Холодний Яр», вирішує традиційно проводити зимовий похід. І не просто похід, а втілити маршрути Горліс-Горського, які він описав в книзі.
Тому пропонуємо вам формулу, що стане ідеальним завершенням цього року:
Прочитати «Холодний Яар» Юрія Горліс-Горського ➕ Пройти зимовий похід, де враження від прочитаної книги наживо підкріплені красою зимового Холодного Яру.`,
    mainImage: 'https://via.placeholder.com/800x600?text=Pohid+Main+Image',
    galleryImages: [
      'https://via.placeholder.com/800x600?text=Pohid+Gallery+1',
      'https://via.placeholder.com/800x600?text=Pohid+Gallery+2',
      'https://via.placeholder.com/800x600?text=Pohid+Gallery+3',
      'https://via.placeholder.com/800x600?text=Pohid+Gallery+4',
      'https://via.placeholder.com/800x600?text=Pohid+Gallery+5',
      'https://via.placeholder.com/800x600?text=Pohid+Gallery+6',
    ],
    buttonText: '',
    buttonLink: '',
    order: 2,
  },
  {
    title: 'Туристичний змаг ім. Василя Чучупаки',
    path: 'zmah',
    description: `Весняний Холодний Яр чекає, щоб випробувати сміливців на витривалість та вміння орієнтуватися на місцевості.
🧭40 км та 12 годин запеклого шляху.
Маршрут, який підкорить лише найсильніший. Будь готовим до випробовувань, адже в Холодному Яру ніколи не буває просто😉`,
    mainImage: 'https://via.placeholder.com/800x600?text=Zmah+Main+Image',
    galleryImages: [
      'https://via.placeholder.com/800x600?text=Zmah+Gallery+1',
      'https://via.placeholder.com/800x600?text=Zmah+Gallery+2',
      'https://via.placeholder.com/800x600?text=Zmah+Gallery+3',
      'https://via.placeholder.com/800x600?text=Zmah+Gallery+4',
      'https://via.placeholder.com/800x600?text=Zmah+Gallery+5',
      'https://via.placeholder.com/800x600?text=Zmah+Gallery+6',
    ],
    buttonText: '',
    buttonLink: '',
    order: 3,
  },
  {
    title: 'Свято Покрови в Холодному Яру',
    path: 'pokrova',
    description: `Свято, яке стало традицією. Покрова щороку збирає в Холодному Яру кращих синів і дочок України. Там ми вшановуємо заслуги героїв, що поклали свої життя для України.`,
    mainImage: 'https://via.placeholder.com/800x600?text=Pokrova+Main+Image',
    galleryImages: [
      'https://via.placeholder.com/800x600?text=Pokrova+Gallery+1',
      'https://via.placeholder.com/800x600?text=Pokrova+Gallery+2',
      'https://via.placeholder.com/800x600?text=Pokrova+Gallery+3',
      'https://via.placeholder.com/800x600?text=Pokrova+Gallery+4',
      'https://via.placeholder.com/800x600?text=Pokrova+Gallery+5',
      'https://via.placeholder.com/800x600?text=Pokrova+Gallery+6',
    ],
    buttonText: '',
    buttonLink: '',
    order: 4,
  },
];

async function seedEvents() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_EVENTS_DB}?retryWrites=true&w=majority`,
    );
    console.log('✅ Connected to MongoDB');

    // Clear existing events
    await EventsCollection.deleteMany({});
    console.log('🗑️  Cleared existing events');

    // Insert new events
    const insertedEvents = await EventsCollection.insertMany(events);
    console.log(`✅ Inserted ${insertedEvents.length} events:`);

    insertedEvents.forEach((event) => {
      console.log(`   - ${event.title} (${event.path})`);
    });

    console.log(
      '\n⚠️  IMPORTANT: You need to upload images to Cloudinary and update the events:',
    );
    console.log(
      '   1. Upload mainImage for each event to Cloudinary folder: PoklykYaru/events/',
    );
    console.log(
      '   2. Upload 6 gallery images for each event to: PoklykYaru/events/gallery/',
    );
    console.log(
      '   3. Use the admin panel to edit each event and add the image URLs',
    );
    console.log(
      '   4. Or manually update the events in MongoDB with Cloudinary URLs\n',
    );

    console.log('Event IDs for reference:');
    insertedEvents.forEach((event) => {
      console.log(`   ${event.title}: ${event._id}`);
    });
  } catch (error) {
    console.error('❌ Error seeding events:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  }
}

seedEvents();
