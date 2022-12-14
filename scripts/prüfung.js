//questions.json
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
async function getQuestions() {
    let response = await fetch('/data/questions.json');
    let quest = await response.json();
    //console.log(quest);

    const grundstoff = [];
    const zusatzstoff= [];
    for (const [k, v] of Object.entries(quest)) {
        const sectionName = k.charAt(0);
        if(sectionName=="1"){
            grundstoff.push(v);
        }
        if(sectionName=="2"){
            zusatzstoff.push(v);
        }
    }
          
    grundstoff_selected=getRandom(grundstoff,20);
    zusatzstoff_selected=getRandom(zusatzstoff,10);
    const fragen = grundstoff_selected.concat(zusatzstoff_selected); 
    let questions_2 = fragen
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    return questions_2
    }
async function getQuiz(){
    points=[]
    right_answers=[]
    let quest = await getQuestions();
    values=[]
     for (const [k, v] of Object.entries(quest)){
        //write question and answers to html-array
        values.push(v)
        //write right answers to quiz-array
        right_answers.push(v.right_answers);
        //write points to global points
        points.push(v.points);
     }
    for (let id = 1; id < 31; id++) {
        
        source=""
        if(values[id-1].src.endsWith(".mp4")){source='<br><video width="500" height="300" controls><source src="'+ values[id-1].src+'" type="video/mp4"></video>'}
        if(values[id-1].src.endsWith(".png")){source='<br><img src="'+ values[id-1].src+'" width="500" height="300">'}

        document.getElementById('frage_'+ id.toString()).textContent = values[id-1].question;;
        document.getElementById('punkte_'+ id.toString()).textContent = values[id-1].points;;
        document.getElementById('punkte_'+ id.toString()).innerHTML += source;;
        text=""
     
        for (const [k, v] of Object.entries(values[id-1].answers)){
            text+='<li><label><input type="checkbox" name="q'+id+'" value="'+k+'">'+v+'</label></li>'
            }
        document.getElementById("antworten_"+ id.toString()).innerHTML =text
    }
    return right_answers
} 


/**
* Try this example at https://alpsquid.github.io/quizlib
*/

/** Key value pairs using quiz element IDs and Quiz Objects.
 * For example: quizzes['quiz-1'] = [Quiz Object]
 */
 var quizzes = {};
 var points=[];

 /**
  * Callback for answer buttons. The implementation for this will vary depending on your requirements.
  * In this example, the same function is being used for every quiz so we pass the ID of the quiz element and
  * retrieve the respective quiz instance from the quiz map we created in the window.onload function.
  */
 function showResults(quizID) {
     // Retrieve the quiz instance for this quiz element from the map.
     var activeQuiz = quizzes[quizID];
     zwei_f??nfer=0 //set to 1 if 2 or more 5 point questions have been answered wrong
     // Check answers and continue if all questions have been answered
     if (activeQuiz.checkAnswers()) {
        r= activeQuiz.result.results
        error=0
        for (i=0; i < r.length; i++){
            if (r[i]==0){error+=points[i]}
        } 
        console.log(error)

         var quizScorePercent = activeQuiz.result.scorePercentFormatted; // The unformatted percentage is a decimal in range 0 - 1
         var quizResultElement = document.getElementById('quiz-result');
         // Move the quiz result element to the active quiz, placing it after the quiz title.
         var quizElement = document.getElementById(quizID);
         quizElement.insertBefore(quizResultElement, quizElement.children[1]);
 
         // Show the result element and add result values.
         // Change background colour of results div according to score percent
         quizResultElement.style.display = 'block';
         document.getElementById('quiz-score').innerHTML = error.toString();
         if (error>10){
            document.getElementById('quiz-result-text').innerHTML="nicht bestanden.";
            quizResultElement.style.backgroundColor = '#f44336';}
         if(error == 10 && zwei_f??nfer==1){
            document.getElementById('quiz-result-text').innerHTML="nicht bestanden, da zwei 5 Punkte fragen falsch beantwortet wurden.";
            quizResultElement.style.backgroundColor = '#f44336';;}
         if(error<=10 && zwei_f??nfer){
            document.getElementById('quiz-result-text').innerHTML="bestanden.";
            quizResultElement.style.backgroundColor = '#4caf50';}
         
 
         
         
         /*
         if (quizScorePercent >= 75) quizResultElement.style.backgroundColor = '#4caf50';
         else if (quizScorePercent >= 50) quizResultElement.style.backgroundColor = '#ffc107';
         else if (quizScorePercent >= 25) quizResultElement.style.backgroundColor = '#ff9800';
         else if (quizScorePercent >= 0) quizResultElement.style.backgroundColor = '#f44336';
         */
         // Highlight questions according to whether they were correctly answered. The callback allows us to highlight/show the correct answer
         activeQuiz.highlightResults(handleAnswers);
     }
 }
 
 /** Callback for Quiz.highlightResults. Highlights the correct answers of incorrectly answered questions 
  * Parameters are: the quiz object, the question element, question number, correctly answered flag
  */
 function handleAnswers(quiz, question, no, correct) {
     if (!correct) {
         var answers = question.getElementsByTagName('input');
         for (var i = 0; i < answers.length; i++) {
             if (answers[i].type === "checkbox" || answers[i].type === "radio"){ 
                 // If the current input element is part of the correct answer, highlight it
                 if (quiz.answers[no].indexOf(answers[i].value) > -1) {
                     answers[i].parentNode.classList.add(Quiz.Classes.CORRECT);
                 }
             } else {
                 // If the input is anything other than a checkbox or radio button, show the correct answer next to the element
                 var correctAnswer = document.createElement('span');
                 correctAnswer.classList.add(Quiz.Classes.CORRECT);
                 correctAnswer.classList.add(Quiz.Classes.TEMP); // quiz.checkAnswers will automatically remove elements with the temp class
                 correctAnswer.innerHTML = quiz.answers[no];
                 correctAnswer.style.marginLeft = '10px';
                 answers[i].parentNode.insertBefore(correctAnswer, answers[i].nextSibling);
             }
         }
     }
 }

 //Some code that takes the questions array and fills the Quiz questions in the html
 
 window.onload = async function() {
    let right_answers = await getQuiz();
     // Create quiz instances for each quiz and add them to the quizzes map.
     // The key is the ID of the quiz element, same as what we pass to the Quiz object as the first argument.
     //quizzes['1.1.01-003'] = new Quiz('1.1.01-003', [['a', 'b']]);
     //right_answers=[] nested list of arrays with all right answers from above
     console.log(right_answers)
     quizzes['pr??fung'] = new Quiz('pr??fung', right_answers); 
    //await
   //document.getElementById('frage_01').textContent = 'Hello \nlcr World!';;
    
 };
 
 