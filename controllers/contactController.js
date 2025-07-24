const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    req.flash('success', 'Mesajınız başarıyla gönderildi!');
    res.redirect('/contact');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Mesaj gönderilirken bir hata oluştu.');
    res.redirect('/contact');
  }
};
