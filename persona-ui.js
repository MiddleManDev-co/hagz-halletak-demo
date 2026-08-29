(function(){
'use strict';
const en=()=>window.hhGetLanguage?.()==='en';
const L=(ar,enText)=>en()?enText:ar;
const currentRoute=()=> (location.hash.replace(/^#\/?/,'')||'home');
const roleHome={customer:'home',venue:'venue-os/overview',admin:'pilot/ops',investor:'investor'};
const roleIcon={customer:'💍',venue:'🏛',admin:'🛡',investor:'📈'};
const roleLabel=role=>({customer:L('العميل','Customer'),venue:L('القاعة','Venue'),admin:L('الإدارة','Admin'),investor:L('المستثمر','Investor')})[role];
const navs={
 customer:()=>[
  ['home','⌂',L('الرئيسية','Home')],
  ['explore','⌕',L('القاعات','Venues')],
  ['my-wedding','♥',L('اختياراتي','My picks')],
  ['visits','◷',L('زياراتي','Visits')],
  ['messages','✉',L('الرسائل','Messages')],
  ['account','◎',L('حسابي','Account')]
 ],
 venue:()=>[
  ['venue-os/overview','⌂',L('ملخص اليوم','Today')],
  ['venue-os/calendar','▦',L('المواعيد','Dates')],
  ['venue-os/leads','◎',L('طلبات العملاء','Requests')],
  ['venue-os/visits','◷',L('الزيارات','Visits')],
  ['venue-os/bookings','✓',L('الحجوزات','Bookings')],
  ['venue-os/team','♙',L('الفريق','Team')]
 ],
 admin:()=>[
  ['pilot/ops','⌂',L('ملخص التشغيل','Operations')],
  ['admin/verification','✓',L('مراجعة القاعات','Venue checks')],
  ['admin/venues','▦',L('القاعات','Venues')],
  ['admin/bookings','◎',L('الحجوزات','Bookings')],
  ['admin/support','✉',L('الدعم','Support')],
  ['admin/economics','₤',L('اقتصاديات المنصة','Platform economics')],
  ['admin/marketplace-health','◎',L('صحة السوق','Market health')]
 ],
 investor:()=>[
  ['investor','📈',L('القصة','Story')],
  ['vision','✦',L('الرؤية','Vision')],
  ['strategy-simulator','↗',L('سيناريوهات النمو','Growth scenarios')]
 ]
};
const mobile={
 customer:['home','explore','my-wedding','visits'],
 venue:['venue-os/overview','venue-os/calendar','venue-os/leads','venue-os/visits'],
 admin:['pilot/ops','admin/verification','admin/bookings','admin/support'],
 investor:['investor','vision','strategy-simulator']
};
function inferRole(route=currentRoute()){
 const stored=localStorage.getItem('hh-active-role');
 if(route==='investor'||route==='strategy-simulator'||(route==='vision'&&stored==='investor'))return 'investor';
 if(route==='pilot/commission'||route.startsWith('venue-os/'))return 'venue';
 if(route==='pilot/ops'||route.startsWith('admin/'))return 'admin';
 return 'customer';
}
function getRole(){
 let r=localStorage.getItem('hh-active-role');
 if(!r){r=inferRole();try{localStorage.setItem('hh-active-role',r)}catch(_){}}
 return r;
}
function setRole(role,route){
 if(!roleHome[role])role='customer';
 localStorage.setItem('hh-active-role',role);
 if(window.state)window.state.persona=role;
 window.navTo?.(typeof route==='string'&&route?route:roleHome[role]);
 render();
}
function isActive(path){const r=currentRoute();return r===path||r.startsWith(path+'/')}
function renderRoleSwitch(){
 const box=document.querySelector('.persona-switch');if(!box)return;
 const active=getRole();
 box.setAttribute('aria-label',L('اختار هتشوف دوّر من ناحية مين','Choose a Dawwar view'));
 box.innerHTML=['customer','venue','admin','investor'].map(role=>`<button type="button" data-persona="${role}" class="${active===role?'active':''}" onclick="hhSwitchRole('${role}')" title="${roleLabel(role)}"><span class="pu-role-icon">${roleIcon[role]}</span><span class="pu-role-label">${roleLabel(role)}</span></button>`).join('');
}
function renderMainNav(){
 const nav=document.querySelector('.main-nav');if(!nav)return;
 const role=getRole();
 nav.setAttribute('aria-label',`${roleLabel(role)} · ${L('القائمة','navigation')}`);
 nav.innerHTML=navs[role]().map(([path,icon,label])=>`<a href="#/${path}" class="${isActive(path)?'active':''}"><span class="pu-nav-icon">${icon}</span><span>${label}</span></a>`).join('');
}
function renderMobileNav(){
 const nav=document.querySelector('.mobile-bottom');if(!nav)return;
 const role=getRole();const byPath=Object.fromEntries(navs[role]().map(x=>[x[0],x]));
 nav.setAttribute('aria-label',`${roleLabel(role)} · ${L('قائمة الموبايل','mobile navigation')}`);
 nav.innerHTML=mobile[role].map(path=>{const item=byPath[path]||[path,'•',path];return `<a href="#/${path}" class="${isActive(path)?'active':''}"><span>${item[1]}</span><span>${item[2]}</span></a>`}).join('');
}
// Single owner of the sidebar. Five other places used to render or append to
// it, which is why options appeared and disappeared while navigating.
const sideTitle={venue:()=>L('قاعة رويال جاردن','Royal Garden'),admin:()=>L('إدارة المنصة','Platform admin')};
function renderSideNav(){
 const nav=document.querySelector('.sidebar .side-nav');if(!nav)return;
 const role=getRole();
 const html=navs[role]?navs[role]().map(([path,icon,label])=>`<a href="#/${path}" class="${isActive(path)?'active':''}"><span>${icon}</span>${label}</a>`).join(''):'';
 if(nav.innerHTML!==html)nav.innerHTML=html;
 const title=document.querySelector('.sidebar .sidebar-title');
 if(title){const txt=sideTitle[role]?sideTitle[role]():roleLabel(role);if(title.textContent!==txt)title.textContent=txt}
}
let sideObserver=null;
function ownSideNav(){
 if(sideObserver)return;
 sideObserver=new MutationObserver(()=>renderSideNav());
 sideObserver.observe(document.body,{childList:true,subtree:true});
}
function renderBrand(){
 const brand=document.querySelector('.topbar .brand');if(!brand)return;
 const role=getRole();brand.href='#/'+roleHome[role];brand.title=L(`ارجع لأول شاشة عند ${roleLabel(role)}`,`Back to ${roleLabel(role)} home`);
}
function renderRibbon(){
 const wrap=document.querySelector('.demo-ribbon-inner');if(!wrap)return;
 const role=getRole();
 const text={
  customer:L('دوّر على قاعة، قارن، ابعت طلب، وتابع الزيارة والحجز.','Find a venue, compare, send a request, and follow the visit and booking.'),
  venue:L('شوف المواعيد وطلبات العملاء والزيارات والحجوزات. كل حاجة واضحة للفريق.','See dates, customer requests, visits, and bookings. The whole team stays on the same page.'),
  admin:L('راجع القاعات والمواعيد والحجوزات والعمولات من مكان واحد.','Review venues, dates, bookings, and fees in one place.'),
  investor:L('شوف المشكلة، طريقة الربح، وإزاي دوّر يكبر خطوة خطوة.','See the problem, the business model, and how Dawwar can grow step by step.')
 }[role];
 wrap.innerHTML=`<span><strong>${roleIcon[role]} ${roleLabel(role)}:</strong> ${text}</span><button onclick="hhOpenDemoNavigator?.()">${L('غيّر الرحلة','Change tour')}</button>`;
}
function addWorkspaceBadge(){
 const top=document.querySelector('.topbar-inner');if(!top)return;
 let badge=top.querySelector('.pu-workspace-badge');if(!badge){badge=document.createElement('div');badge.className='pu-workspace-badge';const brand=document.querySelector('.topbar .brand');brand?.after(badge)}
 const role=getRole();badge.innerHTML=`<span>${roleIcon[role]}</span><strong>${roleLabel(role)}</strong>`;
}
// Which perspective owns which screen. Anything not listed is public
// (search, venue pages, product vision) and open to everyone.
const routeOwner=[
 [/^venue-os(\/|$)/,'venue'],
 [/^pilot\/commission(\/|$)/,'venue'],
 [/^admin(\/|$)/,'admin'],
 [/^pilot\/ops(\/|$)/,'admin'],
 [/^investor$/,'investor'],
 [/^strategy-simulator$/,'investor']
];
function routeRole(r){for(const [re,role] of routeOwner)if(re.test(r))return role;return null}
// The menu is not protection: hiding a link is not enough, so the screen itself
// turns you away and sends you back to your own first screen.
function guardRoute(){
 const owner=routeRole(currentRoute());
 if(!owner)return false;
 const role=getRole();
 if(role===owner)return false;
 window.navTo?.(roleHome[role]);
 return true;
}
function render(){
 if(guardRoute())return;
 renderRoleSwitch();renderMainNav();renderMobileNav();renderSideNav();renderBrand();renderRibbon();addWorkspaceBadge();
 document.body.dataset.demoRole=getRole();
}
window.hhSwitchRole=setRole;
window.hhCurrentRole=getRole;
window.addEventListener('hashchange',()=>setTimeout(render,0));
window.addEventListener('hh:languagechange',()=>setTimeout(render,0));
document.addEventListener('DOMContentLoaded',()=>{render();ownSideNav()});
})();