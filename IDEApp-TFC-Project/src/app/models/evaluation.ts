import { stringify } from 'querystring';

export class Evaluation {
    $key: string;
    schoolYear: string; // 2020/21
    static numberEvaluation: number = 0; // 0 == ninguna;
    marks: number[];

    

    addEvaluationMark(mark: number){
        this.marks.push(mark);
    }

    increaseNumbersEvaluation(){
       // this.numberEvaluation+=1;
    }
}