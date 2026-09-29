// Texts are shared by all four language versions. Add approved content here.
export const text = (de, en, el, ar) => ({ de, en, el, ar });
export const languages = [
  { code: 'en', label: '🇬🇧 English' },
  { code: 'de', label: '🇩🇪 Deutsch' },
  { code: 'el', label: '🇬🇷 Ελληνικά' },
  { code: 'ar', label: '🇸🇦 العربية' },
];
export const site = {
  name: 'Philadelphia International Ministry',
  // Retained from the uploaded project. Confirm with the ministry before publication.
  address: ['3is Septemvriou 172', '112 51 Athens, Greece'],
  email: '',
  phone: '',
  mapsUrl: 'https://maps.app.goo.gl/TbjQwo56L2znnzoF6?g_st=iw',
  donationUrl: '',
  socialLinks: [], // Example: { name: 'Instagram', url: 'https://...' }
};
export const ui = {
  menu: text('Menü', 'Menu', 'Μενού', 'القائمة'),
  navigation: text('Seitennavigation', 'Website navigation', 'Πλοήγηση ιστοτόπου', 'التنقل في الموقع'),
  overview: text('Alle Seiten', 'All pages', 'Όλες οι σελίδες', 'جميع الصفحات'),
  close: text('Menü schließen', 'Close menu', 'Κλείσιμο μενού', 'إغلاق القائمة'),
  sections: text('Unterpunkte anzeigen', 'Show sections', 'Εμφάνιση ενοτήτων', 'عرض الأقسام'),
  language: text('Sprache wählen', 'Choose language', 'Επιλογή γλώσσας', 'اختر اللغة'),
  skip: text('Zum Inhalt', 'Skip to content', 'Μετάβαση στο περιεχόμενο', 'انتقل إلى المحتوى'),
  learn: text('Mehr erfahren', 'Learn more', 'Μάθετε περισσότερα', 'اعرف المزيد'),
  join: text('Mitmachen', 'Get involved', 'Συμμετέχετε', 'شارك معنا'),
  contact: text('Kontakt aufnehmen', 'Get in touch', 'Επικοινωνήστε μαζί μας', 'تواصل معنا'),
  pending: text('Inhalte folgen', 'Content coming soon', 'Το περιεχόμενο θα προστεθεί σύντομα', 'سيُضاف المحتوى قريبًا'),
  pageSections: text('Auf dieser Seite', 'On this page', 'Σε αυτή τη σελίδα', 'في هذه الصفحة'),
  tagline: text('Glaube. Hoffnung. Gemeinschaft.', 'Faith. Hope. Community.', 'Πίστη. Ελπίδα. Κοινότητα.', 'إيمان. رجاء. مجتمع.'),
  footerText: text('Christlicher Dienst, praktische Hilfe und Gemeinschaft über kulturelle Grenzen hinweg.', 'Christian ministry, practical support and community across cultures.', 'Χριστιανική διακονία, πρακτική βοήθεια και κοινότητα πέρα από πολιτισμικά σύνορα.', 'خدمة مسيحية ومساعدة عملية ومجتمع يجمع الثقافات.'),
  imageAlt: text('Bild aus dem vorhandenen Website-Entwurf', 'Image from the existing website draft', 'Εικόνα από το υπάρχον προσχέδιο του ιστοτόπου', 'صورة من المسودة الحالية للموقع'),
  originalDocument: text('Originaldokument öffnen', 'Open original document', 'Άνοιγμα πρωτότυπου εγγράφου', 'فتح الوثيقة الأصلية'),
  originalPdf: text('Originaldokument öffnen (PDF)', 'Open original document (PDF)', 'Άνοιγμα πρωτότυπου εγγράφου (PDF)', 'فتح الوثيقة الأصلية (PDF)'),
  previewFirstPage: text('Vorschau · Seite 1', 'Preview · page 1', 'Προεπισκόπηση · σελίδα 1', 'معاينة · الصفحة الأولى'),
  pageCount: text('Seiten', 'pages', 'σελίδες', 'صفحات'),
  imageDocument: text('Bilddokument', 'Image document', 'Έγγραφο εικόνας', 'وثيقة مصوّرة'),
  previewUnavailable: text('Vorschau nicht verfügbar', 'Preview unavailable', 'Η προεπισκόπηση δεν είναι διαθέσιμη', 'المعاينة غير متاحة'),
  missionLetter: text('Missionsbrief: Komm und sieh!', 'Mission letter: Komm und sieh!', 'Ιεραποστολική επιστολή: Komm und sieh!', 'رسالة الخدمة: Komm und sieh!'),
  missionLetterAlt: text('Missionsbrief „Komm und sieh!“ mit Foto, Bericht und Gebetsanliegen', 'Mission letter “Komm und sieh!” with a photo, report and prayer requests', 'Ιεραποστολική επιστολή «Komm und sieh!» με φωτογραφία, αναφορά και αιτήματα προσευχής', 'رسالة الخدمة «Komm und sieh!» مع صورة وتقرير وطلبات صلاة'),
  fullSize: text('In voller Größe öffnen', 'Open full-size image', 'Άνοιγμα εικόνας σε πλήρες μέγεθος', 'فتح الصورة بالحجم الكامل'),
  originalDocumentNote: text('Die verlinkten Originaldokumente bleiben in ihrer ursprünglichen Sprache.', 'Linked original documents remain in their original language.', 'Τα συνδεδεμένα πρωτότυπα έγγραφα παραμένουν στην αρχική τους γλώσσα.', 'تبقى الوثائق الأصلية المرتبطة بلغتها الأصلية.'),
  documents: text('Berichte & Dokumente', 'Reports & documents', 'Αναφορές και έγγραφα', 'تقارير ووثائق'),
  maps: text('Route in Google Maps öffnen', 'Open directions in Google Maps', 'Άνοιγμα διαδρομής στους Χάρτες Google', 'فتح الاتجاهات في خرائط Google'),
  socialPending: text('Unsere Social-Media-Links werden hier ergänzt.', 'Our social media links will be added here.', 'Οι σύνδεσμοι των κοινωνικών δικτύων μας θα προστεθούν εδώ.', 'ستُضاف روابط وسائل التواصل الاجتماعي هنا.'),
  emailPending: text('E-Mail-Adresse und Telefonnummer werden ergänzt.', 'Email address and phone number will be added.', 'Η διεύθυνση email και ο αριθμός τηλεφώνου θα προστεθούν.', 'سيُضاف البريد الإلكتروني ورقم الهاتف.'),
  donatePending: text('Spendeninformationen werden nach Bestätigung durch die Leitung ergänzt.', 'Donation details will be added after confirmation by the leadership.', 'Τα στοιχεία δωρεών θα προστεθούν μετά την επιβεβαίωση της ηγεσίας.', 'ستُضاف معلومات التبرع بعد تأكيد القيادة.'),
  donate: text('Spenden', 'Donate', 'Δωρεά', 'تبرع'),
  name: text('Name', 'Name', 'Όνομα', 'الاسم'),
  email: text('E-Mail', 'Email', 'Email', 'البريد الإلكتروني'),
  message: text('Nachricht', 'Message', 'Μήνυμα', 'الرسالة'),
  send: text('Nachricht senden', 'Send message', 'Αποστολή μηνύματος', 'إرسال الرسالة'),
  sending: text('Wird gesendet …', 'Sending …', 'Αποστολή …', 'جارٍ الإرسال …'),
  formPending: text('Das Kontaktformular steht bald zur Verfügung.', 'The contact form will be available soon.', 'Η φόρμα επικοινωνίας θα είναι σύντομα διαθέσιμη.', 'سيكون نموذج الاتصال متاحًا قريبًا.'),
  sent: text('Ihre Nachricht wurde übermittelt. Vielen Dank.', 'Your message has been submitted. Thank you.', 'Το μήνυμά σας υποβλήθηκε. Ευχαριστούμε.', 'تم إرسال رسالتك. شكرًا لك.'),
  error: text('Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.', 'Your message could not be sent. Please try again later.', 'Το μήνυμα δεν μπόρεσε να σταλεί. Δοκιμάστε ξανά αργότερα.', 'تعذر إرسال الرسالة. يرجى المحاولة لاحقًا.'),
  notFound: text('Diese Seite wurde nicht gefunden.', 'This page could not be found.', 'Αυτή η σελίδα δεν βρέθηκε.', 'لم يتم العثور على هذه الصفحة.'),
  backHome: text('Zur Startseite', 'Back to home', 'Επιστροφή στην αρχική', 'العودة إلى الرئيسية'),
};

