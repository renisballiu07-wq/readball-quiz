// gen-lavoro.js — questionario "Squadra ReadBall" COMPLETO (8 ruoli + visione/ambizione/soldi/lacune).
// Riusa head/style/logo di index.html. Submit: copia negli appunti -> incolla nel gruppo ReadBall.
const fs = require('fs');
const idx = fs.readFileSync('index.html', 'utf8');
const cut = idx.indexOf('</h1></div>') + '</h1></div>'.length;
let head = idx.slice(0, cut)
  .replace('<title>Quiz Pre-Partita ReadBall</title>', '<title>Squadra ReadBall — Candidatura</title>')
  .replace('<h1>Quiz Pre-Partita</h1>', '<h1>Entra nella Squadra</h1>');

const sec = (t, s) => `<div class="sec">${t}${s ? `<small>${s}</small>` : ''}</div>`;
const radio = (n, q, opts) => `<div class="card" data-q="${n}. ${q.replace(/"/g, '&quot;')}" data-type="radio"><label class="ql">${n}. ${q}</label>${opts.map(o => `<label class="opt"><input type="radio" name="q${n}" value="${o.replace(/"/g, '&quot;')}"><span>${o}</span></label>`).join('')}</div>`;
const check = (n, q, opts, max) => `<div class="card" data-q="${n}. ${q.replace(/"/g, '&quot;')}" data-type="check"><label class="ql">${n}. ${q}${max ? ` <small style="color:#9fb0c0;font-weight:500">(max ${max})</small>` : ''}</label>${opts.map(o => `<label class="opt"><input type="checkbox" name="q${n}" value="${o.replace(/"/g, '&quot;')}"><span>${o}</span></label>`).join('')}</div>`;
const text = (n, q) => `<div class="card" data-q="${n}. ${q.replace(/"/g, '&quot;')}"><label>${n}. ${q}</label><input type="text" name="q${n}" autocomplete="off"></div>`;

const form = `<form id="f">
${sec('⏰ DISPONIBILITÀ')}
${radio(1, 'Quante ore AL GIORNO puoi dedicarci?', ['Meno di 1h', '1–2h', '2–4h', 'Più di 4h'])}
${radio(2, 'Quanti giorni a settimana?', ['1–2', '3–4', '5–6', 'Tutti'])}
${radio(3, 'Rispetti le scadenze (es. "pronto entro le 18")?', ['Sempre', 'Quasi sempre', 'Dipende', 'Faccio fatica'])}
${radio(4, 'Per quanto pensi di continuare?', ['Provo e vedo', 'Qualche mese', 'A lungo', 'Tutto il Mondiale e oltre'])}
${sec('⚽ QUANTO VIVI IL CALCIO')}
${radio(5, 'Come guardi le partite?', ['Intere e con attenzione', 'Intere ma distratto', 'Solo gol/highlights', 'Quasi mai'])}
${radio(6, 'Quante partite a settimana guardi davvero?', ['0–1', '2–3', '4–6', '7 o più'])}
${radio(7, 'Durante la partita noti i dettagli (chi è stanco, cali, mosse tattiche)?', ['Sì, sempre', 'A volte', 'No'])}
${text(8, 'Di quali nazionali/squadre/campionati sei ESPERTO VERO? (anche calci di nicchia)')}
${radio(9, 'Quanto sei bravo a pronosticare i risultati?', ['Molto', 'Nella media', 'Scarso'])}
${sec('🎯 GIOCATE & SCOMMESSE')}
${radio(10, 'Hai un conto scommesse?', ['Sì, attivo', 'Sì ma lo uso poco', 'No, ma lo aprirei', 'No e non mi interessa'])}
${radio(11, 'Seguiresti le giocate ReadBall con PICCOLI soldi veri, documentando come va?', ['Sì, ci sto', 'Forse', 'No'])}
${radio(12, 'Quanto te ne intendi di quote e mercati (Over, Goal, handicap...)?', ['Bene', 'Le basi', 'Poco'])}
${sec('📱 SOCIAL & RETE')}
${radio(13, 'Quale piattaforma mastichi di più?', ['Instagram', 'TikTok', 'Telegram', 'Poco social'])}
${radio(14, 'Quanto conosci trend, hashtag e orari giusti per postare?', ['Molto', 'Abbastanza', 'Poco'])}
${radio(15, 'Te la cavi a scrivere a sconosciuti/altre pagine per collaborazioni?', ['Sì, tranquillo', 'Con qualche sforzo', 'No, mi blocco'])}
${radio(16, 'Quanto è grande la tua cerchia social (potresti far girare i contenuti)?', ['Grande', 'Media', 'Piccola'])}
${text(17, 'Conosci gente o pagine nel mondo calcio-social? (chi/quali, se sì)')}
${sec('🎥 VIDEO & FACCIA')}
${radio(18, 'Ti metteresti DAVANTI alla camera nei video?', ['Sì, a mio agio', 'Si può provare', 'No'])}
${radio(19, 'Faresti la VOCE nei video (voice-over)?', ['Sì', 'Forse', 'No'])}
${sec('🛠️ STRUMENTI & MEZZI')}
${check(20, 'Che dispositivi hai?', ['PC / Mac', 'iPad / Tablet', 'Telefono buono per video', 'Microfono / luci', 'Niente di che'])}
${check(21, 'Quali AI/abbonamenti hai?', ['ChatGPT Plus', 'Gemini Pro', 'Canva Pro', 'CapCut Pro', 'Nessuno'])}
${radio(22, 'Hai un abbonamento per vedere le partite (DAZN, Sky...)?', ['Sì, ce l’ho già', 'No ma posso procurarmelo', 'No, mi servirebbe che lo offrite voi', 'Non mi serve per il mio ruolo'])}
${sec('🚀 VISIONE & AMBIZIONE', 'La parte che conta di più. Pensaci e rispondi per esteso.')}
${text(23, 'Cosa ASPIRI a diventare dentro ReadBall? Dove ti vedi tra un anno?')}
${text(24, 'Cosa credi che ReadBall possa diventare? Quanto in grande lo vedi?')}
${radio(25, 'Saresti disposto a INVESTIRE soldi tuoi nel progetto?', ['Sì', 'Forse, dipende', 'No'])}
${text(26, 'Se sì o forse: quanto e soprattutto PERCHÉ?')}
${text(27, 'Quali sono secondo te i PUNTI DEBOLI / le lacune di ReadBall oggi?')}
${text(28, 'Come le MIGLIORERESTI? (concreto)')}
${text(29, 'Cosa AGGIUNGERESTI a ReadBall (funzioni, contenuti, idee nuove)?')}
${text(30, 'Una modifica che faresti SUBITO al mondo ReadBall?')}
${radio(31, 'Quanto ci credi in questo progetto?', ['Tantissimo, ci metto tutto', 'Molto', 'Abbastanza', 'Sto a guardare'])}
${sec('💪 TU & IL RUOLO', 'Ultime domande.')}
${check(32, 'Quali RUOLI ti attirano di più?', ['Gestire un canale (IG/TikTok/Telegram)', 'Guardare le partite e prendere appunti', 'Seguire le giocate coi tuoi soldi e documentarlo', 'Dare i tuoi pronostici (amici vs motore)', 'Contattare pagine per collab', 'Essere esperto di un calcio di nicchia', 'Stare nei video (faccia/voce)'], 3)}
${text(33, 'I tuoi 2 punti di forza più grandi')}
${text(34, 'Perché vuoi farne parte DAVVERO?')}
</form>`;

