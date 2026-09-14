(function () {
  "use strict";

  const forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const loading = form.querySelector('.loading');
      const errorBox = form.querySelector('.error-message');
      const successBox = form.querySelector('.sent-message');

      if (loading) loading.classList.remove('d-block');
      if (errorBox) {
        errorBox.textContent = '';
        errorBox.classList.remove('d-block');
      }
      if (successBox) successBox.classList.remove('d-block');

      const formData = new FormData(form);
      const name = (formData.get('name') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const phone = (formData.get('phone') || '').toString().trim();
      const subject = (formData.get('subject') || '').toString().trim();
      const date = (formData.get('date') || '').toString().trim();
      const time = (formData.get('time') || '').toString().trim();
      const people = (formData.get('people') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();

      const isBooking = phone || date || time || people;

      if (isBooking) {
        if (!name || !email || !phone || !date || !time || !people) {
          if (errorBox) {
            errorBox.textContent = 'Please fill in all required booking fields.';
            errorBox.classList.add('d-block');
          }
          return;
        }
      } else {
        if (!name || !email || !subject || !message) {
          if (errorBox) {
            errorBox.textContent = 'Please fill in all required contact fields.';
            errorBox.classList.add('d-block');
          }
          return;
        }
      }

      let whatsappText = '';

      if (isBooking) {
        whatsappText = `Hello Muzneysal Bites & Grill, I would like to book a table. Name: ${name}. Email: ${email}. Phone: ${phone}. Date: ${date}. Time: ${time}. People: ${people}. Message: ${message}`;
      } else {
        whatsappText = `Hello Muzneysal Bites & Grill, I would like to send a message. Name: ${name}. Email: ${email}. Subject: ${subject}. Message: ${message}`;
      }

      const whatsappUrl = `https://wa.me/255683285852?text=${encodeURIComponent(whatsappText)}`;
      const popup = window.open(whatsappUrl, '_blank', 'noopener');

      if (successBox) successBox.classList.add('d-block');
      form.reset();

      if (!popup) {
        window.location.href = whatsappUrl;
      }
    });
  });
})();
