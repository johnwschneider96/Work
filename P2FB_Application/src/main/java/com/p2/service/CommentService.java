package com.p2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.p2.model.Comment;
import com.p2.repository.CommentDao;

/**
 * Comment service for added security between our comment controller and comment dao
 * 
 * @author Barton Carson & John Schneider
 * @since 2019-9-13
 */
@Service
public class CommentService {

	/**
	 * Autowired dao for the comment service
	 */
	@Autowired
	CommentDao commentDao;
	
	/**
	 * default constructor
	 */
	public CommentService() {}
	
	/**
	 * Service method that connects the comment dao insert to comment controller
	 * 
	 * @param c the comment object to insert
	 */
	public void insert(Comment c) {
		commentDao.insert(c);
	}
	
	/**
	 * Service method that connects the comment dao update to comment controller
	 * 
	 * @param c the comment object to update
	 */
	public void update(Comment c) {
		commentDao.update(c);
	}
	
	/**
	 * Service method that connects the comment dao select method to comment controller
	 * 
	 * @param id from the story that created the comment
	 * @return all comment for the given story id from the database
	 */
	public List<Comment> selectCommentsById(int id) {
		return commentDao.selectCommentsByPostId(id);
	}
	
}
