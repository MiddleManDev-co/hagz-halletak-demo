(function (global) {
  'use strict';

  const exactEn = {
    // Composite strings the pair matcher cannot reach because of a leading
    // glyph or an embedded date; exact keys are the only way in.
    'تخطي للمحتوى': 'Skip to content',
    '✓ قاعة موثقة': '✓ Verified venue',
    'قاعة موثقة': 'Verified venue',
    'دليل العرض': 'Demo guide',
    '▶ دليل العرض': '▶ Demo guide',
    'عرض دوّر': 'Dawwar demo',
    'خريطة العرض': 'Demo map',
    'الرئيسية / البحث / 15 أكتوبر 2027': 'Home / Search / 15 October 2027',
    '♥ في القائمة': '♥ In shortlist',
    '♡ أضف للقائمة': '♡ Add to shortlist',
    'سارة وأحمد': 'Sara & Ahmed',
    'منة ومحمود': 'Menna & Mahmoud',
    'Verified booking · سارة وأحمد': 'Verified booking · Sara & Ahmed',
    'Verified booking · منة ومحمود': 'Verified booking · Menna & Mahmoud',
    'حجز هالتك': 'Hagz Halletak',
    'ح': 'H',
    'الرئيسية': 'Home',
    'القاعات': 'Venues',
    'العملاء': 'Customers',
    'للعملاء': 'For customers',
    'للقاعات': 'For venues',
    'المنصة': 'Platform',
    'ابدأ السيناريو': 'Start scenario',
    'اختار هتشوف المنتج من أنهي ناحية': 'Choose how you want to explore the product',
    'قاعتك': 'Your venue',
    'فاضية يوم إيه؟': 'When is it available?',
    'ابدأ الـDemo Scenario': 'Start Demo Scenario',
    'شوف رؤية المنتج': 'See Product Vision',
    'شوف المتاح في تاريخك': 'See what is available on your date',
    'التاريخ': 'Date',
    'المنطقة': 'Area',
    'الضيوف': 'Guests',
    'الميزانية': 'Budget',
    'نوع المناسبة': 'Event type',
    'زفاف': 'Wedding',
    'خطوبة': 'Engagement',
    'كتب كتاب': 'Katb Ketab',
    'شوف القاعات المتاحة ←': 'See available venues →',
    'قاعات موثقة': 'Verified venues',
    'أسعار بداية حقيقية': 'Real starting prices',
    'نتائج ذكية': 'Smart results',
    'مش بنعرض قاعات وخلاص': 'We do more than list venues',
    'كل القاعات': 'All venues',
    'كل مشكلة بنحوّلها لقرار': 'Every problem becomes a decision',
    'ادخل VenueOS ←': 'Open VenueOS →',
    'التفاصيل ←': 'Details →',
    'التفاصيل': 'Details',
    'يبدأ من': 'Starts from',
    'متاح': 'Available',
    'محجوز': 'Booked',
    'تأكيد مطلوب': 'Needs confirmation',
    'البحث': 'Search',
    'الكل': 'All',
    'متاح في التاريخ': 'Available on this date',
    'أقل من 150K': 'Under 150K',
    'فلترة النتائج': 'Filter results',
    'السعر': 'Price',
    'الحالة': 'Status',
    'المزايا': 'Facilities',
    'النتائج': 'Results',
    'التوافر': 'Availability',
    'الباقات': 'Packages',
    'التقييمات': 'Reviews',
    'عن القاعة': 'About the venue',
    'اختار التاريخ وشوف حالته وسعر البداية.': 'Choose a date to see its status and starting price.',
    'قاعة + تشغيل أساسي + Parking.': 'Venue + basic operations + parking.',
    'قاعة + Buffet + DJ + Decoration.': 'Venue + buffet + DJ + decoration.',
    'جرّب Package Builder': 'Try Package Builder',
    'في القائمة': 'In shortlist',
    'أضف للقائمة': 'Add to shortlist',
    'احجز زيارة': 'Schedule visit',
    'كمّل الحجز ←': 'Continue booking →',
    'المقارنة': 'Comparison',
    'اختاروا بعقل واحد': 'Make one shared decision',
    'السعة': 'Capacity',
    'التقييم': 'Rating',
    'تفاصيل المناسبة': 'Event details',
    'راجع البيانات قبل الحجز': 'Review the details before booking',
    'الباقة': 'Package',
    'بيانات العميل': 'Customer details',
    'الاسم': 'Name',
    'الموبايل': 'Mobile',
    'ملاحظات': 'Notes',
    'طريقة دفع العربون': 'Deposit payment method',
    'Simulation فقط — لا يوجد دفع حقيقي': 'Simulation only — no real payment',
    'العربون اليوم': 'Deposit today',
    'المتبقي': 'Remaining',
    'الإجمالي': 'Total',
    'تأكيد الحجز التجريبي': 'Confirm demo booking',
    'تم الحجز!': 'Booking confirmed!',
    'رحلة الحجز': 'Booking journey',
    'القائمة المشتركة': 'Shared shortlist',
    'تصويت العيلة': 'Family voting',
    'صباح الخير، Royal Garden': 'Good morning, Royal Garden',
    'كل اللي محتاج تعرفه عن تشغيل القاعة النهارده.': 'Everything you need to run the venue today.',
    'أكتوبر 2027': 'October 2027',
    'السبت': 'Saturday',
    'الأحد': 'Sunday',
    'الاثنين': 'Monday',
    'الثلاثاء': 'Tuesday',
    'الأربعاء': 'Wednesday',
    'الخميس': 'Thursday',
    'الجمعة': 'Friday',
    'من أول طلب العميل لحد الحجز — Pipeline واحدة.': 'One pipeline from first inquiry to confirmed booking.',
    'من مكان واحد.': 'from one place.',
    'رؤية المنتج': 'Product Vision',
    'المشكلة': 'The problem',
    'الحل': 'The solution',
    'نموذج الربح': 'Business model',
    'التوسع': 'Expansion',
    'تواريخ مرنة': 'Flexible Dates',
    'قائمة العيلة': 'Family Shortlist',
    'السوق العكسي': 'Reverse Marketplace',
    'لو التاريخ مرن، السعر والاختيارات بيتغيروا جدًا': 'Flexible dates can dramatically change price and choice',
    'ارجع لنتائج 15 أكتوبر': 'Back to October 15 results',
    'توفر حتى': 'Save up to',
    'شوف القاعات': 'See venues',
    'لو لازم 15 أكتوبر': 'If October 15 is a must',
    'انضم للـWaitlist': 'Join the waitlist',
    'اليوم الفاضي مايبقاش خسارة': 'Turn an empty date into revenue',
    'احجز العرض ←': 'Book this deal →',
    'قول أنت عايز إيه، وخلي القاعات تتنافس على الطلب': 'Tell us what you need and let venues compete for it',
    'طلب المناسبة': 'Event request',
    'المكان': 'Location',
    'المطلوب': 'Requirements',
    'انشر الطلب للقاعات المناسبة': 'Send request to matching venues',
    'لا يتم إرسال أي طلب حقيقي.': 'No real request is sent.',
    'راجع العرض': 'Review offer',
    'قاعة موثقة': 'Verified venue',
    'أقرب تاريخ': 'Next available date'
  };

  const exactAr = {
    'Hagz Halletak': 'حجز هالتك',
    'H': 'ح',
    'Home': 'الرئيسية',
    'Explore': 'استكشف',
    'Customer': 'العميل',
    'Venue': 'القاعة',
    'Admin': 'الإدارة',
    'Venue Owner': 'صاحب القاعة',
    'Platform Admin': 'إدارة المنصة',
    'Product Vision': 'رؤية المنتج',
    'Interactive Product Demo': 'ديمو تفاعلي للمنتج',
    'Demo Scenario': 'سيناريو الديمو',
    'Demo Mode': 'وضع الديمو',
    'Recommended story': 'سيناريو مقترح',
    'Live availability': 'توافر مباشر',
    'Smart booking': 'حجز ذكي',
    'Flexible Dates': 'تواريخ مرنة',
    'DateDrop': 'DateDrop',
    'Reverse Marketplace': 'السوق العكسي',
    'Family Shortlist': 'قائمة العيلة',
    'Compare': 'مقارنة',
    'Checkout': 'إتمام الحجز',
    'Verified Venue': 'قاعة موثقة',
    'Availability': 'التوافر',
    'Essential': 'أساسي',
    'Hall Only': 'القاعة فقط',
    'Most popular': 'الأكثر طلبًا',
    'Premium': 'مميز',
    'Verified Booking Reviews': 'تقييمات حجوزات موثقة',
    'Bookings': 'الحجوزات',
    'Revenue': 'الإيرادات',
    'Bookings this month': 'حجوزات هذا الشهر',
    'Open leads': 'Leads مفتوحة',
    'Occupancy': 'نسبة الإشغال',
    'Calendar Health': 'صحة التقويم',
    'Latest activity': 'آخر النشاطات',
    'Calendar': 'التقويم',
    'Available': 'متاح',
    'Booked': 'محجوز',
    'Visit': 'زيارة',
    'Leads CRM': 'إدارة الـLeads',
    'New Lead': 'Lead جديد',
    'Contacted': 'تم التواصل',
    'Visit Scheduled': 'زيارة محددة',
    'Offer / Hold': 'عرض / Hold',
    'Won': 'تم الحجز',
    'Packages & Pricing': 'الباقات والأسعار',
    'Dynamic Pricing Rules': 'قواعد التسعير الديناميكي',
    'Analytics': 'التحليلات',
    'Conversion': 'التحويل',
    'Lost revenue': 'إيراد مفقود',
    'Platform Overview': 'نظرة عامة على المنصة',
    'All systems operational': 'كل الأنظمة تعمل',
    'Venues': 'القاعات',
    'Customers': 'العملاء',
    'Demand heatmap · October': 'خريطة الطلب · أكتوبر',
    'Supply gap': 'فجوة العرض',
    'Venue Operations': 'تشغيل القاعات',
    'Verification queue · 7': 'طابور التوثيق · 7',
    'Verification checks': 'فحوصات التوثيق',
    'Accuracy score': 'دقة التوافر',
    'Response score': 'سرعة الرد',
    'Bookings & Payments': 'الحجوزات والمدفوعات',
    'Marketplace Intelligence': 'تحليلات السوق',
    'Export report': 'تصدير التقرير',
    'Last-minute inventory': 'تواريخ اللحظة الأخيرة',
    'Live deal simulation': 'محاكاة عرض مباشر',
    'Best value': 'أفضل قيمة',
    'Peak demand date': 'يوم طلب مرتفع',
    'Smart alternative': 'بديل ذكي',
    'Waitlist': 'قائمة الانتظار',
    'Request Offers': 'اطلب عروض',
    '3 offers received': 'وصل 3 عروض',
    'Offers live': 'العروض مباشرة',
    'Message': 'رسالة',
    'Qualified supply only': 'قاعات مناسبة فقط',
    'Offer expiry': 'صلاحية العرض',
    'Venue lead source': 'مصدر الـLead',
    'Venue-side idea': 'فكرة لصاحب القاعة',
    'Demo only — لا يتم إرسال أي طلب حقيقي.': 'ديمو فقط — لا يتم إرسال أي طلب حقيقي.'
  };

  const enReplacements = [
    ['اختار التاريخ وشوف القاعات المتاحة فعليًا، قارن، احجز زيارة، اعمل Hold، وكمل الحجز. وفي الخلفية صاحب القاعة بيدير كل حاجة من VenueOS.', 'Choose a date, see genuinely available venues, compare, schedule a visit, place a hold, and complete the booking. Behind the scenes, the venue runs everything through VenueOS.'],
    ['نفس رحلة الحجز بتظهر للعميل، صاحب القاعة، وإدارة المنصة.', 'The same booking journey appears to the customer, venue owner, and platform admin.'],
    ['ابدأ كعميل، كمل الحجز، وبعدها شوف نفس العملية في VenueOS وAdmin.', 'Start as a customer, complete a booking, then see the same operation in VenueOS and Admin.'],
    ['بنبدأ من التاريخ والميزانية والسعة، وبعدها نرتب النتائج حسب أفضل Match فعلي.', 'We start with date, budget, and capacity, then rank venues by the best real match.'],
    ['لو يومك غالي أو محجوز، اعرف أرخص وأقرب بدائل.', 'If your date is expensive or booked, see cheaper nearby alternatives.'],
    ['تواريخ فاضية فجأة بخصم لفترة محدودة.', 'Last-minute empty dates with limited-time discounts.'],
    ['انشر طلبك وخلي القاعات تبعتلك عروض.', 'Post your request and let venues send offers.'],
    ['قائمة مشتركة وتصويت وتعليقات للعيلة.', 'A shared shortlist with family voting and comments.'],
    ['مش Marketplace وبس.', 'More than a marketplace.'],
    ['نظام تشغيل كامل للقاعة.', 'A complete venue operating system.'],
    ['الحجز اللي العميل بيعمله قدامك، بيظهر فورًا في Calendar وCRM والـRevenue عند صاحب القاعة.', 'A customer booking instantly appears in the venue calendar, CRM, and revenue dashboard.'],
    ['قاعات مناسبة ليومك', 'venues match your date'],
    ['القاهرة الجديدة وحولها', 'New Cairo and nearby'],
    ['قارن', 'Compare'],
    ['قاعات', 'venues'],
    ['مساحة Premium حديثة للمناسبات الكبيرة، مع تشغيل منظم، Parking وBridal room، وتحديث مباشر لحالة الأيام من VenueOS.', 'A modern premium venue for large events with structured operations, parking, a bridal room, and live date status synced from VenueOS.'],
    ['التنظيم ممتاز والتاريخ كان متحدث فعلاً.', 'The organization was excellent and the date availability was genuinely up to date.'],
    ['الـstaff سريع والـoutdoor كان أحسن من الصور.', 'The staff was responsive and the outdoor area looked even better than the photos.'],
    ['الـHold لا يؤكد الحجز إلا بعد دفع العربون.', 'A hold does not confirm the booking until the deposit is paid.'],
    ['قارن أهم 3 قاعات جنب بعض، وبعدها شارك الاختيار مع العيلة.', 'Compare the top three venues side by side, then share the choice with the family.'],
    ['أعلى Match، لكن', 'has the highest match, but'],
    ['أوفر بـ', 'is cheaper by'],
    ['ومتاح في نفس اليوم.', 'and is available on the same date.'],
    ['مهتمين بالـoutdoor وعايزين نزور القاعة قبل تأكيد الباقة.', 'We prefer outdoor and want to visit the venue before confirming the package.'],
    ['Mock data للديمو', 'Mock demo data'],
    ['كل اللي محتاج تعرفه عن تشغيل القاعة النهارده.', 'Everything you need to run the venue today.'],
    ['تواريخ محتاجة تحديث', 'dates need updates'],
    ['Holds هتنتهي خلال 24 ساعة', 'holds expire within 24 hours'],
    ['Lead مستنيين رد', 'leads are waiting for a reply'],
    ['Online + offline bookings في تقويم واحد. أي تغيير هنا ينعكس على الـMarketplace.', 'Online and offline bookings live in one calendar. Any change here is reflected in the marketplace.'],
    ['لو موظف حاول يعمل Walk-in booking على يوم محجوز، VenueOS يمنع Double Booking ويعرض الحجز المتعارض.', 'If staff tries to create a walk-in booking on a booked date, VenueOS prevents double booking and shows the conflict.'],
    ['Payments، balances، packages وحالة كل حجز.', 'Payments, balances, packages, and booking status in one place.'],
    ['Weekend، peak season وlast-minute pricing', 'Weekend, peak-season, and last-minute pricing'],
    ['Revenue، occupancy، conversion وlost demand.', 'Revenue, occupancy, conversion, and lost demand.'],
    ['Marketplace + payments + venue supply في لقطة واحدة.', 'Marketplace, payments, and venue supply in one view.'],
    ['الطلب على 15 أكتوبر أعلى بوضوح من العرض المؤكد.', 'Demand for October 15 is significantly higher than confirmed supply.'],
    ['Verification، quality score وcalendar health.', 'Verification, quality score, and calendar health.'],
    ['GMV، deposits، refunds وdisputes.', 'GMV, deposits, refunds, and disputes.'],
    ['Demand، supply، GMV ومناطق التوسع.', 'Demand, supply, GMV, and expansion areas.'],
    ['بدل ما العميل يبدأ من قاعة، بنخليه يشوف الشهر كله: أنهي يوم أوفر؟ أنهي يوم فيه قاعات أكتر؟ وأنهي يوم عليه ضغط عالي؟', 'Instead of starting with a venue, the customer sees the whole month: which date is cheaper, has more supply, or has higher demand?'],
    ['نفس القاعة، اليوم اللي بعده، وأوفر بحوالي', 'Same venue, the next day, and cheaper by about'],
    ['انضم للـWaitlist. لو Hold اتلغى أو Booking اتفسخ، المنصة تبعتلك إشعار حسب ترتيبك.', 'Join the waitlist. If a hold or booking is released, the platform notifies you based on your position.'],
    ['صاحب القاعة ينزل تاريخ فاضي فجأة بسعر خاص لمدة محدودة، والعميل يشوف فرصة حقيقية بدل ما اليوم يعدي بدون Booking.', 'The venue can publish a suddenly empty date at a special limited-time price, turning unused inventory into a real booking opportunity.'],
    ['وفر', 'Save'],
    ['VenueOS يكتشف الأيام الفاضية في الـ30 يوم الجايين ويقترح DateDrop + نسبة خصم مناسبة حسب الطلب.', 'VenueOS detects empty dates in the next 30 days and suggests a DateDrop with a demand-aware discount.'],
    ['بدل Search طويل، العميل ينشر Brief واضح. القاعات المناسبة فقط تبعت Offer، والمنصة ترتب العروض بالسعر والتطابق والتوافر.', 'Instead of a long search, the customer posts a clear brief. Only matching venues send offers, ranked by price, match, and availability.'],
    ['الطلب يروح للقاعات المتاحة والمناسبة للسعة والميزانية فقط.', 'The request goes only to venues that match availability, capacity, and budget.'],
    ['كل Offer له مدة، فيقل الـghosting ويزيد القرار السريع.', 'Every offer expires, reducing ghosting and encouraging faster decisions.'],
    ['كل Request يتحول Lead داخل VenueOS CRM مع source واضح.', 'Every request becomes a VenueOS CRM lead with a clear source.'],
    ['القاهرة الجديدة', 'New Cairo'],
    ['الشيخ زايد', 'Sheikh Zayed'],
    ['المعادي', 'Maadi'],
    ['مدينة نصر', 'Nasr City'],
    ['أكتوبر', 'October'],
    ['ضيف', 'guests'],
    ['ج.م', 'EGP'],
    ['العربون', 'deposit'],
    ['الحجز', 'booking'],
    ['زيارة', 'visit'],
    ['اليوم', 'today'],
    ['مؤقتًا', 'temporarily'],
    [' ←', ' →']
  ];

  const arReplacements = [
    ['Real-time Venue Availability + Booking + Venue Management.', 'توافر لحظي + حجز + إدارة تشغيل القاعات.'],
    ['Mock data · No backend · Presentation demo', 'بيانات تجريبية · بدون Backend · ديمو للعرض'],
    ['Search → Compare → Hold → Book', 'بحث ← مقارنة ← Hold ← حجز'],
    ['Calendar → Leads → Revenue', 'تقويم ← Leads ← إيرادات'],
    ['Supply → GMV → Demand', 'عرض ← GMV ← طلب'],
    ['Live availability', 'توافر مباشر'],
    ['Marketplace + VenueOS', 'Marketplace + VenueOS'],
    ['New Cairo', 'القاهرة الجديدة'],
    ['Sheikh Zayed', 'الشيخ زايد'],
    ['Maadi', 'المعادي'],
    ['Nasr City', 'مدينة نصر'],
    ['October', 'أكتوبر'],
    ['guests', 'ضيف'],
    ['EGP', 'ج.م'],
    ['Starting price', 'سعر البداية'],
    ['Book this deal', 'احجز العرض'],
    ['Back to', 'ارجع إلى'],
    [' →', ' ←']
  ];

  const sortPairs = pairs => pairs.slice().sort((a, b) => b[0].length - a[0].length);
  const enPairs = sortPairs(enReplacements);
  const arPairs = sortPairs(arReplacements);

  function replaceAllPairs(text, pairs) {
    let out = text;
    for (const [from, to] of pairs) out = out.split(from).join(to);
    return out;
  }

  function latinizeDigits(text) {
    const map = {'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','٬':',','٫':'.'};
    return text.replace(/[٠-٩٬٫]/g, ch => map[ch] || ch);
  }

  function translateText(input, lang) {
    if (input == null) return input;
    const text = String(input);
    const leading = text.match(/^\s*/)[0];
    const trailing = text.match(/\s*$/)[0];
    const core = text.trim();
    if (!core) return text;

    let out;
    if (lang === 'en') {
      out = Object.prototype.hasOwnProperty.call(exactEn, core) ? exactEn[core] : replaceAllPairs(core, enPairs);
      out = latinizeDigits(out).replace(/\bج\.م\b/g, 'EGP');
    } else {
      out = Object.prototype.hasOwnProperty.call(exactAr, core) ? exactAr[core] : replaceAllPairs(core, arPairs);
    }
    return leading + out + trailing;
  }

  let currentLang = 'ar';
  try { currentLang = localStorage.getItem('hh-lang') === 'en' ? 'en' : 'ar'; } catch (_) {}

  const textOriginals = new WeakMap();
  const attrOriginals = new WeakMap();
  const valueOriginals = new WeakMap();
  let observer;
  let applying = false;
  let scheduled = false;

  function setDocumentLocale() {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.title = currentLang === 'ar' ? 'حجز هالتك | ديمو تفاعلي للمنتج' : 'Hagz Halletak | Interactive Product Demo';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = currentLang === 'ar'
      ? 'حجز هالتك — ديمو تفاعلي لتوافر القاعات والحجز وVenueOS.'
      : 'Hagz Halletak — interactive demo for real-time venue availability, booking, and VenueOS.';
  }

  function skipped(node) {
    const parent = node.parentElement;
    return !parent || ['SCRIPT','STYLE','NOSCRIPT','CODE','PRE'].includes(parent.tagName) || !!parent.closest('[data-i18n-skip]');
  }

  function translateTextNode(node) {
    if (skipped(node)) return;
    if (!textOriginals.has(node)) textOriginals.set(node, node.nodeValue);
    node.nodeValue = translateText(textOriginals.get(node), currentLang);
  }

  function translateAttrs(el) {
    if (el.closest && el.closest('[data-i18n-skip]')) return;
    let stored = attrOriginals.get(el);
    if (!stored) { stored = {}; attrOriginals.set(el, stored); }
    for (const attr of ['title','aria-label','placeholder','alt']) {
      if (!el.hasAttribute || !el.hasAttribute(attr)) continue;
      if (!(attr in stored)) stored[attr] = el.getAttribute(attr);
      el.setAttribute(attr, translateText(stored[attr], currentLang));
    }

    if (el instanceof HTMLInputElement && !['date','number','checkbox','radio','range','submit','button'].includes(el.type)) {
      if (!valueOriginals.has(el)) valueOriginals.set(el, el.value);
      el.value = translateText(valueOriginals.get(el), currentLang);
    }
    if (el instanceof HTMLTextAreaElement) {
      if (!valueOriginals.has(el)) valueOriginals.set(el, el.value);
      el.value = translateText(valueOriginals.get(el), currentLang);
    }
  }

  function updateLanguageSwitch() {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === currentLang ? 'true' : 'false');
    });
  }

  function applyLanguage(root) {
    if (typeof document === 'undefined' || applying) return;
    applying = true;
    try {
      setDocumentLocale();
      const scope = root || document.body;
      if (!scope) return;
      const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(translateTextNode);
      if (scope.nodeType === 1) translateAttrs(scope);
      scope.querySelectorAll?.('*').forEach(translateAttrs);
      updateLanguageSwitch();
    } finally {
      applying = false;
    }
  }

  function scheduleApply() {
    if (scheduled || typeof document === 'undefined') return;
    scheduled = true;
    setTimeout(() => {
      scheduled = false;
      applyLanguage(document.body);
    }, 0);
  }

  function setLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'ar';
    try { localStorage.setItem('hh-lang', currentLang); } catch (_) {}
    setDocumentLocale();
    applyLanguage(typeof document !== 'undefined' ? document.body : null);
    if (typeof CustomEvent !== 'undefined' && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hh:languagechange', { detail: { lang: currentLang } }));
    }
  }

  function getLanguage() { return currentLang; }

  global.hhSetLanguage = setLanguage;
  global.hhGetLanguage = getLanguage;
  global.hhTranslateText = translateText;
  global.hhApplyLanguage = applyLanguage;

  if (typeof document !== 'undefined') {
    setDocumentLocale();
    document.addEventListener('DOMContentLoaded', () => {
      applyLanguage(document.body);
      observer = new MutationObserver(mutations => {
        if (applying) return;
        if (mutations.some(m => m.addedNodes.length || m.type === 'characterData')) scheduleApply();
      });
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    });
    window.addEventListener('hashchange', scheduleApply);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translateText, exactEn, exactAr };
  }
})(typeof window !== 'undefined' ? window : globalThis);
