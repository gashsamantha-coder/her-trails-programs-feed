// Loader spliced into the end of the "Program Finder HTML" custom code block on the
// Member Program Library page in Kajabi. It replaces the old hard-coded htpcP list with
// members.json from this repo, keeping the hard-coded list only as a fallback.
var HT_FEED='https://gashsamantha-coder.github.io/her-trails-programs-feed/members.json';
function htpcEventOpts(list){var seen={};list.forEach(function(p){if(p.event&&p.event!=='generic')seen[p.event]=p.eventLabel||p.event;});var order=['tarawera','noosa','uta','kosci','buffalo','gpt','scc','hounslow','b2m','roller-coaster','rtf','standley','two-bays','six-foot','road-marathon','strength','peri','staged','other'];var opts=[{l:'All Events',v:'all'}];order.forEach(function(k){if(seen[k])opts.push({l:seen[k],v:k});});Object.keys(seen).forEach(function(k){if(order.indexOf(k)<0)opts.push({l:seen[k],v:k});});return opts;}
function htpcInit(){buildPills('htpc-dist-pills',distOpts,'dist');buildPills('htpc-event-pills',eventOpts,'event');buildPills('htpc-dur-pills',durOpts,'dur');render();}
htpcInit();
fetch(HT_FEED,{cache:'no-store'}).then(function(r){return r.json();}).then(function(j){if(j&&j.programs&&j.programs.length){htpcP=j.programs.map(function(p){p.pctS=p.pctS||0;p.pctF=p.pctF||0;p.pctR=p.pctR||0;return p;});eventOpts=htpcEventOpts(htpcP);htpcClearAll();htpcInit();}}).catch(function(e){});
