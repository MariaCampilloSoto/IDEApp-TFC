import { stringify } from 'querystring';

export class Evaluation {
    $key: string;
    schoolYear: string; // 2020/21
    numberEvaluation: number; // 0 == ninguna;
    mark: number;
}