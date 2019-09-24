import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../Models/comment';
import { User } from '../../Models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  user: User;
  urlResponse: any;
  signedUrl: any;

  constructor(
    private http: HttpClient
  ) { }

  @Input()
  comment: Comment;

  async getFile() {
    this.urlResponse = await fetch('http://localhost:9005/P2FB_Application/s3/' + this.comment.user.filename, {
      method: 'GET'
    });
    this.signedUrl = await this.urlResponse.text();
  }

  addLike(comment: Comment) {
    comment.numLikes = comment.numLikes + 1;
    this.http.put('http://localhost:9005/P2FB_Application/updatecomment', JSON.stringify(comment)).subscribe(
      data => {
      },
      error => {
        console.log('Error Occured:' + error);
        alert('Like failed');
      }
    );
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('token'));
    this.getFile();
  }

}
