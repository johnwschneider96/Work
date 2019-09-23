package com.p2.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.p2.model.Comment;

@Repository("commentRepo")
@Transactional
public class CommentDao {

	/**
	 * Autowired session factory for the comment dao
	 */
	@Autowired
	SessionFactory sf;
	
	/**
	 * default constructor
	 */
	public CommentDao() {}
	
	/**
	 * Dao method that inserts the comment into the database
	 * 
	 * @param c the comment object in the database
	 */
	public void insert(Comment c) {sf.getCurrentSession().save(c);}
	
	/**
	 * Dao method that updates the comment in the database
	 * 
	 * @param c the comment object in the database
	 */
	public void update(Comment c) {sf.getCurrentSession().update(c);}
	
	/**
	 * Dao method that selects all comment based on the post id from the database
	 * 
	 * @param id from the poster that created the comment
	 * @return all comments for the given post id from the database
	 */
	public List<Comment> selectCommentsByPostId(int id) {
		Session session = sf.getCurrentSession();
		String selectQuery = "FROM Comment WHERE post_id= :id ORDER BY comment_id DESC";
		@SuppressWarnings("unchecked")
		Query<Comment> query = session.createQuery(selectQuery);
		query.setParameter("id", id);
		List<Comment> results = query.list();
		return results;
	}
	
}
