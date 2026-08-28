(function(){
'use strict';

const A=()=>document.querySelector('#app');
const isEn=()=>window.hhGetLanguage?.()==='en';
const L=(ar,en)=>isEn()?en:ar;
const parts=()=> (location.hash.replace(/^#\/?/,'')||'home').split('/');
const path=()=>parts().join('/');
const brand=()=>L('دوّر','Dawwar');
const venueName=()=>L('رويال جاردن','Royal Garden');
const packageName=()=>L('باقة الزفاف بلس','Wedding Plus');

function brandVisible(root=document){
  document.title=L('دوّر | عرض تفاعلي للمنتج','Dawwar | Interactive Product Demo');
  document.querySelector('meta[name="description"]')?.setAttribute('content',L(
    'دوّر — ابحث عن قاعة مناسبة ومتاحة، اطلب الحجز، تابع الزيارة والعرض، ثم أكد الحجز.',
    'Dawwar — find a suitable available venue, request a booking, manage the visit and quote, then confirm.'
  ));
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(n=>{
    if(!n.parentElement?.closest('script,style')){
      n.nodeValue=n.nodeValue
        .replace(/حجز هالتك|Hagz Halletak/g,brand())
        .replace(/HGZ-2031/g,'DWR-2031')
        .replace(/HGZ-/g,'DWR-');
    }
  });
  document.querySelectorAll('.brand-mark').forEach(x=>x.textContent=L('د','D'));
}

function pilotHome(){
  return `<main class="page" data-dawwar-pilot-home="1">
    <section class="dawwar-pilot-hero"><div class="container dawwar-pilot-grid">
      <div>
        <span class="dawwar-pilot-badge">● ${L('النسخة التجريبية الأولى · سوق موثوق للقاعات','Pilot MVP · trusted venue marketplace')}</span>
        <h1 class="dawwar-pilot-title">${L('دوّر على قاعة','Find a venue')} <span>${L('متاحة فعلًا.','that is actually available.')}</span></h1>
        <p class="dawwar-pilot-copy">${L('بدل ما تكلم قاعات كتير وتسأل نفس الأسئلة، اكتب تاريخك والمنطقة والعدد والميزانية. دوّر يطلع لك اختيارات موثقة، وبعدها تطلب الحجز أو زيارة وتكمل الاتفاق مع القاعة.','Instead of calling venue after venue, enter your date, area, guest count, and budget. Dawwar returns credible options, then you request a booking or visit and finalize with the venue.')}</p>
        <div class="dawwar-pilot-proof">
          <span>✓ ${L('العميل يستخدم دوّر مجانًا','Free for customers')}</span>
          <span>✓ ${L('القاعات تنضم مجانًا خلال النسخة التجريبية','Free venue onboarding during pilot')}</span>
          <span>✓ ${L('عمولة فقط عند حجز ناجح','Success commission only')}</span>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="navTo('explore')">${L('شوف القاعات المناسبة ←','See matching venues →')}</button>
          <button class="btn btn-light" onclick="setPersona('venue','venue-os/overview')">${L('أنا صاحب قاعة','I own a venue')}</button>
        </div>
      </div>
      <form class="dawwar-search-card" onsubmit="event.preventDefault();navTo('explore')">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:start"><div><h3>${L('إيه اللي بتدور عليه؟','What are you looking for?')}</h3><p class="pilot-note">${L('نبدأ من الاحتياج، مش من كتالوج صور.','Start from the need, not a photo directory.')}</p></div><span class="badge green">${L('التوافر أولًا','Availability first')}</span></div>
        <div class="dawwar-search-grid">
          <div class="field"><label>${L('التاريخ','Date')}</label><input type="date" value="2027-10-15"></div>
          <div class="field"><label>${L('المنطقة','Area')}</label><select><option>${L('القاهرة الجديدة','New Cairo')}</option><option>${L('الشيخ زايد','Sheikh Zayed')}</option></select></div>
          <div class="field"><label>${L('عدد الضيوف','Guests')}</label><select><option>300</option><option>200</option><option>500</option></select></div>
          <div class="field"><label>${L('الميزانية','Budget')}</label><select><option>100–180 ${L('ألف جنيه','thousand EGP')}</option><option>80–120 ${L('ألف جنيه','thousand EGP')}</option></select></div>
          <div class="field full"><label>${L('نوع المناسبة','Event type')}</label><select><option>${L('زفاف','Wedding')}</option><option>${L('خطوبة','Engagement')}</option><option>${L('كتب كتاب','Katb Ketab')}</option></select></div>
        </div>
        <button class="btn btn-primary btn-block" style="margin-top:14px">${L('دوّر على المتاح ←','Find available venues →')}</button>
      </form>
    </div></section>

    <section class="dawwar-pilot-strip"><div class="container">
      <div><div>${L('وعدنا للعميل','Customer promise')}</div><strong>${L('اختيارات مناسبة ومتاحة أسرع','Faster credible venue shortlist')}</strong></div>
      <div><div>${L('وعدنا للقاعة','Venue promise')}</div><strong>${L('عملاء محتملون مؤهلون، والدفع عند النجاح','Qualified leads, pay on success')}</strong></div>
      <div><div>${L('الإيراد في البداية','Launch revenue')}</div><strong>${L('عمولة نجاح بسيطة','Simple success commission')}</strong></div>
      <div><div>${L('خارج نطاق الإطلاق','Not launch scope')}</div><strong>${L('إدارة المدفوعات / الجولات الافتراضية / الذكاء الاصطناعي','Payments / 360 / AI')}</strong></div>
    </div></section>

    <section class="dawwar-section white"><div class="container">
      <div class="dawwar-section-head"><div><div class="kicker">${L('رحلة النسخة التجريبية','Pilot flow')}</div><h2>${L('الحجز مش لازم يبقى فوري من أول يوم','Booking does not need to be instant on day one')}</h2><p>${L('الأفراح فيها تفاوض وزيارة وتغيير باقات. لذلك نبدأ بطلب حجز قابل للتتبع، وليس بإتمام حجز كامل من البداية.','Weddings involve negotiation, visits, and package changes. Launch with a traceable request-to-book flow, not full checkout orchestration.')}</p></div></div>
      <div class="dawwar-how-grid">
        <article class="dawwar-step"><b>1</b><strong>${L('دوّر','Search')}</strong><p>${L('تاريخ + منطقة + عدد + ميزانية.','Date + area + guests + budget.')}</p></article>
        <article class="dawwar-step"><b>2</b><strong>${L('اختار','Shortlist')}</strong><p>${L('قاعات موثقة مع توافر وسعر مبدئي.','Verified venues with availability and price context.')}</p></article>
        <article class="dawwar-step"><b>3</b><strong>${L('اطلب الحجز','Request')}</strong><p>${L('القاعة تستلم طلبًا مؤهلًا وترد بعرض أو تاريخ بديل.','Venue receives a qualified lead and responds with a quote or alternative.')}</p></article>
        <article class="dawwar-step"><b>4</b><strong>${L('زيارة واتفاق','Visit & agree')}</strong><p>${L('العميل يزور أو يتفق على التفاصيل والسعر النهائي.','Customer visits or finalizes details and final price.')}</p></article>
        <article class="dawwar-step"><b>5</b><strong>${L('أكد الحجز','Confirm')}</strong><p>${L('العربون يذهب للقاعة مباشرة، والطرفان يؤكدان الحجز على دوّر.','Deposit goes directly to the venue; both sides confirm on Dawwar.')}</p></article>
      </div>
    </div></section>

    <section class="dawwar-section soft"><div class="container">
      <div class="dawwar-section-head"><div><div class="kicker">${L('نموذج العمل','Business model')}</div><h2>${L('نبني الطلب والثقة أولًا، وبعدها نوسع مصادر الإيراد','Prove demand and trust first, then expand monetization')}</h2></div></div>
      <div class="dawwar-model-grid">
        <article class="dawwar-model-card primary"><span class="tag">${L('الآن · النسخة التجريبية','Now · Pilot')}</span><h3>${L('عمولة عند النجاح فقط','Commission only')}</h3><p>${L('العميل مجاني. القاعة تنضم مجانًا. دوّر يأخذ عمولة نجاح بسيطة فقط على الحجز الذي جاء من المنصة وتم تأكيده.','Customers are free. Venues join free. Dawwar charges a small success commission only on a platform-sourced confirmed booking.')}</p><ul><li>${L('العمولة قابلة للتعديل وليست نسبة نهائية ثابتة','Configurable commission, not a permanent fixed rate')}</li><li>${L('الدفع بين العميل والقاعة مباشرة','Customer pays venue directly')}</li><li>${L('كشف عمولات أسبوعي أو شهري للقاعة','Venue commission statement')}</li></ul></article>
        <article class="dawwar-model-card"><span class="tag">${L('بعد إثبات الاستخدام المتكرر','After repeat usage')}</span><h3>${L('إدارة القاعات الاحترافية','VenueOS Pro')}</h3><p>${L('اشتراك شهري أو سنوي عندما يصبح التقويم وإدارة العملاء وأدوات الفريق قيمة مستقلة تستخدمها القاعة يوميًا.','Monthly or annual subscription only when calendar, CRM, and team tools create recurring standalone value.')}</p><ul><li>${L('اشتراك + عمولة أقل','Subscription + lower commission')}</li><li>${L('إدارة العملاء / الفريق / الأتمتة','CRM / Team / Automation')}</li><li>${L('تقارير أفضل ودعم أسرع','Richer reports and support')}</li></ul></article>
        <article class="dawwar-model-card"><span class="tag">${L('لاحقًا','Later')}</span><h3>${L('طبقة المعاملات','Transaction layer')}</h3><p>${L('العربون الإلكتروني والحجوزات المؤقتة الملزمة والاستردادات ومستحقات القاعات تأتي فقط عندما يبرر الحجم هذه التعقيدات.','Online deposits, hard holds, refunds, and payouts only when volume and leakage justify the complexity.')}</p><ul><li>${L('عربون إلكتروني','Online deposit')}</li><li>${L('حجز مؤقت محمي من التعارض','Atomic hold')}</li><li>${L('إدارة الاستردادات ومستحقات القاعات','Refund / payout orchestration')}</li></ul></article>
      </div>
    </div></section>

    <section class="dawwar-section white"><div class="container">
      <div class="dawwar-section-head"><div><div class="kicker">${L('إدارة القاعات المبسطة','VenueOS Lite')}</div><h2>${L('أداة تشغيل بسيطة تخلي التوافر موثوق','A lightweight operating tool that keeps supply trustworthy')}</h2><p>${L('في النسخة التجريبية صاحب القاعة يحتاج التقويم والعملاء المحتملين والزيارات والحجوزات وكشف العمولات. الباقي لا يمنع الإطلاق.','For pilot, venues need calendar, leads, visits, bookings, and a commission statement. Everything else is optional for launch.')}</p></div><button class="btn btn-light" onclick="setPersona('venue','venue-os/overview')">${L('افتح إدارة القاعة','Open VenueOS Lite')}</button></div>
      <div class="grid-4"><div class="card card-pad"><strong>${L('التقويم','Calendar')}</strong><p class="small muted">${L('التوافر الإلكتروني والخارجي في مكان واحد.','Online + offline availability in one place.')}</p></div><div class="card card-pad"><strong>${L('العملاء المحتملون','Leads')}</strong><p class="small muted">${L('كل استفسار ووقت الرد وحالته.','Every enquiry, response time, and status.')}</p></div><div class="card card-pad"><strong>${L('الزيارات والحجوزات','Visits & Bookings')}</strong><p class="small muted">${L('من الزيارة للتفاوض للحجز المؤكد.','Visit to negotiation to confirmed booking.')}</p></div><div class="card card-pad"><strong>${L('العمولة','Commission')}</strong><p class="small muted">${L('المبالغ المستحقة لدوّر بشفافية.','Transparent commission due to Dawwar.')}</p></div></div>
    </div></section>

    <section class="dawwar-section soft"><div class="container">
      <div class="dawwar-section-head"><div><div class="kicker">${L('الرؤية المستقبلية','Future Vision')}</div><h2>${L('الأفكار الكبيرة محفوظة، لكنها ليست شروط إطلاق','The bigger vision stays visible without blocking launch')}</h2></div><button class="btn btn-light" onclick="navTo('vision')">${L('شوف الرؤية الكاملة','See full vision')}</button></div>
      <div class="dawwar-vision-grid">
        <article class="dawwar-vision-card"><small>${L('بعد النسخة التجريبية','After pilot')}</small><strong>${L('تواريخ مرنة / قائمة انتظار / عروض التواريخ القريبة','Flexible Dates / Waitlist / DateDrop')}</strong><p>${L('نسحبها للأمام فقط لو البيانات أثبتت المشكلة.','Promote only when data proves the problem.')}</p></article>
        <article class="dawwar-vision-card"><small>${L('بعد وجود حجم معاملات','After transaction volume')}</small><strong>${L('الدفع الإلكتروني / الحجز المؤقت / الاستردادات','Online Payment / Hold / Refunds')}</strong><p>${L('طبقة مالية كاملة عندما يكون لها عائد تشغيلي واضح.','Full financial layer when it has operational ROI.')}</p></article>
        <article class="dawwar-vision-card"><small>${L('بعد وجود بيانات كافية','After enough data')}</small><strong>${L('ذكاء الأعمال / التسعير الديناميكي / الذكاء الاصطناعي','BI / Dynamic Pricing / AI')}</strong><p>${L('قرارات مبنية على بيانات تشغيل فعلية، مش أرقام عرض تجريبي.','Decisions based on production events, not demo numbers.')}</p></article>
        <article class="dawwar-vision-card"><small>${L('ميزة تنافسية','Differentiation')}</small><strong>${L('جولات 360° / جودة المحتوى','360° / Content Quality')}</strong><p>${L('ميزة تجربة وثقة بعد ثبات مسار التحويل الأساسي.','Experience and trust differentiator after the core funnel works.')}</p></article>
      </div>
    </div></section>
  </main>`;
}

function requestPage(venue='royal-garden'){
  return `<main class="page"><section class="dawwar-request-page"><div class="container">
    <div class="breadcrumb"><a href="#/explore">${L('النتائج','Results')}</a> / <a href="#/venue/${venue}">${venueName()}</a> / ${L('طلب حجز','Request booking')}</div>
    <div class="dawwar-request-layout"><section class="dawwar-panel"><span class="dawwar-status">${L('طلب حجز تجريبي','Pilot Request-to-Book')}</span><h1>${L('اطلب تأكيد التاريخ والعرض','Request date confirmation & quote')}</h1><p class="muted">${L('دوّر يرسل طلبك للقاعة بشكل منظم. لا يوجد دفع على المنصة في النسخة التجريبية.','Dawwar sends a structured request to the venue. No platform payment is required during pilot.')}</p>
      <div class="form-grid"><div class="field"><label>${L('التاريخ','Date')}</label><input value="${L('15 أكتوبر 2027','15 October 2027')}"></div><div class="field"><label>${L('عدد الضيوف','Guests')}</label><input value="300"></div><div class="field"><label>${L('الباقة المفضلة','Preferred package')}</label><select><option>${packageName()}</option><option>${L('القاعة فقط','Hall Only')}</option><option>${L('الباقة المميزة','Signature')}</option></select></div><div class="field"><label>${L('الميزانية','Budget')}</label><input value="${L('100–180 ألف جنيه','EGP 100K–180K')}"></div><div class="field full"><label>${L('ملاحظات','Notes')}</label><textarea rows="4">${L('محتاج أعرف السعر النهائي وإمكانية زيارة القاعة يوم الخميس.','Please confirm final price and whether a Thursday visit is available.')}</textarea></div></div>
      <button class="btn btn-primary btn-block" style="margin-top:14px" onclick="navTo('pilot/quote/${venue}')">${L('إرسال الطلب للقاعة ←','Send request to venue →')}</button>
    </section><aside class="dawwar-panel"><h3>${L('إيه اللي يحصل بعد كده؟','What happens next?')}</h3><div class="dawwar-flow-list">
      <div class="dawwar-flow-row"><i>1</i><div><strong>${L('طلب مؤهل','Qualified lead')}</strong><span>${L('القاعة تستلم التاريخ والعدد والميزانية والباقة.','Venue receives date, guests, budget, and package.')}</span></div></div>
      <div class="dawwar-flow-row"><i>2</i><div><strong>${L('رد قابل للتتبع','Tracked response')}</strong><span>${L('متاح / تاريخ بديل / عرض سعر / طلب معلومات إضافية.','Available / alternative / quote / more info.')}</span></div></div>
      <div class="dawwar-flow-row"><i>3</i><div><strong>${L('زيارة أو تفاوض','Visit or negotiate')}</strong><span>${L('اتفقوا على التفاصيل والسعر النهائي.','Finalize details and final price.')}</span></div></div>
      <div class="dawwar-flow-row"><i>4</i><div><strong>${L('تأكيد من الطرفين','Both sides confirm')}</strong><span>${L('بعد دفع العربون للقاعة مباشرة.','After deposit is paid directly to the venue.')}</span></div></div>
    </div></aside></div>
  </div></section></main>`;
}

function quotePage(venue='royal-garden'){
  return `<main class="page"><section class="dawwar-request-page"><div class="container"><div class="dawwar-request-layout">
    <section class="dawwar-panel dawwar-quote"><span class="dawwar-status">✓ ${L('القاعة ردت · التاريخ متاح','Venue responded · Available')}</span><h1>${venueName()}</h1><p>${L('15 أكتوبر 2027 متاح. القاعة أرسلت العرض النهائي التالي:','15 October 2027 is available. The venue sent this final quote:')}</p>
      <div class="dawwar-price">148,000 ${L('ج.م','EGP')} <small>${L('السعر النهائي المتفق عليه','final agreed venue price')}</small></div>
      <div class="card card-pad" style="margin-top:16px"><strong>${packageName()}</strong><p class="small muted">${L('300 ضيف · بوفيه · منسق موسيقى · ديكور · موقف سيارات','300 guests · Buffet · DJ · Decoration · Parking')}</p></div>
      <div class="dawwar-pilot-callout"><strong>${L('طريقة الدفع في النسخة التجريبية:','Pilot payment model:')}</strong> ${L('العربون يُدفع مباشرة للقاعة نقدًا أو بتحويل بنكي أو إنستاباي حسب الاتفاق. دوّر لا يحتفظ بقيمة الحجز.','Deposit is paid directly to the venue by cash, bank transfer, or InstaPay as agreed. Dawwar does not hold the booking value.')}</div>
      <div style="display:flex;gap:9px;flex-wrap:wrap"><button class="btn btn-light" onclick="toast('${L('تم طلب زيارة الخميس الساعة 5 مساءً — عرض تجريبي','Thursday 5:00 PM visit requested — Demo')}')">${L('احجز زيارة أولًا','Schedule visit first')}</button><button class="btn btn-primary" onclick="navTo('pilot/confirmed')">${L('العربون اتدفع للقاعة · أكد الحجز ←','Deposit paid to venue · confirm booking →')}</button></div>
    </section><aside class="dawwar-panel"><h3>${L('ليه دوّر يتابع الخطوة دي؟','Why does Dawwar track this?')}</h3><p class="small muted">${L('علشان نعرف مصدر الحجز ونحافظ على تاريخ الاستفسار والعرض والزيارة والتأكيد. ده يسمح بعمولة نجاح عادلة بدون ما نبني بنية دفع كاملة من أول يوم.','To preserve booking attribution, lead/quote/visit history, and confirmation. That enables a fair success commission without building payment infrastructure on day one.')}</p><div class="dawwar-flow-list"><div class="dawwar-flow-row"><i>✓</i><div><strong>${L('تحديد مصدر الحجز','Source attribution')}</strong><span>${L('استفسار ← عرض سعر ← حجز','Enquiry → quote → booking')}</span></div></div><div class="dawwar-flow-row"><i>✓</i><div><strong>${L('تأكيد العميل','Customer confirmation')}</strong><span>${L('العميل يؤكد إن الحجز تم.','Customer confirms the booking happened.')}</span></div></div><div class="dawwar-flow-row"><i>✓</i><div><strong>${L('تأكيد القاعة','Venue confirmation')}</strong><span>${L('القاعة تؤكد استلام العربون والقيمة النهائية.','Venue confirms deposit receipt and final value.')}</span></div></div></div></aside>
  </div></div></section></main>`;
}

function confirmedPage(){
  return `<main class="page"><section class="dawwar-request-page"><div class="container" style="max-width:980px"><section class="dawwar-panel dawwar-confirmed"><div class="check">✓</div><span class="dawwar-status">${L('تأكيد العميل والقاعة','Confirmed by customer + venue')}</span><h1>${L('الحجز اتأكد','Booking confirmed')}</h1><div class="dawwar-ref">DWR-2031</div><p class="muted">${venueName()} · ${L('15 أكتوبر 2027','15 Oct 2027')} · 148,000 ${L('ج.م','EGP')}</p><div class="dawwar-pilot-callout">${L('العربون تم دفعه مباشرة للقاعة. دوّر يحتفظ بسجل الحجز ومصدره والتأكيدات فقط خلال النسخة التجريبية.','Deposit was paid directly to the venue. During pilot, Dawwar keeps the booking attribution and confirmation record.')}</div><div style="display:flex;gap:9px;justify-content:center;flex-wrap:wrap"><button class="btn btn-primary" onclick="setPersona('venue','pilot/commission')">${L('شوف نفس الحجز عند القاعة ←','See the venue side →')}</button><button class="btn btn-light" onclick="navTo('account')">${L('حساب العميل','Customer account')}</button></div></section></div></section></main>`;
}

function commissionPage(){
  return `<main class="page"><section class="dawwar-request-page"><div class="container"><div class="dawwar-request-layout"><section class="dawwar-panel"><span class="dawwar-status">${L('إدارة القاعات المبسطة','VenueOS Lite')}</span><h1>${L('الحجز DWR-2031 · تم بنجاح','Booking DWR-2031 · Won')}</h1><div class="grid-2"><div class="card card-pad"><small class="muted">${L('القيمة النهائية','Final venue value')}</small><strong style="display:block;font-size:25px">148,000 ${L('ج.م','EGP')}</strong></div><div class="card card-pad"><small class="muted">${L('العربون','Deposit')}</small><strong style="display:block;font-size:25px">${L('تم الاستلام','Received')}</strong></div></div><div class="dawwar-flow-list"><div class="dawwar-flow-row"><i>✓</i><div><strong>${L('طلب جاء من دوّر','Lead from Dawwar')}</strong><span>${L('طلب رقم RQ-8142','Request #RQ-8142')}</span></div></div><div class="dawwar-flow-row"><i>✓</i><div><strong>${L('العميل أكد الحجز','Customer confirmed')}</strong><span>${L('28 أغسطس 2026','28 Aug 2026')}</span></div></div><div class="dawwar-flow-row"><i>✓</i><div><strong>${L('القاعة أكدت استلام العربون','Venue confirmed deposit')}</strong><span>${L('الحجز الآن محسوب كحجز جاء من المنصة.','Booking now counts as platform-sourced.')}</span></div></div></div><button class="btn btn-light" style="margin-top:16px" onclick="setPersona('venue','venue-os/leads')">${L('افتح إدارة العملاء المحتملين','Open Leads CRM')}</button></section><aside><div class="dawwar-commission-box"><small>${L('عمولة نجاح · قاعدة النسخة التجريبية','Success commission · Pilot rule')}</small><strong>${L('مستحقة','DUE')}</strong><p class="small" style="opacity:.82">${L('قاعدة العمولة قابلة للتعديل والإصدار. النسبة التجارية النهائية ليست مثبتة داخل المنتج.','The rule is configurable/versioned. The permanent commercial rate is not hard-coded in the product.')}</p></div><div class="dawwar-panel" style="margin-top:14px"><h3>${L('ليه القاعة تدفع؟','Why the venue pays')}</h3><p class="small muted">${L('دوّر جاب طلبًا مؤهلًا بتاريخ وميزانية وعدد، وتتبعه لحد حجز مؤكد. لا حجز = لا عمولة خلال النسخة التجريبية.','Dawwar sourced a qualified lead and tracked it to a confirmed booking. No booking = no commission during pilot.')}</p><button class="btn btn-primary btn-block" onclick="setPersona('admin','pilot/ops')">${L('شوف التسوية عند الإدارة ←','See admin reconciliation →')}</button></div></aside></div></div></section></main>`;
}

function opsPage(){
  return `<main class="page"><section class="dawwar-request-page"><div class="container"><section class="dawwar-panel"><span class="dawwar-status">${L('إدارة وتشغيل النسخة التجريبية','Admin / Ops Pilot')}</span><h1>${L('تشغيل السوق قبل الأتمتة الثقيلة','Operate the marketplace before heavy automation')}</h1><div class="grid-4"><div class="card card-pad"><small class="muted">${L('قاعات موثقة','Verified venues')}</small><strong style="display:block;font-size:26px">24</strong></div><div class="card card-pad"><small class="muted">${L('توافر حديث','Fresh availability')}</small><strong style="display:block;font-size:26px">91%</strong></div><div class="card card-pad"><small class="muted">${L('استفسارات معلقة','Pending enquiries')}</small><strong style="display:block;font-size:26px">7</strong></div><div class="card card-pad"><small class="muted">${L('عمولة مستحقة','Commission due')}</small><strong style="display:block;font-size:26px">${L('تجريبي','Demo')}</strong></div></div><div class="dawwar-flow-list"><div class="dawwar-flow-row"><i>1</i><div><strong>${L('طابور التحقق','Verification queue')}</strong><span>${L('فقط القاعات الموثقة تدخل نتائج بحث العملاء.','Only verified venues enter customer search.')}</span></div></div><div class="dawwar-flow-row"><i>2</i><div><strong>${L('طابور التوافر القديم','Stale availability queue')}</strong><span>${L('فريق التشغيل يتابع القاعات قبل ما يضر التوافر القديم بثقة العملاء.','Ops follows up before stale inventory damages trust.')}</span></div></div><div class="dawwar-flow-row"><i>3</i><div><strong>${L('تحديد مصدر الحجز','Booking attribution')}</strong><span>DWR-2031 ← RQ-8142 ← ${L('بحث دوّر','Dawwar search')}</span></div></div><div class="dawwar-flow-row"><i>4</i><div><strong>${L('تسوية العمولات','Commission reconciliation')}</strong><span>${L('مستحقة / مدفوعة / معفاة / متنازع عليها / ملغاة مع سجل مراجعة.','Due / paid / waived / disputed / reversed with audit trail.')}</span></div></div></div><div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:18px"><button class="btn btn-primary" onclick="setPersona('admin','admin/verification')">${L('فتح التحقق','Open verification')}</button><button class="btn btn-light" onclick="navTo('vision')">${L('الرؤية المستقبلية','Future Vision')}</button></div></section></div></section></main>`;
}

function renderPilotRoute(){
  const [p,a,b]=parts();
  if(p!=='pilot')return false;
  if(!A())return true;
  if(a==='request')A().innerHTML=requestPage(b);
  else if(a==='quote')A().innerHTML=quotePage(b);
  else if(a==='confirmed')A().innerHTML=confirmedPage();
  else if(a==='commission')A().innerHTML=commissionPage();
  else if(a==='ops')A().innerHTML=opsPage();
  else A().innerHTML=pilotHome();
  window.hhApplyLanguage?.(document.body);brandVisible(A());return true;
}

function enhanceVenue(){
  if(parts()[0]!=='venue')return;
  const box=document.querySelector('.booking-box');if(!box)return;
  const venue=parts()[1]||'royal-garden';
  box.innerHTML=`<div class="panel-head"><div><span class="tiny muted">${L('سعر مبدئي','Starting price')}</span><div class="price-lg">145,000 ${L('ج.م','EGP')}</div></div><span class="badge green">✓ ${L('موثقة','Verified')}</span></div><div class="dawwar-pilot-callout"><strong>${L('النسخة التجريبية: التوافر يحتاج تأكيد القاعة','Pilot: availability is venue-confirmed')}</strong><br>${L('آخر تحديث للعرض حديث. أرسل طلب حجز لتأكيد التاريخ والسعر النهائي.','Demo freshness: current. Send a Request-to-Book to confirm the date and final quote.')}</div><div class="grid-2"><button class="btn btn-light" onclick="toast('${L('تم طلب زيارة الخميس الساعة 5 مساءً — عرض تجريبي','Thursday 5:00 PM visit requested — Demo')}')">${L('احجز زيارة','Schedule visit')}</button><button class="btn btn-primary" onclick="navTo('pilot/request/${venue}')">${L('اطلب الحجز','Request booking')}</button></div><p class="tiny muted" style="margin:12px 0 0">${L('لا يوجد حجز مؤقت أو دفع إلكتروني على المنصة خلال النسخة التجريبية. الاتفاق والعربون مباشرة مع القاعة.','No online hold or platform payment in pilot. Terms and deposit are handled directly with the venue.')}</p>`;
  document.querySelectorAll('button[onclick*="createHold"]').forEach(btn=>{btn.textContent=L('اطلب الحجز','Request booking');btn.setAttribute('onclick',`navTo('pilot/request/${venue}')`)});
  document.querySelectorAll('.badge.orange').forEach(x=>{if(/Hold/i.test(x.textContent))x.textContent=L('تأكيد مطلوب','Confirmation needed')});
}

function enhanceExplore(){
  if(parts()[0]!=='explore')return;
  document.querySelectorAll('.venue-card').forEach(card=>{
    const chips=card.querySelector('.chips');if(chips&&!chips.querySelector('.dawwar-fresh')){
      const s=document.createElement('span');s.className='chip dawwar-fresh';s.textContent='◷ '+L('محدّث حديثًا','Recently updated');chips.appendChild(s);
    }
  });
  document.querySelectorAll('.badge.orange').forEach(x=>{if(/Hold/i.test(x.textContent))x.textContent=L('تأكيد مطلوب','Confirmation needed')});
}

function futureRoute(){
  const r=path();
  return [
    'booking/','success','refund/','package-builder/','flexible-dates','datedrop','request-offers','states',
    'venue-os/datedrop','venue-os/analytics','venue-os/business-center','venue-os/revenue-intelligence','venue-os/action-center','venue-os/360-manager',
    'admin/disputes','admin/payouts','admin/analytics','admin/economics','admin/marketplace-health','admin/content-quality','strategy-simulator','investor'
  ].some(x=>r===x||r.startsWith(x));
}

function addFutureBanner(){
  if(!futureRoute()||document.querySelector('.dawwar-future-banner')||!A())return;
  const b=document.createElement('div');b.className='dawwar-future-banner';b.innerHTML=`<div class="container"><span><strong>${L('الرؤية المستقبلية','Future Vision')}</strong> · ${L('الشاشة دي موجودة لإظهار اتجاه المنتج، لكنها ليست شرطًا لإطلاق النسخة التجريبية.','This screen demonstrates product direction; it is not a pilot launch requirement.')}</span><button class="btn btn-light btn-sm" onclick="navTo('home')">${L('ارجع للنسخة التجريبية','Back to pilot')}</button></div>`;A().prepend(b);
}

function patchChrome(){
  const brandEl=document.querySelector('header .brand');
  if(brandEl){
    brandEl.setAttribute('aria-label',brand());
    const mark=brandEl.querySelector('.brand-mark');if(mark)mark.textContent=L('د','D');
    const word=brandEl.querySelector('span:last-child');if(word){word.textContent=brand();word.classList.add('dawwar-brand-word')}
  }
  const ribbon=document.querySelector('.demo-ribbon-inner span');if(ribbon)ribbon.innerHTML=L(
    '<strong>نسخة دوّر التجريبية:</strong> التوافر ← الاستفسار ← الزيارة والعرض ← الحجز المؤكد.',
    '<strong>Dawwar Pilot:</strong> Availability → Enquiry → Visit/Quote → Confirmed booking.'
  );
  const modal=document.querySelector('#personaModal');if(modal){
    const title=modal.querySelector('#demoTitle');if(title)title.textContent=L('اختار منظور دوّر','Choose a Dawwar perspective');
    modal.querySelectorAll('.persona-card').forEach(card=>{
      const onclick=card.getAttribute('onclick')||'';
      const name=card.querySelector('strong');
      const last=card.querySelector('span:last-child');if(!name||!last)return;
      if(onclick.includes("'customer'")){name.textContent=L('العميل','Customer');last.textContent=L('البحث ← الاستفسار ← الزيارة ← التأكيد','Search → Enquiry → Visit → Confirm')}
      else if(onclick.includes("'venue'")){name.textContent=L('صاحب القاعة','Venue Owner');last.textContent=L('التقويم ← العملاء المحتملون ← الزيارات ← العمولة','Calendar → Leads → Visits → Commission')}
      else if(onclick.includes("'admin'")){name.textContent=L('إدارة المنصة','Platform Admin');last.textContent=L('التحقق ← حداثة البيانات ← تحديد المصدر ← العمولة','Verification → Freshness → Attribution → Commission')}
      else if(onclick.includes("'investor'")){name.textContent=L('المستثمر','Investor');last.textContent=L('السوق ← إدارة القاعات ← العمولة ← الرؤية المستقبلية','Marketplace → VenueOS → Commission → Future Vision')}
    });
  }
}

function apply(){
  patchChrome();
  if(renderPilotRoute()){brandVisible(document);return}
  if(parts()[0]==='home'&&A()&&!A().querySelector('[data-dawwar-pilot-home]'))A().innerHTML=pilotHome();
  enhanceExplore();enhanceVenue();addFutureBanner();brandVisible(document);
}

window.dawwarPilotApply=apply;
window.dawwarOpenRequest=(venue='royal-garden')=>window.navTo?.(`pilot/request/${venue}`);

window.addEventListener('hashchange',()=>setTimeout(apply,180));
window.addEventListener('hh:languagechange',()=>setTimeout(apply,180));
document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,360));
setTimeout(apply,500);
})();