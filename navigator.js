(function(){
'use strict';

const isEn=()=>window.hhGetLanguage?.()==='en';
const L=(ar,en)=>isEn()?en:ar;
const routeNow=()=>location.hash.replace(/^#\/?/,'')||'home';

const tours={
  full:{
    label:()=>L('نسخة دوّر التجريبية · 4 دقائق','Dawwar Pilot · 4 min'),
    note:()=>L('أفضل قصة لأول مرة: السوق ← الحجز ← العمولة','Best first story: marketplace → booking → commission'),
    steps:[
      ['home','customer',L('ابدأ بالوعد البسيط: دوّر بتاريخك وميزانيتك بدل الاتصال بعشرات القاعات.','Start with the simple promise: search by date and budget instead of calling venues.')],
      ['explore','customer',L('اعرض النتائج التي تبدأ بالتوافر، مع قاعات موثقة وسياق واضح لحداثة البيانات.','Show availability-first results, verified venues, and freshness context.')],
      ['venue/royal-garden','customer',L('صفحة القاعة تنتهي بطلب حجز أو زيارة، وليس بدفع إلكتروني.','Venue detail ends with Request-to-Book or a visit, not online payment.')],
      ['pilot/request/royal-garden','customer',L('العميل يرسل التاريخ والعدد والميزانية والباقة كطلب مؤهل.','Customer sends date, guests, budget, and package as a qualified lead.')],
      ['pilot/quote/royal-garden','customer',L('القاعة تؤكد التوافر وترسل العرض النهائي؛ العربون يذهب للقاعة مباشرة.','Venue confirms availability and final quote; deposit goes directly to the venue.')],
      ['pilot/confirmed','customer',L('الطرفان يؤكدان الحجز DWR-2031، وهنا نحصل على تحديد موثوق لمصدر الحجز.','Both sides confirm DWR-2031, creating trusted attribution.')],
      ['pilot/commission','venue',L('إدارة القاعات المبسطة تعرض الحجز وعمولة النجاح المستحقة بدون اشتراك إلزامي.','VenueOS Lite shows the booking and success commission with no mandatory subscription.')],
      ['pilot/ops','admin',L('فريق التشغيل يدير التحقق وحداثة التوافر وتحديد مصدر الحجز وتسوية العمولة.','Ops manages verification, freshness, attribution, and commission reconciliation.')],
      ['vision','investor',L('اختم بأن الدفع والجولات الافتراضية وذكاء الأعمال والذكاء الاصطناعي جزء من الرؤية المستقبلية وليست شروطًا للإطلاق.','Finish with payments, 360, BI, and AI as Future Vision—not launch blockers.')]
    ]
  },
  customer:{
    label:()=>L('رحلة العميل · دقيقتان','Customer pilot · 2 min'),
    note:()=>L('البحث ← الاستفسار ← عرض السعر ← التأكيد','Search → Enquiry → Quote → Confirm'),
    steps:[
      ['home','customer',L('حدد التاريخ والمنطقة والعدد والميزانية.','Enter date, area, guests, and budget.')],
      ['explore','customer',L('اختار من القاعات الموثقة والمناسبة.','Choose from credible matching venues.')],
      ['venue/royal-garden','customer',L('راجع التوافر والسعر المبدئي ثم اطلب تأكيدًا.','Review availability and starting price, then request confirmation.')],
      ['pilot/request/royal-garden','customer',L('أرسل طلب حجز منظم بدل الدخول مبكرًا في إتمام الحجز والدفع.','Send a structured Request-to-Book instead of premature checkout.')],
      ['pilot/quote/royal-garden','customer',L('راجع رد القاعة والسعر النهائي واحجز زيارة لو محتاج.','Review the response/final price and schedule a visit if needed.')],
      ['pilot/confirmed','customer',L('بعد دفع العربون للقاعة مباشرة، أكد الحجز على دوّر.','After paying the venue directly, confirm the booking on Dawwar.')]
    ]
  },
  venue:{
    label:()=>L('إدارة القاعات المبسطة · دقيقتان','VenueOS Lite · 2 min'),
    note:()=>L('التقويم ← العملاء المحتملون ← الزيارات والحجوزات ← العمولة','Calendar → Leads → Visits/Bookings → Commission'),
    steps:[
      ['venue-os/overview','venue',L('القيمة اليومية تبدأ من العملاء المحتملين وصحة التقويم، مش من تحليلات مالية متقدمة.','Daily value starts with leads and calendar health, not advanced P&L.')],
      ['venue-os/calendar','venue',L('المخزون الإلكتروني والخارجي في تقويم واحد يحافظ على دقة التوافر.','Online + offline inventory in one calendar keeps availability accurate.')],
      ['venue-os/leads','venue',L('تابع كل استفسار من جديد إلى زيارة أو تفاوض أو حجز ناجح.','Track each enquiry from New to Visit/Negotiation/Won.')],
      ['pilot/commission','venue',L('الحجز المؤكد ينشئ عمولة نجاح؛ لا حجز = لا عمولة خلال النسخة التجريبية.','Confirmed booking creates success commission; no booking = no commission in pilot.')]
    ]
  },
  admin:{
    label:()=>L('تشغيل النسخة التجريبية · 90 ثانية','Pilot Ops · 90 sec'),
    note:()=>L('التحقق ← حداثة البيانات ← تحديد المصدر ← العمولة','Verification → Freshness → Attribution → Commission'),
    steps:[
      ['admin/verification','admin',L('فقط القاعات الموثقة تدخل نتائج بحث العملاء.','Only verified venues enter customer search.')],
      ['pilot/ops','admin',L('راقب التوافر القديم والحجوزات المنسوبة للمنصة والعمولة المستحقة.','Monitor stale availability, attributed bookings, and commission due.')],
      ['admin/overview','admin',L('الشاشات الإدارية الأوسع موجودة، لكن النسخة التجريبية تركز على الثقة والتشغيل.','Broader admin screens exist, but pilot focuses on trust and operations.')]
    ]
  },
  investor:{
    label:()=>L('قصة العمل · 90 ثانية','Business Story · 90 sec'),
    note:()=>L('الطلب ← إدارة القاعات ← العمولة ← نموذج مختلط لاحقًا','Demand → VenueOS → Commission → Hybrid later'),
    steps:[
      ['home','customer',L('دوّر يحل اكتشاف القاعات والتوافر الموثوق أولًا.','Dawwar first solves discovery + trusted availability.')],
      ['venue-os/overview','venue',L('إدارة القاعات المبسطة تحافظ على تحديث العرض وتزيد اعتماد القاعة على النظام.','VenueOS Lite keeps supply current and creates retention.')],
      ['pilot/commission','venue',L('أول مصدر إيراد: عمولة نجاح بسيطة على حجز مؤكد.','Initial monetization: a small success commission on confirmed bookings.')],
      ['vision','investor',L('الاشتراك والدفع وذكاء الأعمال والجولات الافتراضية تتوسع بعد إثبات الاستخدام والحجم.','Subscriptions, payments, BI, and 360 expand after usage and volume are proven.')],
      ['investor','investor',L('الشاشة دي جزء من الرؤية المستقبلية لشرح دورة النمو والميزة التنافسية، وليست توقعًا ماليًا.','This is Future Vision for the flywheel and moat, not a financial forecast.')]
    ]
  }
};

let activeTour=null;let stepIndex=0;let launcherOpen=false;

function persist(){try{if(activeTour){localStorage.setItem('hh-guide-tour',activeTour);localStorage.setItem('hh-guide-step',String(stepIndex))}else{localStorage.removeItem('hh-guide-tour');localStorage.removeItem('hh-guide-step')}}catch(_){}}
function seedBooking(){try{localStorage.setItem('hh-booking','1')}catch(_){}if(window.state)window.state.bookingCreated=true}
function setPersonaAndRoute(persona,route){
  if(persona==='investor'){
    try{localStorage.setItem('hh-persona','investor')}catch(_){}
    if(window.state)window.state.persona='investor';
    window.navTo?.(route);
    return;
  }
  if(window.setPersona)window.setPersona(persona,route);
  else window.navTo?.(route);
}
function currentStep(){return activeTour?tours[activeTour]?.steps[stepIndex]:null}
function stepTo(i){if(!activeTour||!tours[activeTour])return;stepIndex=Math.max(0,Math.min(i,tours[activeTour].steps.length-1));const s=currentStep();if(!s)return;if(s[0].startsWith('pilot/confirmed')||s[0].startsWith('pilot/commission'))seedBooking();persist();setPersonaAndRoute(s[1],s[0]);setTimeout(renderAll,100)}
function startTour(id){if(!tours[id])return;activeTour=id;stepIndex=0;launcherOpen=false;try{localStorage.setItem('hh-guide-welcome','1')}catch(_){}persist();stepTo(0)}
function stopTour(){activeTour=null;stepIndex=0;persist();renderAll()}
function resetDemo(){const lang=(()=>{try{return localStorage.getItem('hh-lang')}catch(_){return null}})();try{Object.keys(localStorage).filter(k=>k.startsWith('hh-')).forEach(k=>localStorage.removeItem(k));if(lang)localStorage.setItem('hh-lang',lang);localStorage.setItem('hh-guide-welcome','1')}catch(_){}activeTour=null;stepIndex=0;launcherOpen=false;if(window.state){window.state.bookingCreated=false;window.state.persona='customer';window.state.shortlist=['royal-garden','luma-hall','nile-palace']}location.hash='#/home';setTimeout(()=>location.reload(),100)}

function smartNext(){const map={
 'home':['explore','customer',L('شوف النتائج','See results')],
 'explore':['venue/royal-garden','customer',L('افتح رويال جاردن','Open Royal Garden')],
 'venue/royal-garden':['pilot/request/royal-garden','customer',L('اطلب الحجز','Request booking')],
 'pilot/request/royal-garden':['pilot/quote/royal-garden','customer',L('شوف رد القاعة','See venue response')],
 'pilot/quote/royal-garden':['pilot/confirmed','customer',L('أكد الحجز','Confirm booking')],
 'pilot/confirmed':['pilot/commission','venue',L('شوفه عند القاعة','See venue side')],
 'pilot/commission':['pilot/ops','admin',L('شوف التشغيل','See Ops')],
 'pilot/ops':['vision','investor',L('الرؤية المستقبلية','Future Vision')],
 'venue-os/overview':['venue-os/calendar','venue',L('افتح التقويم','Open Calendar')],
 'venue-os/calendar':['venue-os/leads','venue',L('افتح العملاء المحتملين','Open Leads')],
 'venue-os/leads':['pilot/commission','venue',L('شوف الحجز والعمولة','See booking & commission')],
 'admin/verification':['pilot/ops','admin',L('افتح تشغيل النسخة التجريبية','Open Pilot Ops')],
 'vision':['investor','investor',L('رؤية المستثمر','Investor Vision')]
};return map[routeNow()]||null}
function takeSmartNext(){const n=smartNext();if(n)setPersonaAndRoute(n[1],n[0])}

function ensureRoot(){let r=document.querySelector('#demoNavigatorRoot');if(!r){r=document.createElement('div');r.id='demoNavigatorRoot';document.body.appendChild(r)}return r}
function launcherHtml(){const icons={full:'◎',customer:'💍',venue:'🏛',admin:'🛡',investor:'📈'};return `<div class="dn-backdrop" onclick="if(event.target===this)hhCloseDemoNavigator()"><section class="dn-launcher" role="dialog" aria-modal="true"><div class="dn-head"><div><span class="badge blue">${L('نسخة دوّر التجريبية','Dawwar Pilot')}</span><h2>${L('إنت عايز تعرض إيه؟','What do you want to show?')}</h2><p>${L('النسخة التجريبية هي القصة الأساسية. المدفوعات والجولات الافتراضية وذكاء الأعمال موجودة ضمن الرؤية المستقبلية.','Pilot is the default story. Payments, 360, and BI remain Future Vision.')}</p></div><button class="dn-x" onclick="hhCloseDemoNavigator()">✕</button></div><div class="dn-tour-grid">${Object.entries(tours).map(([id,t],idx)=>`<button class="dn-tour ${idx===0?'recommended':''}" onclick="hhStartTour('${id}')"><span class="dn-tour-icon">${icons[id]}</span><strong>${t.label()}</strong><small>${t.note()}</small>${idx===0?`<em>${L('مقترح','Recommended')}</em>`:''}</button>`).join('')}</div><div class="dn-launcher-foot"><button class="btn btn-light" onclick="hhCloseDemoNavigator();hhStopTour();navTo('home')">${L('استكشف براحتك','Explore freely')}</button><button class="btn btn-light" onclick="hhCloseDemoNavigator();auditToggleGuide?.(true)">${L('خريطة كل الشاشات','All screens map')}</button><button class="btn btn-soft" onclick="hhResetGuidedDemo()">↻ ${L('إعادة العرض للبداية','Reset Demo')}</button></div></section></div>`}
function progressHtml(){
  if(!activeTour)return'';
  const s=currentStep();if(!s)return'';
  const total=tours[activeTour].steps.length;
  const pct=Math.round((stepIndex+1)/total*100);
  return `<aside class="dn-progress"><div class="dn-progress-top"><div><span class="dn-step">${L('خطوة','Step')} ${stepIndex+1}/${total}</span><strong>${tours[activeTour].label()}</strong></div><button onclick="hhStopTour()">✕</button></div><div class="dn-bar"><i style="width:${pct}%"></i></div><p>${s[2]}</p><div class="dn-progress-actions"><button class="btn btn-light btn-sm" onclick="hhTourBack()" ${stepIndex===0?'disabled':''}>${L('السابق','Back')}</button><button class="btn btn-light btn-sm" onclick="hhOpenDemoNavigator()">${L('تغيير','Change')}</button><button class="btn btn-primary btn-sm" onclick="${stepIndex===total-1?'hhStopTour()':'hhTourNext()'}">${stepIndex===total-1?L('تم ✓','Done ✓'):L('التالي','Next')}</button></div></aside>`;
}
function smartHtml(){if(activeTour||launcherOpen)return'';const n=smartNext();if(!n)return'';return `<div class="dn-smartbar"><div><span>${L('الخطوة المقترحة','Suggested next')}</span><strong>${n[2]}</strong></div><button onclick="hhTakeSmartNext()">${L('كمل القصة','Continue story')} ${isEn()?'→':'←'}</button></div>`}
function guideButtonHtml(){return `<button class="dn-guide-btn" onclick="hhOpenDemoNavigator()" aria-label="${L('دليل العرض','Demo guide')}"><span>◎</span><strong>${L('الدليل','Guide')}</strong></button>`}
function renderAll(){const r=ensureRoot();r.innerHTML=(launcherOpen?launcherHtml():'')+progressHtml()+smartHtml()+guideButtonHtml();const old=document.querySelector('.floating-demo');if(old)old.style.display='none';window.hhApplyLanguage?.(r)}
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

window.addEventListener('hashchange',()=>setTimeout(renderAll,80));
window.addEventListener('hh:languagechange',()=>setTimeout(renderAll,30));
document.addEventListener('DOMContentLoaded',()=>{try{const saved=localStorage.getItem('hh-guide-tour');const idx=Number(localStorage.getItem('hh-guide-step')||0);if(saved&&tours[saved]){activeTour=saved;stepIndex=Math.max(0,Math.min(idx,tours[saved].steps.length-1))}}catch(_){}renderAll()});
})();