var $=function(i){return document.getElementById(i)};
var P=["Sample, pending Kari: What does your heart need today?","Sample, pending Kari: Where did you feel peace this week?","Sample, pending Kari: What are you ready to let go of?","Sample, pending Kari: What would you tell a friend who felt like you do right now?","Sample, pending Kari: What small thing are you grateful for today?","Sample, pending Kari: Where are you being too hard on yourself?","Sample, pending Kari: What does rest look like for you?"];
var Q=["Sample, pending Kari: What is one small step you could take tomorrow?","Sample, pending Kari: Who could you share this with?","Sample, pending Kari: What would feel kind to yourself right now?"];
var A=["Sample, pending Kari: I am allowed to go slow.","Sample, pending Kari: My feelings are welcome here.","Sample, pending Kari: I am learning to trust myself.","Sample, pending Kari: Today was enough."];
var CR=/suicid|kill myself|end my life|want to die|self.?harm|hurt myself|cut myself|no reason to live|better off dead/i;
var day=Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);
function load(){try{return JSON.parse(localStorage.getItem('ss_entries')||'[]')}catch(e){return[]}}
function store(e){localStorage.setItem('ss_entries',JSON.stringify(e))}
if(!localStorage.getItem('ss_18')){$('gate').classList.remove('hide');$('app').classList.add('hide')}
$('ok18').onclick=function(){localStorage.setItem('ss_18','1');$('gate').classList.add('hide');$('app').classList.remove('hide')};
$('date').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
$('prompt').textContent=P[day%P.length].replace('Sample, pending Kari: ','');
function render(){var e=load();$('past').innerHTML=e.length?'':'None yet.';e.slice().reverse().forEach(function(x){var d=document.createElement('div');d.className='entry';d.innerHTML='<b></b><br><i></i><br><span></span>';d.querySelector('b').textContent=new Date(x.t).toLocaleDateString();d.querySelector('i').textContent=x.p;d.querySelector('span').textContent=x.text+(x.f?' — '+x.f:'');$('past').appendChild(d)});
var wk=e.filter(function(x){return Date.now()-x.t<7*864e5});
$('letter').textContent=wk.length?'This week you wrote '+wk.length+' time'+(wk.length>1?'s':'')+'. You kept coming back, and that matters. Your first words this week were: "'+wk[0].text.slice(0,80)+(wk[0].text.length>80?'…':'')+'". (Sample letter. The real letter will be written in Kari\'s voice after she signs off.)':'Write a few days this week and a short letter will show up here on Sunday. (Sample.)'}
var cur=null;
$('save').onclick=function(){var t=$('txt').value.trim();if(!t){$('txt').focus();return}
var e=load();var last=e[e.length-1];cur={t:Date.now(),p:$('prompt').textContent,text:t};e.push(cur);store(e);
if(CR.test(t)){$('crisis').classList.remove('hide');$('crisis').scrollIntoView({behavior:'smooth'});render();return}
$('rtext').textContent='Thank you for sharing this. It sounds like a lot is on your heart, and you made space for it today.'+(last?' Last time you wrote about "'+last.text.slice(0,50)+(last.text.length>50?'…':'')+'". I notice you keep showing up for yourself.':'')+' (Canned sample reply. Not real AI yet.)';
$('fq').textContent=Q[day%Q.length].replace('Sample, pending Kari: ','');$('reply').classList.remove('hide');$('reply').scrollIntoView({behavior:'smooth'});render()};
$('fsave').onclick=function(){var f=$('ftxt').value.trim();if(CR.test(f))$('crisis').classList.remove('hide');var e=load();if(e.length){e[e.length-1].f=f;store(e)}
$('aff').textContent=A[day%A.length].replace('Sample, pending Kari: ','');$('close').classList.remove('hide');$('close').scrollIntoView({behavior:'smooth'});render()};
$('clear').onclick=function(){if(confirm('Delete all entries on this phone?')){store([]);render()}};
var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR)$('talk').textContent='🎙 Talk: use the mic on your keyboard';
$('talk').onclick=function(){if(!SR){$('txt').focus();return}var r=new SR();r.lang='en-US';r.interimResults=false;$('talk').textContent='Listening… tap to stop';
r.onresult=function(ev){$('txt').value+=($('txt').value?' ':'')+ev.results[0][0].transcript};r.onend=function(){$('talk').textContent='🎙 Talk instead'};r.start()};
render();