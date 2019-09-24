import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../../Models/story';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../Models/user';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  user: User;
  postForm: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('token'));
    this.postForm = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

  submitNewStory(theStory: Story) {
    this.http.post('http://localhost:9005/P2FB_Application/insertstory', JSON.stringify(theStory)).subscribe(
      data => {
        alert('Post Creation Successful');
      },
      error => {
        console.log('Error Occured:' + error);
        alert('Post Creation failed');
      }
    );
  }

  onSubmit() {
    const theStory = new Story(null, this.postForm.get('content').value, 0, this.user);
    this.submitNewStory(theStory);
    this.router.navigate(['/feed']);
  }

}
