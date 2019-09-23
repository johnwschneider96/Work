package com.p2.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "p2sq_users")
public class User {

	@Id //Primary Key
	@Column(name = "p2sq_email")
	private String email;
	
	@Column(name = "p2sq_password")
	private String password;
	
	@Column(name = "p2sq_filename")
	private String filename;
	
	@Column(name = "p2sq_first_name")
	private String firstname;
	
	@Column(name = "p2sq_last_name")
	private String lastname;
	
	@Column(name = "p2sq_phone_number")
	private String phonenumber;

	public User() {
		super();
	}

	public User(String email, String password, String filename, String firstname, String lastname, String phonenumber) {
		super();
		this.email = email;
		this.password = password;
		this.filename = filename;
		this.firstname = firstname;
		this.lastname = lastname;
		this.phonenumber = phonenumber;
	}

	public User(String email, String password, String firstname, String lastname, String phonenumber) {
		super();
		this.email = email;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.phonenumber = phonenumber;
	}

	public String getEmail() {return email;}
	public void setEmail(String email) {this.email = email;}
	public String getPassword() {return password;}
	public void setPassword(String password) {this.password = password;}
	public String getFilename() {return filename;}
	public void setFilename(String filename) {this.filename = filename;}
	public String getFirstname() {return firstname;}
	public void setFirstname(String firstname) {this.firstname = firstname;}
	public String getLastname() {return lastname;}
	public void setLastname(String lastname) {this.lastname = lastname;}
	public String getPhonenumber() {return phonenumber;}
	public void setPhonenumber(String phonenumber) {this.phonenumber = phonenumber;}

	@Override
	public String toString() {
		return "User [email=" + email + ", password=" + password + ", filename=" + filename + ", firstname=" + firstname
				+ ", lastname=" + lastname + ", phonenumber=" + phonenumber + "]";
	}
}
