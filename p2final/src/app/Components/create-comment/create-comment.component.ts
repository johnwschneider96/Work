import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../Models/user';
import { Comment } from '../../Models/comment';
import { Story } from '../../Models/story';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  user: User;
  commentForm: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  @Input()
  story: Story;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('token'));
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

  submitNewComment(theComment: Comment) {
    this.http.post('http://localhost:9005/P2FB_Application/insertcomment', JSON.stringify(theComment)).subscribe(
      data => {
        alert('Comment Creation Successful');
      },
      error => {
        console.log('Error Occured:' + error);
        alert('Comment Creation failed');
      }
    );
  }

  onSubmit() {
    const theComment = new Comment(null, this.commentForm.get('content').value, 0, this.story, this.user);
    this.submitNewComment(theComment);
  }

}
