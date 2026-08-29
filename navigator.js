(function(){
'use strict';

const isEn=()=>window.hhGetLanguage?.()==='en';
const L=(ar,en)=>isEn()?en:ar;
const routeNow=()=>location.hash.replace(/^#\/?/,'')||'home';

const tours={
  full:{
    label:()=>L('جولة دوّر · حوالي 4 دقايق','Dawwar tour · about 4 min'),
    note:()=>L('من أول البحث لحد الحجز وتشغيل القاعة','From search to booking and venue operations'),
    steps:[
      ['home','customer',L('ابدأ من المشكلة اللي كل الناس فاهماها: عايز قاعة مناسبة في يومك وميزانيتك.','Start with the simple problem: finding the right venue for your date and budget.')],
      ['explore','customer',L('هنا العميل يشوف الأماكن المناسبة والمتاحة من غير ما يلف ويتصل بقاعة ورا قاعة.','Here the customer sees matching available places without calling venue after venue.')],
      ['venue/royal-garden','customer',L('افتح القاعة وشوف الصور والسعر المبدئي والمميزات، وبعدها اطلب تأكيد اليوم.','Open a venue, check photos, starting price, and features, then ask the venue to confirm the date.')],
      ['pilot/request/royal-garden','customer',L('العميل يبعت طلب واحد واضح فيه اليوم والعدد والميزانية.','The customer sends one clear request with the date, guest count, and budget.')],
      ['pilot/quote/royal-garden','customer',L('القاعة ترد بالسعر النهائي. لو مناسب، العميل يزور أو يكمل الاتفاق.','The venue replies with the final price. If it fits, the customer can visit or finish the agreement.')],
      ['pilot/confirmed','customer',L('بعد العربون للقاعة مباشرة، الطرفين يأكدوا إن الحجز تم.','After the deposit goes directly to the venue, both sides confirm the booking.')],
      ['venue-os/calendar','venue',L('ده الجزء المهم: تحديث الأيام الفاضية بياخد ثواني من الموبايل، وده اللي بيخلي التوافر صح قدام العميل.','This is the important part: updating free dates takes seconds on a phone, and that is what keeps availability true for the customer.')],
      ['venue-os/visits','venue',L('فريق القاعة يشوف مين جاي وإمتى؛ دي الشاشة اللي الاستقبال أو الأمن محتاجها.','The venue team sees who is coming and when. This is the view reception or security needs.')],
      ['pilot/commission','venue',L('الحجز المؤكد يظهر للقاعة، وعمولة دوّر تبقى واضحة. مفيش حجز، مفيش عمولة.','The confirmed booking appears for the venue and Dawwar’s fee is clear. No booking, no fee.')],
      ['pilot/ops','admin',L('الإدارة تراجع القاعات والمواعيد والحجوزات والعمولات من مكان واحد.','Admin reviews venues, dates, bookings, and fees in one place.')],
      ['vision','investor',L('وفي الآخر نوري الحاجات اللي ممكن تتضاف بعدين من غير ما نعقد البداية.','Finish with the features that can come later without making launch harder.')]
    ]
  },
  customer:{
    label:()=>L('رحلة العميل · دقيقتين','Customer journey · 2 min'),
    note:()=>L('دوّر ← اختار ← اسأل ← أكد','Search → Pick → Ask → Confirm'),
    steps:[
      ['home','customer',L('قول اليوم والمنطقة وعدد الناس والميزانية.','Enter the date, area, guest count, and budget.')],
      ['explore','customer',L('شوف القاعات اللي مناسبة ليك ومتاحة.','See venues that fit and are available.')],
      ['venue/royal-garden','customer',L('راجع الصور والسعر والمميزات واطلب تأكيد اليوم.','Check photos, price, and features, then ask the venue to confirm the date.')],
      ['pilot/request/royal-garden','customer',L('ابعت طلب واحد واضح للقاعة.','Send one clear request to the venue.')],
      ['pilot/quote/royal-garden','customer',L('شوف رد القاعة والسعر النهائي، واحجز زيارة لو حابب.','See the venue reply and final price, and book a visit if you want.')],
      ['pilot/confirmed','customer',L('بعد ما تدفع العربون للقاعة، أكدوا الحجز على دوّر.','After paying the venue directly, confirm the booking on Dawwar.')]
    ]
  },
  venue:{
    label:()=>L('رحلة فريق القاعة · دقيقتين','Venue team · 2 min'),
    note:()=>L('مواعيد ← طلبات ← زيارات ← حجوزات','Dates → Requests → Visits → Bookings'),
    steps:[
      ['venue-os/overview','venue',L('ابدأ بملخص بسيط: إيه اللي محتاج يتعمل النهارده؟','Start with a simple question: what needs attention today?')],
      ['venue-os/calendar','venue',L('ده الجزء المهم: تحديث الأيام الفاضية بياخد ثواني من الموبايل، وده اللي بيخلي التوافر صح قدام العميل.','This is the important part: updating free dates takes seconds on a phone, and that is what keeps availability true for the customer.')],
      ['venue-os/leads','venue',L('المبيعات تشوف طلبات العملاء وترد بسرعة.','Sales sees customer requests and can reply quickly.')],
      ['venue-os/visits','venue',L('الاستقبال أو الأمن يشوف مين جاي وإمتى.','Reception or security sees who is coming and when.')],
      ['venue-os/bookings','venue',L('الحجوزات المؤكدة تبقى واضحة لكل الفريق.','Confirmed bookings stay clear for the whole team.')],
      ['pilot/commission','venue',L('وفي الآخر القاعة تشوف عمولة دوّر: مفيش حجز، مفيش عمولة.','Finally, the venue sees Dawwar’s fee: no booking, no fee.')]
    ]
  },
  admin:{
    label:()=>L('رحلة الإدارة · دقيقة ونص','Admin journey · 90 sec'),
    note:()=>L('راجع ← تابع ← حل','Review → Follow up → Resolve'),
    steps:[
      ['pilot/ops','admin',L('ابدأ بملخص التشغيل: القاعات والمواعيد والطلبات والعمولات.','Start with the operations overview: venues, dates, requests, and fees.')],
      ['admin/verification','admin',L('راجع بيانات القاعة قبل ما تظهر للعميل.','Check venue details before the venue appears to customers.')],
      ['admin/bookings','admin',L('لو محتاج تعرف حجز جه منين أو حالته، هتلاقيه هنا.','If you need to check where a booking came from or its status, find it here.')],
      ['admin/support','admin',L('وأي مشكلة بين العميل والقاعة تبقى واضحة لفريق الدعم.','Any customer or venue problem stays clear for the support team.')]
    ]
  },
  investor:{
    label:()=>L('قصة البيزنس · دقيقة ونص','Business story · 90 sec'),
    note:()=>L('مشكلة ← قيمة ← عمولة ← نمو','Problem → Value → Fee → Growth'),
    steps:[
      ['home','customer',L('دوّر يبدأ من مشكلة واضحة: العميل مش عايز يلف على عشرات القاعات.','Dawwar starts with a clear problem: customers do not want to chase dozens of venues.')],
      ['venue-os/overview','venue',L('أداة القاعة تخلي المواعيد والطلبات محدثة، وده يحسن السوق نفسه.','Venue tools keep dates and requests up to date, which improves the marketplace itself.')],
      ['pilot/commission','venue',L('أول دخل بسيط: عمولة على حجز حقيقي جه من دوّر.','The first simple revenue stream is a fee on a real booking sourced by Dawwar.')],
      ['vision','investor',L('بعد ما الأساس ينجح نقدر نضيف اشتراك ودفع وتقارير أذكى.','After the basics work, subscriptions, payments, and smarter reports can come later.')],
      ['investor','investor',L('دي شاشة الرؤية الكبيرة، مش وعد إن كل الأرقام أو المميزات موجودة من أول يوم.','This is the big-picture vision, not a claim that every number or feature exists on day one.')]
    ]
  }
};

let activeTour=null;let stepIndex=0;let launcherOpen=false;

function persist(){try{if(activeTour){localStorage.setItem('hh-guide-tour',activeTour);localStorage.setItem('hh-guide-step',String(stepIndex))}else{localStorage.removeItem('hh-guide-tour');localStorage.removeItem('hh-guide-step')}}catch(_){}}
function seedBooking(){try{localStorage.setItem('hh-booking','1')}catch(_){}if(window.state)window.state.bookingCreated=true}
function setPersonaAndRoute(persona,route){
  if(persona==='investor'){
    try{localStorage.setItem('hh-persona','investor');localStorage.setItem('hh-active-role','investor')}catch(_){}
    if(window.state)window.state.persona='investor';
    window.navTo?.(route);
    return;
  }
  try{localStorage.setItem('hh-active-role',persona)}catch(_){}
  if(window.setPersona)window.setPersona(persona,route);
  else window.navTo?.(route);
}
function currentStep(){return activeTour?tours[activeTour]?.steps[stepIndex]:null}
function stepTo(i){if(!activeTour||!tours[activeTour])return;stepIndex=Math.max(0,Math.min(i,tours[activeTour].steps.length-1));const s=currentStep();if(!s)return;if(s[0].startsWith('pilot/confirmed')||s[0].startsWith('pilot/commission'))seedBooking();persist();setPersonaAndRoute(s[1],s[0]);setTimeout(renderAll,40)}
function startTour(id){if(!tours[id])return;activeTour=id;stepIndex=0;launcherOpen=false;try{localStorage.setItem('hh-guide-welcome','1')}catch(_){}persist();stepTo(0)}
function stopTour(){activeTour=null;stepIndex=0;persist();renderAll()}
function resetDemo(){const lang=(()=>{try{return localStorage.getItem('hh-lang')}catch(_){return null}})();try{Object.keys(localStorage).filter(k=>k.startsWith('hh-')).forEach(k=>localStorage.removeItem(k));if(lang)localStorage.setItem('hh-lang',lang);localStorage.setItem('hh-guide-welcome','1')}catch(_){}activeTour=null;stepIndex=0;launcherOpen=false;if(window.state){window.state.bookingCreated=false;window.state.persona='customer';window.state.shortlist=['royal-garden','luma-hall','nile-palace']}location.hash='#/home';setTimeout(()=>location.reload(),80)}

function smartNext(){const map={
 'home':['explore','customer',L('شوف القاعات','See venues')],
 'explore':['venue/royal-garden','customer',L('افتح قاعة','Open a venue')],
 'venue/royal-garden':['pilot/request/royal-garden','customer',L('ابعت طلب','Send request')],
 'pilot/request/royal-garden':['pilot/quote/royal-garden','customer',L('شوف رد القاعة','See venue reply')],
 'pilot/quote/royal-garden':['pilot/confirmed','customer',L('أكد الحجز','Confirm booking')],
 'pilot/confirmed':['venue-os/visits','venue',L('شوف الزيارة عند القاعة','See venue visit view')],
 'venue-os/overview':['venue-os/calendar','venue',L('شوف المواعيد','See dates')],
 'venue-os/calendar':['venue-os/leads','venue',L('شوف طلبات العملاء','See requests')],
 'venue-os/leads':['venue-os/visits','venue',L('شوف الزيارات','See visits')],
 'venue-os/visits':['venue-os/bookings','venue',L('شوف الحجوزات','See bookings')],
 'venue-os/bookings':['pilot/commission','venue',L('شوف عمولة دوّر','See Dawwar fee')],
 'pilot/commission':['pilot/ops','admin',L('شوف الإدارة','See admin side')],
 'pilot/ops':['admin/verification','admin',L('راجع قاعة','Check a venue')],
 'admin/verification':['admin/bookings','admin',L('شوف الحجوزات','See bookings')],
 'admin/bookings':['admin/support','admin',L('شوف الدعم','See support')],
 'admin/support':['vision','investor',L('شوف اللي جاي بعدين','See what comes later')],
 'vision':['investor','investor',L('شوف قصة البيزنس','See business story')]
};return map[routeNow()]||null}
function takeSmartNext(){const n=smartNext();if(n)setPersonaAndRoute(n[1],n[0])}

function ensureRoot(){let r=document.querySelector('#demoNavigatorRoot');if(!r){r=document.createElement('div');r.id='demoNavigatorRoot';document.body.appendChild(r)}return r}
function launcherHtml(){const icons={full:'◎',customer:'💍',venue:'🏛',admin:'🛡',investor:'📈'};return `<div class="dn-backdrop" onclick="if(event.target===this)hhCloseDemoNavigator()"><section class="dn-launcher" role="dialog" aria-modal="true"><div class="dn-head"><div><span class="badge blue">${L('جولات دوّر','Dawwar tours')}</span><h2>${L('عايز تشوف دوّر من ناحية مين؟','Which side of Dawwar do you want to see?')}</h2><p>${L('اختار رحلة قصيرة. كل خطوة هتقولك تبص على إيه وتعمل إيه.','Pick a short tour. Every step tells you what to look at and what to do.')}</p></div><button class="dn-x" onclick="hhCloseDemoNavigator()">✕</button></div><div class="dn-tour-grid">${Object.entries(tours).map(([id,t],idx)=>`<button class="dn-tour ${idx===0?'recommended':''}" onclick="hhStartTour('${id}')"><span class="dn-tour-icon">${icons[id]}</span><strong>${t.label()}</strong><small>${t.note()}</small>${idx===0?`<em>${L('ابدأ من هنا','Start here')}</em>`:''}</button>`).join('')}</div><div class="dn-launcher-foot"><button class="btn btn-light" onclick="hhCloseDemoNavigator();hhStopTour();navTo('home')">${L('أتفرج لوحدي','Explore myself')}</button><button class="btn btn-light" onclick="hhCloseDemoNavigator();auditToggleGuide?.(true)">${L('كل الشاشات','All screens')}</button><button class="btn btn-soft" onclick="hhResetGuidedDemo()">↻ ${L('ابدأ من الأول','Reset')}</button></div></section></div>`}
function progressHtml(){
  if(!activeTour)return'';
  const s=currentStep();if(!s)return'';
  const total=tours[activeTour].steps.length;
  const pct=Math.round((stepIndex+1)/total*100);
  return `<aside class="dn-progress"><div class="dn-progress-top"><div><span class="dn-step">${L('خطوة','Step')} ${stepIndex+1}/${total}</span><strong>${tours[activeTour].label()}</strong></div><button onclick="hhStopTour()">✕</button></div><div class="dn-bar"><i style="width:${pct}%"></i></div><p>${s[2]}</p><div class="dn-progress-actions"><button class="btn btn-light btn-sm" onclick="hhTourBack()" ${stepIndex===0?'disabled':''}>${L('رجوع','Back')}</button><button class="btn btn-light btn-sm" onclick="hhOpenDemoNavigator()">${L('غيّر الرحلة','Change tour')}</button><button class="btn btn-primary btn-sm" onclick="${stepIndex===total-1?'hhStopTour()':'hhTourNext()'}">${stepIndex===total-1?L('خلصنا ✓','Done ✓'):L('كمل','Next')}</button></div></aside>`;
}
function smartHtml(){if(activeTour||launcherOpen)return'';const n=smartNext();if(!n)return'';return `<div class="dn-smartbar"><div><span>${L('لو عايز تكمل','Suggested next')}</span><strong>${n[2]}</strong></div><button onclick="hhTakeSmartNext()">${L('كمل','Continue')} ${isEn()?'→':'←'}</button></div>`}
function guideButtonHtml(){return `<button class="dn-guide-btn" onclick="hhOpenDemoNavigator()" aria-label="${L('افتح دليل دوّر','Open Dawwar guide')}"><span>◎</span><strong>${L('الجولات','Tours')}</strong></button>`}
function renderAll(){const r=ensureRoot();r.innerHTML=(launcherOpen?launcherHtml():'')+progressHtml()+smartHtml()+guideButtonHtml();const old=document.querySelector('.floating-demo');if(old)old.style.display='none';window.hhApplyLanguage?.(r);window.dawwarPlainCopyApply?.()}
function openNavigator(){launcherOpen=true;renderAll()}
function closeNavigator(){launcherOpen=false;renderAll()}

window.hhOpenDemoNavigator=openNavigator;
window.hhCloseDemoNavigator=closeNavigator;
window.hhStartTour=startTour;
window.hhStopTour=stopTour;
window.hhTourNext=()=>stepTo(stepIndex+1);
window.hhTourBack=()=>stepTo(stepIndex-1);
window.hhTakeSmartNext=takeSmartNext;
window.hhResetGuidedDemo=resetDemo;
window.hhCurrentTourId=()=>activeTour;

window.addEventListener('hashchange',()=>setTimeout(renderAll,0));
window.addEventListener('hh:languagechange',()=>setTimeout(renderAll,0));
document.addEventListener('DOMContentLoaded',()=>{try{const saved=localStorage.getItem('hh-guide-tour');const idx=Number(localStorage.getItem('hh-guide-step')||0);if(saved&&tours[saved]){activeTour=saved;stepIndex=Math.max(0,Math.min(idx,tours[saved].steps.length-1))}}catch(_){}renderAll()});
})();