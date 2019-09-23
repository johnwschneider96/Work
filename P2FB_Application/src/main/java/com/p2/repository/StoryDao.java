package com.p2.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.p2.model.Story;

/**
 * Story Dao for accessing the database
 * 
 * @author Barton Carson & John Schneider
 * @since 2019-9-13
 */
@Repository("storyRepo")
@Transactional
public class StoryDao {
	
	/**
	 * Autowired session factory for the story dao
	 */
	@Autowired
	SessionFactory sf;
	
	/**
	 * default constructor
	 */
	public StoryDao() {}
	
	/**
	 * Dao method that inserts the story into the database
	 * 
	 * @param s the story object in the database
	 */
	public void insert(Story s) {sf.getCurrentSession().save(s);}
	
	/**
	 * Dao method that updates the story in the database
	 * 
	 * @param s the story object in the database
	 */
	public void update(Story s) {sf.getCurrentSession().update(s);}
	
	/**
	 * Dao method that selects all stories based on the user email from the database
	 * 
	 * @param email from the user that created the story
	 * @return all stories for the given user email from the database
	 */
	public List<Story> selectStoriesByEmail(String email) {
		Session session = sf.getCurrentSession();
		String selectQuery = "FROM Story WHERE p2sq_email= :emailParam ORDER BY post_id DESC";
		@SuppressWarnings("unchecked")
		Query<Story> query = session.createQuery(selectQuery);
		query.setParameter("emailParam", email);
		//sesFact.getCurrentSession().createQuery("FROM Story WHERE email=" + email, Story.class).list();
		List<Story> results = query.list();
		return results;
	}
	
	/**
	 * Dao method that selects all stories for all users from the database
	 * 
	 * @return all stories for all users from the database
	 */
	public List<Story> selectAllStories() {
		return sf.getCurrentSession().createQuery("FROM Story ORDER BY post_id DESC", Story.class).getResultList();
	}
}