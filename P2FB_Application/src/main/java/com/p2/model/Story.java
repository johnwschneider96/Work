package com.p2.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="p2sq_story")
public class Story {
	
	@Id
	@Column(name="post_id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int postId;
	
	@Column(name="content")
	private String content;
	
	@Column(name="num_likes")
	private int numLikes;
	
	@ManyToOne
	@JoinColumn(name="p2sq_email", nullable=false)
	private User user;
	
	public Story() {}

	public Story(int postId, String content, int numLikes, User user) {
		super();
		this.postId = postId;
		this.content = content;
		this.numLikes = numLikes;
		this.user = user;
	}

	public int getPostId() {return postId;}
	public void setPostId(int postId) {this.postId = postId;}
	public String getContent() {return content;}
	public void setContent(String content) {this.content = content;}
	public int getNumLikes() {return numLikes;}
	public void setNumLikes(int numLikes) {this.numLikes = numLikes;}
	public User getUserEmail() {return user;}
	public void setUserEmail(User user) {this.user = user;}
	
	@Override
	public String toString() {
		return "Story [postId=" + postId + ", content=" + content + ", numLikes=" + numLikes + ", userEmail="
				+ user + "]";
	}
}