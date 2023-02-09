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
  const [challengeBucket, setChallengeBucket] = useState('');

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

    if(qObj.questionItself < 5){
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
  } 

  const nextHandler = () => {
    let qObj = questionObject;
    let qArr = questionObject.questionArray;
    let aArr = answersArray;

    if(qObj.questionItself === aArr.length){
      qObj.questionItself++;
      let x = 0;

      while(x < qArr.length){
        qArr[x].selectStatus = false;
        x++;
      }

      setQuestionObject({...qObj});
      seToNextQuestion(false);
    }else{
      qObj.questionItself++;

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
  }

  const backHandler = () => {
    let qObj = questionObject;
    let qArr = questionObject.questionArray;
    let aArr = answersArray;

    if(qObj.questionItself > 1){
      qObj.questionItself--;

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
  }

  const calculateChallengeBucket = () =>{
    let aArr = answersArray;

    //console.log(aArr);

    let getOne = aArr.filter(i =>{
      return i.answer === 1;
    });

    let getTwo = aArr.filter(i =>{
      return i.answer === 2;
    });

    let getThree = aArr.filter(i =>{
      return i.answer === 3;
    });

    let getFour = aArr.filter(i =>{
      return i.answer === 4;
    });

    let concatentatedValues = [
      getOne.length, 
      getTwo.length,
      getThree.length,
      getFour.length
    ];

    let cb = concatentatedValues.indexOf(Math.max(...concatentatedValues)) + 1;
  
    if(cb === 1){
      setChallengeBucket('challengeBucket 1');
    }else if(cb === 2){
      setChallengeBucket('challengeBucket 2');
    }else if(cb === 3){
      setChallengeBucket('challengeBucket 3');
    }
    else{
      setChallengeBucket('challengeBucket 4');
    }
  }

  console.log(challengeBucket);

  return (
    <div className="App">
      <p>Question {questionObject.questionItself} of 5: 1 or 2 
      questions per week</p>

      {
        questionObject.questionArray && questionObject.questionItself < 5?questionObject.questionArray.map((i, index) => {
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
      {
        questionObject.questionItself === 5?answersArray.map(i =>{
          return (<div key={Math.random()}>
            <p>question{i.questionItself}: {i.answer}</p>
          </div>);
        }):null
      }
      <button onClick={backHandler}>Back</button>
      {questionObject.questionItself < 5?<button onClick={nextHandler} 
      disabled={toNextQuestion?false: true}>Next</button>: 
      <button onClick={calculateChallengeBucket}>Submit</button>}
    </div>
  );
}

export default App;
