import './App.css';
import { useEffect, useState } from 'react';
//this component calculates the the chellenge bucket to be used
//based on the user answers to this quiz.

//this will be a component that generates an array of answers on
//the client side and gets the resulting bucket and sends it to 
// the server to be part of the user object.

function App() {
  const [questionObject, setQuestionObject] = useState({});
  const [answersArray, setAnswersArray] = useState([]);
  const [toNextQuestion, seToNextQuestion] = useState(false);

  useEffect(()=>{
    let qObj = {
      questionItself: 1,
      questionArray:[
      {
        qName: 'question 1',
        selectStatus: false
      },{
        qName: 'question 2',
        selectStatus: false
      },{
        qName: 'question 3',
        selectStatus: false
      },{
        qName: 'question 4',
        selectStatus: false
      },
    ]};
    
    setQuestionObject({...qObj});
  }, []);

  const selectAnswerHandler = (i) => {
    let qObj = questionObject;
    let qArr = questionObject.questionArray;
    let aArr = answersArray;

    qArr[i].selectStatus = true;

    let x = 0;

    while(x < qArr.length){
      if(x !== i){
        qArr[x].selectStatus = false;
      }

      x++;
    }

    qObj.questionArray = qArr;

    let aObj = {
      questionItself: qObj.questionItself,
      answer: i + 1
    };

    aArr[qObj.questionItself - 1] = aObj;

    setAnswersArray([...aArr]);
    setQuestionObject({...qObj});
    seToNextQuestion(true);
  } 

  const nextHandler = () => {
    let qObj = questionObject;
    let qArr = questionObject.questionArray;

    qObj.questionItself++;

    let x = 0;

    while(x < qArr.length){
      qArr[x].selectStatus = false;
      x++;
    }

    setQuestionObject({...qObj});
    seToNextQuestion(false);
  }

  const backHandler = () => {
    let qObj = questionObject;
    let qArr = questionObject.questionArray;
    let aArr = answersArray;

    qObj.questionItself--;

    console.log(qObj.questionItself - 1,aArr[qObj.questionItself - 1].answer);

    let gotNum = aArr[qObj.questionItself - 1].answer - 1;

    qArr[gotNum].selectStatus = true;

    let x = 0;

    while(x < qArr.length){
      if(x !== gotNum){
        qArr[x].selectStatus = false;
      }

      x++;
    }

    qObj.questionArray = qArr;

    setQuestionObject({...qObj});
    seToNextQuestion(true);
  }

  console.log(answersArray);

  return (
    <div className="App">
      <p>Question {questionObject.questionItself} of 5: 1 or 2 
      questions per week</p>

      {
        questionObject.questionArray?questionObject.questionArray.map((i, index) => {
          return (
            <div key ={Math.random()}>
              <button onClick={()=>selectAnswerHandler(index)}
                style={i.selectStatus?{backgroundColor: "red"}:{backgroundColor:"grey"}}>
                {i.qName}
              </button>
            </div>
          )
        }):null
      }
      <button onClick={backHandler}>Back</button>
      <button onClick={nextHandler} 
      disabled={toNextQuestion?false: true}>Next</button>
    </div>
  );
}

export default App;
