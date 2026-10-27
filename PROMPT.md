# Portfolio sayt uchun PROMPT (AI'ga berish uchun)

Quyidagi promptni ChatGPT / Claude / boshqa AI'ga nusxalab bersangiz, shu landing pagega o'xshash sayt yaratib beradi.

---

**Rol:** Sen senior frontend dasturchi va creative dizaynersan.

**Vazifa:** Dasturchi **Diyoraxon Mirzayeva** uchun juda creative, zamonaviy shaxsiy portfolio landing page yarat.

**Texnologiyalar:** faqat toza HTML5, CSS3, vanilla JavaScript (framework yo'q).

**Fayl strukturasi (alohida papkalarda):**
```
portfolio/
├── index.html
├── css/style.css
├── js/main.js        (interaktivlik)
├── js/i18n.js        (tarjimalar)
└── images/           (profile.jpg, project1-4, favicon)
```

**Talablar:**
1. **Ikki rejim:** Dark / Light. Tugma bilan almashadi, tanlov `localStorage`da saqlanadi, CSS o'zgaruvchilari (`:root` va `[data-theme="light"]`) orqali ishlaydi, tizim rejimini avtomatik aniqlaydi.
2. **Ikki til:** UZ va EN. Barcha matn `data-i18n` atributi orqali `i18n.js` obyektidan olinadi; tugma bilan almashadi, tanlov saqlanadi.
3. **Bo'limlar:** Hero (ism, yozilayotgan lavozimlar, profil rasm) → harakatlanuvchi yozuv (marquee) → Men haqimda (+ raqam sanagich) → Ko'nikmalar (progress barlar) → Loyihalar (4 ta karta) → Yo'l (timeline) → Aloqa → Footer.
4. **Creative effektlar:**
   - fonda zarrachalar (canvas), sichqonchaga reaksiya beradi;
   - maxsus kursor (halqa + nuqta);
   - magnit tugmalar va 3D tilt kartalar;
   - morph shakldagi profil rasm, atrofida suzuvchi kod-chiplar;
   - gradientli, "shine" animatsiyali sarlavha;
   - typing effekti (til almashganda lavozimlar ham almashadi);
   - scroll reveal (IntersectionObserver), scroll progress chizig'i;
   - yashirin easter egg.
5. **Dizayn:** gradient (pushti → binafsha → firuza), shisha (glassmorphism) kartalar, shriftlar: Syne, Space Grotesk, JetBrains Mono. Katta tipografiya, ko'p bo'sh joy.
6. **Responsive:** mobil birinchi, burger menyu, `prefers-reduced-motion` ni hurmat qilish.
7. **Sifat:** semantik HTML, alt matnlar, SEO meta teglar, ravon 60fps animatsiya, izohli va toza kod.
8. Profil rasm `images/profile.jpg`, loyiha rasmlari `images/project1.svg ... project4.svg` — foydalanuvchi keyin o'z rasmlariga almashtiradi.

**Natija:** barcha fayllarni to'liq kod bilan, har birini alohida blokda ber.
