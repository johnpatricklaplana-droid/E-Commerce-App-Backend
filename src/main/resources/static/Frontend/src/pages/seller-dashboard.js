const canvas = document.querySelector("canvas");

const c = canvas.getContext('2d');

const canvasWidth = canvas.getBoundingClientRect().width;
const canvasHeight = canvas.getBoundingClientRect().height;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// c.fillStyle = 'rgba(226, 134, 28, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillRect(200, 200, 100, 100);
// c.fillRect(300, 300, 100, 100);
// c.fillRect(400, 400, 100, 100);

c.font = "12px Arial";

c.beginPath();
c.moveTo(47, 40)
c.lineTo(638, 40);
c.fillText("$400", 12, 44);

c.moveTo(47, 80);
c.lineTo(638, 80);
c.fillText("$400", 12, 84);

c.moveTo(47, 120);
c.lineTo(638, 120);
c.fillText("$400", 12, 124);

c.moveTo(47, 160);
c.lineTo(638, 160);
c.fillText("$400", 12, 164);

c.lineWidth = 1;
c.stroke();

let x = 50;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

for (let i = 1; i <= 12; i++) {
    console.log(months[i - 1]);
    c.fillText(months[i - 1], x * i, 200 - 15);
}

// for(let i = 0; i < 10000; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.strokeStyle = 'rgba(34, 216, 18, 0.5)';
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, true);
//     c.stroke();
// }