const section = (id, title, body, options = {}) => ({ id, title, body, ...options });
export const pages = [
  {
    id: 'home', path: '/',
    title: text('Startseite', 'Home', 'Αρχική', 'الرئيسية'),
    heading: text('Glaube verbindet. Hoffnung wächst.', 'Faith brings us together. Hope grows.', 'Η πίστη μας ενώνει. Η ελπίδα μεγαλώνει.', 'الإيمان يجمعنا. والرجاء ينمو.'),
    intro: text('Philadelphia International Ministry verbindet christlichen Glauben, praktische Hilfe und Gemeinschaft für Menschen aus unterschiedlichen Kulturen.', 'Philadelphia International Ministry brings together Christian faith, practical support and community for people from different cultures.', 'Το Philadelphia International Ministry συνδέει τη χριστιανική πίστη, την πρακτική βοήθεια και την κοινότητα για ανθρώπους από διαφορετικούς πολιτισμούς.', 'تجمع خدمة فيلادلفيا الدولية بين الإيمان المسيحي والمساعدة العملية والمجتمع لأشخاص من ثقافات مختلفة.'),
    sections: [
      section('vorstellung', text('Kurze Vorstellung des Ministries', 'About the ministry', 'Γνωρίστε τη διακονία', 'نبذة عن الخدمة'), text('Evangelisation, Flüchtlingsarbeit, Jüngerschaft und gemeinsame Aktivitäten stehen im Mittelpunkt unseres Ministries. Lernen Sie die Arbeitsbereiche und das Haus Philadelphia kennen.', 'Evangelism, refugee outreach, discipleship and community activities are at the heart of our ministry. Explore our areas of work and House Philadelphia.', 'Ο ευαγγελισμός, η διακονία προς πρόσφυγες, η μαθητεία και οι κοινές δραστηριότητες βρίσκονται στο επίκεντρο της διακονίας μας. Γνωρίστε τους τομείς δράσης και το Σπίτι Φιλαδέλφεια.', 'التبشير وخدمة اللاجئين والتلمذة والأنشطة الجماعية في صميم خدمتنا. تعرّف على مجالات عملنا وبيت فيلادلفيا.'), { target: 'about' }),
      section('vision', text('Vision / Leitgedanke', 'Vision / guiding principle', 'Όραμα / κεντρική ιδέα', 'الرؤية / المبدأ الأساسي'), text('Glaube, Nächstenliebe und Gemeinschaft stehen im Mittelpunkt. Die offizielle Vision und der Leitgedanke werden mit der Leitung abgestimmt und hier ergänzt.', 'Faith, love for our neighbours and community are at the heart of this ministry. The official vision and guiding principle will be agreed with the leadership and added here.', 'Η πίστη, η αγάπη προς τον πλησίον και η κοινότητα βρίσκονται στο επίκεντρο. Το επίσημο όραμα και η κεντρική ιδέα θα οριστικοποιηθούν με την ηγεσία και θα προστεθούν εδώ.', 'الإيمان ومحبة القريب والمجتمع في صميم هذه الخدمة. ستُضاف الرؤية الرسمية والمبدأ الأساسي بعد الاتفاق مع القيادة.'), { pending: true }),
      section('projekte', text('Aktuelle Projekte', 'Current projects', 'Τρέχοντα έργα', 'المشاريع الحالية'), text('Philadelphia Bayt, Sprachkurse und Camps gehören zu den vorgesehenen Themen. Aktuelle Projektstände, Termine und Berichte werden nach Bestätigung ergänzt.', 'Philadelphia Bayt, language courses and camps are among the planned topics. Current project updates, dates and reports will be added after confirmation.', 'Το Philadelphia Bayt, τα μαθήματα γλώσσας και οι κατασκηνώσεις περιλαμβάνονται στα θέματα που έχουν προβλεφθεί. Οι ενημερώσεις, οι ημερομηνίες και οι αναφορές θα προστεθούν μετά από επιβεβαίωση.', 'تشمل المواضيع المخطط لها بيت فيلادلفيا ودورات اللغة والمخيمات. ستُضاف مستجدات المشاريع والمواعيد والتقارير بعد التأكيد.'), { kind: 'projects', pending: true }),
      section('bilder', text('Große Bilder', 'Images & impressions', 'Εικόνες και στιγμιότυπα', 'صور ولمحات'), text('Einblicke aus dem vorhandenen Website-Entwurf. Die finale Bildauswahl erfolgt gemeinsam mit der Leitung.', 'Images from the existing website draft. The final selection will be made together with the leadership.', 'Εικόνες από το υπάρχον προσχέδιο του ιστοτόπου. Η τελική επιλογή θα γίνει μαζί με την ηγεσία.', 'صور من المسودة الحالية للموقع. سيُختار المحتوى المرئي النهائي بالتعاون مع القيادة.'), { kind: 'gallery' }),
      section('mitmachen', text('Mehr erfahren / Mitmachen', 'Learn more / get involved', 'Μάθετε περισσότερα / συμμετέχετε', 'اعرف المزيد / شارك معنا'), text('Informieren Sie sich über unsere Arbeit und entdecken Sie Möglichkeiten für Gebet, Unterstützung und Mitarbeit.', 'Learn about our work and explore ways to pray, support and volunteer.', 'Γνωρίστε τη δράση μας και ανακαλύψτε τρόπους προσευχής, υποστήριξης και εθελοντισμού.', 'تعرّف على عملنا واكتشف طرق المشاركة بالصلاة والدعم والتطوع.'), { kind: 'cta' }),
    ],
  },
  {
    id: 'about', path: '/ueber-uns',
    title: text('Über uns', 'About us', 'Σχετικά με εμάς', 'من نحن'),
    heading: text('Die Menschen und der Glaube hinter Philadelphia.', 'The people and faith behind Philadelphia.', 'Οι άνθρωποι και η πίστη πίσω από τη Φιλαδέλφεια.', 'الأشخاص والإيمان وراء فيلادلفيا.'),
    intro: text('Hier lernen Sie die Geschichte, die Vision und das Team von Philadelphia International Ministry kennen.', 'Learn about the story, vision and team of Philadelphia International Ministry.', 'Γνωρίστε την ιστορία, το όραμα και την ομάδα του Philadelphia International Ministry.', 'تعرّف على تاريخ ورؤية وفريق خدمة فيلادلفيا الدولية.'),
    sections: [
      section('geschichte', text('Geschichte', 'History', 'Ιστορία', 'التاريخ'), text('Die Gründungsgeschichte, wichtige Stationen und Hintergründe werden anhand der Angaben der Leitung ergänzt.', 'The founding story, important milestones and background will be added using information from the leadership.', 'Η ιστορία της ίδρυσης, οι σημαντικοί σταθμοί και το υπόβαθρο θα προστεθούν με βάση τα στοιχεία της ηγεσίας.', 'ستُضاف قصة التأسيس والمحطات المهمة والخلفية بناءً على معلومات القيادة.'), { pending: true }),
      section('vision-ziele', text('Vision und Ziele', 'Vision and goals', 'Όραμα και στόχοι', 'الرؤية والأهداف'), text('Die offizielle Vision sowie die kurz- und langfristigen Ziele des Ministries werden hier veröffentlicht, sobald sie abgestimmt sind.', 'The official vision and the ministry’s short- and long-term goals will be published here once agreed.', 'Το επίσημο όραμα και οι βραχυπρόθεσμοι και μακροπρόθεσμοι στόχοι της διακονίας θα δημοσιευθούν εδώ μετά την οριστικοποίησή τους.', 'ستُنشر هنا الرؤية الرسمية وأهداف الخدمة على المدى القريب والبعيد بعد الاتفاق عليها.'), { pending: true }),
      section('glaubensgrundlagen', text('Glaubensgrundlagen', 'Statement of faith', 'Βασικές αρχές πίστης', 'أسس الإيمان'), text('Der christliche Glaube bildet den Rahmen dieses Ministries. Das freigegebene Glaubensbekenntnis und die konkreten Glaubensgrundlagen folgen.', 'The Christian faith provides the foundation for this ministry. The approved statement of faith and specific beliefs will be added.', 'Η χριστιανική πίστη αποτελεί το πλαίσιο αυτής της διακονίας. Θα προστεθούν η εγκεκριμένη ομολογία πίστης και οι συγκεκριμένες βασικές αρχές.', 'يشكّل الإيمان المسيحي أساس هذه الخدمة. ستُضاف العقيدة المعتمدة وأسس الإيمان المحددة.'), { pending: true }),
      section('team', text('Team / Leitung', 'Team / leadership', 'Ομάδα / ηγεσία', 'الفريق / القيادة'), text('Namen, Aufgaben und kurze Vorstellungen der Leitung und des Teams werden nach Freigabe ergänzt.', 'Names, roles and short introductions of the leadership and team will be added after approval.', 'Τα ονόματα, οι ρόλοι και οι σύντομες παρουσιάσεις της ηγεσίας και της ομάδας θα προστεθούν μετά από έγκριση.', 'ستُضاف أسماء القيادة والفريق وأدوارهم ونبذات عنهم بعد الموافقة.'), { pending: true }),
    ],
  },
  {
    id: 'work', path: '/unsere-arbeit',
    title: text('Unsere Arbeit', 'Our work', 'Η δράση μας', 'عملنا'),
    heading: text('Glaube im Alltag. Hilfe, die verbindet.', 'Faith in everyday life. Support that connects.', 'Πίστη στην καθημερινότητα. Βοήθεια που ενώνει.', 'إيمان في الحياة اليومية. ومساعدة تجمعنا.'),
    intro: text('Acht Arbeitsbereiche bilden das Grundgerüst unseres Ministries. Konkrete Angebote und Abläufe werden mit der Leitung ergänzt.', 'Eight areas of work form the outline of our ministry. Specific programmes and arrangements will be added with the leadership.', 'Οκτώ τομείς δράσης αποτελούν τη βασική δομή της διακονίας μας. Τα συγκεκριμένα προγράμματα και οι διαδικασίες θα προστεθούν μαζί με την ηγεσία.', 'تشكل ثمانية مجالات عمل مخطط خدمتنا. ستُضاف البرامج والترتيبات المحددة بالتعاون مع القيادة.'),
    sections: [
      section('evangelisation', text('Evangelisation', 'Evangelism', 'Ευαγγελισμός', 'التبشير'), text('Christlichen Glauben teilen und Raum für Gespräche und Fragen schaffen. Informationen zu konkreten Angeboten folgen.', 'Sharing the Christian faith and making space for conversations and questions. Details of specific activities will follow.', 'Μοίρασμα της χριστιανικής πίστης και χώρος για συζητήσεις και ερωτήσεις. Θα ακολουθήσουν πληροφορίες για συγκεκριμένες δράσεις.', 'مشاركة الإيمان المسيحي وإتاحة المجال للحوار والأسئلة. ستُضاف تفاصيل الأنشطة المحددة.')),
      section('fluechtlingsarbeit', text('Flüchtlingsarbeit', 'Refugee outreach', 'Διακονία προς πρόσφυγες', 'خدمة اللاجئين'), text('Begegnung und Begleitung von Menschen mit Fluchterfahrung. Die konkreten Unterstützungsmöglichkeiten werden ergänzt.', 'Meeting and accompanying people with experiences of displacement. Specific support options will be added.', 'Συνάντηση και συνοδεία ανθρώπων με εμπειρία προσφυγιάς. Θα προστεθούν οι συγκεκριμένες δυνατότητες υποστήριξης.', 'لقاء ومرافقة أشخاص مرّوا بتجربة اللجوء. ستُضاف خيارات الدعم المحددة.')),
      section('camp-besuche', text('Besuche in Flüchtlingscamps', 'Visits to refugee camps', 'Επισκέψεις σε δομές προσφύγων', 'زيارات إلى مخيمات اللاجئين'), text('Besuche, Begegnungen und Hilfe vor Ort gehören zu den vorgesehenen Arbeitsbereichen. Orte und Besuchstermine folgen nach Bestätigung.', 'Visits, personal encounters and practical help on site are among the planned areas of work. Locations and dates will follow after confirmation.', 'Οι επισκέψεις, οι προσωπικές συναντήσεις και η επιτόπια βοήθεια είναι μεταξύ των τομέων που έχουν προβλεφθεί. Οι τοποθεσίες και οι ημερομηνίες θα προστεθούν μετά από επιβεβαίωση.', 'تشمل مجالات العمل المخطط لها الزيارات واللقاءات والمساعدة الميدانية. ستُضاف المواقع والمواعيد بعد التأكيد.')),
      section('praktische-hilfe', text('Praktische Hilfe', 'Practical help', 'Πρακτική βοήθεια', 'مساعدة عملية'), text('Unterstützung im Alltag und bei konkreten Bedürfnissen. Welche Hilfen aktuell möglich sind, wird hier ergänzt.', 'Support in everyday life and with specific needs. Available forms of assistance will be added here.', 'Υποστήριξη στην καθημερινότητα και σε συγκεκριμένες ανάγκες. Οι διαθέσιμες μορφές βοήθειας θα προστεθούν εδώ.', 'دعم في الحياة اليومية وتلبية احتياجات محددة. ستُضاف هنا أشكال المساعدة المتاحة.')),
      section('sprachkurse', text('Sprachkurse', 'Language courses', 'Μαθήματα γλώσσας', 'دورات اللغة'), text('Sprache erleichtert Verständigung und Teilhabe. Kursangebote, Sprachen und Anmeldemöglichkeiten folgen.', 'Language helps people communicate and participate. Course details, languages and registration options will follow.', 'Η γλώσσα διευκολύνει την επικοινωνία και τη συμμετοχή. Θα ακολουθήσουν πληροφορίες για μαθήματα, γλώσσες και εγγραφές.', 'تسهّل اللغة التواصل والمشاركة. ستُضاف تفاصيل الدورات واللغات وخيارات التسجيل.')),
      section('juengerschaft', text('Jüngerschaft', 'Discipleship', 'Μαθητεία', 'التلمذة'), text('Gemeinsam den christlichen Glauben verstehen und im Alltag leben. Informationen zu Gruppen und Begleitung folgen.', 'Understanding the Christian faith together and living it in everyday life. Information about groups and guidance will follow.', 'Κοινή κατανόηση της χριστιανικής πίστης και βίωσή της στην καθημερινότητα. Θα ακολουθήσουν πληροφορίες για ομάδες και καθοδήγηση.', 'فهم الإيمان المسيحي معًا وعيشه يوميًا. ستُضاف معلومات عن المجموعات والمرافقة.')),
      section('gemeinschaft', text('Freizeit & Gemeinschaft', 'Leisure & community', 'Ελεύθερος χρόνος και κοινότητα', 'الترفيه والمجتمع'), text('Zeit miteinander verbringen, Beziehungen aufbauen und Gemeinschaft erleben. Aktuelle Aktivitäten werden ergänzt.', 'Spending time together, building relationships and experiencing community. Current activities will be added.', 'Κοινός χρόνος, ανάπτυξη σχέσεων και εμπειρία κοινότητας. Οι τρέχουσες δραστηριότητες θα προστεθούν.', 'قضاء الوقت معًا وبناء العلاقات وعيش روح المجتمع. ستُضاف الأنشطة الحالية.')),
      section('camps', text('Camps / Veranstaltungen', 'Camps / events', 'Κατασκηνώσεις / εκδηλώσεις', 'المخيمات / الفعاليات'), text('Informationen zu Camps, Begegnungstagen und Veranstaltungen. Bestätigte Termine und Anmeldedetails finden Sie künftig unter Aktuelles.', 'Information about camps, community days and events. Confirmed dates and registration details will be available under News.', 'Πληροφορίες για κατασκηνώσεις, ημέρες συνάντησης και εκδηλώσεις. Επιβεβαιωμένες ημερομηνίες και λεπτομέρειες εγγραφής θα βρείτε στα Νέα.', 'معلومات عن المخيمات وأيام اللقاء والفعاليات. ستتوفر المواعيد المؤكدة وتفاصيل التسجيل في قسم المستجدات.'), { target: 'news', targetSection: 'veranstaltungen' }),
    ],
  },
  {
    id: 'bayt', path: '/philadelphia-bayt',
    title: text('Philadelphia Bayt – Haus Philadelphia', 'Philadelphia Bayt – House Philadelphia', 'Philadelphia Bayt – Σπίτι Φιλαδέλφεια', 'بيت فيلادلفيا'),
    heading: text('Ein Haus. Raum für Gemeinschaft.', 'One house. A place for community.', 'Ένα σπίτι. Χώρος για κοινότητα.', 'بيت واحد. ومكان للمجتمع.'),
    intro: text('Philadelphia Bayt – das Haus Philadelphia – steht für Gemeinschaft, Begleitung und Jüngerschaft.', 'Philadelphia Bayt – House Philadelphia – is about community, support and discipleship.', 'Το Philadelphia Bayt – Σπίτι Φιλαδέλφεια – εκφράζει την κοινότητα, την υποστήριξη και τη μαθητεία.', 'بيت فيلادلفيا هو بيت للمجتمع والمرافقة والتلمذة.'),
    sections: [
      section('was-ist-bayt', text('Was ist das Bayt?', 'What is Bayt?', 'Τι είναι το Bayt;', 'ما هو البيت؟'), text('Bayt bedeutet „Haus“. Die offizielle Beschreibung des Hauses Philadelphia und seiner Bewohner wird von der Leitung ergänzt.', 'Bayt means “house”. The official description of House Philadelphia and its residents will be added by the leadership.', 'Bayt σημαίνει «σπίτι». Η επίσημη περιγραφή του Σπιτιού Φιλαδέλφεια και των κατοίκων του θα προστεθεί από την ηγεσία.', 'تعني كلمة «بيت» المنزل. ستُضيف القيادة الوصف الرسمي لبيت فيلادلفيا وسكانه.'), { image: 'bayt' }),
      section('ziel-konzept', text('Ziel und Konzept', 'Purpose and concept', 'Σκοπός και προσέγγιση', 'الهدف والمفهوم'), text('Ziele, Zielgruppe und das Konzept des Hauses werden hier nach Abstimmung mit der Leitung beschrieben.', 'The goals, intended residents and concept of the house will be described here after agreement with the leadership.', 'Οι στόχοι, οι άνθρωποι στους οποίους απευθύνεται και η προσέγγιση του σπιτιού θα περιγραφούν εδώ σε συνεργασία με την ηγεσία.', 'ستُوضّح هنا أهداف البيت والفئات المستفيدة ومفهومه بعد الاتفاق مع القيادة.'), { pending: true }),
      section('leben', text('Leben im Haus', 'Life in the house', 'Η ζωή στο σπίτι', 'الحياة في البيت'), text('Einblicke in den Alltag, gemeinsame Aktivitäten und das Zusammenleben folgen mit freigegebenen Texten und Bildern.', 'Approved texts and images will offer insights into daily life, shared activities and living together.', 'Εγκεκριμένα κείμενα και εικόνες θα δώσουν μια εικόνα της καθημερινότητας, των κοινών δραστηριοτήτων και της συμβίωσης.', 'ستقدّم النصوص والصور المعتمدة لمحات عن الحياة اليومية والأنشطة المشتركة والعيش معًا.'), { pending: true }),
      section('begleitung', text('Begleitung und Jüngerschaft', 'Support and discipleship', 'Υποστήριξη και μαθητεία', 'المرافقة والتلمذة'), text('Persönliche Begleitung und gemeinsames Lernen im Glauben gehören zu den vorgesehenen Themen. Details zu den Angeboten folgen.', 'Personal support and learning together in faith are among the planned topics. Programme details will follow.', 'Η προσωπική υποστήριξη και η κοινή μάθηση στην πίστη περιλαμβάνονται στα θέματα που έχουν προβλεφθεί. Οι λεπτομέρειες των προγραμμάτων θα προστεθούν.', 'تشمل المواضيع المخطط لها المرافقة الشخصية والتعلم معًا في الإيمان. ستُضاف تفاصيل البرامج.')),
      section('bewohner', text('Unterstützung der Bewohner', 'Supporting residents', 'Υποστήριξη των κατοίκων', 'دعم السكان'), text('Wie Bewohner praktisch begleitet werden und wie Sie dabei helfen können, wird nach Bestätigung ergänzt.', 'Details of practical support for residents and ways you can help will be added after confirmation.', 'Λεπτομέρειες για την πρακτική υποστήριξη των κατοίκων και τους τρόπους με τους οποίους μπορείτε να βοηθήσετε θα προστεθούν μετά από επιβεβαίωση.', 'ستُضاف تفاصيل الدعم العملي للسكان وطرق مساعدتك بعد التأكيد.'), { target: 'support' }),
    ],
  },
  {
    id: 'stories', path: '/lebensgeschichten',
    title: text('Lebensgeschichten / Zeugnisse', 'Life stories / testimonies', 'Ιστορίες ζωής / μαρτυρίες', 'قصص الحياة / الشهادات'),
    heading: text('Menschen. Geschichten. Hoffnung.', 'People. Stories. Hope.', 'Άνθρωποι. Ιστορίες. Ελπίδα.', 'أشخاص. قصص. رجاء.'),
    intro: text('Hier ist Raum für persönliche Geschichten und freigegebene Zeugnisse aus der Gemeinschaft.', 'A space for personal stories and approved testimonies from the community.', 'Ένας χώρος για προσωπικές ιστορίες και εγκεκριμένες μαρτυρίες από την κοινότητα.', 'مساحة للقصص الشخصية والشهادات المعتمدة من المجتمع.'),
    sections: [
      section('geschichten', text('Persönliche Geschichten', 'Personal stories', 'Προσωπικές ιστορίες', 'قصص شخصية'), text('Persönliche Lebensgeschichten werden auf Grundlage der Originaltexte und mit Zustimmung der betroffenen Personen veröffentlicht.', 'Personal life stories will be published based on original texts and with the consent of the people concerned.', 'Προσωπικές ιστορίες ζωής θα δημοσιευθούν με βάση τα πρωτότυπα κείμενα και με τη συγκατάθεση των ενδιαφερομένων.', 'ستُنشر قصص الحياة الشخصية بناءً على النصوص الأصلية وبموافقة الأشخاص المعنيين.'), { pending: true }),
      section('zeugnisse', text('Zeugnisse von Bewohnern', 'Residents’ testimonies', 'Μαρτυρίες κατοίκων', 'شهادات السكان'), text('Bewohner können hier selbst zu Wort kommen. Freigegebene Zeugnisse und die dazugehörigen Bilder werden ergänzt.', 'Residents can share their own voices here. Approved testimonies and accompanying images will be added.', 'Οι κάτοικοι μπορούν να μιλήσουν εδώ με τη δική τους φωνή. Εγκεκριμένες μαρτυρίες και οι αντίστοιχες εικόνες θα προστεθούν.', 'يمكن للسكان مشاركة أصواتهم هنا. ستُضاف الشهادات المعتمدة والصور المصاحبة لها.'), { pending: true }),
      section('maluk', text('Maluk', 'Maluk', 'Maluk', 'مالوك'), text('Der freigegebene Website-Text zu Maluk wird hier ergänzt. Das im bisherigen Entwurf verlinkte Originaldokument finden Sie unten.', 'The approved website text about Maluk will be added here. The original document linked in the previous draft is available below.', 'Το εγκεκριμένο κείμενο του ιστοτόπου για τον Maluk θα προστεθεί εδώ. Το πρωτότυπο έγγραφο που συνδεόταν στο προηγούμενο προσχέδιο είναι διαθέσιμο παρακάτω.', 'سيُضاف هنا النص المعتمد للموقع عن مالوك. الوثيقة الأصلية المرتبطة بالمسودة السابقة متاحة أدناه.'), { document: 'maluk', pending: true }),
      section('sunday', text('Sunday', 'Sunday', 'Sunday', 'صنداي'), text('Der freigegebene Website-Text zu Sunday wird hier ergänzt. Das im bisherigen Entwurf verlinkte Originaldokument finden Sie unten.', 'The approved website text about Sunday will be added here. The original document linked in the previous draft is available below.', 'Το εγκεκριμένο κείμενο του ιστοτόπου για τον Sunday θα προστεθεί εδώ. Το πρωτότυπο έγγραφο που συνδεόταν στο προηγούμενο προσχέδιο είναι διαθέσιμο παρακάτω.', 'سيُضاف هنا النص المعتمد للموقع عن صنداي. الوثيقة الأصلية المرتبطة بالمسودة السابقة متاحة أدناه.'), { document: 'sunday', pending: true }),
    ],
  },
  {
    id: 'news', path: '/aktuelles',
    title: text('Aktuelles', 'News', 'Νέα', 'المستجدات'),
    heading: text('Verbunden bleiben. Neues entdecken.', 'Stay connected. Discover what’s new.', 'Μείνετε κοντά μας. Ανακαλύψτε τα νέα.', 'ابقَ على تواصل. واكتشف الجديد.'),
    intro: text('Missionsberichte, Veranstaltungen und Gebetsanliegen – an einem Ort gesammelt.', 'Mission reports, events and prayer requests – gathered in one place.', 'Ιεραποστολικές αναφορές, εκδηλώσεις και αιτήματα προσευχής σε ένα μέρος.', 'تقارير الخدمة والفعاليات وطلبات الصلاة في مكان واحد.'),
    sections: [
      section('missionsberichte', text('Missionsberichte', 'Mission reports', 'Ιεραποστολικές αναφορές', 'تقارير الخدمة'), text('Aktuelle Missionsberichte werden nach Freigabe ergänzt. Der im vorhandenen Entwurf verlinkte Missionsbrief ist hier verfügbar.', 'Current mission reports will be added after approval. The mission letter linked in the existing draft is available here.', 'Οι τρέχουσες ιεραποστολικές αναφορές θα προστεθούν μετά από έγκριση. Η επιστολή που συνδεόταν στο υπάρχον προσχέδιο είναι διαθέσιμη εδώ.', 'ستُضاف تقارير الخدمة الحالية بعد الموافقة. رسالة الخدمة المرتبطة بالمسودة الحالية متاحة هنا.'), { document: 'letter', pending: true }),
      section('veranstaltungen', text('Veranstaltungen', 'Events', 'Εκδηλώσεις', 'الفعاليات'), text('Bestätigte Veranstaltungstermine, Orte und Anmeldemöglichkeiten werden hier veröffentlicht.', 'Confirmed event dates, locations and registration options will be published here.', 'Επιβεβαιωμένες ημερομηνίες εκδηλώσεων, τοποθεσίες και δυνατότητες εγγραφής θα δημοσιευθούν εδώ.', 'ستُنشر هنا مواعيد الفعاليات المؤكدة ومواقعها وخيارات التسجيل.'), { pending: true }),
      section('sommercamps', text('Sommercamps', 'Summer camps', 'Θερινές κατασκηνώσεις', 'المخيمات الصيفية'), text('Informationen und Berichte zu Sommercamps folgen. Das Originaldokument zum Sommercamp 2026 aus dem vorhandenen Entwurf ist unten verlinkt.', 'Summer camp information and reports will follow. The original document about the 2026 summer camp from the existing draft is linked below.', 'Θα ακολουθήσουν πληροφορίες και αναφορές για θερινές κατασκηνώσεις. Το πρωτότυπο έγγραφο για την κατασκήνωση του 2026 από το υπάρχον προσχέδιο συνδέεται παρακάτω.', 'ستُضاف معلومات وتقارير عن المخيمات الصيفية. الوثيقة الأصلية عن المخيم الصيفي لعام 2026 من المسودة الحالية مرتبطة أدناه.'), { document: 'camp', pending: true }),
      section('neuigkeiten', text('Neuigkeiten', 'Updates', 'Ενημερώσεις', 'الأخبار'), text('Hier erscheinen künftig freigegebene Neuigkeiten aus dem Ministry und dem Philadelphia Bayt.', 'Approved updates from the ministry and Philadelphia Bayt will appear here.', 'Εγκεκριμένες ενημερώσεις από τη διακονία και το Philadelphia Bayt θα εμφανίζονται εδώ.', 'ستظهر هنا المستجدات المعتمدة من الخدمة وبيت فيلادلفيا.'), { pending: true }),
      section('gebetsanliegen', text('Gebetsanliegen', 'Prayer requests', 'Αιτήματα προσευχής', 'طلبات الصلاة'), text('Konkrete Gebetsanliegen werden mit der Leitung abgestimmt. Beten Sie mit uns für die Menschen und die Arbeit des Ministries.', 'Specific prayer requests will be agreed with the leadership. Pray with us for the people and the work of the ministry.', 'Τα συγκεκριμένα αιτήματα προσευχής θα συμφωνηθούν με την ηγεσία. Προσευχηθείτε μαζί μας για τους ανθρώπους και τη δράση της διακονίας.', 'ستُحدد طلبات الصلاة بالتعاون مع القيادة. صلّوا معنا من أجل الناس وعمل الخدمة.'), { pending: true }),
    ],
  },
  {
    id: 'support', path: '/mitmachen',
    title: text('Mitmachen / Unterstützen', 'Get involved / support', 'Συμμετοχή / υποστήριξη', 'المشاركة / الدعم'),
    heading: text('Gemeinsam etwas bewegen.', 'Make a difference together.', 'Μαζί μπορούμε να προσφέρουμε.', 'معًا نصنع فرقًا.'),
    intro: text('Gebet, Spenden, praktische Hilfe oder Mitarbeit – entdecken Sie, wie Sie sich einbringen können.', 'Prayer, donations, practical help or volunteering – explore how you can get involved.', 'Προσευχή, δωρεές, πρακτική βοήθεια ή εθελοντισμός – ανακαλύψτε πώς μπορείτε να συμμετάσχετε.', 'بالصلاة أو التبرعات أو المساعدة العملية أو التطوع، اكتشف كيف يمكنك المشاركة.'),
    sections: [
      section('gebet', text('Gebet', 'Prayer', 'Προσευχή', 'الصلاة'), text('Begleiten Sie die Menschen, das Team und die Projekte im Gebet. Aktuelle Anliegen finden Sie unter Aktuelles.', 'Support the people, team and projects in prayer. Current prayer requests are listed under News.', 'Στηρίξτε τους ανθρώπους, την ομάδα και τα έργα με προσευχή. Τα τρέχοντα αιτήματα βρίσκονται στα Νέα.', 'ساند الناس والفريق والمشاريع بالصلاة. تجد طلبات الصلاة الحالية في قسم المستجدات.'), { target: 'news', targetSection: 'gebetsanliegen' }),
      section('spenden', text('Spenden', 'Donations', 'Δωρεές', 'التبرعات'), text('Hier werden die bestätigten Spendenmöglichkeiten und Informationen zur Verwendung der Mittel ergänzt.', 'Confirmed donation options and information about how funds are used will be added here.', 'Επιβεβαιωμένοι τρόποι δωρεάς και πληροφορίες για τη χρήση των χρημάτων θα προστεθούν εδώ.', 'ستُضاف هنا طرق التبرع المؤكدة ومعلومات عن استخدام الأموال.'), { kind: 'donations', pending: true }),
      section('praktische-unterstuetzung', text('Praktische Unterstützung', 'Practical support', 'Πρακτική υποστήριξη', 'الدعم العملي'), text('Sie möchten Fähigkeiten, Zeit oder Sachmittel einbringen? Die aktuellen Bedarfe und Kontaktmöglichkeiten werden ergänzt.', 'Would you like to contribute skills, time or supplies? Current needs and contact details will be added.', 'Θέλετε να προσφέρετε δεξιότητες, χρόνο ή υλικά; Οι τρέχουσες ανάγκες και τα στοιχεία επικοινωνίας θα προστεθούν.', 'هل ترغب في تقديم مهاراتك أو وقتك أو مستلزمات؟ ستُضاف الاحتياجات الحالية وطرق التواصل.'), { target: 'contact' }),
      section('mitarbeit', text('Mitarbeit / Missionseinsatz', 'Volunteering / mission placement', 'Εθελοντισμός / ιεραποστολική συμμετοχή', 'التطوع / المشاركة في الخدمة'), text('Möglichkeiten zur Mitarbeit sowie Voraussetzungen und Ablauf eines Missionseinsatzes werden mit der Leitung abgestimmt.', 'Volunteering opportunities, requirements and arrangements for a mission placement will be agreed with the leadership.', 'Οι δυνατότητες εθελοντισμού, οι προϋποθέσεις και οι διαδικασίες ιεραποστολικής συμμετοχής θα συμφωνηθούν με την ηγεσία.', 'ستُحدد فرص التطوع والشروط وترتيبات المشاركة في الخدمة بالتعاون مع القيادة.'), { target: 'contact', pending: true }),
    ],
  },
  {
    id: 'contact', path: '/kontakt',
    title: text('Kontakt & Anfahrt', 'Contact & directions', 'Επικοινωνία και πρόσβαση', 'التواصل والوصول'),
    heading: text('Wir freuen uns auf den Kontakt.', 'We look forward to hearing from you.', 'Χαιρόμαστε να επικοινωνήσετε μαζί μας.', 'يسعدنا تواصلكم معنا.'),
    intro: text('Fragen zum Ministry, zur Unterstützung oder zur Mitarbeit? Hier finden Sie unsere Kontaktwege und die Anfahrt.', 'Questions about the ministry, support or volunteering? Find contact details and directions here.', 'Έχετε ερωτήσεις για τη διακονία, την υποστήριξη ή τον εθελοντισμό; Βρείτε εδώ στοιχεία επικοινωνίας και πρόσβασης.', 'هل لديك أسئلة عن الخدمة أو الدعم أو التطوع؟ تجد هنا طرق التواصل والاتجاهات.'),
    sections: [
      section('kontakt', text('Kontakt', 'Contact', 'Επικοινωνία', 'التواصل'), text('Schreiben Sie uns mit Ihren Fragen oder Ihrem Anliegen.', 'Write to us with your questions or enquiries.', 'Γράψτε μας τις ερωτήσεις ή τα αιτήματά σας.', 'اكتب لنا أسئلتك أو استفساراتك.'), { kind: 'contact' }),
      section('adresse', text('Adresse', 'Address', 'Διεύθυνση', 'العنوان'), text('Philadelphia International Ministry', 'Philadelphia International Ministry', 'Philadelphia International Ministry', 'خدمة فيلادلفيا الدولية'), { kind: 'address' }),
      section('anfahrt', text('Google Maps / Anfahrt', 'Google Maps / directions', 'Χάρτες Google / πρόσβαση', 'خرائط Google / الاتجاهات'), text('Öffnen Sie die Route in Google Maps, um Ihre Anfahrt zu planen.', 'Open the route in Google Maps to plan your visit.', 'Ανοίξτε τη διαδρομή στους Χάρτες Google για να σχεδιάσετε την επίσκεψή σας.', 'افتح الطريق في خرائط Google لتخطيط زيارتك.'), { kind: 'map' }),
      section('social-media', text('Social Media', 'Social media', 'Κοινωνικά δίκτυα', 'وسائل التواصل الاجتماعي'), text('Bleiben Sie mit dem Ministry in Verbindung.', 'Stay connected with the ministry.', 'Μείνετε σε επαφή με τη διακονία.', 'ابقَ على تواصل مع الخدمة.'), { kind: 'social' }),
    ],
  },
  {
    id: 'legal', path: '/rechtliches',
    title: text('Rechtliches', 'Legal', 'Νομικές πληροφορίες', 'المعلومات القانونية'),
    heading: text('Rechtliche Informationen.', 'Legal information.', 'Νομικές πληροφορίες.', 'المعلومات القانونية.'),
    intro: text('Impressum und Datenschutzhinweise finden Sie auf den folgenden Seiten.', 'Find the legal notice and privacy information on the following pages.', 'Βρείτε τις νομικές πληροφορίες και την ενημέρωση απορρήτου στις ακόλουθες σελίδες.', 'تجد الإشعار القانوني ومعلومات الخصوصية في الصفحات التالية.'),
    sections: [
      section('impressum', text('Impressum', 'Legal notice', 'Νομικές πληροφορίες παρόχου', 'الإشعار القانوني'), text('Angaben zum Anbieter und den verantwortlichen Personen.', 'Information about the provider and responsible people.', 'Στοιχεία του παρόχου και των υπευθύνων.', 'معلومات عن الجهة المقدّمة للموقع والأشخاص المسؤولين.'), { target: 'imprint' }),
      section('datenschutz', text('Datenschutz', 'Privacy', 'Απόρρητο', 'الخصوصية'), text('Informationen zur Verarbeitung personenbezogener Daten.', 'Information about the processing of personal data.', 'Πληροφορίες για την επεξεργασία προσωπικών δεδομένων.', 'معلومات عن معالجة البيانات الشخصية.'), { target: 'privacy' }),
    ],
  },
];
export const legalPages = [
  {
    id: 'imprint', path: '/impressum', title: pages[8].sections[0].title,
    heading: pages[8].sections[0].title,
    intro: text('Entwurf: Die rechtlich verantwortliche Organisation und alle erforderlichen Anbieterangaben müssen vor der Veröffentlichung bestätigt und vervollständigt werden.', 'Draft: The legally responsible organisation and all required provider details must be confirmed and completed before publication.', 'Προσχέδιο: Ο νομικά υπεύθυνος οργανισμός και όλα τα απαιτούμενα στοιχεία παρόχου πρέπει να επιβεβαιωθούν και να συμπληρωθούν πριν από τη δημοσίευση.', 'مسودة: يجب تأكيد الجهة المسؤولة قانونيًا واستكمال جميع بيانات مقدّم الموقع المطلوبة قبل النشر.'),
    sections: [
      section('anbieter', text('Anbieter', 'Provider', 'Πάροχος', 'مقدّم الموقع'), text('Philadelphia International Ministry – vollständige Rechtsform, Anschrift und gegebenenfalls Registrierungsdaten ergänzen.', 'Philadelphia International Ministry – add the full legal form, address and registration details where applicable.', 'Philadelphia International Ministry – προσθέστε πλήρη νομική μορφή, διεύθυνση και στοιχεία εγγραφής όπου απαιτείται.', 'خدمة فيلادلفيا الدولية – أضف الشكل القانوني الكامل والعنوان وبيانات التسجيل عند الاقتضاء.'), { pending: true }),
      section('verantwortung', text('Vertretung / Verantwortliche', 'Representation / responsibility', 'Εκπροσώπηση / υπεύθυνοι', 'التمثيل / المسؤولية'), text('Bestätigte Namen und Kontaktangaben der rechtlich verantwortlichen Personen ergänzen.', 'Add confirmed names and contact details of the legally responsible people.', 'Προσθέστε επιβεβαιωμένα ονόματα και στοιχεία επικοινωνίας των νομικά υπευθύνων.', 'أضف الأسماء المؤكدة وبيانات التواصل للأشخاص المسؤولين قانونيًا.'), { pending: true }),
      section('kontakt', ui.contact, ui.emailPending, { target: 'contact' }),
    ],
  },
  {
    id: 'privacy', path: '/datenschutz', title: pages[8].sections[1].title,
    heading: pages[8].sections[1].title,
    intro: text('Entwurf: Die endgültigen Datenschutzhinweise werden entsprechend dem tatsächlichen Hosting, den Kontaktwegen und eingebundenen Diensten ergänzt.', 'Draft: The final privacy information will be completed according to the actual hosting, contact options and integrated services.', 'Προσχέδιο: Η τελική ενημέρωση απορρήτου θα συμπληρωθεί σύμφωνα με τη φιλοξενία, τους τρόπους επικοινωνίας και τις ενσωματωμένες υπηρεσίες.', 'مسودة: ستُستكمل معلومات الخصوصية النهائية وفقًا للاستضافة الفعلية وطرق التواصل والخدمات المدمجة.'),
    sections: [
      section('verantwortlicher', text('Verantwortliche Stelle', 'Data controller', 'Υπεύθυνος επεξεργασίας', 'الجهة المسؤولة عن البيانات'), text('Die verantwortliche Organisation und deren Datenschutz-Kontakt werden ergänzt.', 'The responsible organisation and its privacy contact will be added.', 'Ο υπεύθυνος οργανισμός και τα στοιχεία επικοινωνίας για το απόρρητο θα προστεθούν.', 'ستُضاف الجهة المسؤولة وبيانات التواصل الخاصة بالخصوصية.'), { pending: true }),
      section('kontaktformular', text('Kontakt und Nachrichten', 'Contact and messages', 'Επικοινωνία και μηνύματα', 'التواصل والرسائل'), text('Zweck, Rechtsgrundlage, Empfänger und Speicherdauer für Kontaktanfragen müssen passend zum tatsächlich verwendeten Kontaktweg ergänzt werden.', 'The purpose, legal basis, recipients and retention period for enquiries must be added according to the contact method actually used.', 'Ο σκοπός, η νομική βάση, οι αποδέκτες και ο χρόνος διατήρησης των αιτημάτων πρέπει να συμπληρωθούν σύμφωνα με τον τρόπο επικοινωνίας που χρησιμοποιείται.', 'يجب إضافة الغرض والأساس القانوني والجهات المستلمة ومدة الاحتفاظ بالاستفسارات وفقًا لطريقة التواصل المستخدمة فعليًا.'), { pending: true }),
      section('externe-dienste', text('Externe Dienste', 'External services', 'Εξωτερικές υπηρεσίες', 'الخدمات الخارجية'), text('Links zu Google Maps öffnen einen externen Dienst. Originaldokumente werden von dieser Website bereitgestellt. Ergänzen Sie vor Veröffentlichung die Angaben zu allen tatsächlich verwendeten Dienstleistern.', 'Links to Google Maps open an external service. Original documents are provided by this website. Add details of all providers actually used before publication.', 'Οι σύνδεσμοι προς τους Χάρτες Google ανοίγουν μια εξωτερική υπηρεσία. Τα πρωτότυπα έγγραφα παρέχονται από αυτόν τον ιστότοπο. Προσθέστε στοιχεία όλων των παρόχων που χρησιμοποιούνται πριν από τη δημοσίευση.', 'تفتح روابط خرائط Google خدمة خارجية. يوفّر هذا الموقع الوثائق الأصلية. أضف بيانات جميع مقدّمي الخدمات المستخدمين فعليًا قبل النشر.'), { pending: true }),
      section('spracheinstellung', text('Spracheinstellung', 'Language preference', 'Προτίμηση γλώσσας', 'تفضيل اللغة'), text('Diese Website kann die gewählte Sprache lokal in Ihrem Browser speichern, damit Ihre Auswahl beim nächsten Besuch erhalten bleibt.', 'This website can store your chosen language locally in your browser to keep your selection for your next visit.', 'Αυτός ο ιστότοπος μπορεί να αποθηκεύει τη γλώσσα που επιλέξατε τοπικά στο πρόγραμμα περιήγησής σας για την επόμενη επίσκεψη.', 'يمكن لهذا الموقع حفظ لغتك المختارة محليًا في المتصفح للاحتفاظ باختيارك عند الزيارة التالية.')),
      section('rechte', text('Datenschutzrechte und Kontakt', 'Privacy rights and contact', 'Δικαιώματα απορρήτου και επικοινωνία', 'حقوق الخصوصية والتواصل'), text('Die zutreffenden Informationen zu Rechten und Kontaktmöglichkeiten werden vor Veröffentlichung ergänzt.', 'Applicable information about rights and contact options will be added before publication.', 'Οι κατάλληλες πληροφορίες για δικαιώματα και στοιχεία επικοινωνίας θα προστεθούν πριν από τη δημοσίευση.', 'ستُضاف المعلومات المناسبة عن الحقوق وطرق التواصل قبل النشر.'), { pending: true, target: 'contact' }),
    ],
  },
];
export const allPages = [...pages, ...legalPages];
export const assets = {
  logo: '/media/logo.png',
  hero: '/media/hero.jpg',
  bayt: '/media/bayt.png',
  camp: '/media/camp.png',
  language: '/media/language.png',
  missionLetter: '/media/missionsbrief.jpg',
};
const cdn = 'https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d';
export const documents = {
  maluk: {
    url: '/documents/maluk.pdf', preview: '/document-previews/maluk.png', type: 'pdf', pages: 2,
    sourceUrl: `${cdn}/3ba60ba347982db22342c0d94f1e943c.pdf`,
  },
  sunday: {
    url: '/documents/sunday.pdf', preview: '/document-previews/sunday.png', type: 'pdf', pages: 2,
    sourceUrl: `${cdn}/0122ae25d3e49f204aa36edc3b051f41.pdf`,
  },
  camp: {
    url: '/documents/camp.pdf', preview: '/document-previews/camp.png', type: 'pdf', pages: 2,
    sourceUrl: `${cdn}/63665ba419043f64844bfe43e118ca33.pdf`,
  },
  letter: { url: assets.missionLetter, preview: assets.missionLetter, type: 'image' },
};
