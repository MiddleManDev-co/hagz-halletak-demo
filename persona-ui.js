(function(){
'use strict';
const en=()=>window.hhGetLanguage?.()==='en';
const L=(ar,enText)=>en()?enText:ar;
const currentRoute=()=> (location.hash.replace(/^#\/?/,'')||'home');
const roleHome={customer:'home',venue:'venue-os/overview',admin:'admin/overview',investor:'investor'};
const roleIcon={customer:'💍',venue:'🏛',admin:'🛡',investor:'📈'};
const roleLabel=role=>({customer:L('العميل','Customer'),venue:L('القاعة','Venue'),admin:L('الإدارة','Admin'),investor:L('المستثمر','Investor')})[role];
const navs={
 customer:()=>[
  ['home','⌂',L('الرئيسية','Home')],
  ['explore','⌕',L('استكشف القاعات','Explore')],
  ['my-wedding','♥',L('قائمتي','My Wedding')],
  ['account','◎',L('حسابي','My Account')],
  ['visits','◷',L('الزيارات','Visits')],
  ['messages','✉',L('الرسائل','Messages')]
 ],
 venue:()=>[
  ['venue-os/overview','⌂',L('نظرة عامة','Overview')],
  ['venue-os/calendar','▦',L('التقويم','Calendar')],
  ['venue-os/leads','◎',L('العملاء المحتملون','Leads')],
  ['venue-os/bookings','✓',L('الحجوزات','Bookings')],
  ['venue-os/business-center','₤',L('الأعمال والماليات','Business')],
  ['venue-os/analytics','⌁',L('التحليلات','Analytics')]
 ],
 admin:()=>[
  ['admin/overview','⌂',L('نظرة عامة','Overview')],
  ['admin/venues','▦',L('القاعات','Venues')],
  ['admin/bookings','✓',L('الحجوزات','Bookings')],
  ['admin/economics','₤',L('اقتصاديات المنصة','Economics')],
  ['admin/marketplace-health','◎',L('صحة السوق','Market Health')],
  ['admin/analytics','⌁',L('التحليلات','Analytics')]
 ],
 investor:()=>[
  ['investor','📈',L('نظرة المستثمر','Investor View')],
  ['admin/economics','₤',L('اقتصاديات المنصة','Economics')],
  ['admin/marketplace-health','◎',L('صحة السوق','Market Health')],
  ['strategy-simulator','↗',L('محاكي النمو','Simulator')],
  ['vision','✦',L('رؤية المنتج','Product Vision')]
 ]
};
const mobile={customer:['home','explore','my-wedding','account'],venue:['venue-os/overview','venue-os/calendar','venue-os/business-center','venue-os/analytics'],admin:['admin/overview','admin/venues','admin/economics','admin/marketplace-health'],investor:['investor','admin/economics','strategy-simulator','vision']};
function inferRole(route=currentRoute()){
 if(route==='investor'||route==='strategy-simulator')return 'investor';
 if(route.startsWith('venue-os/'))return 'venue';
 if(route.startsWith('admin/')){
  const stored=localStorage.getItem('hh-active-role');
  if(stored==='investor'&&(route==='admin/economics'||route==='admin/marketplace-health'))return 'investor';
  return 'admin';
 }
 return 'customer';
}
function getRole(){return localStorage.getItem('hh-active-role')||inferRole()}
function setRole(role,go=true){
 if(!roleHome[role])role='customer';
 localStorage.setItem('hh-active-role',role);
 if(window.state)window.state.persona=role;
 if(go)window.navTo?.(roleHome[role]);
 render();
}
function isActive(path){const r=currentRoute();return r===path||r.startsWith(path+'/')}
function renderRoleSwitch(){
 const box=document.querySelector('.persona-switch');if(!box)return;
 const active=getRole();
 box.setAttribute('aria-label',L('اختر منظور الديمو','Choose demo role'));
 box.innerHTML=['customer','venue','admin','investor'].map(role=>`<button type="button" data-persona="${role}" class="${active===role?'active':''}" onclick="hhSwitchRole('${role}')" title="${roleLabel(role)}"><span class="pu-role-icon">${roleIcon[role]}</span><span class="pu-role-label">${roleLabel(role)}</span></button>`).join('');
}
function renderMainNav(){
 const nav=document.querySelector('.main-nav');if(!nav)return;
 const role=getRole();
 nav.setAttribute('aria-label',`${roleLabel(role)} · ${L('التنقل','navigation')}`);
 nav.innerHTML=navs[role]().map(([path,icon,label])=>`<a href="#/${path}" class="${isActive(path)?'active':''}"><span class="pu-nav-icon">${icon}</span><span>${label}</span></a>`).join('');
}
function renderMobileNav(){
 const nav=document.querySelector('.mobile-bottom');if(!nav)return;
 const role=getRole();const byPath=Object.fromEntries(navs[role]().map(x=>[x[0],x]));
 nav.setAttribute('aria-label',`${roleLabel(role)} · ${L('تنقل الموبايل','mobile navigation')}`);
 nav.innerHTML=mobile[role].map(path=>{const item=byPath[path]||[path,'•',path];return `<a href="#/${path}" class="${isActive(path)?'active':''}"><span>${item[1]}</span><span>${item[2]}</span></a>`}).join('');
}
function renderBrand(){
 const brand=document.querySelector('.topbar .brand');if(!brand)return;
 const role=getRole();brand.href='#/'+roleHome[role];brand.title=L(`العودة إلى مساحة ${roleLabel(role)}`,`Back to ${roleLabel(role)} workspace`);
}
function renderRibbon(){
 const wrap=document.querySelector('.demo-ribbon-inner');if(!wrap)return;
 const role=getRole();
 const text={
  customer:L('مساحة العميل: ابحث، قارن، احجز وتابع كل تفاصيل مناسبتك.','Customer workspace: discover, compare, book, and manage your event.'),
  venue:L('VenueOS: شغّل القاعة، تابع الحجوزات والربحية وخد قرارات تشغيلية أوضح.','VenueOS: run the venue, track bookings and profitability, and make clearer operating decisions.'),
  admin:L('Platform Admin: راقب العرض والطلب والمدفوعات وجودة السوق من مكان واحد.','Platform Admin: monitor supply, demand, payments, and marketplace quality in one place.'),
  investor:L('Investor & Strategy: افهم الاقتصاديات، صحة السوق، النمو والـmoat بدون زحمة التشغيل اليومية.','Investor & Strategy: focus on economics, marketplace health, growth, and moat without operational clutter.')
 }[role];
 wrap.innerHTML=`<span><strong>${roleIcon[role]} ${roleLabel(role)}:</strong> ${text}</span><button onclick="hhOpenDemoNavigator?.()">${L('تغيير المنظور / Guide','Change view / Guide')}</button>`;
}
function addWorkspaceBadge(){
 const top=document.querySelector('.topbar-inner');if(!top)return;
 let badge=top.querySelector('.pu-workspace-badge');if(!badge){badge=document.createElement('div');badge.className='pu-workspace-badge';const brand=document.querySelector('.topbar .brand');brand?.after(badge)}
 const role=getRole();badge.innerHTML=`<span>${roleIcon[role]}</span><strong>${roleLabel(role)}</strong>`;
}
function syncFromRoute(){
 const inferred=inferRole();const stored=getRole();
 const r=currentRoute();
 const investorShared=stored==='investor'&&(r==='admin/economics'||r==='admin/marketplace-health');
 if(!investorShared&&stored!==inferred)localStorage.setItem('hh-active-role',inferred);
}
function render(){syncFromRoute();renderRoleSwitch();renderMainNav();renderMobileNav();renderBrand();renderRibbon();addWorkspaceBadge();document.body.dataset.demoRole=getRole()}
window.hhSwitchRole=setRole;
window.hhCurrentRole=getRole;
window.addEventListener('hashchange',()=>setTimeout(render,70));
window.addEventListener('hh:languagechange',()=>setTimeout(render,30));
document.addEventListener('DOMContentLoaded',()=>setTimeout(render,220));
})();