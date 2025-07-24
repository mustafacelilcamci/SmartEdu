const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

// MongoDB'ye bağlan
mongoose
  .connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected Successfully'))
  .catch((err) => console.log('DB Connection Error:', err));

// Template engine
app.set('view engine', 'ejs');

// Global değişken
global.userIN = null;

// Yıl bilgisi gibi global değişkenleri template'lere taşı
app.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  next();
});

// Static dosyalar
app.use(express.static('public'));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
  })
);

// Flash mesajlar
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// Method override
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// Kullanıcıyı kontrol et
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});

// Routes
app.use('/', pageRoute); // ✅ SADECE bu yeterli
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

// Server başlat
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
