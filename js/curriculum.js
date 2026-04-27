// =====================
// BELTS
// =====================
const BELTS=[
  {id:'intro', name:'Intro Belt',   em:'🧩', color:'#22d3ee', xp:0},
  {id:'white', name:'White Belt',   em:'⬜', color:'#e2e8f0', xp:150},
  {id:'yellow',name:'Yellow Belt',  em:'🟡', color:'#fbbf24', xp:400},
  {id:'orange',name:'Orange Belt',  em:'🟠', color:'#f97316', xp:700},
  {id:'green', name:'Green Belt',   em:'🟢', color:'#22c55e', xp:1100},
  {id:'blue',  name:'Blue Belt',    em:'🔵', color:'#3b82f6', xp:1600},
  {id:'purple',name:'Purple Belt',  em:'🟣', color:'#a855f7', xp:2200},
  {id:'black', name:'Black Belt',   em:'⬛', color:'#94a3b8', xp:3000},
];

// =====================
// LESSONS
// =====================
const LESSONS=[

// ========= INTRO / SCRATCH BRIDGE =========
{id:'s1',belt:'intro',title:'From Scratch to Code!',em:'🧩',xp:40,type:'lesson',steps:[
  {type:'read',icon:'🧩',title:'You already know how to think like a coder!',
   html:'If you have used <strong>Scratch</strong>, great news — you already think like a programmer! Scratch uses <strong>colorful blocks</strong> that snap together. Real code uses <strong>words and symbols</strong> that do the same thing!<br><br><div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div style="background:#1e3a5f;border-radius:10px;padding:14px"><div style="color:#38bdf8;font-size:13px;font-weight:700;margin-bottom:6px">🟦 IN SCRATCH you snap a block:</div><div style="background:#020617;border-radius:8px;padding:10px;font-family:monospace;color:#fbbf24">say "Hello!" for 2 seconds</div></div><div style="background:#14532d33;border-radius:10px;padding:14px"><div style="color:#4ade80;font-size:13px;font-weight:700;margin-bottom:6px">💻 IN HTML you type a tag:</div><div style="background:#020617;border-radius:8px;padding:10px;font-family:monospace;color:#7dd3fc">&lt;p&gt;Hello!&lt;/p&gt;</div></div></div>Both tell the computer what to show — just in different styles!',
   tip:'Scratch blocks and HTML tags are like two different languages that mean the same thing. You already know the ideas — now you will learn the words!'},
  {type:'read',icon:'🏗️',title:'Scratch sprites vs HTML elements',
   html:'In Scratch, you have <strong>sprites</strong> — characters that appear on screen. In HTML, you have <strong>elements</strong> — things that appear on a webpage!<br><br><div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div style="background:#1e3a5f;border-radius:10px;padding:14px;display:flex;gap:14px;align-items:center"><span style="font-size:32px">🐱</span><div><div style="color:#38bdf8;font-weight:700">Scratch Sprite</div><div style="color:var(--text2);font-size:14px">A cat you move around the stage</div></div></div><div style="background:#14532d33;border-radius:10px;padding:14px;display:flex;gap:14px;align-items:center"><span style="font-size:32px">📝</span><div><div style="color:#4ade80;font-weight:700">HTML Element</div><div style="color:var(--text2);font-size:14px">A heading, paragraph, or button on a page</div></div></div></div>Instead of dragging a sprite onto a stage, you <strong>type a tag</strong> and it appears on your page!',
   tip:'Every h1, p, and button you type is like placing a new sprite on the stage — except your stage is a webpage!'},
  {type:'quiz',q:'In Scratch you use blocks. In HTML you use...?',opts:['Sprites','Scripts','Tags','Costumes'],ans:2,exp:'In HTML we use tags! They work just like Scratch blocks — they tell the computer what to show.'},
]},
{id:'s2',belt:'intro',title:'Clicks & Events',em:'🖱️',xp:40,type:'lesson',steps:[
  {type:'read',icon:'🖱️',title:'Scratch "when clicked" = HTML onclick!',
   html:'In Scratch you have seen this block:<br><br><div style="background:#1e3a5f;border-radius:10px;padding:14px;margin:10px 0"><div style="color:#38bdf8;font-size:13px;font-weight:700;margin-bottom:8px">🟦 SCRATCH block:</div><div style="background:#020617;border-radius:8px;padding:12px;font-family:monospace;color:#fbbf24;font-size:15px">🚩 when this sprite clicked<br>&nbsp;&nbsp;say "Ouch!"</div></div><br>In HTML + JavaScript it looks like this:<br><br><div style="background:#14532d33;border-radius:10px;padding:14px;margin:10px 0"><div style="color:#4ade80;font-size:13px;font-weight:700;margin-bottom:8px">💻 HTML + JavaScript:</div><div style="background:#020617;border-radius:8px;padding:12px;font-family:monospace;color:#7dd3fc;font-size:14px">&lt;button onclick="alert(\'Ouch!\')"&gt;<br>&nbsp;&nbsp;Click me!<br>&lt;/button&gt;</div></div>',
   tip:'onclick is just like the "when this sprite clicked" block in Scratch — it listens for a click and then does something!'},
  {type:'code',title:'Make your first clickable button!',
   html:'Try clicking the button in the preview. Then change the message inside <span class="ct">alert(...)</span>!',
   startCode:'<h2>My Clicker!</h2>\n\n<button onclick="alert(\'You clicked me! 🎉\')" style="font-size:20px;padding:12px 24px;background:#3b82f6;color:white;border:none;border-radius:10px;cursor:pointer">\n  Click Me! 🖱️\n</button>',
   hint:'💡 In Scratch this is "when clicked → say Hello!". Here onclick="alert(...)" does the same thing!'},
  {type:'quiz',q:'What is "onclick" similar to in Scratch?',opts:['The green flag','A costume change','When this sprite clicked','A sound block'],ans:2,exp:'onclick is exactly like "when this sprite clicked" in Scratch — both wait for a click and then run some code!'},
]},
{id:'s3',belt:'intro',title:'Colors & Looks',em:'🎨',xp:40,type:'lesson',steps:[
  {type:'read',icon:'🎨',title:'Scratch "set color effect" = CSS color!',
   html:'In Scratch you can change how a sprite looks using the <strong>Looks</strong> blocks. In HTML, you change how things look using <strong>CSS</strong>!<br><br><div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div style="background:#1e3a5f;border-radius:10px;padding:14px"><div style="color:#38bdf8;font-size:13px;font-weight:700;margin-bottom:8px">🟦 SCRATCH Looks block:</div><div style="background:#020617;border-radius:8px;padding:10px;font-family:monospace;color:#fbbf24">set color effect to 50<br>set size to 200%</div></div><div style="background:#14532d33;border-radius:10px;padding:14px"><div style="color:#4ade80;font-size:13px;font-weight:700;margin-bottom:8px">💻 CSS style:</div><div style="background:#020617;border-radius:8px;padding:10px;font-family:monospace;color:#7dd3fc">color: red;<br>font-size: 40px;</div></div></div>Both change how something <strong>looks</strong> — Scratch uses blocks, CSS uses text!',
   tip:'Every Scratch Looks block has a matching CSS property. Scratch "set size" = CSS font-size. Scratch "set color" = CSS color!'},
  {type:'code',title:'Style your page like a Scratch costume!',
   html:'Change the colors and sizes — just like changing a Scratch costume!',
   startCode:'<h1 style="color: purple; font-size: 48px;">I am BIG and Purple! 🟣</h1>\n\n<p style="color: orange; font-size: 24px;">I am Orange text! 🟠</p>\n\n<button onclick="alert(\'Hello from HTML! 🎉\')" style="background:green;color:white;font-size:20px;padding:12px 22px;border:none;border-radius:10px;cursor:pointer">\n  Click for a surprise! 🎁\n</button>',
   hint:'💡 Try changing "purple" to "hotpink" and "48px" to "72px" — like resizing a sprite!'},
  {type:'quiz',q:'In Scratch you use Looks blocks for colors. In HTML/CSS you use...?',opts:['Sprites','onclick','The style attribute','Green flag'],ans:2,exp:'The style attribute in HTML lets you add CSS — which controls colors, sizes, and everything about how your page looks!'},
]},
{id:'sc0',belt:'intro',title:'⭐ Challenge: Scratch → HTML!',em:'🏆',xp:100,type:'challenge',steps:[
  {type:'challenge',icon:'🏆',title:'Recreate a Scratch project in HTML!',
   html:'Imagine you had a Scratch project with a character that says hello when clicked. Now build the same thing in HTML!<br><br><div style="display:flex;flex-direction:column;gap:8px;margin:12px 0"><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ A big colorful title — use <span class="ct">style="color:..."</span></div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ A button the user can click — use <span class="ct">&lt;button&gt;</span></div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ A message that pops up when clicked — use <span class="ct">onclick="alert(...)"</span></div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ At least 2 colors used — use <span class="ct">style="color:..."</span></div></div>',
   startCode:'<!-- Your Scratch project in HTML! -->\n\n',
   checks:['button','onclick','alert','color']},
]},

// ========= WHITE BELT =========
{id:'w1',belt:'white',title:'What is Coding?',em:'🤔',xp:30,type:'lesson',steps:[
  {type:'read',icon:'🧠',title:'Coding is like giving instructions!',
   html:'When you tell a friend how to make a sandwich, you give them instructions step by step. <strong>Coding is the same thing</strong> — but you give instructions to a computer!<br><br>Computers are super fast, but they need very clear instructions to do anything.',
   tip:'Even the most amazing games, apps, and YouTube videos you love are all made with code!'},
  {type:'read',icon:'💻',title:'Three superpowers: HTML, CSS, and JavaScript!',
   html:`<div style="display:flex;flex-direction:column;gap:12px;margin-top:6px">
     <div style="background:#1e3a5f;border-radius:10px;padding:14px;display:flex;gap:12px;align-items:center"><span style="font-size:30px">🏗️</span><div><strong style="color:#7dd3fc">HTML</strong><br><span style="color:var(--text2);font-size:15px">Builds the structure — like the walls of a house</span></div></div>
     <div style="background:#14532d33;border-radius:10px;padding:14px;display:flex;gap:12px;align-items:center"><span style="font-size:30px">🎨</span><div><strong style="color:#4ade80">CSS</strong><br><span style="color:var(--text2);font-size:15px">Adds colors and style — like painting the house</span></div></div>
     <div style="background:#78350f33;border-radius:10px;padding:14px;display:flex;gap:12px;align-items:center"><span style="font-size:30px">⚡</span><div><strong style="color:#fbbf24">JavaScript</strong><br><span style="color:var(--text2);font-size:15px">Makes things move and work — like electricity!</span></div></div>
   </div>`,
   tip:'We will learn all three! We start with HTML — it is the most fun to see!'},
  {type:'quiz',q:'What does HTML do?',opts:['Makes a page colorful','Builds the structure of a webpage','Makes buttons click','Downloads the internet'],ans:1,exp:'HTML builds the structure — like the walls and floors of a building!'},
]},
{id:'w2',belt:'white',title:'Your First HTML Tag',em:'🏷️',xp:50,type:'lesson',steps:[
  {type:'read',icon:'🏷️',title:'Tags are like magic wrappers!',
   html:'In HTML, we use things called <strong>tags</strong>. They look like this:<br><br><div style="text-align:center;font-family:monospace;font-size:22px;background:#020617;color:#7dd3fc;padding:14px;border-radius:10px;margin:12px 0">&lt;h1&gt; Hello! &lt;/h1&gt;</div><br>You always need an <strong>opening tag</strong> <span class="ct">&lt;h1&gt;</span> and a <strong>closing tag</strong> <span class="ct">&lt;/h1&gt;</span> (the one with the slash /).',
   tip:'Think of tags like a sandwich — the opening tag is the top bread, the closing tag is the bottom, and your words are the filling in the middle!'},
  {type:'code',title:'Make a big heading!',
   html:'The <span class="ct">&lt;h1&gt;</span> tag makes a really BIG title. Type in the left box — watch it appear on the right!',
   startCode:'<h1>Hello World!</h1>',
   hint:'💡 Try changing "Hello World!" to your own name!'},
  {type:'quiz',q:'What does the closing tag look like?',opts:['<h1>','</h1>','{h1}','[/h1]'],ans:1,exp:'Closing tags have a "/" before the tag name. This tells the computer where the tag ends!'},
]},
{id:'w3',belt:'white',title:'Text Tags',em:'📝',xp:50,type:'lesson',steps:[
  {type:'read',icon:'📏',title:'Headings come in 6 sizes!',
   html:'HTML has 6 heading tags — from <span class="ct">&lt;h1&gt;</span> (the biggest) to <span class="ct">&lt;h6&gt;</span> (the smallest).<br><br>There is also <span class="ct">&lt;p&gt;</span> for regular paragraph text — like the text in a book!',
   tip:'Use h1 for your main page title. Use h2 for section titles. Use p for normal sentences!'},
  {type:'code',title:'Explore all the text tags!',
   html:'Look at how each tag makes a different size. Try changing the words!',
   startCode:'<h1>I am H1 - The Biggest!</h1>\n<h2>I am H2 - Big</h2>\n<h3>I am H3 - Medium</h3>\n<h4>I am H4 - Small</h4>\n<p>I am a paragraph - normal size!</p>',
   hint:'💡 Change the words inside each tag to describe your favorite things!'},
  {type:'quiz',q:'Which tag makes the BIGGEST text?',opts:['h6','p','h3','h1'],ans:3,exp:'h1 makes the biggest text! The smaller the number, the bigger the heading.'},
]},
{id:'w4',belt:'white',title:'Bold and Italic',em:'✨',xp:50,type:'lesson',steps:[
  {type:'read',icon:'💪',title:'Make words stand out!',
   html:'You can make words <strong>bold</strong> with <span class="ct">&lt;strong&gt;</span> and <em>italic</em> (slanted) with <span class="ct">&lt;em&gt;</span>.<br><br>You can put them INSIDE other tags, like a <span class="ct">&lt;p&gt;</span> tag!',
   tip:'Bold is great for important words. Italic is often used for book titles or special words!'},
  {type:'code',title:'Make words pop!',
   html:'Try making some words bold and some italic!',
   startCode:'<h2>My <strong>Favorite</strong> Things</h2>\n<p>I love <strong>pizza</strong> and <em>coding</em>!</p>\n<p>My hero is <strong><em>my dad</em></strong>.</p>',
   hint:'💡 Change the words inside the tags to YOUR favorite things!'},
  {type:'quiz',q:'Which tag makes text BOLD?',opts:['em','h1','strong','italic'],ans:2,exp:'The strong tag makes text bold! Think of it — strong things stand out boldly!'},
]},
{id:'wc',belt:'white',title:'⭐ Challenge: My First Page!',em:'🏆',xp:120,type:'challenge',steps:[
  {type:'challenge',icon:'🏆',title:'Build YOUR first webpage!',
   html:'Time to use everything you learned! Build a page about yourself.<br><br><strong>Your page must have:</strong><br><br><div style="display:flex;flex-direction:column;gap:8px;margin:12px 0"><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ A big title with your name — use <span class="ct">&lt;h1&gt;</span></div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ A section title like "My Hobbies" — use <span class="ct">&lt;h2&gt;</span></div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ A sentence about yourself — use <span class="ct">&lt;p&gt;</span></div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ One bold word — use <span class="ct">&lt;strong&gt;</span></div></div>',
   startCode:'<!-- Write your code here! -->\n\n',
   checks:['h1','h2','p','strong']},
]},

// ========= YELLOW BELT =========
{id:'y1',belt:'yellow',title:'Making Lists',em:'📋',xp:60,type:'lesson',steps:[
  {type:'read',icon:'📋',title:'Organize things with lists!',
   html:'HTML has two types of lists:<br><br><div style="display:flex;flex-direction:column;gap:10px;margin:10px 0"><div style="background:#1e3a5f;border-radius:8px;padding:12px"><span class="ct">&lt;ul&gt;</span> — Bullet list (things that can be in any order)</div><div style="background:#1e3a5f;border-radius:8px;padding:12px"><span class="ct">&lt;ol&gt;</span> — Numbered list (steps in order)</div></div><br>Each item in a list uses the <span class="ct">&lt;li&gt;</span> tag!',
   tip:'ul means "unordered list" (bullets). ol means "ordered list" (numbers)!'},
  {type:'code',title:'Create your own lists!',
   html:'Look at the two types. Try adding more items!',
   startCode:'<h2>My Favorite Foods</h2>\n<ul>\n  <li>Pizza</li>\n  <li>Tacos</li>\n  <li>Ice Cream</li>\n</ul>\n\n<h2>How to Make a Sandwich</h2>\n<ol>\n  <li>Get two slices of bread</li>\n  <li>Add your filling</li>\n  <li>Put the bread together</li>\n  <li>Eat it!</li>\n</ol>',
   hint:'💡 Change the items to YOUR favorites! Add at least 4 items to the list!'},
  {type:'quiz',q:'Which tag do you use for EACH item in a list?',opts:['list','item','li','bullet'],ans:2,exp:'li stands for "list item". You put li tags inside ul or ol!'},
]},
{id:'y2',belt:'yellow',title:'Adding Colors',em:'🎨',xp:70,type:'lesson',steps:[
  {type:'read',icon:'🎨',title:'Add color directly in HTML!',
   html:'You can add color using the <span class="ct">style</span> attribute inside a tag:<br><br><div style="font-family:monospace;background:#020617;color:#7dd3fc;padding:14px;border-radius:10px;font-size:14px;margin:12px 0">&lt;h1 style="color: red;"&gt;Hello!&lt;/h1&gt;</div><br>You can use color names like <strong>red</strong>, <strong>blue</strong>, <strong>orange</strong>, <strong>green</strong>, <strong>purple</strong>, <strong>pink</strong>, and hundreds more!',
   tip:'Colors can also be written as special codes — like #ff0000 for red! You will learn that in the Orange Belt!'},
  {type:'code',title:'Make a rainbow of text!',
   html:'Try different colors and watch them change!',
   startCode:'<h1 style="color: red;">Red Dev!</h1>\n<h2 style="color: blue;">Blue Dev!</h2>\n<h2 style="color: orange;">Orange Dev!</h2>\n<p style="color: purple;">Purple is totally awesome!</p>',
   hint:'💡 Try: green, pink, gold, teal, coral, violet, hotpink, lime!'},
  {type:'quiz',q:'Where does the style attribute go?',opts:['After the closing tag','Before any tag','Inside the opening tag','After the text'],ans:2,exp:'The style attribute goes INSIDE the opening tag — like h1 with style equals color red.'},
]},
{id:'y3',belt:'yellow',title:'Background Colors',em:'🖼️',xp:70,type:'lesson',steps:[
  {type:'read',icon:'🖼️',title:'Color the background behind text!',
   html:'Use <span class="ct">background-color</span> in the style to color the background:<br><br><div style="font-family:monospace;background:#020617;color:#7dd3fc;padding:14px;border-radius:10px;font-size:14px;margin:12px 0">&lt;p style="background-color: yellow;"&gt;Hi!&lt;/p&gt;</div><br>You can combine <strong>color</strong> and <strong>background-color</strong> together! Separate them with a semicolon <span class="ct">;</span>',
   tip:'Semicolons separate multiple style rules — like commas in a list!'},
  {type:'code',title:'Design colorful boxes!',
   html:'Combine text color and background color to make cool boxes!',
   startCode:'<h1 style="color: white; background-color: navy;">My Cool Page</h1>\n\n<p style="color: darkgreen; background-color: lightgreen;">I love nature! 🌿</p>\n\n<p style="color: white; background-color: purple;">Purple is royal! 👑</p>',
   hint:'💡 Try making a whole rainbow of colored message boxes!'},
  {type:'quiz',q:'What CSS property changes the background color?',opts:['color','fill-color','text-background','background-color'],ans:3,exp:'background-color changes the background! The color property only changes the text color.'},
]},
{id:'yc',belt:'yellow',title:'⭐ Challenge: Rainbow Page!',em:'🌈',xp:150,type:'challenge',steps:[
  {type:'challenge',icon:'🌈',title:'Create a colorful webpage!',
   html:'Show off your color skills! Your page must have:<br><br><div style="display:flex;flex-direction:column;gap:8px;margin:12px 0"><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ A title with a custom text color <span class="ct">color:</span></div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ Something with a background color <span class="ct">background-color:</span></div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ A list of your favorite things <span class="ct">&lt;ul&gt; or &lt;ol&gt;</span></div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ At least 3 different colors used!</div></div>',
   startCode:'<!-- Make it colorful! 🌈 -->\n\n',
   checks:['color','background-color','ul','li']},
]},

// ========= ORANGE BELT =========
{id:'o1',belt:'orange',title:'What is CSS?',em:'💄',xp:60,type:'lesson',steps:[
  {type:'read',icon:'💄',title:'CSS is the stylist of the web!',
   html:'CSS stands for <strong>Cascading Style Sheets</strong>.<br><br>Instead of adding <span class="ct">style=""</span> to every single tag, CSS lets you style ALL headings, ALL paragraphs — at once!<br><br>You write CSS inside a special <span class="ct">&lt;style&gt;</span> tag at the top of your page.',
   tip:'CSS rules look like this: who to style { what to do } — like giving a team uniform to all the players at once!'},
  {type:'code',title:'Your first CSS block!',
   html:'The <span class="ct">&lt;style&gt;</span> tag goes at the top. Inside, write rules that style your whole page!',
   startCode:'<style>\n  h1 {\n    color: purple;\n    font-size: 40px;\n  }\n  p {\n    color: teal;\n    font-size: 20px;\n  }\n</style>\n\n<h1>Hello from CSS!</h1>\n<p>This paragraph is styled by CSS!</p>\n<p>This one is automatically styled too!</p>',
   hint:'💡 Change the colors and font-sizes. What happens if you make font-size: 60px?'},
  {type:'quiz',q:'Where do you write CSS rules?',opts:['Inside p tags','Inside style tags','In a .txt file','After the closing tag'],ans:1,exp:'CSS goes inside style tags! Usually placed at the very top of your page.'},
]},
{id:'o2',belt:'orange',title:'Fonts and Sizes',em:'🔤',xp:70,type:'lesson',steps:[
  {type:'read',icon:'🔤',title:'Control text size and font style!',
   html:`Two important CSS properties:<br><br>
     <div style="display:flex;flex-direction:column;gap:10px;margin:10px 0">
       <div style="background:#1e3a5f;border-radius:10px;padding:14px"><span class="ct">font-size: 24px;</span><br><span style="color:var(--text2);font-size:14px;margin-top:6px;display:block">Makes text bigger or smaller</span></div>
       <div style="background:#1e3a5f;border-radius:10px;padding:14px"><span class="ct">font-family: Arial;</span><br><span style="color:var(--text2);font-size:14px;margin-top:6px;display:block">Changes the letter style / font</span></div>
     </div>`,
   tip:'Popular fonts to try: Arial, Georgia, Courier New, Times New Roman, Verdana!'},
  {type:'code',title:'Experiment with fonts!',
   html:'Change the font sizes and font styles to see what looks cool!',
   startCode:'<style>\n  h1 {\n    font-size: 48px;\n    font-family: Georgia;\n    color: darkblue;\n  }\n  p {\n    font-size: 18px;\n    font-family: Arial;\n    color: #333;\n  }\n</style>\n\n<h1>My Awesome Page!</h1>\n<p>This text uses Arial font.</p>\n<p>CSS makes it look great!</p>',
   hint:'💡 Try font-family: "Courier New" for a cool computer/hacker look!'},
  {type:'quiz',q:'What does font-size: 30px do?',opts:['Makes the text red','Changes the font style','Makes the text 30 pixels big','Adds a border'],ans:2,exp:'font-size controls how BIG the text is! 30px means 30 pixels tall.'},
]},
{id:'o3',belt:'orange',title:'Borders and Padding',em:'📦',xp:70,type:'lesson',steps:[
  {type:'read',icon:'📦',title:'Add borders and breathing room!',
   html:`CSS borders add an outline around elements:<br><br>
     <div style="font-family:monospace;background:#020617;color:#7dd3fc;padding:12px;border-radius:8px;font-size:14px;margin:10px 0">border: 3px solid red;</div>
     <br>Padding adds space INSIDE the border between the border and the words:<br><br>
     <div style="font-family:monospace;background:#020617;color:#7dd3fc;padding:12px;border-radius:8px;font-size:14px;margin:10px 0">padding: 20px;</div>`,
   tip:'Think of padding like bubble wrap inside a box — it cushions the content from the walls!'},
  {type:'code',title:'Build styled boxes!',
   html:'Create colorful boxes with borders and padding!',
   startCode:'<style>\n  .box {\n    border: 3px solid blue;\n    padding: 20px;\n    background-color: lightblue;\n    color: darkblue;\n    font-size: 18px;\n    margin: 10px;\n  }\n</style>\n\n<div class="box">I am box one! 📦</div>\n<div class="box">I am box two! 📦</div>',
   hint:'💡 Try adding "border-radius: 15px;" to make the corners rounded!'},
  {type:'quiz',q:'What does padding do in CSS?',opts:['Adds an outline outside the element','Adds space INSIDE the border','Changes the text color','Makes text bigger'],ans:1,exp:'Padding adds space INSIDE the border — between the content and the edge of the box!'},
]},
{id:'oc',belt:'orange',title:'⭐ Challenge: My Styled Site!',em:'🌟',xp:180,type:'challenge',steps:[
  {type:'challenge',icon:'🌟',title:'Build a beautiful styled page!',
   html:'Show your CSS powers! Your page must have:<br><br><div style="display:flex;flex-direction:column;gap:8px;margin:12px 0"><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ A <span class="ct">&lt;style&gt;</span> block with CSS rules</div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ Custom <span class="ct">font-size</span> used</div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ A <span class="ct">border</span> on something</div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ <span class="ct">padding</span> used somewhere</div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ At least 2 different colors!</div></div>',
   startCode:'<style>\n  /* Your CSS rules go here! */\n\n</style>\n\n<!-- Your HTML goes here! -->\n\n',
   checks:['style','font-size','border','padding']},
]},

// ========= GREEN BELT =========
{id:'g1',belt:'green',title:'What is JavaScript?',em:'⚡',xp:60,type:'lesson',steps:[
  {type:'read',icon:'⚡',title:'JavaScript makes things happen!',
   html:'HTML builds the page. CSS makes it pretty. But JavaScript makes it <strong>do things</strong>!<br><br>With JavaScript you can:<br><br><div style="display:flex;flex-direction:column;gap:8px;margin:10px 0"><div style="background:#78350f33;border-radius:8px;padding:10px 14px">🖱️ React when you click a button</div><div style="background:#78350f33;border-radius:8px;padding:10px 14px">🎮 Build games!</div><div style="background:#78350f33;border-radius:8px;padding:10px 14px">💾 Remember information</div><div style="background:#78350f33;border-radius:8px;padding:10px 14px">🎲 Make random things happen</div></div>',
   tip:'JavaScript is the most popular programming language in the world! Every website uses it!'},
  {type:'code',title:'Your first JavaScript!',
   html:'JavaScript goes inside a <span class="ct">&lt;script&gt;</span> tag. Try clicking the button!',
   startCode:'<h2>My First JavaScript!</h2>\n<button onclick="sayHello()">Click Me! 👋</button>\n\n<script>\nfunction sayHello() {\n  alert("Hello! I am a Little Dev! 💻");\n}\n<\/script>',
   hint:'💡 Change the message inside alert("...") to say something funny!'},
  {type:'quiz',q:'What does JavaScript add to a webpage?',opts:['Structure and layout','Colors and fonts','Interactivity and actions','Images'],ans:2,exp:'JavaScript makes pages interactive — clicks, games, animations — all JavaScript!'},
]},
{id:'g2',belt:'green',title:'Variables',em:'📦',xp:80,type:'lesson',steps:[
  {type:'read',icon:'🗃️',title:'Variables are like labeled boxes!',
   html:'A variable stores information you can use later.<br><br>Imagine a box with a label. You can put something in the box, and get it out whenever you need it!<br><br><div style="font-family:monospace;background:#020617;color:#7dd3fc;padding:14px;border-radius:10px;font-size:14px;margin:12px 0;line-height:2">let name = "Dev";<br>let age = 7;<br>let favoriteColor = "blue";</div>',
   tip:'Use "let" to create a variable. The = sign means "store this value in the box"!'},
  {type:'code',title:'Create your own variables!',
   html:'Make variables and then use them in a message!',
   startCode:'<h2 id="msg">Click the button!</h2>\n<button onclick="showInfo()">Show My Info! 🚀</button>\n\n<script>\nfunction showInfo() {\n  let myName = "Dev";\n  let myAge = 7;\n  let myFavFood = "pizza";\n\n  let message = "Hi! My name is " + myName\n    + ". I am " + myAge\n    + " years old and I love " + myFavFood + "! 🍕";\n\n  document.getElementById("msg").innerText = message;\n}\n<\/script>',
   hint:'💡 Change myName, myAge, and myFavFood to YOUR info!'},
  {type:'quiz',q:'What keyword do you use to create a variable?',opts:['make','var','create','let'],ans:3,exp:'"let" creates a new variable! Example: let score = 0;'},
]},
{id:'g3',belt:'green',title:'If / Else - Decisions!',em:'🤔',xp:90,type:'lesson',steps:[
  {type:'read',icon:'🔀',title:'Computers can make decisions!',
   html:'An <strong>if statement</strong> lets your code choose what to do:<br><br><div style="font-family:monospace;background:#020617;color:#7dd3fc;padding:14px;border-radius:10px;font-size:13px;line-height:2;margin:12px 0">if (score > 10) {<br>&nbsp;&nbsp;// do this when score is over 10<br>} else {<br>&nbsp;&nbsp;// do this when score is NOT over 10<br>}</div>',
   tip:'if/else is like a fork in the road — the computer goes one way or the other depending on what is true!'},
  {type:'code',title:'Make a decision machine!',
   html:'This code checks if a number is big or small. Try entering different numbers!',
   startCode:'<h2 id="result">Enter a number!</h2>\n<input type="number" id="num" placeholder="Type a number" style="font-size:20px;padding:8px;width:180px;border-radius:8px;border:2px solid #ccc">\n<button onclick="check()" style="font-size:18px;padding:8px 16px;border-radius:8px;margin-left:8px;cursor:pointer">Check!</button>\n\n<script>\nfunction check() {\n  let num = parseInt(document.getElementById("num").value);\n\n  if (num > 50) {\n    document.getElementById("result").innerText = num + " is a BIG number! 🐘";\n  } else {\n    document.getElementById("result").innerText = num + " is a small number! 🐭";\n  }\n}\n<\/script>',
   hint:'💡 Try changing 50 to a different number. What happens when you guess exactly 50?'},
  {type:'quiz',q:'What does "else" do?',opts:['Stops the whole program','Runs when the if is NOT true','Makes text bold','Adds a color'],ans:1,exp:'"else" is the backup plan — it runs when the "if" condition is false!'},
]},
{id:'gc',belt:'green',title:'⭐ Challenge: Guess My Number!',em:'🎲',xp:200,type:'challenge',steps:[
  {type:'challenge',icon:'🎲',title:'Build a number guessing game!',
   html:'Make a game where the player guesses a secret number! Your game must have:<br><br><div style="display:flex;flex-direction:column;gap:8px;margin:12px 0"><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ A secret number in a variable <span class="ct">let secretNumber = ...</span></div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ An input box for the player\'s guess</div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ An <span class="ct">if/else</span> to check if they got it right</div><div style="background:#14532d33;border-radius:8px;padding:10px 14px">✅ A message showing if they won or lost!</div></div>',
   startCode:`<h1>Guess My Number! 🎲</h1>\n<p>I am thinking of a number between 1 and 10...</p>\n\n<input type="number" id="guess" placeholder="Your guess" style="font-size:18px;padding:8px;width:160px;border-radius:8px;border:2px solid #ccc">\n<button onclick="checkGuess()" style="font-size:18px;padding:8px 16px;border-radius:8px;margin-left:8px;cursor:pointer">Guess!</button>\n<p id="result" style="font-size:22px;margin-top:14px"></p>\n\n<script>\nlet secretNumber = 7;\n\nfunction checkGuess() {\n  let myGuess = parseInt(document.getElementById("guess").value);\n\n  if (myGuess === secretNumber) {\n    document.getElementById("result").innerText = "🎉 YOU WIN! Amazing!";\n  } else {\n    document.getElementById("result").innerText = "❌ Wrong! Try again!";\n  }\n}\n<\/script>`,
   checks:['let','if','else','input']},
]},
];

