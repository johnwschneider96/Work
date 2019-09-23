package com.p2.test;

import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class EncryptTest {

	@Test
	public void EncryptPassword() {
		assertEquals("should encrypt the password", "j3bzX1mnSzwjK4u74N5JUA==", com.p2.encrypt.PasswordEncryption.encrypt("chemman", "Clemson"));
	}
	
	@Test
	public void DecryptPassword() {
		assertEquals("should decrypt the password", "chemman", com.p2.encrypt.PasswordEncryption.decrypt("j3bzX1mnSzwjK4u74N5JUA==", "Clemson"));
	}	
}