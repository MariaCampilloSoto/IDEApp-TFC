export class Course {
    $key: string;
    course: string; //1, 2, 3 ...
    level: string; // ESO, Bachillerato, Grado medio/superior...
    year: string; //Año actual "/" Año actual+1
    fullInfo?: string;

    

    defaultYear(){
        let anyo = (new Date()).getFullYear();
        this.year = `${anyo}/${anyo+1}`;
    }

    setFullInfo(){
        this.fullInfo = `${this.course} ${this.level} ${this.year}`
    }
}