// =====================
// CHALLENGE RUN EPISODES
// =====================
// Harder versions of every lesson: no read steps, no hints, no tips.
// Quiz distractors are more plausible. Challenge checklists are stricter.
// XP is 2× the original lesson.

const CR_EPISODES = [

// ========= EPISODE 1: INTRO BELT =========
{id:'ep1', name:'Intro Belt', beltId:'intro', em:'🧩', lessons:[

  {id:'cr-s1', title:'From Scratch to Code!', em:'🧩', xp:80, steps:[
    {type:'quiz',
     q:'Which HTML concept works like a Scratch sprite — something that appears on the page?',
     opts:['A variable','An attribute','An element','A script'],
     ans:2,
     exp:'HTML elements are like sprites — they appear on the page and can be styled!'},
  ]},

  {id:'cr-s2', title:'Clicks & Events', em:'🖱️', xp:80, steps:[
    {type:'quiz',
     q:'Which code correctly shows a pop-up message when a button is clicked?',
     opts:['onclick="show(\'Hi\')"','onclick="popup(\'Hi\')"','onclick="alert(\'Hi\')"','onclick="message(\'Hi\')"'],
     ans:2,
     exp:'alert() is the built-in function that shows a pop-up — onclick fires it on click!'},
    {type:'challenge', icon:'🖱️', title:'Speed Challenge: Clickable Button!',
     html:'Build a button that pops up a message. No hints — you know this!',
     startCode:'',
     checks:['button','onclick','alert','style']},
  ]},

  {id:'cr-s3', title:'Colors & Looks', em:'🎨', xp:80, steps:[
    {type:'quiz',
     q:'What is the correct syntax to set text color to red inside an HTML tag?',
     opts:['color="red"','<color: red>','style="color: red;"','text-color="red"'],
     ans:2,
     exp:'style="color: red;" is how inline CSS works — goes inside the opening tag!'},
    {type:'challenge', icon:'🎨', title:'Speed Challenge: Colorful Page!',
     html:'Build a page with colored text and a colored background. Go!',
     startCode:'',
     checks:['color','style','background-color',';']},
  ]},

  {id:'cr-sc0', title:'⭐ Challenge: Scratch → HTML!', em:'🏆', xp:200, steps:[
    {type:'challenge', icon:'🏆', title:'CHALLENGE RUN: Scratch → HTML (Strict!)',
     html:'Build a full Scratch-style project in HTML. Must include ALL of these:',
     startCode:'',
     checks:['button','onclick','alert','color','h1','style']},
  ]},

]},

// ========= EPISODE 2: WHITE BELT =========
{id:'ep2', name:'White Belt', beltId:'white', em:'⬜', lessons:[

  {id:'cr-w1', title:'What is Coding?', em:'🤔', xp:60, steps:[
    {type:'quiz',
     q:'What are the THREE languages used to build websites?',
     opts:['Python, Java, C++','HTML, CSS, JavaScript','Scratch, HTML, Python','CSS, XML, React'],
     ans:1,
     exp:'HTML builds structure, CSS styles it, JavaScript makes it interactive!'},
  ]},

  {id:'cr-w2', title:'Your First HTML Tag', em:'🏷️', xp:100, steps:[
    {type:'quiz',
     q:'What makes a closing tag different from an opening tag?',
     opts:['It is written in CAPS','It uses [ ] instead of < >','It has a / before the tag name','It has a dot after the name'],
     ans:2,
     exp:'Closing tags have a forward slash: </h1> — this tells the browser where the tag ends!'},
    {type:'challenge', icon:'🏷️', title:'Speed Challenge: Tags!',
     html:'Write a heading and a paragraph. Both must have proper closing tags.',
     startCode:'',
     checks:['h1','p','</h1>','</p>']},
  ]},

  {id:'cr-w3', title:'Text Tags', em:'📝', xp:100, steps:[
    {type:'quiz',
     q:'Which heading tag makes the SMALLEST text?',
     opts:['h1','h3','h6','p'],
     ans:2,
     exp:'h6 is the smallest heading — the HIGHER the number, the SMALLER the text!'},
    {type:'challenge', icon:'📝', title:'Speed Challenge: Heading Hierarchy!',
     html:'Use h1, h2, h3 AND a paragraph tag correctly.',
     startCode:'',
     checks:['h1','h2','h3','p']},
  ]},

  {id:'cr-w4', title:'Bold and Italic', em:'✨', xp:100, steps:[
    {type:'quiz',
     q:'How do you make text that is BOTH bold and italic at the same time?',
     opts:['Use the <bolditalic> tag','Nest <strong> inside <em>','Use style="font: bold italic"','Use the <b-i> tag'],
     ans:1,
     exp:'Nest the tags: <strong><em>text</em></strong> — one wraps around the other!'},
    {type:'challenge', icon:'✨', title:'Speed Challenge: Bold & Italic!',
     html:'Write a sentence using both bold and italic text inside a paragraph.',
     startCode:'',
     checks:['strong','em','p']},
  ]},

  {id:'cr-wc', title:'⭐ Challenge: My First Page!', em:'🏆', xp:240, steps:[
    {type:'challenge', icon:'🏆', title:'CHALLENGE RUN: First Page (Strict!)',
     html:'Build a full personal page. All 6 requirements must be present:',
     startCode:'',
     checks:['h1','h2','p','strong','em','</h1>']},
  ]},

]},

// ========= EPISODE 3: YELLOW BELT =========
{id:'ep3', name:'Yellow Belt', beltId:'yellow', em:'🟡', lessons:[

  {id:'cr-y1', title:'Making Lists', em:'📋', xp:120, steps:[
    {type:'quiz',
     q:'What tag wraps EACH individual item inside both ul and ol lists?',
     opts:['<item>','<list>','<li>','<bullet>'],
     ans:2,
     exp:'<li> stands for list item — every single item in a list needs this tag!'},
    {type:'challenge', icon:'📋', title:'Speed Challenge: Two Lists!',
     html:'Build one bullet list (ul) AND one numbered list (ol), each with items.',
     startCode:'',
     checks:['ul','ol','<li>','</li>']},
  ]},

  {id:'cr-y2', title:'Adding Colors', em:'🎨', xp:140, steps:[
    {type:'quiz',
     q:'Where exactly does the style attribute go in an HTML tag?',
     opts:['Before the < symbol','After the closing >','After the closing tag','Inside the opening tag, before the >'],
     ans:3,
     exp:'The style attribute goes INSIDE the opening tag: <h1 style="color:red">!'},
    {type:'challenge', icon:'🎨', title:'Speed Challenge: Colored Text!',
     html:'Give at least 3 different elements different text colors using the style attribute.',
     startCode:'',
     checks:['color','style','h1','p',';']},
  ]},

  {id:'cr-y3', title:'Background Colors', em:'🖼️', xp:140, steps:[
    {type:'quiz',
     q:'What character separates two CSS properties inside one style attribute?',
     opts:['A comma ,','A colon :','A semicolon ;','A slash /'],
     ans:2,
     exp:'Semicolons separate CSS rules: style="color: red; background-color: blue;"'},
    {type:'challenge', icon:'🖼️', title:'Speed Challenge: Colorful Boxes!',
     html:'Create elements with BOTH text color AND background-color applied.',
     startCode:'',
     checks:['background-color','color','style',';']},
  ]},

  {id:'cr-yc', title:'⭐ Challenge: Rainbow Page!', em:'🌈', xp:300, steps:[
    {type:'challenge', icon:'🌈', title:'CHALLENGE RUN: Rainbow Page (Strict!)',
     html:'Build a full rainbow page. All 6 requirements must be present:',
     startCode:'',
     checks:['color','background-color','ul','ol','li','style']},
  ]},

]},

// ========= EPISODE 4: ORANGE BELT =========
{id:'ep4', name:'Orange Belt', beltId:'orange', em:'🟠', lessons:[

  {id:'cr-o1', title:'What is CSS?', em:'💄', xp:120, steps:[
    {type:'quiz',
     q:'Which HTML tag contains CSS rules that style the whole page?',
     opts:['<link>','<head>','<style>','<script>'],
     ans:2,
     exp:'CSS rules go inside <style> tags — usually at the top of your page!'},
    {type:'challenge', icon:'💄', title:'Speed Challenge: CSS Block!',
     html:'Write a <style> block that styles h1 with a color AND font-size.',
     startCode:'',
     checks:['<style>','color','font-size','{','}']},
  ]},

  {id:'cr-o2', title:'Fonts and Sizes', em:'🔤', xp:140, steps:[
    {type:'quiz',
     q:'Which CSS property changes the typeface / letter shape of text?',
     opts:['font-size','font-weight','font-family','font-color'],
     ans:2,
     exp:'font-family changes the typeface! font-color does NOT exist — use color instead.'},
    {type:'challenge', icon:'🔤', title:'Speed Challenge: Font Styling!',
     html:'Write CSS that uses both font-size AND font-family on an element.',
     startCode:'',
     checks:['font-size','font-family','<style>','px']},
  ]},

  {id:'cr-o3', title:'Borders and Padding', em:'📦', xp:140, steps:[
    {type:'quiz',
     q:'What does padding do in CSS?',
     opts:['Adds an outline OUTSIDE the element','Adds space INSIDE the element, between content and border','Changes the border color','Pushes the element down the page'],
     ans:1,
     exp:'Padding is space INSIDE the box — between the text and the border!'},
    {type:'challenge', icon:'📦', title:'Speed Challenge: Styled Box!',
     html:'Create an element with a border, padding, AND background-color all applied.',
     startCode:'',
     checks:['border','padding','background-color','px']},
  ]},

  {id:'cr-oc', title:'⭐ Challenge: My Styled Site!', em:'🌟', xp:360, steps:[
    {type:'challenge', icon:'🌟', title:'CHALLENGE RUN: Styled Site (Strict!)',
     html:'Build a fully styled page. All 6 requirements must be present:',
     startCode:'',
     checks:['<style>','font-size','border','padding','font-family','background-color']},
  ]},

]},

// ========= EPISODE 5: GREEN BELT =========
{id:'ep5', name:'Green Belt', beltId:'green', em:'🟢', lessons:[

  {id:'cr-g1', title:'What is JavaScript?', em:'⚡', xp:120, steps:[
    {type:'quiz',
     q:'Which HTML tag is used to contain JavaScript code?',
     opts:['<code>','<js>','<script>','<run>'],
     ans:2,
     exp:'JavaScript goes inside <script> tags — placed in your HTML page!'},
    {type:'challenge', icon:'⚡', title:'Speed Challenge: First JS!',
     html:'Write a script with a function that uses alert() to show a message.',
     startCode:'',
     checks:['<script>','function','alert','()']},
  ]},

  {id:'cr-g2', title:'Variables', em:'📦', xp:160, steps:[
    {type:'quiz',
     q:'In the code:  let score = 0;  — what does the = sign do?',
     opts:['Checks if score equals 0','Stores the value 0 into the variable score','Compares two values','Creates a condition'],
     ans:1,
     exp:'= is the assignment operator — it STORES a value. To CHECK equality, use ===!'},
    {type:'challenge', icon:'📦', title:'Speed Challenge: Variables!',
     html:'Write a function that uses at least 2 variables and updates the page text.',
     startCode:'',
     checks:['let','function','document.getElementById','innerText']},
  ]},

  {id:'cr-g3', title:'If / Else', em:'🤔', xp:180, steps:[
    {type:'quiz',
     q:'In:  if (x > 10) { ... } else { ... }  — when does the else block run?',
     opts:['When x is greater than 10','When x equals exactly 10','When x is NOT greater than 10','Always, every time'],
     ans:2,
     exp:'else is the fallback — it runs whenever the if condition is FALSE!'},
    {type:'challenge', icon:'🤔', title:'Speed Challenge: Decision Machine!',
     html:'Write a function with if/else that checks a condition and shows different text.',
     startCode:'',
     checks:['if','else','function','let','>']},
  ]},

  {id:'cr-gc', title:'⭐ Challenge: Guess My Number!', em:'🎲', xp:400, steps:[
    {type:'challenge', icon:'🎲', title:'CHALLENGE RUN: Guess My Number (Strict!)',
     html:'Build the complete number guessing game. All 7 requirements must be present:',
     startCode:'',
     checks:['let','if','else','input','function','===','parseInt']},
  ]},

]},

];
