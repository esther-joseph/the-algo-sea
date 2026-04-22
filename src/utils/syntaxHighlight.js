const KEYWORDS = new Set(['def','class','return','for','while','if','elif','else','import','from','in','and','or','not','True','False','None','self','pass','break','continue','with','as','try','except','finally','raise','yield','lambda','global','nonlocal','is','del','async','await']);
const BUILTINS = new Set(['len','range','print','list','dict','set','tuple','int','str','float','bool','sum','min','max','abs','sorted','enumerate','zip','map','filter','any','all','type','isinstance','append','pop','get','items','keys','values','heappush','heappop','heapify','deque','defaultdict','Counter','lru_cache','inf','open','round','reversed','next','iter','super','hasattr','getattr','setattr']);
const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const tok = (cls, s) => `<span class="${cls}">${esc(s)}</span>`;

export function syntaxHighlight(raw) {
  let out = '', i = 0; const c = raw;
  while (i < c.length) {
    const ch = c[i];
    if (ch==='\n'){out+='\n';i++;continue;}
    if (ch==='@'){let j=i+1;while(j<c.length&&/[\w.]/.test(c[j]))j++;out+=tok('ck-dec',c.slice(i,j));i=j;continue;}
    if (ch==='#'){let j=i;while(j<c.length&&c[j]!=='\n')j++;out+=tok('ck-cmt',c.slice(i,j));i=j;continue;}
    if((ch==='"'||ch==="'")&&c[i+1]===ch&&c[i+2]===ch){const d=ch.repeat(3);let j=i+3;while(j<c.length&&c.slice(j,j+3)!==d)j++;out+=tok('ck-str',c.slice(i,j+3));i=j+3;continue;}
    if(ch==='"'||ch==="'"){let j=i+1;while(j<c.length&&c[j]!==ch&&c[j]!=='\n'){if(c[j]==='\\')j++;j++;}if(j<c.length)j++;out+=tok('ck-str',c.slice(i,j));i=j;continue;}
    if(/[0-9]/.test(ch)||(ch==='.'&&/[0-9]/.test(c[i+1]??''))){let j=i;while(j<c.length&&/[0-9a-fA-FxXoObBfFeE_.+\-]/.test(c[j]))j++;out+=tok('ck-num',c.slice(i,j));i=j;continue;}
    if(/[a-zA-Z_]/.test(ch)){let j=i;while(j<c.length&&/\w/.test(c[j]))j++;const word=c.slice(i,j);let k=j;while(k<c.length&&c[k]===' ')k++;const isCall=c[k]==='(';const prev=(out.replace(/<[^>]+>/g,'').match(/(\w+)\s*$/)||[])[1]||'';
      if(KEYWORDS.has(word))out+=tok('ck-kw',word);else if(BUILTINS.has(word))out+=tok('ck-bi',word);else if(prev==='def')out+=tok('ck-def',word);else if(prev==='class')out+=tok('ck-cls',word);else if(isCall)out+=tok('ck-fn',word);else out+=esc(word);i=j;continue;}
    if(/[+\-*/%=<>!&|^~]/.test(ch)){let j=i;while(j<c.length&&/[+\-*/%=<>!&|^~]/.test(c[j]))j++;out+=tok('ck-op',c.slice(i,j));i=j;continue;}
    if(/[(){}\[\],.:;]/.test(ch)){out+=tok('ck-br',ch);i++;continue;}
    out+=esc(ch);i++;
  }
  return out;
}

export function prepareCodeBlock(code) {
  const raw=code.trim(), highlighted=syntaxHighlight(raw);
  const lineNums=raw.split('\n').map((_,i)=>i+1).join('\n');
  return {highlighted,lineNums,raw};
}