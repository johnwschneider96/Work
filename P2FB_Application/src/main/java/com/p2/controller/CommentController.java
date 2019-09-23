package com.p2.controller;

import java.io.IOException;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.p2.model.Comment;
import com.p2.service.CommentService;

/**
* Comment Controller for accepting and sending data to the front-end angular application
* 
* @author Barton Carson
* @since 2019-9-13
*/

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class CommentController {

	/**
	 * Logger for comment controller
	 */
	private final static Logger loggy = Logger.getLogger(StoryController.class);
	
	/**
	 * Autowired story service for the comment controller
	 */
	@Autowired
	CommentService commentServ;
	
	/**
	 * Insert controller method that inserts the comment into the database
	 * 
	 * @param jsonString returned from the front-end 
	 */
	@PostMapping(value = "/insertcomment")
	public void insertPost(@RequestBody String jsonString) {
		Comment c = null;
		try {
			c = new ObjectMapper().readValue(jsonString, Comment.class);
		} catch (IOException e) {
			e.printStackTrace();
		}
		loggy.info("Insert Comment Controller Accessed");
		commentServ.insert(c);
	}
	
	@PutMapping(value = "/updatecomment")
	public void updatePost(@RequestBody String jsonString) {
		Comment c = null;
		try {
			c = new ObjectMapper().readValue(jsonString, Comment.class);
		} catch (IOException e) {
			e.printStackTrace();
		}
		loggy.info("Update Story Controller Accessed");
		commentServ.update(c);
	}
	
	/**
	 * Controller method that selects all comments based on the comment id
	 * 
	 * @param id from the story that created the comment
	 * @return all comments for the given id
	 */
	@GetMapping(value="{id}/storycomments")
	public @ResponseBody List<Comment> selectUserPosts(@PathVariable("id") int id) {
		loggy.info("List of a User's Stories pulled from the database");
		return commentServ.selectCommentsById(id);
	}
	
}
