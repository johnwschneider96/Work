package com.p2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.p2.model.Story;
import com.p2.repository.StoryDao;

/**
 * Story service for added security between our story controller and story dao
 * 
 * @author Barton Carson & John Schneider
 * @since 2019-9-13
 */
@Service
public class StoryService {
	
	/**
	 * Autowired dao for the story service
	 */
	@Autowired
	StoryDao storyDao;
	
	/**
	 * default constructor
	 */
	public StoryService() {}
	
	/**
	 * Service method that connects the story dao insert to story controller
	 * 
	 * @param s the story object to insert
	 */
	public void insert(Story s) {
		storyDao.insert(s);
	}
	
	/**
	 * Service method that connects the story dao update to story controller
	 * 
	 * @param s the story object to update
	 */
	public void update(Story s) {
		storyDao.update(s);
	}
	
	/**
	 * Service method that connects the story dao selectStoriesByEmail to story controller
	 * 
	 * @param email from the user that created the story
	 * @return all stories for the given user email from the database
	 */
	public List<Story> selectStoriesByEmail(String email) {
		return storyDao.selectStoriesByEmail(email);
	}
	
	/**
	 * Service method that connects the story dao selectAllStories to story controller
	 * 
	 * @return all stories for all users from the database
	 */
	public List<Story> selectAllStories() {
		return storyDao.selectAllStories();
	}
}