package com.p2.repository;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.p2.model.User;

/**
 * User Dao for accessing the database
 * 
 * @author Barton Carson & John Schneider
 * @since 2019-9-13
 */
@Repository("userRepo")
@Transactional
public class UserDao {

	/**
	 * Autowired session factory for the user dao
	 */
	@Autowired
	private SessionFactory sf;
	
	/**
	 * default constructor
	 */
	public UserDao() {}
	
	/**
	 * Dao method that inserts the user into the database
	 * 
	 * @param u the user object in the database
	 */
	public void insert(User u) {sf.getCurrentSession().save(u);}
	
	/**
	 * Dao method that updates the user in the database
	 * 
	 * @param u the user object in the database
	 */
	public void update(User u) {sf.getCurrentSession().update(u);}
	
	/**
	 * Dao method that select the user based on the user email from the database
	 * 
	 * @param email from the user
	 * @return user with the given email in the database
	 */
	public User selectByEmail(String email) {return sf.getCurrentSession().get(User.class, email);}
	
	/**
	 * Dao method that selects all stories for all users from the database
	 * 
	 * @return all users in the database
	 */
	public List<User> selectAll() {return sf.getCurrentSession().createQuery("FROM User", User.class).list();}
	
}
