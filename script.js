(() => {
  'use strict';
  const collections = {
    gaming: {
      title: 'The Hezelya edits',
      description: 'Selected gaming videos edited for Hezelya. Browse the original uploads below.',
      label: 'Gaming edit',
      links: [
        'https://www.facebook.com/HazelGamingPH/videos/650267883018896/',
        'https://www.facebook.com/HazelGamingPH/videos/1310643886079043/',
        'https://www.facebook.com/HazelGamingPH/videos/405501531455576/',
        'https://www.facebook.com/watch/?v=434389148339528',
        'https://www.facebook.com/HazelGamingPH/videos/1182011699265416/',
        'https://www.facebook.com/HazelGamingPH/videos/797054731275880/',
        'https://www.facebook.com/HazelGamingPH/videos/2632195970248561/',
        'https://www.facebook.com/HazelGamingPH/videos/337568401613492/',
        'https://www.facebook.com/HazelGamingPH/videos/638142400675184/',
        'https://www.facebook.com/HazelGamingPH/videos/956696185009878/'
      ]
    },
    process: {
      title: 'Inside the timeline',
      description: 'A collection of editing timelapses, visual effects breakdowns, and archive posts from the former Hezelya page.',
      label: 'Archive selection',
      links: [
        'https://www.facebook.com/watch/?v=742301220605454',
        'https://www.facebook.com/watch/?v=2102406593264573',
        'https://www.facebook.com/editorpogi/posts/pfbid02zTdv5k7727FqhLxsQW5o7tagoSARh9mdPiSDbQFMnRYy17sb1kLtWZixmrB8L9Eil',
        'https://www.facebook.com/watch/?v=393184686063204',
        'https://www.facebook.com/watch/?v=410700494009454',
        'https://www.facebook.com/watch/?v=535579361408340',
        'https://www.facebook.com/watch/?v=3071338329753581',
        'https://www.facebook.com/watch/?v=576656553671589',
        'https://www.facebook.com/editorpogi/posts/pfbid01Hh428MAXS3EyQFbb7wAVbVsPxjswNrFp2d9QeLwB6NnS1cMufyxqz1XzzbSyPgml',
        'https://www.facebook.com/watch/?v=726185438813335'
      ]
    }
  };
  const projects = {
    garden: {n:'01',title:'Epic Gardening',words:['ROOTED','IN STORY.'],format:'Creator content',platform:'YouTube channel',url:'https://www.youtube.com/@epicgardening',description:'Creator content that brings the world of gardening to the screen. Explore the channel featuring Gab’s editing work.'},
    home: {n:'02',title:'Epic Homesteading',words:['BUILT','WITH CARE.'],format:'Creator content',platform:'YouTube channel',url:'https://www.youtube.com/@epichomesteading',description:'Stories of making, growing, and life at home. Explore the homesteading channel featuring Gab’s editing work.'},
    gaming: {n:'03',title:'Hezelya',words:['CUT TO','THE PLAY.'],format:'Gaming edits',platform:'10 Facebook videos',collection:'gaming',description:'Gaming videos edited for Hezelya. Explore ten original uploads from the collection.'},
    process: {n:'04',title:'Inside the timeline',words:['BEHIND','THE CUT.'],format:'Timelapses & FX',platform:'10 archive links',collection:'process',description:'A look at how the edits come together. Explore editing timelapses, visual effects breakdowns, and archive posts.'}
  };
  const byId = id => document.getElementById(id);
  let selected = 'garden';
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.project;
    const p = projects[selected];
    document.querySelectorAll('[data-project]').forEach(tile => {
      const active = tile === button;
      tile.classList.toggle('selected',active);
      tile.setAttribute('aria-pressed',String(active));
    });
    byId('preview-label').textContent = p.title.toUpperCase();
    byId('artboard').className = `artboard ${selected}`;
    byId('artboard').setAttribute('aria-label',`Illustrative artwork for ${p.title}`);
    byId('art-meta').textContent = `${p.format.toUpperCase()} / ${p.collection ? 'FACEBOOK' : 'YOUTUBE'}`;
    byId('art-headline').replaceChildren(document.createTextNode(p.words[0]),document.createElement('br'),document.createTextNode(p.words[1]));
    byId('art-bottom').textContent = p.title.toUpperCase();
    byId('art-index').textContent = `${p.n} / 04`;
    byId('project-number').replaceChildren(document.createTextNode(p.n));
    const total = document.createElement('span');total.textContent='/04';byId('project-number').append(total);
    byId('active-title').textContent = p.title;
    byId('active-description').textContent = p.description;
    byId('active-format').textContent = p.format;
    byId('active-platform').textContent = p.platform;
    byId('active-link').hidden = !!p.collection;
    byId('active-collection').hidden = !p.collection;
    if(p.url) byId('active-link').href = p.url;
    byId('external-note').textContent = p.collection ? 'Choose an original upload from the collection.' : 'Opens the original channel in a new tab.';
    byId('selection-status').textContent = `${p.title} selected`;
  }));
  const dialog = byId('collection-dialog');
  let opener;
  function openCollection(key) {
    const collection = collections[key];
    opener = document.activeElement;
    byId('dialog-title').textContent = collection.title;
    byId('dialog-description').textContent = collection.description;
    const list = byId('collection-links'); list.replaceChildren();
    collection.links.forEach((url,index) => {
      const a = document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';
      a.setAttribute('aria-label',`${collection.label} ${index+1}, opens on Facebook in a new tab`);
      const name=document.createElement('span');name.textContent=`${String(index+1).padStart(2,'0')} / ${collection.label}`;
      const arrow=document.createElement('span');arrow.textContent='Watch on Facebook ↗';arrow.setAttribute('aria-hidden','true');
      a.append(name,arrow);list.append(a);
    });
    dialog.showModal();
  }
  byId('active-collection').addEventListener('click',()=>openCollection(projects[selected].collection));
  byId('close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    const r=dialog.getBoundingClientRect();
    if(event.target===dialog && (event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom))dialog.close();
  });
  dialog.addEventListener('close',()=>opener?.focus());
  const entries = [
    {title:'Epic Gardening',category:'creator',type:'YouTube channel',subtitle:'CREATOR CONTENT',color:'garden',url:projects.garden.url},
    {title:'Epic Homesteading',category:'creator',type:'YouTube channel',subtitle:'CREATOR CONTENT',color:'home',url:projects.home.url},
    ...collections.gaming.links.map((url,i)=>({title:`Hezelya / Gaming edit ${String(i+1).padStart(2,'0')}`,category:'gaming',type:'Facebook video',subtitle:'GAMING EDITING',color:'gaming',url})),
    ...collections.process.links.map((url,i)=>({title:`Inside the timeline / Selection ${String(i+1).padStart(2,'0')}`,category:'process',type:url.includes('/posts/')?'Facebook post':'Facebook video',subtitle:'TIMELAPSES & FX ARCHIVE',color:'process',url}))
  ];
  function renderLibrary(category='all') {
    const list=byId('library-items');list.replaceChildren();
    const visible=entries.filter(e=>category==='all'||e.category===category);
    visible.forEach(e=>{
      const a=document.createElement('a');a.className='library-row';a.href=e.url;a.target='_blank';a.rel='noopener noreferrer';
      a.setAttribute('aria-label',`${e.title}, open original ${e.type} in a new tab`);
      const name=document.createElement('div');name.className='library-name';
      const swatch=document.createElement('span');swatch.className=`library-swatch ${e.color}`;swatch.textContent=e.category==='creator'?'↗':e.category==='gaming'?'▶':'//';swatch.setAttribute('aria-hidden','true');
      const text=document.createElement('div');const title=document.createElement('h3');title.textContent=e.title;
      const sub=document.createElement('small');sub.textContent=e.subtitle;text.append(title,sub);name.append(swatch,text);
      const type=document.createElement('span');type.className='library-type';type.textContent=e.type;
      const action=document.createElement('span');action.className='library-open';action.textContent='VIEW';const arrow=document.createElement('span');arrow.textContent='↗';action.append(arrow);action.setAttribute('aria-hidden','true');
      a.append(name,type,action);list.append(a);
    });
    byId('library-count').textContent=`${visible.length} ITEMS`;
    byId('filter-status').textContent=`Showing ${visible.length} library items`;
  }
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    renderLibrary(button.dataset.filter);
  }));
  renderLibrary();
})();
