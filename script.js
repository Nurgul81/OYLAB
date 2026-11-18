const $ = id => document.getElementById(id);
let selectedRole = "student";
const loginModal = $("loginModal"), testModal = $("testModal"), dashboard = $("dashboard");
function show(el){el.classList.add("show");el.setAttribute("aria-hidden","false")}
function hide(el){el.classList.remove("show");el.setAttribute("aria-hidden","true")}
["openLogin","heroLogin"].forEach(id => $(id).addEventListener("click",()=>show(loginModal)));
$("closeLogin").onclick=()=>hide(loginModal);
$("startTest").onclick=()=>show(testModal);
$("closeTest").onclick=()=>hide(testModal);
document.querySelectorAll(".role").forEach(btn=>btn.onclick=()=>{
  selectedRole=btn.dataset.role;
  document.querySelectorAll(".role").forEach(x=>x.classList.toggle("active",x===btn));
});
$("loginSubmit").onclick=()=>{
  const user=$("username").value.trim();
  const pass=$("password").value;
  if(!user||!pass){alert("Логин мен құпиясөзді енгізіңіз.");return;}
  hide(loginModal);
  $("dashTitle").textContent=selectedRole==="teacher"?"Мұғалім кабинеті":"Оқушы кабинеті";
  $("dashWelcome").textContent=`Қош келдіңіз, ${user}! Бұл — OYLAB демонстрациялық кабинеті.`;
  $("dashContent").innerHTML=selectedRole==="teacher"
    ? '<div class="dash-item"><b>11 «Ә»</b><span>Сынып</span></div><div class="dash-item"><b>28</b><span>Оқушы саны</span></div><div class="dash-item"><b>—</b><span>Тест тапсырған</span></div><div class="dash-item"><b>—</b><span>Әлі тапсырмаған</span></div>'
    : '<div class="dash-item"><b>11 «Ә»</b><span>Сынып</span></div><div class="dash-item"><b>0</b><span>Орындалған тест</span></div><div class="dash-item"><b>—</b><span>Орташа нәтиже</span></div><div class="dash-item"><b>0</b><span>Қайталау керек</span></div>';
  show(dashboard);
};
$("closeDash").onclick=()=>hide(dashboard);
$("logout").onclick=()=>hide(dashboard);
$("checkAnswer").onclick=()=>{
  const chosen=document.querySelector('input[name="answer"]:checked');
  const box=$("feedback");
  if(!chosen){box.textContent="Алдымен бір жауапты таңдаңыз.";box.style.color="#9a6a18";return;}
  if(chosen.value==="b"){
    box.textContent="Дұрыс жауап! Мәтінде оқу сауаттылығы ақпаратты талдау, автор ойын анықтау және қорытынды жасаумен байланыстырылған.";
    box.style.color="#26734d";
  }else{
    box.textContent="Бұл жауап дұрыс емес. Мәтіндегі негізгі ойды қайта оқып, ақпаратты талдау мен қорытынды жасауға назар аударыңыз.";
    box.style.color="#a34b43";
  }
};
[loginModal,testModal,dashboard].forEach(el=>el.addEventListener("click",e=>{if(e.target===el)hide(el)}));
