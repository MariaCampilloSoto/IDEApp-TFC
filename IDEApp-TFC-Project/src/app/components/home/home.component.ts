import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnChanges {
  myForm: FormGroup;
  constructor(private fb: FormBuilder) {
    // try {
    //   let t = document.getElementById('twitter-wjs');
    //   t.remove();
    //   this.twit(document, 'script', 'twitter-wjs');
    // } catch (error) {}
  }
  ngOnChanges(changes: SimpleChanges): void {
    // try{
    //   let t = document.getElementById('twitter-wjs');
    //   t.remove();
    //   this.twit(document, 'script', 'twitter-wjs');
    // } catch (err) {
    // }
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      date: null,
      range: null,
    });
    try {
      let t = document.getElementById('twitter-wjs');
      if (t != null) t.remove();
      this.twit(document, 'script', 'twitter-wjs');
    } catch (err) {
      console.log(err);
    }
  }

  twit(d, s, id) {
    let js,
      fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = '//platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  }
}
