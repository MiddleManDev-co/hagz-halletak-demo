const fs=require('fs');const assert=require('assert');
const index=fs.readFileSync('index.html','utf8');
const js=fs.readFileSync('persona-ui.js','utf8');
const css=fs.readFileSync('persona-ui.css','utf8');
for(const f of ['persona-ui.css','persona-ui.js'])assert(index.includes(f),`index missing ${f}`);
for(const role of ['customer','venue','admin','investor'])assert(js.includes(`${role}:` )||js.includes(`'${role}'`),`missing role ${role}`);
for(const route of [
 'home','explore','my-wedding','visits','messages','account',
 'venue-os/overview','venue-os/calendar','venue-os/leads','venue-os/visits','venue-os/bookings','venue-os/team',
 'pilot/ops','admin/verification','admin/venues','admin/bookings','admin/support',
 'investor','vision','admin/economics','admin/marketplace-health','strategy-simulator'
])assert(js.includes(route),`missing persona route ${route}`);
assert(js.includes("admin:'pilot/ops'"),'admin home must be pilot operations, not legacy platform metrics');
assert(!/venue:\(\)=>\[[\s\S]*venue-os\/business-center[\s\S]*\]/.test(js),'advanced business center must not crowd the venue pilot nav');
assert(js.includes('renderMainNav'),'role-aware top navigation missing');
assert(js.includes('renderMobileNav'),'role-aware mobile navigation missing');
assert(js.includes('inferRole'),'route-to-role synchronization missing');
assert(js.includes('hhSwitchRole'),'role switch action missing');
assert(js.includes("body.dataset.demoRole"),'role visual state missing');
for(const bp of ['@media(max-width:1020px)','@media(max-width:760px)','@media(max-width:480px)'])assert(css.includes(bp),`missing responsive breakpoint ${bp}`);

// --- one owner for the sidebar -------------------------------------------
// Six places used to render or append to .side-nav, so the list changed length
// and order on every navigation. persona-ui.js is now the only writer.
{
  const others={
    'app.js':fs.readFileSync('app.js','utf8'),
    'audit.js':fs.readFileSync('audit.js','utf8'),
    'polish.js':fs.readFileSync('polish.js','utf8'),
    'business-intelligence.js':fs.readFileSync('business-intelligence.js','utf8')
  };
  for(const [name,src] of Object.entries(others)){
    assert(!/enhanceSidebars\s*\(\)/.test(src),`${name} must not add links to the sidebar`);
    for(const m of src.match(/<nav class="side-nav">[\s\S]{0,40}?<\/nav>/g)||[]){
      assert(m==='<nav class="side-nav"></nav>',`${name} must render an empty sidebar container, got: ${m.slice(0,60)}`);
    }
  }
  assert(js.includes('renderSideNav'),'persona-ui must own the sidebar');
  assert(js.includes('MutationObserver'),'persona-ui must keep ownership of the sidebar after re-renders');
}

// --- a screen refuses to open for the wrong perspective --------------------
{
  assert(js.includes('routeOwner')&&js.includes('routeRole'),'route ownership map missing');
  assert(js.includes('guardRoute'),'route guard missing');
  assert(/function render\(\)\{\s*if\(guardRoute\(\)\)return;/.test(js),'render must run the guard before drawing anything');
  assert(!js.includes('syncFromRoute'),'the role must not follow the route any more');
  for(const owned of ['venue-os','pilot\\/commission','admin','pilot\\/ops','investor','strategy-simulator'])
    assert(js.includes(owned.replace('\\','')),`route family not owned: ${owned}`);
}

// --- the investor view cannot reach real admin screens --------------------
{
  const start=js.indexOf('investor:()=>[');
  let depth=0,end=start;
  for(let k=js.indexOf('[',start);k<js.length;k++){
    if(js[k]==='[')depth++;
    else if(js[k]===']'){depth--;if(depth===0){end=k;break}}
  }
  const inv=js.slice(start,end+1);
  assert(!inv.includes('admin/'),`investor navigation must not link admin screens: ${inv}`);
  const invMobile=/investor:\[[^\]]*\]/.exec(js.slice(js.indexOf('const mobile=')));
  assert(invMobile&&!invMobile[0].includes('admin/'),'investor mobile navigation must not link admin screens');
  assert(js.includes("['admin/economics'"),'platform economics belongs to admin');
  assert(js.includes("['admin/marketplace-health'"),'market health belongs to admin');
}

// --- moving between perspectives is an explicit act -----------------------
{
  for(const name of ['app.js','audit.js','business-intelligence.js']){
    const src=fs.readFileSync(name,'utf8');
    assert(!/setPersona\('customer'/.test(src),`${name} must switch perspective through hhSwitchRole, not a silent persona set`);
    assert(!/navTo\('investor'\)/.test(src),`${name} must not jump into the investor view without switching perspective`);
  }
}

console.log('persona workspace tests passed');