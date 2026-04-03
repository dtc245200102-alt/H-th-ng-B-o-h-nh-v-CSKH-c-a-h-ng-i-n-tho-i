const express = require("express");
const app = express();

app.use(express.json());

let users = [];
let warranties = [];
let ratings = [];

// ================= AUTH =================
app.post("/register", (req,res)=>{
    users.push(req.body);
    res.json("Đăng ký thành công");
});

app.post("/login",(req,res)=>{
    const user = users.find(u=>u.email==req.body.email && u.password==req.body.password);
    if(!user) return res.send("Sai tài khoản");
    res.json(user);
});

// ================= WARRANTY =================
app.post("/warranty",(req,res)=>{
    warranties.push({...req.body, status:"Đang xử lý"});
    res.json("Đã gửi bảo hành");
});

app.get("/history/:email",(req,res)=>{
    const data = warranties.filter(w=>w.email==req.params.email);
    res.json(data);
});

// ================= RATING =================
app.post("/rating",(req,res)=>{
    ratings.push(req.body);
    res.json("Đã đánh giá");
});

// ================= FRONTEND =================
app.get("/",(req,res)=>{
    res.send(`
    <h1>Khánh Duy Shop</h1>

    <h2>Đăng ký</h2>
    <input id="name" placeholder="Tên">
    <input id="email" placeholder="Email">
    <input id="pass" placeholder="Mật khẩu">
    <button onclick="register()">Đăng ký</button>

    <h2>Đăng nhập</h2>
    <input id="email2" placeholder="Email">
    <input id="pass2" placeholder="Mật khẩu">
    <button onclick="login()">Login</button>

    <h2>Gửi bảo hành</h2>
    <input id="code" placeholder="Mã bảo hành">
    <input id="issue" placeholder="Lỗi">
    <button onclick="send()">Gửi</button>

    <h2>Lịch sử</h2>
    <button onclick="history()">Xem</button>
    <div id="his"></div>

    <h2>Chat CSKH</h2>
    <input id="chat">
    <button onclick="chat()">Gửi</button>
    <div id="chatBox"></div>

    <h2>Đánh giá</h2>
    <input id="rate" placeholder="Số sao">
    <button onclick="rating()">Gửi</button>

<script>
let currentUser="";

async function register(){
    await fetch('/register',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            name:name.value,
            email:email.value,
            password:pass.value
        })
    });
    alert("OK");
}

async function login(){
    let res = await fetch('/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            email:email2.value,
            password:pass2.value
        })
    });
    let data = await res.json();
    currentUser=data.email;
    alert("Đăng nhập thành công");
}

async function send(){
    await fetch('/warranty',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            email:currentUser,
            code:code.value,
            issue:issue.value
        })
    });
    alert("Đã gửi");
}

async function history(){
    let res = await fetch('/history/'+currentUser);
    let data = await res.json();
    his.innerHTML = JSON.stringify(data);
}

function chat(){
    chatBox.innerHTML += "Bạn: "+chat.value+"<br>";
    setTimeout(()=>{
        chatBox.innerHTML += "CSKH: OK bạn nhé<br>";
    },1000);
}

async function rating(){
    await fetch('/rating',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            email:currentUser,
            stars:rate.value
        })
    });
    alert("Cảm ơn bạn!");
}
</script>
    `);
});

app.listen(3000, ()=>console.log("http://localhost:3000"));
