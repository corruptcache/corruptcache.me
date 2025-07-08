const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const characters = "日一国会人年大十二本中長出三同時政事自行社見月分議後前民生連五発間対上部東者党地合市業内相方四定今回新場金員九入選立開手米力学問高代明実円関決子動京全目表戦経通外最言氏現理調体化田当八六約主題下首法 valde Sistit アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン!@#$%^&*(){}_-=+";
const charArray = characters.split('');
const fontSize = 16;
let columns = canvas.width / fontSize;
let drops = [];
for (let x = 0; x < columns; x++) drops[x] = 1;

function draw() {
  ctx.fillStyle = 'rgba(15, 15, 15, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#a66bff';
  ctx.font = fontSize + 'px "Share Tech Mono", monospace';
  for (let i = 0; i < drops.length; i++) {
    const text = charArray[Math.floor(Math.random() * charArray.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(draw, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;
});
