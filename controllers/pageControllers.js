const Footer = require('../models/Footer');
const Course = require('../models/Course'); // Course modelini ekle

exports.getHomePage = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    const courses = await Course.find().sort({ createdAt: -1 }).limit(3); // En yeni 3 kursu al

    res.render('index', {
      footer,
      currentYear: new Date().getFullYear(),
      courses // buraya courses eklendi
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Sunucu hatası');
  }
};
 // Öğretmen modelini dahil et

exports.getAboutPage = async (req, res) => {
  try {
    const teachers = await Teacher.find(); // MongoDB'den öğretmenleri çek

    res.render('about', {
      page_name: 'about',
      teachers, // EJS'e öğretmenleri gönderiyoruz
    });
  } catch (err) {
    console.error("About sayfası hatası:", err);
    res.status(500).send("Sunucu Hatası");
  }
};
