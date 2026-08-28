(function(){
'use strict';

const A=()=>document.querySelector('#app');
const isEn=()=>window.hhGetLanguage?.()==='en';
const L=(ar,en)=>isEn()?en:ar;
const parts=()=> (location.hash.replace(/^#\/?/,'')||'home').split('/');
const path=()=>parts().join('/');

function brandVisible(root=document){
  document.title=document.title.replace(/حجز هالتك|Hagz Halletak/g,'Dawwar');
  document.querySelector('meta[name="description"]')?.setAttribute('content',L(
    'Dawwar — دور على قاعة مناسبة ومتاحة فعلًا، اطلب الحجز، تابع الزيارة والعرض، وأكد الحجز.','Dawwar — find credible available venues, request a booking, manage the visit and quote, then confirm.'
  ));
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(n=>{
    if(!n.parentElement?.closest('script,style')){
      n.nodeValue=n.nodeValue
        .replace(/حجز هالتك/g,'Dawwar')
        .replace(/Hagz Halletak/g,'Dawwar')
        .replace(/HGZ-2031/g,'DWR-2031')
        .replace(/HGZ-/g,'DWR-');
    }
  });
  document.querySelectorAll('.brand-mark').forEach(x=>x.textContent='D');
}

function pilotHome(){
  return `<main class="page" data-dawwar-pilot-home="1">
    <section class="dawwar-pilot-hero"><div class="container dawwar-pilot-grid">
      <div>
        <span class="dawwar-pilot-badge">● ${L('Pilot MVP · سوق قاعات موثوق','Pilot MVP · trusted venue marketplace')}</span>
        <h1 class="dawwar-pilot-title">${L('دوّر على قاعة','Find a venue')} <span>${L('متاحة فعلًا.','that is actually available.')}</span></h1>
        <p class="dawwar-pilot-copy">${L('بدل ما تكلم قاعات كتير وتسأل نفس الأسئلة، اكتب تاريخك والمنطقة والعدد والميزانية. Dawwar يطلع لك اختيارات موثقة، وبعدها تطلب الحجز أو زيارة وتكمل الاتفاق مع القاعة.','Instead of calling venue after venue, enter your date, area, guest count, and budget. Dawwar returns credible options, then you request a booking or visit and finalize with the venue.')}</p>
        <div class="dawwar-pilot-proof">
          <span>✓ ${L('العميل يستخدم Dawwar مجانًا','Free for customers')}</span>
          <span>✓ ${L('القاعات تنضم مجانًا في الـPilot','Free venue onboarding during pilot')}</span>
          <span>✓ ${L('عمولة فقط عند حجز ناجح','Success commission only')}</span>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="navTo('explore')">${L('شوف القاعات المناسبة ←','See matching venues →')}</button>
          <button class="btn btn-light" onclick="setPersona('venue','venue-os/overview')">${L('أنا صاحب قاعة','I own a venue')}</button>
        </div>
      </div>
      <form class="dawwar-search-card" onsubmit="event.preventDefault();navTo('explore')">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:start"><div><h3>${L('إيه اللي بتدور عليه؟','What are you looking for?')}</h3><p class="pilot-note">${L('نبدأ من الاحتياج، مش من كتالوج صور.','Start from the need, not a photo directory.')}</p></div><span class="badge green">${L('Availability أولًا','Availability first')}</span></div>
        <div class="dawwar-search-grid">
          <div class="field"><label>${L('التاريخ','Date')}</label><input type="date" value="2027-10-15"></div>
          <div class="field"><label>${L('المنطقة','Area')}</label><select><option>${L('القاهرة الجديدة','New Cairo')}</option><option>${L('الشيخ زايد','Sheikh Zayed')}</option></select></div>
          <div class="field"><label>${L('عدد الضيوف','Guests')}</label><select><option>300</option><option>200</option><option>500</option></select></div>
          <div class="field"><label>${L('الميزانية','Budget')}</label><select><option>100K–180K</option><option>80K–120K</option></select></div>
          <div class="field full"><label>${L('نوع المناسبة','Event type')}</label><select><option>${L('زفاف','Wedding')}</option><option>${L('خطوبة','Engagement')}</option><option>${L('كتب كتاب','Katb Ketab')}</option></select></div>
        </div>
        <button class="btn btn-primary btn-block" style="margin-top:14px">${L('دوّر على المتاح ←','Find available venues →')}</button>
      </form>
    </div></section>

    <section class="dawwar-pilot-strip"><div class="container">
      <div><div>${L('وعدنا للعميل','Customer promise')}</div><strong>${L('اختيارات مناسبة ومتاحة أسرع','Faster credible venue shortlist')}</strong></div>
      <div><div>${L('وعدنا للقاعة','Venue promise')}</div><strong>${L('Leads مؤهلة، والدفع عند النجاح','Qualified leads, pay on success')}</strong></div>
      <div><div>${L('الإيراد في البداية','Launch revenue')}</div><strong>${L('عمولة نجاح بسيطة','Simple success commission')}</strong></div>
      <div><div>${L('مش Launch Scope','Not launch scope')}</div><strong>${L('Payment orchestration / 360 / AI','Payments / 360 / AI')}</strong></div>
    </div></section>

    <section class="dawwar-section white"><div class="container">
      <div class="dawwar-section-head"><div><div class="kicker">${L('رحلة الـPilot','Pilot flow')}</div><h2>${L('الحجز مش لازم يبقى Instant من أول يوم','Booking does not need to be instant on day one')}</h2><p>${L('الأفراح فيها تفاوض وزيارة وتغيير باقات. لذلك نبدأ بـ Request-to-Book قابل للتتبع، وليس Checkout كامل.','Weddings involve negotiation, visits, and package changes. Launch with a traceable request-to-book flow, not full checkout orchestration.')}</p></div></div>
      <div class="dawwar-how-grid">
        <article class="dawwar-step"><b>1</b><strong>${L('دوّر','Search')}</strong><p>${L('تاريخ + منطقة + عدد + ميزانية.','Date + area + guests + budget.')}</p></article>
        <article class="dawwar-step"><b>2</b><strong>${L('اختار','Shortlist')}</strong><p>${L('قاعات موثقة مع توافر وسعر مبدئي.','Verified venues with availability and price context.')}</p></article>
        <article class="dawwar-step"><b>3</b><strong>${L('اطلب الحجز','Request')}</strong><p>${L('القاعه تستلم Lead مؤهلة وترد بعرض أو بديل.','Venue receives a qualified lead and responds with a quote or alternative.')}</p></article>
        <article class="dawwar-step"><b>4</b><strong>${L('زيارة واتفاق','Visit & agree')}</strong><p>${L('العميل يزور أو يتفق على التفاصيل والسعر النهائي.','Customer visits or finalizes details and final price.')}</p></article>
        <article class="dawwar-step"><b>5</b><strong>${L('أكد الحجز','Confirm')}</strong><p>${L('العربون يذهب للقاعة مباشرة، والطرفان يؤكدان الحجز على Dawwar.','Deposit goes directly to the venue; both sides confirm on Dawwar.')}</p></article>
      </div>
    </div></section>

    <section class="dawwar-section soft"><div class="container">
      <div class="dawwar-section-head"><div><div class="kicker">${L('Business model','Business model')}</div><h2>${L('نبني الطلب والثقة الأول، وبعدها نوسع الـMonetization','Prove demand and trust first, then expand monetization')}</h2></div></div>
      <div class="dawwar-model-grid">
        <article class="dawwar-model-card primary"><span class="tag">${L('الآن · Pilot','Now · Pilot')}</span><h3>${L('Commission only','Commission only')}</h3><p>${L('العميل مجاني. القاعة تنضم مجانًا. Dawwar يأخذ عمولة نجاح بسيطة فقط على الحجز الذي جاء من المنصة وتم تأكيده.','Customers are free. Venues join free. Dawwar charges a small success commission only on a platform-sourced confirmed booking.')}</p><ul><li>${L('العمولة configurable وليست نسبة نهائية ثابتة','Configurable commission, not a permanent fixed rate')}</li><li>${L('الدفع بين العميل والقاعة مباشرة','Customer pays venue directly')}</li><li>${L('كشف عمولات أسبوعي/شهري للقاعة','Venue commission statement')}</li></ul></article>
        <article class="dawwar-model-card"><span class="tag">${L('بعد إثبات الاستخدام','After repeat usage')}</span><h3>VenueOS Pro</h3><p>${L('اشتراك شهري أو سنوي عندما يصبح الـCalendar والـCRM والـteam tools قيمة مستقلة تستخدمها القاعة يوميًا.','Monthly or annual subscription only when calendar, CRM, and team tools create recurring standalone value.')}</p><ul><li>${L('اشتراك + عمولة أقل','Subscription + lower commission')}</li><li>CRM / Team / Automation</li><li>${L('تقارير أفضل ودعم أسرع','Richer reports and support')}</li></ul></article>
        <article class="dawwar-model-card"><span class="tag">${L('لاحقًا','Later')}</span><h3>${L('Transaction layer','Transaction layer')}</h3><p>${L('Online deposit وhard holds وrefunds وpayouts فقط عندما يصبح الحجم والتسريب اليدوي مشكلة حقيقية.','Online deposits, hard holds, refunds, and payouts only when volume and leakage justify the complexity.')}</p><ul><li>Online deposit</li><li>Atomic hold</li><li>Refund / payout orchestration</li></ul></article>
      </div>
    </div></section>

    <section class="dawwar-section white"><div class="container">
      <div class="dawwar-section-head"><div><div class="kicker">VenueOS Lite</div><h2>${L('أداة تشغيل بسيطة تخلي التوافر موثوق','A lightweight operating tool that keeps supply trustworthy')}</h2><p>${L('في الـPilot صاحب القاعة يحتاج Calendar + Leads + Visits + Bookings + Commission statement. الباقي لا يمنع الإطلاق.','For pilot, venues need calendar, leads, visits, bookings, and a commission statement. Everything else is optional for launch.')}</p></div><button class="btn btn-light" onclick="setPersona('venue','venue-os/overview')">${L('افتح VenueOS Lite','Open VenueOS Lite')}</button></div>
      <div class="grid-4"><div class="card card-pad"><strong>Calendar</strong><p class="small muted">${L('Online + offline availability في مكان واحد.','Online + offline availability in one place.')}</p></div><div class="card card-pad"><strong>Leads</strong><p class="small muted">${L('كل enquiry وتوقيت الرد والـstatus.','Every enquiry, response time, and status.')}</p></div><div class="card card-pad"><strong>Visits & Bookings</strong><p class="small muted">${L('من الزيارة للتفاوض للحجز المؤكد.','Visit to negotiation to confirmed booking.')}</p></div><div class="card card-pad"><strong>Commission</strong><p class="small muted">${L('المبالغ المستحقة لـDawwar بشفافية.','Transparent commission due to Dawwar.')}</p></div></div>
    </div></section>

    <section class="dawwar-section soft"><div class="container">
      <div class="dawwar-section-head"><div><div class="kicker">${L('Future Vision','Future Vision')}</div><h2>${L('الأفكار الكبيرة محفوظة، لكنها ليست شروط إطلاق','The bigger vision stays visible without blocking launch')}</h2></div><button class="btn btn-light" onclick="navTo('vision')">${L('شوف الرؤية الكاملة','See full vision')}</button></div>
      <div class="dawwar-vision-grid">
        <article class="dawwar-vision-card"><small>${L('بعد الـPilot','After pilot')}</small><strong>Flexible Dates / Waitlist / DateDrop</strong><p>${L('نسحبها للأمام فقط لو البيانات أثبتت المشكلة.','Promote only when data proves the problem.')}</p></article>
        <article class="dawwar-vision-card"><small>${L('بعد حجم معاملات','After transaction volume')}</small><strong>Online Payment / Hold / Refunds</strong><p>${L('طبقة مالية كاملة عندما يكون لها ROI تشغيلي.','Full financial layer when it has operational ROI.')}</p></article>
        <article class="dawwar-vision-card"><small>${L('بعد بيانات كافية','After enough data')}</small><strong>BI / Dynamic Pricing / AI</strong><p>${L('قرارات مبنية على production events لا أرقام ديمو.','Decisions based on production events, not demo numbers.')}</p></article>
        <article class="dawwar-vision-card"><small>${L('Differentiation','Differentiation')}</small><strong>360° / Content Quality</strong><p>${L('ميزة تجربة وثقة بعد ثبات الـcore funnel.','Experience and trust differentiator after the core funnel works.')}</p></article>
      </div>
    </div></section>
  </main>`;
}

function requestPage(venue='royal-garden'){
  return `<main class="page"><section class="dawwar-request-page"><div class="container">
    <div class="breadcrumb"><a href="#/explore">${L('النتائج','Results')}</a> / <a href="#/venue/${venue}">Royal Garden</a> / ${L('طلب حجز','Request booking')}</div>
    <div class="dawwar-request-layout"><section class="dawwar-panel"><span class="dawwar-status">${L('Pilot Request-to-Book','Pilot Request-to-Book')}</span><h1>${L('اطلب تأكيد التاريخ والعرض','Request date confirmation & quote')}</h1><p class="muted">${L('Dawwar يرسل طلبك للقاعة بشكل منظم. لا يوجد دفع على المنصة في الـPilot.','Dawwar sends a structured request to the venue. No platform payment is required during pilot.')}</p>
      <div class="form-grid"><div class="field"><label>${L('التاريخ','Date')}</label><input value="15 أكتوبر 2027"></div><div class="field"><label>${L('عدد الضيوف','Guests')}</label><input value="300"></div><div class="field"><label>${L('الباقة المفضلة','Preferred package')}</label><select><option>Wedding Plus</option><option>Hall Only</option><option>Signature</option></select></div><div class="field"><label>${L('الميزانية','Budget')}</label><input value="100K–180K"></div><div class="field full"><label>${L('ملاحظات','Notes')}</label><textarea rows="4">${L('محتاج أعرف السعر النهائي وإمكانية زيارة القاعة الخميس.','Please confirm final price and whether a Thursday visit is available.')}</textarea></div></div>
      <button class="btn btn-primary btn-block" style="margin-top:14px" onclick="navTo('pilot/quote/${venue}')">${L('إرسال الطلب للقاعة ←','Send request to venue →')}</button>
    </section><aside class="dawwar-panel"><h3>${L('إيه اللي يحصل بعد كده؟','What happens next?')}</h3><div class="dawwar-flow-list">
      <div class="dawwar-flow-row"><i>1</i><div><strong>${L('Lead مؤهلة','Qualified lead')}</strong><span>${L('القاعة تستلم التاريخ والعدد والميزانية والباقة.','Venue receives date, guests, budget, and package.')}</span></div></div>
      <div class="dawwar-flow-row"><i>2</i><div><strong>${L('رد قابل للتتبع','Tracked response')}</strong><span>${L('Available / alternative / quote / more info.','Available / alternative / quote / more info.')}</span></div></div>
      <div class="dawwar-flow-row"><i>3</i><div><strong>${L('زيارة أو تفاوض','Visit or negotiate')}</strong><span>${L('اتفقوا على التفاصيل والسعر النهائي.','Finalize details and final price.')}</span></div></div>
      <div class="dawwar-flow-row"><i>4</i><div><strong>${L('تأكيد من الطرفين','Both sides confirm')}</strong><span>${L('بعد دفع العربون للقاعة مباشرة.','After deposit is paid directly to the venue.')}</span></div></div>
    </div></aside></div>
  </div></section></main>`;
}

function quotePage(venue='royal-garden'){
  return `<main class="page"><section class="dawwar-request-page"><div class="container"><div class="dawwar-request-layout">
    <section class="dawwar-panel dawwar-quote"><span class="dawwar-status">✓ ${L('القاعة ردت · متاح','Venue responded · Available')}</span><h1>Royal Garden</h1><p>${L('15 أكتوبر 2027 متاح. القاعة أرسلت العرض النهائي التالي:','15 October 2027 is available. The venue sent this final quote:')}</p>
      <div class="dawwar-price">148,000 ${L('ج.م','EGP')} <small>${L('السعر النهائي المتفق عليه','final agreed venue price')}</small></div>
      <div class="card card-pad" style="margin-top:16px"><strong>Wedding Plus</strong><p class="small muted">${L('300 ضيف · Buffet · DJ · Decoration · Parking','300 guests · Buffet · DJ · Decoration · Parking')}</p></div>
      <div class="dawwar-pilot-callout"><strong>${L('طريقة الدفع في الـPilot:','Pilot payment model:')}</strong> ${L('العربون يُدفع مباشرة للقاعة (Cash/Bank/InstaPay حسب الاتفاق). Dawwar لا يحتفظ بقيمة الحجز.','Deposit is paid directly to the venue (cash/bank/InstaPay as agreed). Dawwar does not hold the booking value.')}</div>
      <div style="display:flex;gap:9px;flex-wrap:wrap"><button class="btn btn-light" onclick="toast('${L('تم طلب زيارة الخميس 5:00 م — Demo','Thursday 5:00 PM visit requested — Demo')}')">${L('احجز زيارة أولًا','Schedule visit first')}</button><button class="btn btn-primary" onclick="navTo('pilot/confirmed')">${L('العربون اتدفع للقاعة · أكد الحجز ←','Deposit paid to venue · confirm booking →')}</button></div>
    </section><aside class="dawwar-panel"><h3>${L('ليه Dawwar يتابع الخطوة دي؟','Why does Dawwar track this?')}</h3><p class="small muted">${L('علشان نعرف مصدر الحجز ونحافظ على تاريخ الـLead والعرض والزيارة والتأكيد. ده اللي يسمح بعمولة نجاح عادلة بدون ما نبني payment infrastructure من أول يوم.','To preserve booking attribution, lead/quote/visit history, and confirmation. That enables a fair success commission without building payment infrastructure on day one.')}</p><div class="dawwar-flow-list"><div class="dawwar-flow-row"><i>✓</i><div><strong>${L('Source attribution','Source attribution')}</strong><span>Enquiry → quote → booking</span></div></div><div class="dawwar-flow-row"><i>✓</i><div><strong>${L('Customer confirmation','Customer confirmation')}</strong><span>${L('العميل يؤكد إن الحجز تم.','Customer confirms the booking happened.')}</span></div></div><div class="dawwar-flow-row"><i>✓</i><div><strong>${L('Venue confirmation','Venue confirmation')}</strong><span>${L('القاعة تؤكد استلام العربون والقيمة النهائية.','Venue confirms deposit receipt and final value.')}</span></div></div></div></aside>
  </div></div></section></main>`;
}

function confirmedPage(){
  return `<main class="page"><section class="dawwar-request-page"><div class="container" style="max-width:980px"><section class="dawwar-panel dawwar-confirmed"><div class="check">✓</div><span class="dawwar-status">${L('Confirmed by customer + venue','Confirmed by customer + venue')}</span><h1>${L('الحجز اتأكد','Booking confirmed')}</h1><div class="dawwar-ref">DWR-2031</div><p class="muted">Royal Garden · 15 Oct 2027 · 148,000 ${L('ج.م','EGP')}</p><div class="dawwar-pilot-callout">${L('العربون تم دفعه مباشرة للقاعة. Dawwar يحتفظ بسجل الحجز والمصدر والتأكيدات فقط في الـPilot.','Deposit was paid directly to the venue. During pilot, Dawwar keeps the booking attribution and confirmation record.')}</div><div style="display:flex;gap:9px;justify-content:center;flex-wrap:wrap"><button class="btn btn-primary" onclick="setPersona('venue','pilot/commission')">${L('شوف نفس الحجز عند القاعة ←','See the venue side →')}</button><button class="btn btn-light" onclick="navTo('account')">${L('حساب العميل','Customer account')}</button></div></section></div></section></main>`;
}

function commissionPage(){
  return `<main class="page"><section class="dawwar-request-page"><div class="container"><div class="dawwar-request-layout"><section class="dawwar-panel"><span class="dawwar-status">VenueOS Lite</span><h1>${L('Booking DWR-2031 · Won','Booking DWR-2031 · Won')}</h1><div class="grid-2"><div class="card card-pad"><small class="muted">${L('القيمة النهائية','Final venue value')}</small><strong style="display:block;font-size:25px">148,000 ${L('ج.م','EGP')}</strong></div><div class="card card-pad"><small class="muted">${L('العربون','Deposit')}</small><strong style="display:block;font-size:25px">${L('تم الاستلام','Received')}</strong></div></div><div class="dawwar-flow-list"><div class="dawwar-flow-row"><i>✓</i><div><strong>${L('Lead from Dawwar','Lead from Dawwar')}</strong><span>Request #RQ-8142</span></div></div><div class="dawwar-flow-row"><i>✓</i><div><strong>${L('العميل أكد الحجز','Customer confirmed')}</strong><span>28 Aug 2026</span></div></div><div class="dawwar-flow-row"><i>✓</i><div><strong>${L('القاعة أكدت استلام العربون','Venue confirmed deposit')}</strong><span>${L('Booking now counts as platform-sourced.','Booking now counts as platform-sourced.')}</span></div></div></div><button class="btn btn-light" style="margin-top:16px" onclick="setPersona('venue','venue-os/leads')">${L('افتح Leads CRM','Open Leads CRM')}</button></section><aside><div class="dawwar-commission-box"><small>${L('Success commission · Pilot rule','Success commission · Pilot rule')}</small><strong>${L('مستحقة','DUE')}</strong><p class="small" style="opacity:.82">${L('القاعدة نفسها configurable/versioned. الرقم النهائي التجاري ليس hard-coded في المنتج.','The rule is configurable/versioned. The permanent commercial rate is not hard-coded in the product.')}</p></div><div class="dawwar-panel" style="margin-top:14px"><h3>${L('ليه القاعة تدفع؟','Why the venue pays')}</h3><p class="small muted">${L('Dawwar جاب lead مؤهلة بتاريخ وميزانية وعدد، وتتبعها لحد booking مؤكدة. لا Booking = لا Commission في الـPilot.','Dawwar sourced a qualified lead and tracked it to a confirmed booking. No booking = no commission during pilot.')}</p><button class="btn btn-primary btn-block" onclick="setPersona('admin','pilot/ops')">${L('شوف المصالحة عند الإدارة ←','See admin reconciliation →')}</button></div></aside></div></div></section></main>`;
}

function opsPage(){
  return `<main class="page"><section class="dawwar-request-page"><div class="container"><section class="dawwar-panel"><span class="dawwar-status">Admin / Ops Pilot</span><h1>${L('تشغيل السوق قبل الأتمتة الثقيلة','Operate the marketplace before heavy automation')}</h1><div class="grid-4"><div class="card card-pad"><small class="muted">Verified venues</small><strong style="display:block;font-size:26px">24</strong></div><div class="card card-pad"><small class="muted">Fresh availability</small><strong style="display:block;font-size:26px">91%</strong></div><div class="card card-pad"><small class="muted">Pending enquiries</small><strong style="display:block;font-size:26px">7</strong></div><div class="card card-pad"><small class="muted">Commission due</small><strong style="display:block;font-size:26px">Demo</strong></div></div><div class="dawwar-flow-list"><div class="dawwar-flow-row"><i>1</i><div><strong>${L('Verification queue','Verification queue')}</strong><span>${L('Only verified venues enter customer search.','Only verified venues enter customer search.')}</span></div></div><div class="dawwar-flow-row"><i>2</i><div><strong>${L('Stale availability queue','Stale availability queue')}</strong><span>${L('Ops follows up with venues before stale inventory damages trust.','Ops follows up before stale inventory damages trust.')}</span></div></div><div class="dawwar-flow-row"><i>3</i><div><strong>${L('Booking attribution','Booking attribution')}</strong><span>DWR-2031 ← RQ-8142 ← Dawwar search</span></div></div><div class="dawwar-flow-row"><i>4</i><div><strong>${L('Commission reconciliation','Commission reconciliation')}</strong><span>${L('Due / paid / waived / disputed / reversed with audit trail.','Due / paid / waived / disputed / reversed with audit trail.')}</span></div></div></div><div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:18px"><button class="btn btn-primary" onclick="setPersona('admin','admin/verification')">${L('فتح Verification','Open verification')}</button><button class="btn btn-light" onclick="navTo('vision')">${L('Future Vision','Future Vision')}</button></div></section></div></section></main>`;
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
  box.innerHTML=`<div class="panel-head"><div><span class="tiny muted">${L('سعر مبدئي','Starting price')}</span><div class="price-lg">145,000 ${L('ج.م','EGP')}</div></div><span class="badge green">✓ ${L('موثقة','Verified')}</span></div><div class="dawwar-pilot-callout"><strong>${L('Pilot: التوافر يحتاج تأكيد القاعة','Pilot: availability is venue-confirmed')}</strong><br>${L('آخر تحديث للديمو: حديث. أرسل Request-to-Book لتأكيد التاريخ والسعر النهائي.','Demo freshness: current. Send a Request-to-Book to confirm the date and final quote.')}</div><div class="grid-2"><button class="btn btn-light" onclick="toast('${L('تم طلب زيارة الخميس 5:00 م — Demo','Thursday 5:00 PM visit requested — Demo')}')">${L('احجز زيارة','Schedule visit')}</button><button class="btn btn-primary" onclick="navTo('pilot/request/${venue}')">${L('اطلب الحجز','Request booking')}</button></div><p class="tiny muted" style="margin:12px 0 0">${L('لا يوجد Hold أو دفع Online في الـPilot. الاتفاق والعربون مباشرة مع القاعة.','No online hold or platform payment in pilot. Terms and deposit are handled directly with the venue.')}</p>`;
  document.querySelectorAll('button[onclick*="createHold"]').forEach(btn=>{btn.textContent=L('اطلب الحجز','Request booking');btn.setAttribute('onclick',`navTo('pilot/request/${venue}')`)});
  document.querySelectorAll('.badge.orange').forEach(x=>{if(/Hold/i.test(x.textContent))x.textContent=L('تأكيد مطلوب','Confirmation needed')});
}

function enhanceExplore(){
  if(parts()[0]!=='explore')return;
  document.querySelectorAll('.venue-card').forEach(card=>{
    const chips=card.querySelector('.chips');if(chips&&!chips.querySelector('.dawwar-fresh')){
      const s=document.createElement('span');s.className='chip dawwar-fresh';s.textContent='◷ '+L('تحديث حديث','Recently updated');chips.appendChild(s);
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
  const b=document.createElement('div');b.className='dawwar-future-banner';b.innerHTML=`<div class="container"><span><strong>${L('Future Vision','Future Vision')}</strong> · ${L('الشاشة دي موجودة لإظهار اتجاه المنتج، لكنها ليست شرط إطلاق الـPilot.','This screen demonstrates product direction; it is not a pilot launch requirement.')}</span><button class="btn btn-light btn-sm" onclick="navTo('home')">${L('ارجع للـPilot','Back to pilot')}</button></div>`;A().prepend(b);
}

function patchChrome(){
  const brand=document.querySelector('header .brand');if(brand){brand.setAttribute('aria-label','Dawwar');const word=brand.querySelector('span:last-child');if(word){word.textContent='Dawwar';word.classList.add('dawwar-brand-word')}}
  const ribbon=document.querySelector('.demo-ribbon-inner span');if(ribbon)ribbon.innerHTML=`<strong>Dawwar Pilot:</strong> ${L('Availability → Enquiry → Visit/Quote → Confirmed booking.','Availability → Enquiry → Visit/Quote → Confirmed booking.')}`;
  const modal=document.querySelector('#personaModal');if(modal){
    const title=modal.querySelector('#demoTitle');if(title)title.textContent=L('اختار منظور Dawwar','Choose a Dawwar perspective');
    modal.querySelectorAll('.persona-card').forEach(card=>{
      const name=card.querySelector('strong')?.textContent;
      const last=card.querySelector('span:last-child');if(!last)return;
      if(name==='Customer')last.textContent='Search → Enquiry → Visit → Confirm';
      if(name==='Venue Owner')last.textContent='Calendar → Leads → Visits → Commission';
      if(name==='Platform Admin')last.textContent='Verification → Freshness → Attribution → Commission';
      if(name==='Investor')last.textContent='Marketplace → VenueOS → Commission → Future Vision';
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
