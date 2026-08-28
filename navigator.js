(function(){
'use strict';

const isEn=()=>window.hhGetLanguage?.()==='en';
const L=(ar,en)=>isEn()?en:ar;
const routeNow=()=>location.hash.replace(/^#\/?/,'')||'home';

const tours={
  full:{
    label:()=>L('Dawwar Pilot · 4 دقائق','Dawwar Pilot · 4 min'),
    note:()=>L('أفضل قصة لأول مرة: السوق → الحجز → العمولة','Best first story: marketplace → booking → commission'),
    steps:[
      ['home','customer',L('ابدأ بالوعد البسيط: دور بتاريخك وميزانيتك بدل الاتصال بعشرات القاعات.','Start with the simple promise: search by date and budget instead of calling venues.')],
      ['explore','customer',L('شوف نتائج availability-first وقاعات موثقة مع freshness context.','Show availability-first results, verified venues, and freshness context.')],
      ['venue/royal-garden','customer',L('صفحة القاعة تنتهي بـRequest-to-Book أو زيارة، مش دفع Online.','Venue detail ends with Request-to-Book or a visit, not online payment.')],
      ['pilot/request/royal-garden','customer',L('العميل يرسل تاريخ وعدد وميزانية وباقة كـLead مؤهلة.','Customer sends date, guests, budget, and package as a qualified lead.')],
      ['pilot/quote/royal-garden','customer',L('القاعة تؤكد التوافر وترسل العرض النهائي؛ العربون يذهب للقاعة مباشرة.','Venue confirms availability and final quote; deposit goes directly to the venue.')],
      ['pilot/confirmed','customer',L('الطرفان يؤكدان الحجز DWR-2031، وهنا نحصل على attribution موثوق.','Both sides confirm DWR-2031, creating trusted attribution.')],
      ['pilot/commission','venue',L('VenueOS Lite يظهر الحجز وعمولة النجاح المستحقة بدون اشتراك إلزامي.','VenueOS Lite shows the booking and success commission with no mandatory subscription.')],
      ['pilot/ops','admin',L('Ops يدير verification وfreshness وattribution وcommission reconciliation.','Ops manages verification, freshness, attribution, and commission reconciliation.')],
      ['vision','investor',L('اختم بأن Payment/360/BI/AI موجودة كـFuture Vision وليست Launch blockers.','Finish with payments, 360, BI, and AI as Future Vision—not launch blockers.')]
    ]
  },
  customer:{
    label:()=>L('رحلة العميل · دقيقتان','Customer pilot · 2 min'),
    note:()=>L('Search → Enquiry → Quote → Confirm','Search → Enquiry → Quote → Confirm'),
    steps:[
      ['home','customer',L('حدد التاريخ والمنطقة والعدد والميزانية.','Enter date, area, guests, and budget.')],
      ['explore','customer',L('اختار من القاعات الموثقة والمناسبة.','Choose from credible matching venues.')],
      ['venue/royal-garden','customer',L('راجع التوافر والسعر المبدئي ثم اطلب تأكيد.','Review availability and starting price, then request confirmation.')],
      ['pilot/request/royal-garden','customer',L('أرسل Request-to-Book منظمة بدل Checkout مبكر.','Send a structured Request-to-Book instead of premature checkout.')],
      ['pilot/quote/royal-garden','customer',L('راجع الرد والسعر النهائي واحجز زيارة لو محتاج.','Review the response/final price and schedule a visit if needed.')],
      ['pilot/confirmed','customer',L('بعد دفع العربون للقاعة مباشرة، أكد الحجز على Dawwar.','After paying the venue directly, confirm the booking on Dawwar.')]
    ]
  },
  venue:{
    label:()=>L('VenueOS Lite · دقيقتان','VenueOS Lite · 2 min'),
    note:()=>L('Calendar → Leads → Visits/Bookings → Commission','Calendar → Leads → Visits/Bookings → Commission'),
    steps:[
      ['venue-os/overview','venue',L('القيمة اليومية تبدأ من leads وcalendar health، مش P&L متقدم.','Daily value starts with leads and calendar health, not advanced P&L.')],
      ['venue-os/calendar','venue',L('Online + offline inventory في تقويم واحد للحفاظ على دقة التوافر.','Online + offline inventory in one calendar keeps availability accurate.')],
      ['venue-os/leads','venue',L('تابع كل enquiry من New إلى Visit/Negotiation/Won.','Track each enquiry from New to Visit/Negotiation/Won.')],
      ['pilot/commission','venue',L('الحجز المؤكد ينشئ success commission؛ لا Booking = لا Commission في الـPilot.','Confirmed booking creates success commission; no booking = no commission in pilot.')]
    ]
  },
  admin:{
    label:()=>L('Pilot Ops · 90 ثانية','Pilot Ops · 90 sec'),
    note:()=>L('Verification → Freshness → Attribution → Commission','Verification → Freshness → Attribution → Commission'),
    steps:[
      ['admin/verification','admin',L('فقط القاعات الموثقة تدخل نتائج العملاء.','Only verified venues enter customer search.')],
      ['pilot/ops','admin',L('راقب stale availability والحجوزات المنسوبة والعمولة المستحقة.','Monitor stale availability, attributed bookings, and commission due.')],
      ['admin/overview','admin',L('الشاشات الإدارية الأوسع موجودة، لكن الـPilot يركز على trust وops.','Broader admin screens exist, but pilot focuses on trust and operations.')]
    ]
  },
  investor:{
    label:()=>L('Business Story · 90 ثانية','Business Story · 90 sec'),
    note:()=>L('Demand → VenueOS → Commission → Hybrid later','Demand → VenueOS → Commission → Hybrid later'),
    steps:[
      ['home','customer',L('Dawwar يحل discovery + trusted availability أولًا.','Dawwar first solves discovery + trusted availability.')],
      ['venue-os/overview','venue',L('VenueOS Lite يحافظ على supply محدث ويخلق retention.','VenueOS Lite keeps supply current and creates retention.')],
      ['pilot/commission','venue',L('Monetization الأول: success commission بسيطة على booking مؤكدة.','Initial monetization: a small success commission on confirmed bookings.')],
      ['vision','investor',L('الاشتراك والدفع والـBI والـ360 تتوسع بعد إثبات الاستخدام والحجم.','Subscriptions, payments, BI, and 360 expand after usage and volume are proven.')],
      ['investor','investor',L('الشاشة دي Future Vision لقصة الـflywheel والـmoat، مش financial forecast.','This is Future Vision for the flywheel and moat, not a financial forecast.')]
    ]
  }
};

let activeTour=null;let stepIndex=0;let launcherOpen=false;

function persist(){try{if(activeTour){localStorage.setItem('hh-guide-tour',activeTour);localStorage.setItem('hh-guide-step',String(stepIndex))}else{localStorage.removeItem('hh-guide-tour');localStorage.removeItem('hh-guide-step')}}catch(_){}}
function seedBooking(){try{localStorage.setItem('hh-booking','1')}catch(_){}if(window.state)window.state.bookingCreated=true}
function setPersonaAndRoute(persona,route){if(persona==='investor'){try{localStorage.setItem('hh-persona','investor')}catch(_){}if(window.state)window.state.persona='investor';window.navTo?.(route);return}window.setPersona?.(persona,route)||window.navTo?.(route)}
function currentStep(){return activeTour?tours[activeTour]?.steps[stepIndex]:null}
function stepTo(i){if(!activeTour||!tours[activeTour])return;stepIndex=Math.max(0,Math.min(i,tours[activeTour].steps.length-1));const s=currentStep();if(!s)return;if(s[0].startsWith('pilot/confirmed')||s[0].startsWith('pilot/commission'))seedBooking();persist();setPersonaAndRoute(s[1],s[0]);setTimeout(renderAll,100)}
function startTour(id){if(!tours[id])return;activeTour=id;stepIndex=0;launcherOpen=false;try{localStorage.setItem('hh-guide-welcome','1')}catch(_){}persist();stepTo(0)}
function stopTour(){activeTour=null;stepIndex=0;persist();renderAll()}
function resetDemo(){const lang=(()=>{try{return localStorage.getItem('hh-lang')}catch(_){return null}})();try{Object.keys(localStorage).filter(k=>k.startsWith('hh-')).forEach(k=>localStorage.removeItem(k));if(lang)localStorage.setItem('hh-lang',lang);localStorage.setItem('hh-guide-welcome','1')}catch(_){}activeTour=null;stepIndex=0;launcherOpen=false;if(window.state){window.state.bookingCreated=false;window.state.persona='customer';window.state.shortlist=['royal-garden','luma-hall','nile-palace']}location.hash='#/home';setTimeout(()=>location.reload(),100)}

function smartNext(){const map={
 'home':['explore','customer',L('شوف النتائج','See results')],
 'explore':['venue/royal-garden','customer',L('افتح Royal Garden','Open Royal Garden')],
 'venue/royal-garden':['pilot/request/royal-garden','customer',L('اطلب الحجز','Request booking')],
 'pilot/request/royal-garden':['pilot/quote/royal-garden','customer',L('شوف رد القاعة','See venue response')],
 'pilot/quote/royal-garden':['pilot/confirmed','customer',L('أكد الحجز','Confirm booking')],
 'pilot/confirmed':['pilot/commission','venue',L('شوفه عند القاعة','See venue side')],
 'pilot/commission':['pilot/ops','admin',L('شوف Ops','See Ops')],
 'pilot/ops':['vision','investor',L('Future Vision','Future Vision')],
 'venue-os/overview':['venue-os/calendar','venue',L('افتح Calendar','Open Calendar')],
 'venue-os/calendar':['venue-os/leads','venue',L('افتح Leads','Open Leads')],
 'venue-os/leads':['pilot/commission','venue',L('شوف الحجز والعمولة','See booking & commission')],
 'admin/verification':['pilot/ops','admin',L('افتح Pilot Ops','Open Pilot Ops')],
 'vision':['investor','investor',L('Investor Vision','Investor Vision')]
};return map[routeNow()]||null}
function takeSmartNext(){const n=smartNext();if(n)setPersonaAndRoute(n[1],n[0])}

function ensureRoot(){let r=document.querySelector('#demoNavigatorRoot');if(!r){r=document.createElement('div');r.id='demoNavigatorRoot';document.body.appendChild(r)}return r}
function launcherHtml(){const icons={full:'◎',customer:'💍',venue:'🏛',admin:'🛡',investor:'📈'};return `<div class="dn-backdrop" onclick="if(event.target===this)hhCloseDemoNavigator()"><section class="dn-launcher" role="dialog" aria-modal="true"><div class="dn-head"><div><span class="badge blue">Dawwar Pilot</span><h2>${L('إنت عايز تعرض إيه؟','What do you want to show?')}</h2><p>${L('الـPilot هو القصة الأساسية. الـPayments و360 وBI موجودة كـFuture Vision.','Pilot is the default story. Payments, 360, and BI remain Future Vision.')}</p></div><button class="dn-x" onclick="hhCloseDemoNavigator()">✕</button></div><div class="dn-tour-grid">${Object.entries(tours).map(([id,t],idx)=>`<button class="dn-tour ${idx===0?'recommended':''}" onclick="hhStartTour('${id}')"><span class="dn-tour-icon">${icons[id]}</span><strong>${t.label()}</strong><small>${t.note()}</small>${idx===0?`<em>${L('مقترح','Recommended')}</em>`:''}</button>`).join('')}</div><div class="dn-launcher-foot"><button class="btn btn-light" onclick="hhCloseDemoNavigator();hhStopTour();navTo('home')">${L('استكشف براحتك','Explore freely')}</button><button class="btn btn-light" onclick="hhCloseDemoNavigator();auditToggleGuide?.(true)">${L('خريطة كل الشاشات','All screens map')}</button><button class="btn btn-soft" onclick="hhResetGuidedDemo()">↻ ${L('Reset Demo','Reset Demo')}</button></div></section></div>`}
function tourbarHtml(){if(!activeTour)return'';const s=currentStep();if(!s)return'';const total=tours[activeTour].steps.length;const pct=Math.round((stepIndex+1)/total*100);return `<aside class="dn-tourbar"><div class="dn-tourbar-top"><div><span>${tours[activeTour].label()} · ${L('خطوة','Step')} ${stepIndex+1}/${total}</span><strong>${s[2]}</strong></div><button onclick="hhStopTour()">✕</button></div><div class="dn-progress"><i style="width:${pct}%"></i></div><div class="dn-tourbar-actions"><button class="btn btn-light btn-sm" onclick="hhTourBack()" ${stepIndex===0?'disabled':''}>${L('السابق','Back')}</button><button class="btn btn-primary btn-sm" onclick="${stepIndex===total-1?'hhStopTour()':'hhTourNext()'}">${stepIndex===total-1?L('تم ✓','Done ✓'):L('التالي','Next')}</button></div></aside>`}
function smartHtml(){if(activeTour||launcherOpen)return'';const n=smartNext();if(!n)return'';return `<button class="dn-smart-next" onclick="hhTakeSmartNext()"><span>${L('الخطوة المنطقية التالية','Suggested next')}</span><strong>${n[2]} →</strong></button>`}
function renderAll(){const r=ensureRoot();r.innerHTML=(launcherOpen?launcherHtml():'')+tourbarHtml()+smartHtml();window.hhApplyLanguage?.(r)}
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
