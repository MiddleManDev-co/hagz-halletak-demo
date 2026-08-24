(function(){
'use strict';
const en=()=>window.hhGetLanguage?.()==='en';
const L=(ar,enText)=>en()?enText:ar;
const A=()=>document.querySelector('#app');
const route=()=> (location.hash.replace(/^#\/?/,'')||'home').split('/');
const clamp=(a,b,v)=>Math.max(a,Math.min(b,v));

const IMG={
 hall:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1900&q=86',
 stage:'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1900&q=86',
 bridal:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1900&q=86',
 outdoor:'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1900&q=86',
 dining:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1900&q=82&sat=-10'
};

const venueNames={
 'royal-garden':'Royal Garden','luma-hall':'Luma Hall','nile-palace':'Nile Palace','garden-37':'Garden 37','lake-house':'Lake House','palm-palace':'Palm Palace'
};
function makeScenes(id){
 const name=venueNames[id]||'Venue';
 return [
  {id:'hall',name:L('القاعة الرئيسية','Main Hall'),image:IMG.hall,note:L('المساحة الرئيسية والجلوس','Main floor & guest seating'),hotspots:[[31,48,'Stage'],[66,56,L('منطقة الضيوف','Guest seating')],[78,37,L('الإضاءة','Lighting')]]},
  {id:'stage',name:L('المسرح والكوشة','Stage & Setup'),image:IMG.stage,note:L('الكوشة، الشاشة والإضاءة','Stage, backdrop & lighting'),hotspots:[[50,42,L('المسرح الرئيسي','Main stage')],[72,55,'LED'],[28,60,L('منطقة التصوير','Photo zone')]]},
  {id:'bridal',name:L('غرفة العروس','Bridal Room'),image:IMG.bridal,note:L('خصوصية وتجهيز قبل المناسبة','Private preparation suite'),hotspots:[[43,52,L('منطقة التجهيز','Preparation area')],[69,44,L('المرآة والإضاءة','Mirror & lighting')]]},
  {id:'outdoor',name:L('الاستقبال الخارجي','Outdoor Reception'),image:IMG.outdoor,note:L('المدخل والاستقبال الخارجي','Entrance & outdoor reception'),hotspots:[[34,51,L('مدخل الضيوف','Guest entrance')],[70,55,L('منطقة الاستقبال','Reception zone')]]}
 ].map(s=>({...s,venue:name}));
}
let currentVenue='royal-garden';
let currentScene='hall';
let autoTimer=null;

function sceneBy(id){return makeScenes(currentVenue).find(x=>x.id===id)||makeScenes(currentVenue)[0]}
function viewerMarkup(){
 const scenes=makeScenes(currentVenue),s=sceneBy(currentScene);
 return `<div class="vv360-viewer" id="vv360Viewer" style="--vv-x:50%" aria-label="360 virtual tour viewer">
   <div class="vv360-panorama" style="background-image:url('${s.image}')"></div>
   <div class="vv360-toolbar"><div class="vv360-toolbar-group"><button class="vv360-control" onclick="vv360Pan(-1)" title="${L('لف لليسار','Rotate left')}">↶</button><button class="vv360-control" onclick="vv360Pan(1)" title="${L('لف لليمين','Rotate right')}">↷</button><button class="vv360-control" id="vvAutoBtn" onclick="vv360ToggleAuto()">▶ ${L('دوران','Auto')}</button></div><div class="vv360-toolbar-group"><span class="vv360-control vv360-compass"><i></i> 360°</span><button class="vv360-control" onclick="vv360Fullscreen()">⛶</button></div></div>
   <div class="vv360-instruction">↔ ${L('اسحب يمين وشمال لاستكشاف القاعة','Drag left or right to explore the venue')}</div>
   ${s.hotspots.map(([x,y,t],i)=>`<button class="vv360-hotspot" style="left:${x}%;top:${y}%" onclick="vv360Hotspot('${String(t).replace(/'/g,"\\'")}')"><span class="vv360-hotspot-dot">${i+1}</span><span class="vv360-hotspot-label">${t}</span></button>`).join('')}
   <div class="vv360-scene-label"><div><strong>${s.name}</strong><span>${s.note}</span></div><span>${L('مشهد','Scene')} ${scenes.findIndex(x=>x.id===s.id)+1}/${scenes.length}</span></div>
 </div>
 <div class="vv360-scene-strip">${scenes.map(x=>`<button class="vv360-scene ${x.id===s.id?'active':''}" style="background-image:url('${x.image}')" onclick="vv360Scene('${x.id}')"><small>360°</small><span>${x.name}</span></button>`).join('')}</div>`;
}

function mountCustomerTour(){
 const [p,id]=route();
 document.querySelectorAll('.venue-card').forEach(card=>{const chips=card.querySelector('.chips');if(chips&&!chips.querySelector('.vv360-card-chip')){const c=document.createElement('span');c.className='vv360-card-chip';c.innerHTML='◎ 360° '+L('جولة','Tour');chips.appendChild(c)}});
 if(p!=='venue')return;
 currentVenue=id||'royal-garden';
 const availability=document.querySelector('#availability');
 const detailNav=document.querySelector('.detail-nav');
 if(detailNav&&!detailNav.querySelector('a[href="#virtual-tour"]')){const a=document.createElement('a');a.href='#virtual-tour';a.textContent='360° '+L('جولة افتراضية','Virtual Tour');detailNav.prepend(a)}
 let section=document.querySelector('.vv360-section');
 if(!section){section=document.createElement('div');section.className='detail-section vv360-section';section.id='virtual-tour';if(availability)availability.before(section);else document.querySelector('.detail-layout>div')?.appendChild(section)}
 section.innerHTML=`<div class="vv360-head"><div><div class="kicker">${L('شوف قبل ما تزور','See before you visit')}</div><h3>360° ${L('جولة افتراضية داخل القاعة','Virtual Venue Tour')}</h3><p>${L('لف في المكان، بدّل بين المشاهد واضغط على نقاط المعلومات عشان تفهم كل جزء قبل الزيارة.','Explore every direction, switch scenes, and open hotspots before scheduling a physical visit.')}</p></div><div class="vv360-badges"><span class="badge green">✓ ${L('موثقة','Verified')}</span><span class="badge blue">4 ${L('مشاهد','scenes')}</span><span class="badge gray">${L('تفاعلي','Interactive')}</span></div></div>${viewerMarkup()}<div class="vv360-feature-card"><div><strong>${L('هل المكان مناسب؟','Does the venue feel right?')}</strong><p>${L('بعد الجولة الافتراضية تقدر تحجز زيارة فعلية أو تعمل Hold للتاريخ.','After the virtual tour, schedule a physical visit or hold your date.')}</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-light btn-sm" onclick="navTo('visits')">${L('احجز زيارة','Schedule visit')}</button><button class="btn btn-primary btn-sm" onclick="createHold?.('${currentVenue}')">${L('Hold 24h','Hold 24h')}</button></div></div>`;
 const hero=document.querySelector('.venue-hero');if(hero){hero.style.position='relative';if(!hero.querySelector('.vv360-tour-badge')){const b=document.createElement('button');b.className='vv360-tour-badge';b.innerHTML='◎ 360° '+L('جولة افتراضية','Virtual Tour');b.onclick=()=>document.querySelector('#virtual-tour')?.scrollIntoView({behavior:'smooth'});hero.appendChild(b)}}
 bindViewerDrag();
}

function bindViewerDrag(){
 const v=document.querySelector('#vv360Viewer');if(!v)return;let dragging=false,last=0,x=50;
 v.onpointerdown=e=>{if(e.target.closest('button'))return;dragging=true;last=e.clientX;v.setPointerCapture?.(e.pointerId)};
 v.onpointermove=e=>{if(!dragging)return;const d=e.clientX-last;last=e.clientX;x=clamp(0,100,x-d*.12);v.style.setProperty('--vv-x',x+'%')};
 const stop=()=>dragging=false;v.onpointerup=stop;v.onpointercancel=stop;
}
window.vv360Pan=dir=>{const v=document.querySelector('#vv360Viewer');if(!v)return;const raw=getComputedStyle(v).getPropertyValue('--vv-x')||'50';let x=parseFloat(raw)||50;x=clamp(0,100,x+dir*12);v.style.setProperty('--vv-x',x+'%')};
window.vv360Scene=id=>{currentScene=id;const section=document.querySelector('.vv360-section');if(!section)return;mountCustomerTour()};
window.vv360Hotspot=label=>window.toast?.(`${L('نقطة في الجولة','Tour hotspot')}: ${label}`);
window.vv360Fullscreen=()=>document.querySelector('#vv360Viewer')?.requestFullscreen?.();
window.vv360ToggleAuto=()=>{const btn=document.querySelector('#vvAutoBtn');if(autoTimer){clearInterval(autoTimer);autoTimer=null;if(btn)btn.textContent='▶ '+L('دوران','Auto');return}if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){window.toast?.(L('الدوران التلقائي متوقف لأن الجهاز يفضل تقليل الحركة','Auto rotation is disabled because reduced motion is enabled'));return}if(btn)btn.textContent='Ⅱ '+L('إيقاف','Pause');autoTimer=setInterval(()=>window.vv360Pan(1),350)};

function managerPage(){const scenes=makeScenes('royal-garden');return `<main class="page"><section class="section soft"><div class="container"><div class="dash-head"><div><div class="kicker">360° Content Studio</div><h1>${L('إدارة الجولة الافتراضية','Virtual Tour Manager')}</h1><p>${L('صاحب القاعة يدير المشاهد ونقاط المعلومات وجودة الجولة من مكان واحد.','Manage scenes, hotspots, publishing, and tour quality from one workspace.')}</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><span class="badge blue">${L('أرقام ديمو','Demo metrics')}</span><button class="btn btn-light" onclick="navTo('venue/royal-garden')">${L('معاينة كعميل','Preview customer view')}</button><button class="btn btn-primary" onclick="toast('${L('إضافة مشهد 360 — Demo','Add 360 scene — Demo')}')">+ ${L('مشهد جديد','New scene')}</button></div></div>
 <div class="vv-quality-grid"><div class="vv-quality-card"><span>${L('اكتمال الجولة','Tour completion')}</span><strong>86%</strong></div><div class="vv-quality-card"><span>${L('مشاهد منشورة','Published scenes')}</span><strong>6/7</strong></div><div class="vv-quality-card"><span>${L('مشاهدات هذا الشهر','Tour views this month')}</span><strong>1,248</strong></div><div class="vv-quality-card"><span>${L('تأثير توضيحي على التحويل','Illustrative conversion lift')}</span><strong class="text-green">+18%</strong></div></div>
 <div class="vv-manager-hero" style="margin-top:18px"><div class="vv-manager-preview" style="background-image:url('${IMG.hall}')"><div class="vv-manager-preview-content"><span class="badge green">${L('منشور','Published')}</span><h2>Royal Garden · 360°</h2><p>${L('آخر تحديث منذ 12 يوم · 14 hotspot','Updated 12 days ago · 14 hotspots')}</p></div></div><div class="card card-pad"><div class="panel-head"><strong>${L('تغطية الجولة','Tour coverage')}</strong><span class="badge orange">6 / 7</span></div><div class="vv-coverage">${[[L('القاعة الرئيسية','Main Hall'),1],[L('المدخل','Entrance'),1],[L('المسرح','Stage'),1],[L('منطقة الطعام','Dining'),1],[L('غرفة العروس','Bridal Room'),1],[L('الاستقبال الخارجي','Outdoor'),1],[L('موقف السيارات','Parking'),0]].map(([n,ok])=>`<div class="vv-cover-item ${ok?'complete':'missing'}"><span>${n}</span><strong>${ok?'✓':L('ناقص','Missing')}</strong></div>`).join('')}</div><p class="tiny muted" style="margin-top:12px">${L('إكمال Parking يرفع Content Quality Score ويظهر للعميل إن الجولة كاملة.','Adding Parking completes the coverage checklist and improves the content quality score.')}</p></div></div>
 <div class="card card-pad" style="margin-top:18px"><div class="panel-head"><div><strong>${L('المشاهد','Scenes')}</strong><div class="tiny muted">${L('رتب المشاهد، راجع الجودة وأضف Hotspots.','Reorder scenes, review quality, and manage hotspots.')}</div></div><button class="btn btn-soft btn-sm" onclick="toast('${L('تم ترتيب المشاهد — Demo','Scenes reordered — Demo')}')">${L('حفظ الترتيب','Save order')}</button></div><div class="vv-scenes-table">${scenes.map((s,i)=>`<div class="vv-scene-row"><div class="vv-scene-thumb" style="background-image:url('${s.image}')"></div><div class="vv-scene-meta"><strong>${s.name}</strong><small>${s.note}</small></div><span class="badge ${i===3?'orange':'green'}">${i===3?L('يحتاج مراجعة','Review'):L('منشور','Published')}</span><span class="tiny muted">${s.hotspots.length} hotspots</span><button class="btn btn-light btn-sm" onclick="toast('${L('فتح محرر المشهد — Demo','Scene editor opened — Demo')}')">${L('تعديل','Edit')}</button></div>`).join('')}</div></div>
 </div></section></main>`}

function adminQualityPage(){return `<main class="page"><section class="section soft"><div class="container"><div class="dash-head"><div><div class="kicker">Content Trust</div><h1>${L('جودة المحتوى وتغطية 360°','Content Quality & 360° Coverage')}</h1><p>${L('الإدارة تراقب هل القاعات فعلاً بتقدم تجربة كاملة وحديثة قبل ما تظهر للعميل.','Admin monitors whether venues provide complete, current, trustworthy visual coverage before customers rely on it.')}</p></div><span class="badge blue">${L('أرقام توضيحية للديمو','Illustrative demo metrics')}</span></div>
 <div class="stats-grid"><div class="card metric"><div class="metric-label">${L('قاعات عندها 360°','Venues with 360°')}</div><div class="metric-value">62%</div><div class="metric-trend">114 / 184 venues</div></div><div class="card metric"><div class="metric-label">${L('تغطية كاملة','Complete coverage')}</div><div class="metric-value">41%</div><div class="metric-trend">76 venues</div></div><div class="card metric"><div class="metric-label">${L('جولات قديمة >180 يوم','Tours stale >180d')}</div><div class="metric-value">12</div><div class="text-red tiny">${L('تحتاج تحديث','Need refresh')}</div></div><div class="card metric"><div class="metric-label">${L('متوسط Quality Score','Avg quality score')}</div><div class="metric-value">84</div><div class="metric-trend">↑ 6 pts</div></div></div>
 <div class="grid-2" style="margin-top:18px"><div class="card card-pad"><div class="panel-head"><strong>${L('أكبر فجوات التغطية','Top coverage gaps')}</strong><span class="badge orange">${L('Action needed','Action needed')}</span></div><div class="vision-list"><div class="vision-line"><strong>24</strong> ${L('قاعة بدون مشهد Parking','venues missing Parking scene')}</div><div class="vision-line"><strong>17</strong> ${L('قاعة بدون Bridal Room','venues missing Bridal Room')}</div><div class="vision-line"><strong>12</strong> ${L('جولة لم تتحدث منذ 180+ يوم','tours not refreshed in 180+ days')}</div><div class="vision-line"><strong>9</strong> ${L('مشاهد جودتها منخفضة','venues with low image quality')}</div></div></div><div class="card card-pad"><div class="panel-head"><strong>${L('سياسة الجودة','Quality policy')}</strong><span class="badge green">${L('نشطة','Active')}</span></div><div class="vv-coverage"><div class="vv-cover-item complete"><span>${L('القاعة الرئيسية مطلوبة','Main Hall required')}</span><strong>✓</strong></div><div class="vv-cover-item complete"><span>${L('الصور خلال 180 يوم','Refresh within 180d')}</span><strong>✓</strong></div><div class="vv-cover-item complete"><span>${L('حد أدنى 4 مشاهد','Minimum 4 scenes')}</span><strong>✓</strong></div><div class="vv-cover-item complete"><span>${L('Hotspots بدون معلومات مضللة','Verified hotspot labels')}</span><strong>✓</strong></div></div></div></div>
 <div class="card table-card" style="margin-top:18px"><div class="table-wrap"><table class="table"><thead><tr><th>${L('القاعة','Venue')}</th><th>360°</th><th>${L('المشاهد','Scenes')}</th><th>${L('آخر تحديث','Last refresh')}</th><th>${L('الجودة','Quality')}</th><th>${L('الإجراء','Action')}</th></tr></thead><tbody>${[['Royal Garden','Complete','6/7','12d','92'],['Luma Hall','Complete','7/7','24d','94'],['Nile Palace','Partial','4/7','73d','78'],['Palm Palace','Stale','5/7','214d','63']].map(r=>`<tr><td><strong>${r[0]}</strong></td><td><span class="badge ${r[1]==='Complete'?'green':r[1]==='Partial'?'orange':'red'}">${r[1]}</span></td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}/100</td><td><button class="btn btn-light btn-sm" onclick="toast('${L('فتح مراجعة المحتوى — Demo','Content review opened — Demo')}')">${L('مراجعة','Review')}</button></td></tr>`).join('')}</tbody></table></div></div>
 </div></section></main>`}

function enhanceRoleNavigation(){
 const role=window.hhCurrentRole?.();const nav=document.querySelector('.main-nav');if(!nav)return;
 const add=(href,label)=>{if(nav.querySelector(`a[href="${href}"]`))return;const a=document.createElement('a');a.href=href;a.innerHTML=`<span class="pu-nav-icon">◎</span><span>${label}</span>`;nav.appendChild(a)};
 if(role==='venue')add('#/venue-os/360-manager','360° '+L('الجولة','Tour'));
 if(role==='admin')add('#/admin/content-quality','360° '+L('الجودة','Quality'));
}
function renderSpecialRoutes(){const [p,a]=route();if(p==='venue-os'&&a==='360-manager'&&A())A().innerHTML=managerPage();else if(p==='admin'&&a==='content-quality'&&A())A().innerHTML=adminQualityPage();setTimeout(()=>{mountCustomerTour();enhanceRoleNavigation();window.hhApplyLanguage?.(document.body)},30)}
window.addEventListener('hashchange',()=>setTimeout(renderSpecialRoutes,110));
window.addEventListener('hh:languagechange',()=>setTimeout(renderSpecialRoutes,70));
document.addEventListener('DOMContentLoaded',()=>setTimeout(renderSpecialRoutes,320));
})();