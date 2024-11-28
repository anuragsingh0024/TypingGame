const input = document.querySelector('input')
const typingText = document.querySelector('#paragraph')
const time = document.querySelector('.time-left span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const mistake = document.querySelector('.mistake span')

let timer
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

const loadParagraph = ()=>{
  const paragraph= [
    "Technology is a constantly evolving field that impacts every aspect of modern life, from simplifying daily tasks to driving innovation, shaping industries, and transforming the way people connect and communicate globally.",
    "Education unlocks potential by providing knowledge, critical thinking skills, and opportunities for personal and professional growth, fostering equality and equipping individuals to tackle real-world challenges confidently.",
    "The environment is our shared responsibility, requiring sustainable practices like reducing waste, conserving resources, and adopting renewable energy to combat climate change and preserve biodiversity for future generations.",
    "Travel enriches life by exposing individuals to diverse cultures, languages, and traditions, broadening perspectives, fostering personal growth, and nurturing appreciation for the world’s interconnected beauty and complexity.",
    "Health is not merely the absence of illness but a holistic balance of physical, mental, and emotional well-being, achievable through proper nutrition, regular exercise, mindfulness, and supportive social connections.",
    "Art serves as a universal language of creativity, enabling people to express emotions, tell stories, and inspire change while transcending boundaries to build bridges of understanding and shared humanity across cultures.",
    "History provides invaluable lessons about human resilience, innovation, and mistakes, encouraging societies to learn from the past, celebrate achievements, and work collectively toward a brighter, more equitable future."
  ];
 
   typingText.innerHTML = ''
  const randomIndex = Math.floor(Math.random()*paragraph.length)

  for (const char of paragraph[randomIndex]) {
         typingText.innerHTML += `<span>${char}</span>`
  }
  document.addEventListener('keydown',()=>input.focus())
  typingText.querySelectorAll('span')[0].classList.add('active')
  console.log(paragraph[randomIndex])
}

const initTyping = ()=> {
       const char = typingText.querySelectorAll('span');
       const typedChar = input.value.charAt(charIndex);

       if(charIndex < char.length && timeLeft > 0){
               if(!isTyping){
                timer = setInterval(initTimer, 1000);
                isTyping = true;
               }

               if(char[charIndex].textContent === typedChar){
                      char[charIndex].classList.add('correct');
                      
               }
               else{
                mistakes++;
                    char[charIndex].classList.add('incorrect');
               }
               charIndex++;
               char[charIndex].classList.add('active')
       }
}
document.querySelector('.mobile').addEventListener('click', ()=>{
   input.focus();
})
loadParagraph()
const initTimer = ()=> {
       if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
       
       }
       else{
        clearInterval(timer)
        let wpmVal = Math.round(((charIndex - mistakes)/5) /(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
        mistake.innerText = mistakes
        cpm.innerText = charIndex-mistakes
        input.value = ''
       }
}
document.querySelector('button').addEventListener('click',()=>{
  window.location.reload()
})


input.addEventListener('input', initTyping)

