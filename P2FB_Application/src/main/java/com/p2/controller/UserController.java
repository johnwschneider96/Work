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
import com.p2.encrypt.PasswordEncryption;
import com.p2.model.User;
import com.p2.service.UserService;

/**
 * User Controller for accepting and sending data to the front-end angular application
 * 
 * @author Barton Carson & John Schneider
 * @since 2019-9-13
 */
@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class UserController {
	
	/**
	 * Logger for user controller
	 */
	private final static Logger loggy = Logger.getLogger(StoryController.class);
	/**
	 * Autowired user service for the user controller
	 */
	@Autowired
	UserService userServ;
	
	
	/**
	 * Insert controller method that inserts the user in the database
	 * 
	 * @param user the user object in the database
	 */
	@PostMapping(value = "/insertuser")
	public void insertUser(@RequestBody String jsonString) {
		User u = null;
		try {
			u = new ObjectMapper().readValue(jsonString, User.class);
			u.setPassword(PasswordEncryption.encrypt(u.getPassword(), "Clemson"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		loggy.info("Insert User Controller Accessed");
		userServ.insertUser(u);
	}
	
	/**
	 * Controller method that updates the user in the database
	 * 
	 * @param user the user object in the database
	 */
	@PutMapping(value = "/updateuser")
	public void updateUser(@RequestBody String jsonString) {
		User u = null;
		try {
			u = new ObjectMapper().readValue(jsonString, User.class);
			u.setPassword(PasswordEncryption.encrypt(u.getPassword(), "Clemson"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		loggy.info("Update User Controller Accessed");
		userServ.updateUser(u);
	}
	
	/**
	 * Controller method that selects all story based on the user email
	 * 
	 * @param email of the user
	 * @return the user with the requested email
	 */
	@GetMapping(value="{email}/userbyemail")
	public @ResponseBody User getUserByEmail(@PathVariable("email") String email) {
		User u = userServ.selectByEmailUser(email);
		if (u == null) {
			return u;
		}
		u.setPassword(PasswordEncryption.decrypt(u.getPassword(), "Clemson"));
		loggy.info("Single User pulled from the database");
		return u;
	}
	
	/**
	 * Controller method that selects all users from the database
	 * 
	 * @return all users in the database
	 */
	@GetMapping(value = "/allusers")
	public @ResponseBody List<User> getAllUsers() {
		loggy.info("List of all Users pulled from the database");
		return userServ.selectAllUsers();
	}
}