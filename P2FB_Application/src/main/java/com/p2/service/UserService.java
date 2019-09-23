package com.p2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.p2.model.User;
import com.p2.repository.UserDao;

/**
 * Story service for added security between our story controller and story dao
 * 
 * @author Barton Carson & John Schneider
 * @since 2019-9-13
 */
@Service
public class UserService {

	/**
	 * Autowired dao for the user service
	 */
	@Autowired
	UserDao userDao;
	
	/**
	 * default constructor
	 */
	public UserService() {}
	
	/**
	 * Service method that connects the user dao insert to user controller
	 * 
	 * @param u the user object to insert
	 */
	public void insertUser(User u) {
		userDao.insert(u);
	}
	
	/**
	 * Service method that connects the user dao update to user controller
	 * 
	 * @param u the user object to update
	 */
	public void updateUser(User u) {
		userDao.update(u);
	}
	
	/**
	 * Service method that connects the user dao selectStoriesByEmail to user controller
	 * 
	 * @param email from the user
	 * @return user for the given user email from the database
	 */
	public User selectByEmailUser(String email) {
		return userDao.selectByEmail(email);
	}
	
	/**
	 * Service method that connects the user dao selectAllStories to user controller
	 * 
	 * @return all users
	 */
	public List<User> selectAllUsers() {
		return userDao.selectAll();
	}
	
}