const intro = `<p class="intro">Vuoi entrare nella squadra <b style="color:#15e37c">ReadBall</b> (Instagram, TikTok, Telegram)? Rispondi sincero e per esteso: non è un test, serve a capire chi sei e a darti il ruolo giusto. Più ci metti del tuo, più conti.<br><b style="color:#15e37c">Alla fine premi "Copia le risposte" e incollale nel gruppo ReadBall.</b></p>
<div class="id"><input id="nome" placeholder="Il tuo nome" autocomplete="off"></div>`;

const script = `<div class="bar"><div class="err" id="err">Scrivi il tuo nome e completa le domande a scelta 👆</div><button id="send">📋 Copia le risposte</button></div>
<script>
document.getElementById('send').onclick=async function(){
  var nome=document.getElementById('nome').value.trim();
  var cards=[...document.querySelectorAll('.card')];
  var lines=[], ok=!!nome;
  for(var c of cards){
    var q=c.getAttribute('data-q'), t=c.getAttribute('data-type');
    if(t==='radio'){var sel=c.querySelector('input:checked');if(!sel){ok=false;continue}lines.push(q+' -> '+sel.value);}
    else if(t==='check'){var s=[...c.querySelectorAll('input:checked')].map(x=>x.value);if(!s.length){ok=false}lines.push(q+' -> '+(s.join(', ')||'-'));}
    else{var tx=c.querySelector('input[type=text]').value.trim();lines.push(q+' -> '+(tx||'-'));}
  }
  if(!ok){var e=document.getElementById('err');e.style.display='block';window.scrollTo(0,0);return;}
  var msg='📋 CANDIDATURA Squadra ReadBall\\n👤 '+nome+'\\n\\n'+lines.join('\\n');
  function done(){alert('✅ Risposte COPIATE!\\n\\nOra apri il gruppo ReadBall su Telegram, tieni premuto sulla barra del messaggio e fai INCOLLA, poi invia. Fatto!');}
  try{ await navigator.clipboard.writeText(msg); done(); }
  catch(e){ var ta=document.createElement('textarea'); ta.value=msg; ta.style.position='fixed'; ta.style.top='0'; document.body.appendChild(ta); ta.focus(); ta.select();
    try{ document.execCommand('copy'); done(); }catch(_){ window.prompt('Copia questo testo e incollalo nel gruppo ReadBall:', msg); }
    ta.remove(); }
};
</script></body></html>`;

fs.writeFileSync('lavoro.html', head + intro + form + script);
console.log('lavoro.html scritto:', (head + intro + form + script).length, 'bytes');
