(function(){
'use strict';
function syncPilot(){
  if(typeof window.dawwarPilotApply==='function')window.dawwarPilotApply();
}
window.addEventListener('hashchange',syncPilot);
window.addEventListener('hh:languagechange',syncPilot);
document.addEventListener('DOMContentLoaded',syncPilot);
setTimeout(syncPilot,0);
})();
