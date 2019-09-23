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
@Table(name="p2sq_comment")
public class Comment {

	@Id
	@Column(name="comment_id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int commentId;
	
	@Column(name="content")
	private String content;
	
	@Column(name="num_likes")
	private int numLikes;
	
	@ManyToOne
	@JoinColumn(name="post_id", nullable=false)
	private Story story;
	
	@ManyToOne
	@JoinColumn(name="user_email", nullable=false)
	private User user;

	public Comment() {}

	public Comment(int commentId, String content, int numLikes, Story story, User user) {
		super();
		this.commentId = commentId;
		this.content = content;
		this.numLikes = numLikes;
		this.story = story;
		this.user = user;
	}

	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getNumLikes() {
		return numLikes;
	}

	public void setNumLikes(int numLikes) {
		this.numLikes = numLikes;
	}

	public Story getStory() {
		return story;
	}

	public void setStory(Story story) {
		this.story = story;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Comment [commentId=" + commentId + ", content=" + content + ", numLikes=" + numLikes + ", story="
				+ story + ", user=" + user + "]";
	}
}
