const {execFileSync}=require('node:child_process');
const before=process.env.CACHED_COMMIT_REF,after=process.env.COMMIT_REF;
if(!before||!after)process.exit(1);
try {
  const paths=execFileSync('git',['diff','--name-only',before,after],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
  const dataOnly=paths.length===0||paths.every(p=>p.startsWith('data/')||p==='public-research-data.json');
  console.log(dataOnly?'Public data update: skip production build':'Website source changed: build');
  process.exit(dataOnly?0:1);
} catch {process.exit(1);}
