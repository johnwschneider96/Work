import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Story } from 'src/app/Models/story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  myresponse: any;
  urlResponse: any;
  signedUrl: any;
  image: any;

  @Input()
  story: Story;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    if (this.story.userEmail.filename !== null) {
      this.getFile();
    } else {
      this.signedUrl = 'https://cdna.artstation.com/p/assets/images/images/000/282/854/large/hispter_final_FINAL.jpg?1415033893';
    }
    this.getusercomments(this.story.postId);
  }

  async getFile() {
    this.urlResponse = await fetch('http://localhost:9005/P2FB_Application/s3/' + this.story.userEmail.filename, {
      method: 'GET'
    });
    this.signedUrl = await this.urlResponse.text();
  }

  getusercomments(postId: number) {
    this.http.get('http://localhost:9005/P2FB_Application/' + postId + '/storycomments').subscribe(
      data => {
        this.myresponse = data;
      },
      error => {
        console.log('Error occured', error);
      }
    );
  }

  addLike(story: Story) {
    story.numLikes = story.numLikes + 1;
    this.http.put('http://localhost:9005/P2FB_Application/updatestory', JSON.stringify(story)).subscribe(
      data => {
      },
      error => {
        console.log('Error Occured:' + error);
        alert('Like failed');
      }
    );
  }
}
