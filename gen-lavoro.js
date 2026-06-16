// gen-lavoro.js — questionario "Squadra ReadBall" COMPLETO, 40 domande, 8 ruoli (no faccia/voce: lo fa l'AI).
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
${sec('👤 CHI SEI')}
${radio(1, 'Quanti anni hai?', ['Meno di 18', '18–22', '23–28', 'Più di 28'])}
${text(2, 'Cosa fai nella vita (studi/lavori) e quanto tempo libero VERO hai?')}
${text(3, 'Quali lingue parli, italiano a parte?')}
${radio(4, 'Quanto sei costante?', ['Costante e regolare', 'A sprint, poi mollo', 'Dipende dalla motivazione'])}
${radio(5, 'In un gruppo di lavoro come stai meglio?', ['Mi piace guidare', 'Propongo e collaboro', 'Eseguo quello che mi dicono'])}
${sec('⏰ DISPONIBILITÀ')}
${radio(6, 'Quante ore AL GIORNO puoi dedicarci?', ['Meno di 1h', '1–2h', '2–4h', 'Più di 4h'])}
${radio(7, 'Quanti giorni a settimana?', ['1–2', '3–4', '5–6', 'Tutti'])}
${radio(8, 'Rispetti le scadenze (es. "pronto entro le 18")?', ['Sempre', 'Quasi sempre', 'Dipende', 'Faccio fatica'])}
${radio(9, 'Per quanto pensi di continuare?', ['Provo e vedo', 'Qualche mese', 'A lungo', 'Tutto il Mondiale e oltre'])}
${sec('⚽ QUANTO VIVI IL CALCIO')}
${radio(10, 'Come guardi le partite?', ['Intere e con attenzione', 'Intere ma distratto', 'Solo gol/highlights', 'Quasi mai'])}
${radio(11, 'Quante partite a settimana guardi davvero?', ['0–1', '2–3', '4–6', '7 o più'])}
${radio(12, 'Durante la partita noti i dettagli (chi è stanco, cali, mosse tattiche)?', ['Sì, sempre', 'A volte', 'No'])}
${text(13, 'Di quali nazionali/squadre/campionati sei ESPERTO VERO? (anche calci di nicchia)')}
${radio(14, 'Quanto sei bravo a pronosticare i risultati?', ['Molto', 'Nella media', 'Scarso'])}
${text(15, 'Una lettura o previsione di una partita di cui sei orgoglioso')}
${sec('🎯 GIOCATE & SCOMMESSE')}
${radio(16, 'Hai un conto scommesse?', ['Sì, attivo', 'Sì ma lo uso poco', 'No, ma lo aprirei', 'No e non mi interessa'])}
${radio(17, 'Seguiresti le giocate ReadBall con PICCOLI soldi veri, documentando come va?', ['Sì, ci sto', 'Forse', 'No'])}
${radio(18, 'Quanto te ne intendi di quote e mercati (Over, Goal, handicap...)?', ['Bene', 'Le basi', 'Poco'])}
${sec('📱 SOCIAL & RETE')}
${radio(19, 'Quale piattaforma mastichi di più?', ['Instagram', 'TikTok', 'Telegram', 'Poco social'])}
${radio(20, 'Quanto conosci trend, hashtag e orari giusti per postare?', ['Molto', 'Abbastanza', 'Poco'])}
${radio(21, 'Te la cavi a scrivere a sconosciuti/altre pagine per collaborazioni?', ['Sì, tranquillo', 'Con qualche sforzo', 'No, mi blocco'])}
${radio(22, 'Quanto è grande la tua cerchia social (potresti far girare i contenuti)?', ['Grande', 'Media', 'Piccola'])}
${text(23, 'Conosci gente o pagine nel mondo calcio-social? (chi/quali, se sì)')}
${text(24, 'Hai mai creato contenuti, gestito una pagina o un progetto tuo? Racconta')}
${text(25, 'Un creator o una pagina calcistica che ammiri, e perché?')}
${sec('🛠️ STRUMENTI & MEZZI')}
${check(26, 'Che dispositivi hai?', ['PC / Mac', 'iPad / Tablet', 'Telefono buono per video', 'Microfono / luci', 'Niente di che'])}
${check(27, 'Quali AI/abbonamenti hai?', ['ChatGPT Plus', 'Gemini Pro', 'Canva Pro', 'CapCut Pro', 'Nessuno'])}
${radio(28, 'Hai un abbonamento per vedere le partite (DAZN, Sky...)?', ['Sì, ce l’ho già', 'No ma posso procurarmelo', 'No, mi servirebbe che lo offrite voi', 'Non mi serve per il mio ruolo'])}
${sec('🚀 VISIONE & AMBIZIONE', 'La parte che conta di più. Pensaci e rispondi per esteso.')}
${text(29, 'Cosa ASPIRI a diventare dentro ReadBall? Dove ti vedi tra un anno?')}
${text(30, 'Cosa credi che ReadBall possa diventare? Quanto in grande lo vedi?')}
${radio(31, 'Saresti disposto a INVESTIRE soldi tuoi nel progetto?', ['Sì', 'Forse, dipende', 'No'])}
${text(32, 'Se sì o forse: quanto e soprattutto PERCHÉ?')}
${text(33, 'Quali sono secondo te i PUNTI DEBOLI / le lacune di ReadBall oggi?')}
${text(34, 'Come le MIGLIORERESTI? (concreto)')}
${text(35, 'Cosa AGGIUNGERESTI a ReadBall (funzioni, contenuti, idee nuove)?')}
${text(36, 'Una modifica che faresti SUBITO al mondo ReadBall?')}
${radio(37, 'Quanto ci credi in questo progetto?', ['Tantissimo, ci metto tutto', 'Molto', 'Abbastanza', 'Sto a guardare'])}
${sec('💪 TU & IL RUOLO', 'Ultime domande.')}
${check(38, 'Quali RUOLI ti attirano di più?', ['Gestire un canale (IG/TikTok/Telegram)', 'Guardare le partite e prendere appunti', 'Seguire le giocate coi tuoi soldi e documentarlo', 'Dare i tuoi pronostici (amici vs motore)', 'Contattare pagine per collab', 'Essere esperto di un calcio di nicchia'], 3)}
${text(39, 'I tuoi 2 punti di forza più grandi')}
${text(40, 'Perché vuoi farne parte DAVVERO?')}
${sec('🎟️ LE TUE GIOCATE', 'Ultime 3 partite del Mondiale.')}
${radio(41, 'Nelle ultime 3 partite del Mondiale hai fatto schedine/giocate?', ['Sì, parecchie', 'Sì, qualcuna', 'No'])}
${radio(42, 'Ne hai fatte seguendo i pronostici di ReadBall?', ['Sì', 'No', 'Non sapevo si potesse'])}
${text(43, 'Raccontami una giocata che hai VINTO e perché hai scelto quelle giocate (e mandami lo screenshot su WhatsApp, se ti va)')}
</form>`;

const intro = `<p class="intro">Vuoi entrare nella squadra <b style="color:#15e37c">ReadBall</b> (Instagram, TikTok, Telegram)? Rispondi sincero e per esteso: non è un test, serve a capire chi sei e a darti il ruolo giusto. Più ci metti del tuo, più conti.<br><b style="color:#15e37c">Alla fine premi "Invia" e mandami tutto su WhatsApp. Le schedine vinte mandamele come screenshot.</b></p>
<div class="id"><input id="nome" placeholder="Il tuo nome" autocomplete="off"></div>`;

const script = `<div class="bar"><div class="err" id="err">Scrivi il tuo nome e completa le domande a scelta 👆</div><button id="send">📲 Invia a Renis (WhatsApp)</button></div>
<script>
document.getElementById('send').onclick=function(){
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
  var msg='📋 CANDIDATURA Squadra ReadBall\\n👤 '+nome+'\\n\\n'+lines.join('\\n')+'\\n\\n(Le schedine vinte le mando come screenshot.)';
  window.location.href='https://wa.me/?text='+encodeURIComponent(msg);
};
</script></body></html>`;

fs.writeFileSync('lavoro.html', head + intro + form + script);
console.log('lavoro.html scritto:', (head + intro + form + script).length, 'bytes');
