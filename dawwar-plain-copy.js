(function(){
'use strict';

const isEn=()=>window.hhGetLanguage?.()==='en';
const L=(ar,en)=>isEn()?en:ar;

const exactAr=new Map([
  ['العملاء المحتملون','طلبات العملاء'],
  ['إدارة العملاء المحتملين','طلبات العملاء'],
  ['عميل محتمل جديد','طلب جديد'],
  ['عملاء محتملون مفتوحون','طلبات مفتوحة'],
  ['صحة التقويم','هل المواعيد محدثة؟'],
  ['درجة صحة التقويم','هل المواعيد محدثة؟'],
  ['تحديد مصدر الحجز','الحجز جه منين؟'],
  ['تسوية العمولات','حالة العمولة'],
  ['ذكاء الأعمال','تقارير تساعدك تقرر'],
  ['تحليلات السوق','أرقام السوق'],
  ['نظرة عامة على المنصة','ملخص دوّر'],
  ['تشغيل القاعات','القاعات'],
  ['طابور التحقق','قاعات مستنية مراجعة'],
  ['فحوصات التحقق','راجع بيانات القاعة'],
  ['توافر قديم','مواعيد محتاجة تحديث'],
  ['التوافر القديم','مواعيد محتاجة تحديث'],
  ['إيراد مفقود','فلوس ممكن تكسبها'],
  ['التسعير الديناميكي','تغيير السعر حسب اليوم والطلب'],
  ['الرؤية المستقبلية','هنعمل إيه بعدين؟'],
  ['نموذج العمل','هنكسب إزاي؟'],
  ['إدارة القاعات المبسطة','إدارة القاعة'],
  ['إدارة القاعات الاحترافية','إدارة القاعة المتقدمة'],
  ['لوحة المتابعة','ملخص سريع'],
  ['لوحة إدارة المنصة','ملخص الإدارة'],
  ['مسار العمل','الخطوات'],
  ['مستوى الخدمة','وقت الرد المطلوب'],
  ['العائد التشغيلي','هل الموضوع مكسب؟'],
  ['قائمة الأرباح والخسائر','الداخل والخارج'],
  ['إجمالي قيمة الحجوزات','قيمة الحجوزات'],
  ['الإيراد الشهري المتكرر','دخل الاشتراكات الشهري'],
  ['البرمجيات كخدمة','اشتراك البرنامج'],
  ['الحجز المؤقت','حجز مؤقت'],
  ['قائمة الأسرة المختصرة','اختيارات العيلة'],
  ['السوق العكسي','خلي القاعات تبعتلك عروض'],
  ['عروض التواريخ القريبة','عروض على أيام فاضية'],
  ['قائمة الانتظار','استناني لو اليوم فضي'],
  ['التقويم','المواعيد'],
  ['الحجوزات','الحجوزات'],
  ['التحليلات','الأرقام'],
  ['الإيرادات','الدخل'],
  ['نسبة الإشغال','الأيام المحجوزة'],
  ['التحويل','كام طلب اتحول لحجز'],
  ['موثقة','متراجعة'],
  ['تأكيد مطلوب','محتاج تأكيد من القاعة']
]);

const exactEn=new Map([
  ['Leads','Customer requests'],
  ['Leads CRM','Customer requests'],
  ['New Lead','New request'],
  ['Open leads','Open requests'],
  ['Calendar Health','Are dates up to date?'],
  ['Calendar Health Score','Are dates up to date?'],
  ['Booking attribution','Where did this booking come from?'],
  ['Commission reconciliation','Commission status'],
  ['Business Intelligence','Reports that help you decide'],
  ['Marketplace Intelligence','Market numbers'],
  ['Platform Overview','Dawwar overview'],
  ['Venue Operations','Venues'],
  ['Verification queue','Venues waiting for review'],
  ['Verification checks','Check venue details'],
  ['Stale availability','Dates need an update'],
  ['Lost revenue','Money you may be missing'],
  ['Dynamic Pricing','Change price by day and demand'],
  ['Future Vision','What comes later?'],
  ['Business model','How we make money'],
  ['VenueOS Lite','Venue tools'],
  ['VenueOS Pro','Advanced venue tools'],
  ['Dashboard','Quick overview'],
  ['Admin Dashboard','Admin overview'],
  ['Pipeline','Steps'],
  ['SLA','Target reply time'],
  ['ROI','Is it worth it?'],
  ['P&L','Money in and out'],
  ['GMV','Booking value'],
  ['MRR','Monthly subscription income'],
  ['SaaS','Software subscription'],
  ['Family Shortlist','Family picks'],
  ['Reverse Marketplace','Let venues send you offers'],
  ['DateDrop','Deals on empty dates'],
  ['Waitlist','Tell me if this date opens'],
  ['Calendar','Dates'],
  ['Analytics','Numbers'],
  ['Revenue','Income'],
  ['Occupancy','Booked dates'],
  ['Conversion','Requests that became bookings'],
  ['Verified','Checked'],
  ['Confirmation needed','Venue needs to confirm']
]);

function replaceExact(root=document.body){
  if(!root)return;
  const map=isEn()?exactEn:exactAr;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){
    if(node.parentElement?.closest('script,style,code,pre,[data-i18n-skip]'))continue;
    const raw=node.nodeValue||'';const t=raw.trim();if(!t||!map.has(t))continue;
    node.nodeValue=raw.replace(t,map.get(t));
  }
}

function setText(selector,ar,en,root=document){const el=root.querySelector(selector);if(el)el.textContent=L(ar,en)}
function setHtml(selector,ar,en,root=document){const el=root.querySelector(selector);if(el)el.innerHTML=L(ar,en)}

function patchHome(){
  const home=document.querySelector('[data-dawwar-pilot-home]');if(!home)return;
  setText('.dawwar-pilot-badge','بتجهز مناسبة؟ خلّي الدوّرة علينا','Planning an event? We make venue search easy',home);
  setHtml('.dawwar-pilot-title','عايز قاعة مناسبة؟ <span>دوّر يجيبها لك.</span>','Need the right venue? <span>Dawwar helps you find it.</span>',home);
  setText('.dawwar-pilot-copy','قولنا اليوم والمنطقة وعدد الناس وميزانيتك. هنوريك قاعات مناسبة ومتاحة، وبعدها تتكلم مع القاعة وتكمّل الحجز بسهولة.','Tell us the date, area, guest count, and budget. We will show you venues that fit and are available, then you can talk to the venue and finish the booking easily.',home);
  const proofs=home.querySelectorAll('.dawwar-pilot-proof span');
  if(proofs[0])proofs[0].textContent='✓ '+L('البحث ببلاش','Search is free');
  if(proofs[1])proofs[1].textContent='✓ '+L('القاعة تدخل ببلاش في البداية','Venues join free at the start');
  if(proofs[2])proofs[2].textContent='✓ '+L('دوّر ياخد عمولة بس لما الحجز يتم','Dawwar gets paid only when a booking happens');
  const heroBtns=home.querySelectorAll('.dawwar-pilot-hero .btn');
  if(heroBtns[0])heroBtns[0].textContent=L('ورّيني القاعات ←','Show me venues →');
  if(heroBtns[1])heroBtns[1].textContent=L('عندي قاعة','I run a venue');
  setText('.dawwar-search-card h3','قولنا محتاج إيه','Tell us what you need',home);
  setText('.dawwar-search-card .pilot-note','٤ حاجات بس ونبدأ.','Just four things to get started.',home);
  setText('.dawwar-search-card .badge','متاح فعلًا','Actually available',home);
  const searchBtn=home.querySelector('.dawwar-search-card .btn-primary');if(searchBtn)searchBtn.textContent=L('شوف المناسب ليك ←','See what fits →');

  const strip=home.querySelectorAll('.dawwar-pilot-strip .container > div');
  const stripCopy=isEn()?[
    ['For customers','Find the right place faster'],['For venues','Get serious customer requests'],['For Dawwar','Earn after a real booking'],['Later','Add payments and plans when needed']
  ]:[
    ['للعميل','يلاقي المكان المناسب أسرع'],['للقاعة','يجيلها ناس جد'],['لدوّر','ناخد عمولة بعد حجز حقيقي'],['بعدين','نزود دفع واشتراك لما نحتاجهم']
  ];
  strip.forEach((el,i)=>{if(!stripCopy[i])return;const d=el.querySelector('div');const s=el.querySelector('strong');if(d)d.textContent=stripCopy[i][0];if(s)s.textContent=stripCopy[i][1]});

  const sections=home.querySelectorAll('.dawwar-section');
  const flow=sections[0];if(flow){
    setText('.kicker','الحجز ماشي إزاي؟','How does booking work?',flow);
    setText('h2','من أول الدوّرة لحد ما الحجز يتأكد','From search to a confirmed booking',flow);
    const intro=flow.querySelector('.dawwar-section-head p');if(intro)intro.textContent=L('مفيش خطوات كتير. دوّر، اختار، اتكلم مع القاعة، واتفقوا.','No complicated steps. Search, choose, talk to the venue, and agree.');
    const steps=flow.querySelectorAll('.dawwar-step');
    const copy=isEn()?[
      ['1','Search','Date, area, guests, budget.'],['2','Pick','See places that fit and are available.'],['3','Ask','Send the venue one clear request.'],['4','Visit or agree','Check the place and final price.'],['5','Confirm','Pay the venue and confirm the booking.']
    ]:[
      ['1','دوّر','اليوم، المنطقة، العدد، والميزانية.'],['2','اختار','شوف الأماكن المناسبة والمتاحة.'],['3','اسأل','ابعت للقاعة طلب واضح مرة واحدة.'],['4','زور أو اتفق','شوف المكان واتفق على السعر النهائي.'],['5','أكد','ادفع للقاعة وأكدوا الحجز.']
    ];
    steps.forEach((el,i)=>{const c=copy[i];if(!c)return;const b=el.querySelector('b'),st=el.querySelector('strong'),p=el.querySelector('p');if(b)b.textContent=c[0];if(st)st.textContent=c[1];if(p)p.textContent=c[2]});
  }

  const model=sections[1];if(model){
    setText('.kicker','دوّر بيكسب إزاي؟','How does Dawwar make money?',model);
    setText('h2','في الأول: مفيش اشتراك، عمولة بسيطة بعد الحجز','At first: no subscription, just a small fee after a booking',model);
    const cards=model.querySelectorAll('.dawwar-model-card');
    const copy=isEn()?[
      ['Now','Small booking fee','Customers use Dawwar for free. Venues join free. If Dawwar brings a real booking, we take a small agreed fee.','No booking, no fee.'],
      ['Later','Optional venue plan','If venues use Dawwar every day, we can offer a monthly or yearly plan with extra tools and a lower booking fee.','Pay only if the extra tools are useful.'],
      ['When volume grows','Online payments','Only when bookings grow enough, we can add online deposits, refunds, and venue payouts.','Do not make launch harder than it needs to be.']
    ]:[
      ['دلوقتي','عمولة بسيطة بعد الحجز','العميل يستخدم دوّر ببلاش، والقاعة تدخل ببلاش. لو دوّر جاب حجز حقيقي، ناخد عمولة بسيطة متفق عليها.','مفيش حجز، مفيش عمولة.'],
      ['بعدين','اشتراك اختياري للقاعة','لو القاعة بقت تستخدم دوّر كل يوم، نقدر نعمل اشتراك شهري أو سنوي بأدوات أكتر وعمولة أقل.','القاعة تدفع بس لو الأدوات تستاهل.'],
      ['لما الحجوزات تكبر','دفع إلكتروني','لما يبقى فيه حجم حجز كفاية، ساعتها نضيف عربون إلكتروني واسترداد ومستحقات القاعات.','مانصعّبش البداية من غير سبب.']
    ];
    cards.forEach((card,i)=>{const c=copy[i];if(!c)return;const tag=card.querySelector('.tag'),h=card.querySelector('h3'),p=card.querySelector('p'),lis=card.querySelectorAll('li');if(tag)tag.textContent=c[0];if(h)h.textContent=c[1];if(p)p.textContent=c[2];if(lis[0])lis[0].textContent=c[3];if(lis[1])lis[1].remove();if(lis[2])lis[2].remove()});
  }

  const venueTools=sections[2];if(venueTools){
    setText('.kicker','لصاحب القاعة والفريق','For the venue team',venueTools);
    setText('h2','كل واحد يشوف اللي يخصه بسرعة','Everyone sees what they need, fast',venueTools);
    const intro=venueTools.querySelector('.dawwar-section-head p');if(intro)intro.textContent=L('المالك يتابع الحجوزات والعمولة، المبيعات تتابع الطلبات، والاستقبال أو الأمن يعرف مين جاي وإمتى.','The owner sees bookings and fees, sales sees customer requests, and reception or security sees who is coming and when.');
    const cards=venueTools.querySelectorAll('.grid-4 .card');
    const copy=isEn()?[
      ['Dates','What is free and what is booked.'],['Customer requests','Who asked, when, and what they need.'],['Visits and bookings','Who is coming today and what is confirmed.'],['Dawwar fee','What is due and what was paid.']
    ]:[
      ['المواعيد','إيه فاضي وإيه محجوز.'],['طلبات العملاء','مين سأل وإمتى وعايز إيه.'],['الزيارات والحجوزات','مين جاي النهارده وإيه اللي اتأكد.'],['عمولة دوّر','علينا كام واتدفع كام.']
    ];
    cards.forEach((card,i)=>{const c=copy[i];if(!c)return;const s=card.querySelector('strong'),p=card.querySelector('p');if(s)s.textContent=c[0];if(p)p.textContent=c[1]});
  }

  const future=sections[3];if(future){
    setText('.kicker','بعدين','Later',future);
    setText('h2','نضيف الحاجات الكبيرة لما الناس تحتاجها فعلًا','Add bigger features only when people really need them',future);
    const cards=future.querySelectorAll('.dawwar-vision-card');
    const copy=isEn()?[
      ['More ways to find a date','Flexible dates, alerts, and deals on empty dates.'],['Online money','Online deposits, refunds, and venue payouts.'],['Smarter numbers','Reports, better pricing, and useful automation.'],['Better venue preview','360 tours and stronger venue content.']
    ]:[
      ['طرق أكتر تلاقي بيها يوم مناسب','تواريخ مرنة، تنبيهات، وعروض على الأيام الفاضية.'],['فلوس أونلاين','عربون إلكتروني، استرداد، ومستحقات القاعات.'],['أرقام أذكى','تقارير وتسعير أحسن وأتمتة مفيدة.'],['شوف القاعة أحسن','جولات ٣٦٠ ومحتوى أوضح للقاعة.']
    ];
    cards.forEach((card,i)=>{const c=copy[i];if(!c)return;const sm=card.querySelector('small'),st=card.querySelector('strong'),p=card.querySelector('p');if(sm)sm.textContent=L('بعد ما الأساس يثبت','After the basics work');if(st)st.textContent=c[0];if(p)p.textContent=c[1]});
  }
}

function patchRequest(){
  const root=document.querySelector('.dawwar-request-page');if(!root)return;
  const route=location.hash.replace(/^#\/?/,'');
  if(route.startsWith('pilot/request')){
    setText('.dawwar-status','طلب للقاعة','Request to venue',root);
    setText('h1','ابعت للقاعة طلبك مرة واحدة','Send the venue one clear request',root);
    const p=root.querySelector('section.dawwar-panel > p.muted');if(p)p.textContent=L('هنبعت التاريخ والعدد والميزانية والباقة. القاعة ترد عليك بالتوافر والسعر.','We will send the date, guest count, budget, and package. The venue replies with availability and price.');
    setText('aside h3','وبعدين؟','What happens next?',root);
    const rows=root.querySelectorAll('.dawwar-flow-row');
    const copy=isEn()?[
      ['The venue sees your request','Everything important is in one place.'],['The venue replies','Available, another date, or a price.'],['Visit if you want','See the place and agree on details.'],['Confirm the booking','After you pay the venue directly.']
    ]:[
      ['القاعة تشوف طلبك','كل المعلومات المهمة قدامها مرة واحدة.'],['القاعة ترد','متاح، يوم بديل، أو سعر.'],['زور لو حابب','شوف المكان واتفق على التفاصيل.'],['أكدوا الحجز','بعد ما تدفع العربون للقاعة مباشرة.']
    ];
    rows.forEach((row,i)=>{const c=copy[i];if(!c)return;const s=row.querySelector('strong'),sp=row.querySelector('span');if(s)s.textContent=c[0];if(sp)sp.textContent=c[1]});
  }
  if(route.startsWith('pilot/quote')){
    setText('.dawwar-status','القاعة ردت: اليوم فاضي','Venue replied: the date is free',root);
    const callout=root.querySelector('.dawwar-pilot-callout');if(callout)callout.innerHTML=L('<strong>الدفع دلوقتي بسيط:</strong> العربون للقاعة مباشرة بالطريقة اللي تتفقوا عليها. دوّر مش بيمسك فلوس الحجز.','<strong>Payment is simple for now:</strong> Pay the deposit directly to the venue in the way you agree. Dawwar does not hold booking money.');
    setText('aside h3','ليه بنسجل الحجز على دوّر؟','Why keep the booking on Dawwar?',root);
    const p=root.querySelector('aside p.small');if(p)p.textContent=L('عشان العميل والقاعة يبقوا شايفين نفس الاتفاق، وعمولة دوّر تتحسب صح.','So the customer and venue see the same agreement, and Dawwar fees are clear.');
  }
  if(route==='pilot/confirmed'){
    setText('h1','تمام، الحجز اتأكد 🎉','Done, the booking is confirmed 🎉',root);
    const callout=root.querySelector('.dawwar-pilot-callout');if(callout)callout.textContent=L('العربون راح للقاعة مباشرة. دوّر سجل إن الحجز تم ومين جابه.','The deposit went straight to the venue. Dawwar records that the booking happened and where it came from.');
  }
  if(route==='pilot/commission'){
    setText('h1','الحجز تم، ودي تفاصيله','The booking is done. Here are the details',root);
    const box=root.querySelector('.dawwar-commission-box');if(box){const small=box.querySelector('small'),strong=box.querySelector('strong'),p=box.querySelector('p');if(small)small.textContent=L('عمولة دوّر','Dawwar fee');if(strong)strong.textContent=L('لسه مستحقة','Still due');if(p)p.textContent=L('النسبة مش ثابتة للأبد. نقدر نغيرها حسب التجربة والاتفاق مع القاعات.','The rate is not fixed forever. We can change it based on what works for venues.');}
    const why=root.querySelector('aside .dawwar-panel h3');if(why)why.textContent=L('العمولة مقابل إيه؟','What is the fee for?');
    const p=root.querySelector('aside .dawwar-panel p');if(p)p.textContent=L('دوّر جاب العميل وسهّل المتابعة لحد ما الحجز اتأكد. لو مفيش حجز، مفيش عمولة.','Dawwar brought the customer and helped track the booking until it was confirmed. No booking, no fee.');
  }
  if(route==='pilot/ops'){
    setText('h1','إدارة دوّر في شاشة واحدة','Run Dawwar from one simple screen',root);
    const cards=root.querySelectorAll('.grid-4 .card small');
    const labels=isEn()?['Venues ready','Dates up to date','Requests waiting for a reply','Fees not paid yet']:['قاعات جاهزة','المواعيد محدثة','طلبات مستنية رد','عمولات لسه متدفعتش'];
    cards.forEach((el,i)=>{if(labels[i])el.textContent=labels[i]});
    const rows=root.querySelectorAll('.dawwar-flow-row');
    const copy=isEn()?[
      ['Venues waiting for review','Check the venue before customers see it.'],['Venues that need to update dates','Call them before customers see old availability.'],['Where did the booking come from?','Keep the customer request and booking linked.'],['Commission status','Due, paid, waived, disputed, or cancelled.']
    ]:[
      ['قاعات مستنية مراجعة','راجع القاعة قبل ما تظهر للناس.'],['قاعات محتاجة تحدث المواعيد','كلمهم قبل ما العميل يشوف يوم قديم.'],['الحجز جه منين؟','اربط طلب العميل بالحجز عشان كل حاجة تبقى واضحة.'],['حالة العمولة','مستحقة، اتدفعت، اتلغت، أو فيها مشكلة.']
    ];
    rows.forEach((row,i)=>{const c=copy[i];if(!c)return;const s=row.querySelector('strong'),sp=row.querySelector('span');if(s)s.textContent=c[0];if(sp)sp.textContent=c[1]});
  }
}

function patchChrome(){
  const ribbon=document.querySelector('.demo-ribbon-inner span');if(ribbon)ribbon.innerHTML=L('<strong>دوّر ببساطة:</strong> دوّر ← اسأل القاعة ← اتفق ← أكد الحجز.','<strong>Dawwar, simply:</strong> Search → ask the venue → agree → confirm.');
  const modal=document.querySelector('#personaModal');if(modal){
    setText('#demoTitle','هتشوف دوّر من ناحية مين؟','Who do you want to view Dawwar as?',modal);
    const p=modal.querySelector('.panel-head p');if(p)p.textContent=L('اختار الشخص، وهنوريك بس الحاجات اللي تهمه.','Pick a role and we will show only what matters to them.');
    const cards=modal.querySelectorAll('.persona-card');
    const copy=isEn()?[
      ['Customer','Find a venue and book it'],['Venue team','See requests, visits, bookings, and fees'],['Dawwar admin','Review venues and fix problems'],['Investor','See how the business can grow']
    ]:[
      ['العميل','يلاقي قاعة ويحجزها'],['فريق القاعة','طلبات، زيارات، حجوزات، وعمولة'],['إدارة دوّر','تراجع القاعات وتحل المشاكل'],['المستثمر','يشوف المشروع ممكن يكبر إزاي']
    ];
    cards.forEach((card,i)=>{const c=copy[i];if(!c)return;const s=card.querySelector('strong'),sp=card.querySelector('span:last-child');if(s)s.textContent=c[0];if(sp)sp.textContent=c[1]});
    const info=modal.querySelector('.card.card-pad');if(info){const s=info.querySelector('strong'),p=info.querySelector('p');if(s)s.textContent=L('الفكرة بسيطة','The idea is simple');if(p)p.textContent=L('نبدأ بحاجة الناس محتاجاها دلوقتي: قاعات متاحة فعلًا وحجز سهل. ونزود الباقي بعدين.','Start with what people need now: truly available venues and an easy booking flow. Add the rest later.');}
  }
}

function patchNavigator(){
  const root=document.querySelector('#demoNavigatorRoot');if(!root)return;
  const launcher=root.querySelector('.dn-launcher');if(launcher){
    const h=launcher.querySelector('h2');if(h)h.textContent=L('عايز تشوف إيه؟','What do you want to see?');
    const p=launcher.querySelector('.dn-head p');if(p)p.textContent=L('اختار رحلة قصيرة، وكل خطوة هتقولك تعمل إيه.','Pick a short tour. Each step tells you what to do.');
  }
  replaceExact(root);
}

function apply(){
  patchChrome();patchHome();patchRequest();patchNavigator();replaceExact(document.body);
}
function schedule(){[0,120,350,700].forEach(ms=>setTimeout(apply,ms))}

window.addEventListener('hashchange',schedule);
window.addEventListener('hh:languagechange',schedule);
document.addEventListener('DOMContentLoaded',schedule,{once:true});

for(const fn of ['hhOpenDemoNavigator','hhStartTour','hhTourNext','hhTourBack','hhTakeSmartNext']){
  const original=window[fn];if(typeof original==='function')window[fn]=function(){const result=original.apply(this,arguments);schedule();return result;};
}

schedule();
})();